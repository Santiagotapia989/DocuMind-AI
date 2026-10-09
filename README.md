# DocuMind AI — Chatbot RAG (Netlify + versión n8n original)
## 🚀 Demo en Vivo
Podés probar el agente conversacional en tiempo real desde el siguiente enlace:
👉 **[Probar Chatbot RAG en Vivo](https://documind-stb.netlify.app)**
> **Sugerencias de preguntas para probar:**
> * *¿Qué tecnologías backend maneja Santiago?*
> * *¿En qué proyectos destacados ha trabajado?*
> * *¿Cuál es su formación académica y qué rol tuvo en la Hackathon UCA?*

Chatbot conversacional que responde preguntas sobre el perfil, experiencia y proyectos de Santiago Tapia Bazán.

**Versión actual (standalone):** app web desplegable en **Netlify** — página de chat estática + función serverless. La recuperación se hace con un buscador de relevancia propio sobre la base de conocimiento (`knowledge.js`), y la generación con un LLM vía API (Groq si hay key configurada; si no, un proveedor gratuito sin key). No depende de n8n ni de servicios externos con credenciales.

**Versión original (n8n):** el proyecto nació como un sistema **RAG** orquestado con dos flujos en n8n (ingesta de PDFs desde Google Drive, embeddings de Hugging Face indexados en Pinecone y agente conversacional con Groq). Los JSON de ambos workflows se conservan en este repo como referencia.

---

## 🛠️ Arquitectura actual

```
[ Usuario / Web Chat ] ──► [ retrieval.js: buscador de relevancia ]
                                      │  top chunks de knowledge.js
                                      ▼
                    [ LLM (Groq / Pollinations) ] ──► [ Respuesta ]
```

* **`index.html`:** interfaz de chat con preguntas sugeridas y memoria de conversación.
* **`knowledge.js`:** base de conocimiento curada (perfil, educación, skills, proyectos, contacto).
* **`retrieval.js`:** ranking por relevancia de tokens (ES/EN, stemming, sinónimos) compartido entre browser y función.
* **`netlify/functions/chat.js`:** función serverless. Si existen `GROQ_API_KEY` o `LLM_API_BASE`/`LLM_API_KEY`, genera server-side (la key nunca se expone al browser). Sin keys, el browser llama directo al LLM gratuito y la función sirve de fallback con respuesta armada desde los chunks.

### Arquitectura original (n8n)

```
[ PDF en Google Drive ] ──► (Workflow 1: Ingesta) ──► [ Embeddings ] ──► [ Pinecone Vector DB ]
                                                                                │
                                                                                ▼
[ Usuario / Web Chat ] ──► (Workflow 2: Chatbot)  ──► [ Groq / LLM ] ──► [ Respuesta Semántica ]
```

---

## 🚀 Tecnologías Utilizadas

**Versión actual:** HTML/CSS/JS vanilla · Netlify (hosting + Functions) · Groq API u otro LLM OpenAI-compatible (opcional, vía env vars) · Pollinations (LLM gratuito sin key, modo fallback).

**Versión original (workflows JSON):** n8n · Pinecone · Hugging Face Inference API · Groq API · Google Drive API.

---

## 📥 Estructura de Repositorio

```text
.
├── index.html                  # Interfaz de chat
├── knowledge.js                # Base de conocimiento (perfil, proyectos, contacto)
├── retrieval.js                # Buscador de relevancia + prompt + fallback
├── dev-server.js               # Servidor local sin dependencias
├── netlify.toml                # Config de deploy en Netlify
├── netlify/functions/chat.js   # Función serverless del chatbot
├── package.json
├── workflow-1-ingesta.json     # [n8n original] Flujo de ingesta PDF → Pinecone
├── workflow-2-chatbot..json    # [n8n original] Flujo del agente RAG
└── README.md                   # Documentación del proyecto
```

---

## ⚙️ Correr local y desplegar

**Local (sin dependencias):**
```bash
git clone https://github.com/Santiagotapia989/DocuMind-AI.git
cd DocuMind-AI
node dev-server.js   # → http://localhost:8888
```

**Deploy en Netlify:**
1. Netlify → *Add new site → Import from Git* → elegir este repo. `netlify.toml` ya configura `publish` y `functions`.
2. Asignar el nombre de sitio `documind-stb` (o actualizar el link del demo).
3. *(Opcional, recomendado)* Site settings → Environment variables → `GROQ_API_KEY` (key gratuita en console.groq.com) para respuestas más rápidas.

**Importar la versión n8n original (opcional):**
1. En tu instancia de **n8n**: `Create workflow` → `Import from file` → importar `workflow-1-ingesta.json` y `workflow-2-chatbot..json`.
2. Configurar credenciales: Pinecone API Key, Hugging Face Access Token y Groq API Key.
3. Activar el workflow del chat y usar la URL pública generada por n8n.

---

## 👤 Autor

Desarrollado por **Santiago Tapia Bazán**.
