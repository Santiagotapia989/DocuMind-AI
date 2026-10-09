// Base de conocimiento de DocuMind AI.
// Cada chunk es una unidad recuperable por el buscador de relevancia.
// `tags` suma sinónimos/keywords (ES + EN) para mejorar el match.

export const CHUNKS = [
  {
    id: "bio",
    title: "Perfil de Santiago Tapia Bazán",
    tags: ["quien es", "who is", "sobre mi", "about", "perfil", "bio", "santiago", "tapia", "bazan", "presentacion"],
    text: `Santiago Tapia Bazán es estudiante de 3.º año de Ingeniería Informática en la Facultad de Ingeniería del Ejército (FIE), en Buenos Aires, Argentina. Se enfoca en desarrollo backend y full-stack, con especialización creciente en DevOps, CI/CD, automatización y seguridad de aplicaciones. Se describe como responsable, proactivo y orientado al trabajo en equipo. Busca construir software que resuelva problemas reales: backends robustos, automatizaciones y productos web de punta a punta.`,
  },
  {
    id: "educacion",
    title: "Educación y formación académica",
    tags: ["educacion", "education", "estudios", "estudia", "study", "universidad", "facultad", "carrera", "degree", "fie", "ejercito", "secundario", "colegio"],
    text: `Educación de Santiago: (1) Ingeniería Informática, Facultad de Ingeniería del Ejército (FIE), cursando 3.º año, 2023/2024 – actualidad. (2) Bachillerato en Ciencias Sociales, Escuela Secundaria Hans Christian Andersen, 2019 – 2023.`,
  },
  {
    id: "idiomas",
    title: "Idiomas",
    tags: ["idiomas", "languages", "ingles", "english", "español", "spanish", "cambridge", "fce", "b2"],
    text: `Idiomas de Santiago: Español nativo. Inglés nivel avanzado (B2, First Certificate de Cambridge / FCE).`,
  },
  {
    id: "lenguajes",
    title: "Lenguajes de programación",
    tags: ["lenguajes", "programming", "languages", "codigo", "programa", "csharp", "javascript", "cpp", "java", "stack"],
    text: `Lenguajes que maneja Santiago: C, C++, Java (básico), C# (.NET Framework) y JavaScript. Tiene base sólida en programación orientada a objetos.`,
  },
  {
    id: "herramientas",
    title: "Herramientas y tecnologías",
    tags: ["herramientas", "tools", "tecnologias", "technologies", "git", "github", "n8n", "render", "swagger", "api", "rest", "devops", "ide", "net"],
    text: `Herramientas y tecnologías de Santiago: Git y GitHub (branching, PR, code review), Render (deploy/hosting), n8n (automatización de flujos), Swagger/OpenAPI (documentación de APIs), .NET Framework, diseño y consumo de APIs REST, y los IDEs CLion, IntelliJ y Eclipse.`,
  },
  {
    id: "balance-group",
    title: "Capacitación en Balance Group",
    tags: ["capacitacion", "experiencia", "experience", "training", "balance", "group", "formacion", "trabajo", "pasantia", "curso"],
    text: `Capacitación profesional de Santiago: programa de formación intensivo en Desarrollo de Software en Balance Group (2024–2026), orientado a perfil junior. Contenido: frontend con HTML, CSS y JavaScript; backend con C# y .NET Framework; diseño, documentación y consumo de APIs REST con Swagger/OpenAPI; automatización de flujos con n8n; gestión y diseño de aplicaciones y bases de datos.`,
  },
  {
    id: "siar",
    title: "SIAR — 1.er puesto Hackathon CYBER.AR 2026",
    tags: ["proyecto", "destacado", "siar", "hackathon", "cyberar", "premio", "primer puesto", "seguridad", "security", "agentes", "ganador", "award"],
    text: `SIAR (Sistema de Inspección de Archivos y Repositorios): proyecto ganador del 1.er puesto en la Hackathon CYBER.AR 2026. Es una herramienta de seguridad basada en IA que actúa como "aduana" para agentes de IA que programan: analiza paquetes y repositorios en cuarentena antes de que el agente los use, detectando prompt injection, typosquatting y secretos filtrados. Emite un veredicto vinculante con aprobación humana por token e informe ejecutivo imprimible. Tech: TypeScript, Node.js, Express, React 18, Vite, Tailwind, MCP Server, SQLite y Ollama.`,
  },
  {
    id: "hackathon-uca",
    title: "Hackathon UCA 2023 — 1.er puesto",
    tags: ["proyecto", "destacado", "hackathon", "uca", "premio", "primer puesto", "sostenibilidad", "ganador", "award", "2023"],
    text: `Hackathon UCA 2023: Santiago obtuvo el 1.er puesto en la hackathon organizada por la UCA, con la ideación y diseño en equipo de una solución integral enfocada en sostenibilidad.`,
  },
  {
    id: "centro-medico",
    title: "Centro Médico Digital",
    tags: ["centro", "medico", "turnos", "salud", "appointments", "gestion", "proyecto", "next", "prisma", "postgres", "demo"],
    text: `Centro Médico Digital: plataforma integral para gestión de turnos médicos con reserva online en 4 pasos, autenticación de pacientes, cartilla médica por especialidad y sede, mails de confirmación y exportación de turnos a Excel. Tech: Next.js 14, React 18, TypeScript, Tailwind CSS, Prisma, PostgreSQL (Neon) y Resend. Demo en vivo: mi-gestor-turnos.vercel.app. Repo: github.com/Santiagotapia989/mi-gestor-turnos.`,
  },
  {
    id: "centerprints",
    title: "Center Print's — e-commerce",
    tags: ["centerprint", "center", "print", "ecommerce", "tienda", "mercado", "pago", "carrito", "proyecto", "whatsapp"],
    text: `Center Print's S.R.L.: sitio web corporativo con catálogo dinámico por categorías, carrito de compras persistente, checkout con Mercado Pago, formulario de contacto por email y botones de WhatsApp por producto. Tech: Next.js, TypeScript, Tailwind CSS, Zustand, Mercado Pago y Resend. Demo: centerprints-catalog.vercel.app.`,
  },
  {
    id: "documind",
    title: "DocuMind AI — este chatbot",
    tags: ["documind", "rag", "chatbot", "n8n", "pinecone", "groq", "embeddings", "proyecto", "vos", "sos", "quien sos", "que sos", "como funcionas"],
    text: `DocuMind AI es el chatbot de Santiago: originalmente un sistema RAG orquestado con dos flujos en n8n (ingesta de PDFs desde Google Drive, embeddings de Hugging Face indexados en Pinecone y agente conversacional con Groq). Esta versión es una reimplementación standalone desplegable en Netlify: la recuperación se hace con un buscador de relevancia propio sobre la base de conocimiento y la generación con un LLM vía API, sin depender de n8n. Repo: github.com/Santiagotapia989/DocuMind-AI.`,
  },
  {
    id: "app-servicios",
    title: "App de Servicios del Hogar — rol DevOps",
    tags: ["proyecto", "destacado", "servicios", "hogar", "devops", "render", "proyecto", "grupal", "deploy", "plomeros", "electricistas"],
    text: `App de Servicios del Hogar: proyecto grupal en curso (desde 2024) que conecta clientes con prestadores de servicios domésticos (electricistas, plomeros, etc.). Santiago se desempeña como DevOps del equipo: gestión del repositorio con GitHub (branching, pull requests, code review), deploy y hosting en Render, y colaboración en el área de seguridad del proyecto.`,
  },
  {
    id: "demos-netlify",
    title: "Demos web en Netlify",
    tags: ["proyecto", "destacado", "netlify", "demos", "sitios", "websites", "espacio", "garcia", "libreria", "garage", "casa", "planes", "preact"],
    text: `Sitios web en vivo que Santiago desplegó en Netlify: Espacio García (espacio-garcia.netlify.app), Librería El Garage (libreria-el-garage.netlify.app) y Casa Planes (casa-planes.netlify.app), construidos con Preact, React, Vite y React Router.`,
  },
  {
    id: "proyectos-varios",
    title: "Otros proyectos académicos",
    tags: ["proyectos", "academicos", "cpp", "consola", "gestion", "registros", "estructuras", "datos"],
    text: `Otros proyectos: Sistema de Gestión en C++, un programa de consola académico para administrar registros con estructuras de datos, desarrollado de forma individual.`,
  },
  {
    id: "contacto",
    title: "Contacto",
    tags: ["contacto", "contact", "email", "mail", "correo", "telefono", "whatsapp", "github", "linkedin", "instagram", "ubicacion", "donde", "buenos aires"],
    text: `Contacto de Santiago Tapia Bazán: email Bazan0897@gmail.com, teléfono/WhatsApp +54 9 11 2648-5586, GitHub github.com/Santiagotapia989. Vive en Buenos Aires, Argentina.`,
  },
];

// Tokens que unen sinónimos frecuentes ES/EN hacia el mismo concepto.
export const SYNONYMS = {
  who: "quien", what: "que", where: "donde", when: "cuando",
  education: "educacion", languages: "idiomas", skills: "herramientas",
  projects: "proyectos", experience: "experiencia", contact: "contacto",
  email: "mail", phone: "telefono", degree: "carrera", studies: "estudios",
};
