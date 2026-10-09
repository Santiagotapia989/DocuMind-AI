import { buildMessages, fallbackAnswer, askPollinations } from "../../retrieval.js";

const TIMEOUT = AbortSignal.timeout(8000); // margen bajo el límite de 10s de Netlify

async function llm(messages) {
  if (process.env.GROQ_API_KEY) {
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      signal: TIMEOUT,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
      body: JSON.stringify({ model: process.env.GROQ_MODEL || "llama-3.1-8b-instant", messages, max_tokens: 500 }),
    });
    if (!r.ok) throw new Error(`Groq ${r.status}`);
    return (await r.json()).choices[0].message.content;
  }
  if (process.env.LLM_API_BASE) {
    const headers = { "Content-Type": "application/json" };
    if (process.env.LLM_API_KEY) headers.Authorization = `Bearer ${process.env.LLM_API_KEY}`;
    const r = await fetch(`${process.env.LLM_API_BASE}/chat/completions`, {
      method: "POST",
      signal: TIMEOUT,
      headers,
      body: JSON.stringify({ model: process.env.LLM_MODEL || "llama-3.1-8b-instant", messages, max_tokens: 500 }),
    });
    if (!r.ok) throw new Error(`LLM ${r.status}`);
    return (await r.json()).choices[0].message.content;
  }
  return askPollinations(messages, 8000);
}

export const handler = async (event) => {
  const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers };
  if (event.httpMethod === "GET")
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ configured: Boolean(process.env.GROQ_API_KEY || process.env.LLM_API_BASE) }),
    };
  if (event.httpMethod !== "POST")
    return { statusCode: 405, headers, body: JSON.stringify({ error: "POST only" }) };

  let message, history;
  try {
    ({ message, history = [] } = JSON.parse(event.body || "{}"));
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON" }) };
  }
  if (!message || typeof message !== "string")
    return { statusCode: 400, headers, body: JSON.stringify({ error: "message required" }) };

  const { chunks, messages } = buildMessages(message, history);
  const meta = { chunks: chunks.map((c) => c.id) };

  try {
    const reply = await llm(messages);
    return { statusCode: 200, headers, body: JSON.stringify({ reply: reply.trim(), source: "llm", ...meta }) };
  } catch {
    return { statusCode: 200, headers, body: JSON.stringify({ reply: fallbackAnswer(chunks), source: "fallback", ...meta }) };
  }
};
