// Lógica de recuperación compartida entre la Netlify Function y el browser.
import { CHUNKS, SYNONYMS } from "./knowledge.js";

const norm = (s) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

const stem = (t) => (t.length > 3 && t.endsWith("s") ? t.slice(0, -1) : t);

const tokenize = (s) =>
  norm(s)
    .split(/[^a-z0-9ñ+#]+/)
    .filter((t) => t.length > 2)
    .map((t) => stem(SYNONYMS[t] || t));

export function retrieve(query) {
  const tokens = tokenize(query);
  const scored = CHUNKS.map((c) => {
    const title = norm(c.title);
    const tags = tokenize(c.tags.join(" "));
    const text = norm(c.text);
    let score = 0;
    for (const t of tokens) {
      if (title.includes(t)) score += 4;
      if (tags.includes(t)) score += 3;
      score += Math.min(text.split(t).length - 1, 3);
    }
    return { c, score };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);
  return (scored.length ? scored.slice(0, 4) : [{ c: CHUNKS[0] }, { c: CHUNKS.at(-1) }]).map((s) => s.c);
}

const SYSTEM = `Sos "DocuMind", el asistente del portfolio de Santiago Tapia Bazán. Respondé preguntas sobre él usando SOLO el contexto dado. Reglas:
- Respondé en el mismo idioma de la pregunta (español o inglés), en tono profesional y cordial, en 3ra persona.
- Sé conciso (2-5 oraciones o bullets cortos). No inventes datos fuera del contexto.
- Si la pregunta no se puede responder con el contexto, decilo y sugerí contactarlo por email (Bazan0897@gmail.com) o GitHub (github.com/Santiagotapia989).
- Si saludan, presentate brevemente y sugerí qué pueden preguntar.

CONTEXTO:
{context}`;

export function buildMessages(message, history = []) {
  const chunks = retrieve(message);
  const context = chunks.map((c) => `[${c.title}]\n${c.text}`).join("\n\n");
  const past = history
    .filter((m) => m.role === "user" || m.role === "assistant")
    .slice(-8);
  return {
    chunks,
    messages: [
      { role: "system", content: SYSTEM.replace("{context}", context) },
      ...past,
      { role: "user", content: message.slice(0, 1000) },
    ],
  };
}

export function fallbackAnswer(chunks) {
  return (
    "Ahora mismo no puedo generar una respuesta elaborada, pero esto es lo que tengo sobre tu consulta:\n\n" +
    chunks.map((c) => `• ${c.title}: ${c.text.split(".")[0]}.`).join("\n")
  );
}

// Proveedor LLM gratuito sin key, usable desde el browser (CORS abierto).
export async function askPollinations(messages, timeoutMs = 30000) {
  const r = await fetch("https://text.pollinations.ai/", {
    method: "POST",
    signal: AbortSignal.timeout(timeoutMs),
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, model: "openai", private: true }),
  });
  if (!r.ok) throw new Error(`Pollinations ${r.status}`);
  return (await r.text()).trim();
}
