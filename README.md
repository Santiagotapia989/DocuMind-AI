# DocuMind AI — Chatbot RAG
## 🚀 Demo en Vivo
Podés probar el agente conversacional en tiempo real desde el siguiente enlace:
👉 **[Probar Chatbot RAG en Vivo](https://documind-stb.netlify.app)**
> **Sugerencias de preguntas para probar:**
> * *¿Qué tecnologías backend maneja Santiago?*
> * *¿En qué proyectos destacados ha trabajado?*
> * *¿Cuál es su formación académica y qué rol tuvo en la Hackathon UCA?*

Chatbot conversacional que responde preguntas sobre el perfil, experiencia y proyectos de Santiago Tapia Bazán. Implementa una arquitectura **RAG (Retrieval-Augmented Generation)** sin dependencias externas con credenciales: recuperación por relevancia sobre una base de conocimiento curada + generación con LLM vía API.

App web desplegable en **Netlify** — página de chat estática + función serverless.

---

## 🛠️ Arquitectura

```
[ Usuario / Web Chat ] ──► [ retrieval.js: buscador de relevancia ]
                                      │  top chunks de knowledge.js
                                      ▼
                    [ LLM (Groq / Pollinations) ] ──► [ Respuesta ]
```

* **`index.html`:** interfaz de chat con preguntas sugeridas y memoria de conversación.
* **`knowledge.js`:** base de conocimiento curada (perfil, educación, skills, proyectos, contacto).
* **`retrieval.js`:** ranking por relevancia de tokens (ES/EN, stemming, sinónimos) compartido entre browser y función.
* **`netlify/functions/chat.js`:** función serverless. Si existen `GROQ_API_KEY` o `LLM_API_BASE`/`LLM_API_KEY`, genera server-side (la key nunca se expone al browser). Sin keys, el browser llama directo al LLM gratuito y, como último recurso, responde con los chunks recuperados.

---

## 🚀 Tecnologías Utilizadas

HTML/CSS/JS vanilla · Netlify (hosting + Functions) · Groq API u otro LLM OpenAI-compatible (opcional, vía env vars) · Pollinations (LLM gratuito sin key, modo fallback).

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

---

## 👤 Autor

Desarrollado por **Santiago Tapia Bazán**.
