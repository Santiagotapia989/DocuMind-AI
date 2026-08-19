# Sistema RAG (Retrieval-Augmented Generation) con n8n, Pinecone y Groq

Este proyecto implementa una arquitectura **RAG (Retrieval-Augmented Generation)** automatizada de dos flujos utilizando **n8n**, **Pinecone** (Base de Datos Vectorial) y **Groq** (LLM). Permite la ingesta automática de documentos PDF y la consulta interactiva en tiempo real mediante un agente conversacional inteligente.

---

## 🛠️ Arquitectura del Proyecto

El sistema está dividido en dos flujos independientes y complementarios:

```
[ PDF en Google Drive ] ──► (Workflow 1: Ingesta) ──► [ Embeddings ] ──► [ Pinecone Vector DB ]
                                                                                │
                                                                                ▼
[ Usuario / Web Chat ] ──► (Workflow 2: Chatbot)  ──► [ Groq / LLM ] ──► [ Respuesta Semántica ]
```

### 1. Workflow 1: Ingesta e Indexación de Documentos
* **Google Drive Trigger / Download:** Extrae el documento PDF técnico o CV.
* **Text Splitter:** Divide el documento en fragmentos óptimos (chunks) para preservar el contexto semántico.
* **Embeddings (Hugging Face):** Transforma el texto en vectores multidimensionales.
* **Pinecone Vector Store:** Almacena e indexa los vectores para búsquedas de alta velocidad.

### 2. Workflow 2: Agente Conversacional (RAG)
* **Chat Trigger / Web Interface:** Interfaz pública de usuario final.
* **AI Agent & Memory:** Agente con ventana de contexto conversacional para mantener el hilo de la charla.
* **Vector Store Tool:** Herramienta conectada a Pinecone que realiza búsqueda de similitud coseno sobre los embeddings.
* **LLM (Groq - Qwen / LLaMA 3):** Genera respuestas precisas, en español y basadas estrictamente en la información recuperada de Pinecone.

---

## 🚀 Tecnologías Utilizadas

* **n8n:** Orquestador y motor de automatizaciones (Workflows).
* **Pinecone:** Vector Database para almacenamiento e indexación de embeddings.
* **Hugging Face Inference API:** Generación de modelos de embeddings.
* **Groq API (Qwen 2.5 / LLaMA 3):** Inferencia ultra-rápida para el LLM.
* **Google Drive API:** Repositorio de origen para los documentos.

---

## 📥 Estructura de Repositorio

```text
.
├── workflow-1-ingesta.json    # Flujo de carga de PDF e indexación a Pinecone
├── workflow-2-chatbot.json    # Flujo del agente de IA RAG
└── README.md                  # Documentación del proyecto
```

---

## ⚙️ Instrucciones de Instalación e Importación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/TU_USUARIO/rag-automation-n8n-pinecone.git
   ```
2. En tu instancia de **n8n**:
   * Hacé clic en **`Create workflow`**.
   * En el menú superior derecho, seleccioná **`Import from file`**.
   * Importá `workflow-1-ingesta.json` y `workflow-2-chatbot.json`.
3. Configurar Credenciales:
   * **Pinecone API Key**: Configurar índice y entorno.
   * **Hugging Face Access Token**: Para la generación de embeddings.
   * **Groq API Key**: Para el modelo de lenguaje del Chatbot.
4. Activar los flujos y desplegar el chat mediante la URL pública generada por n8n.

---

## 👤 Autor

Desarrollado por **Santiago Tapia Bazán**.
