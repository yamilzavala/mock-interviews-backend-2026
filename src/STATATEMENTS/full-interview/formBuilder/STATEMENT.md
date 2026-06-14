🧪 PARTE 1 — React
🧩 Enunciado
👉 Form Builder (Dynamic Form Rendering)
Escenario

Recibís una configuración:

const schema = [
  { id: "name", type: "text", label: "Name" },
  { id: "age", type: "number", label: "Age" },
  { id: "role", type: "select", label: "Role", options: ["Admin", "User"] },
];


⚠️ Escenario real (te presiono)
“We want this to scale to many forms and avoid duplicating logic across the app.”

🎤 Pregunta
👉 explicame:
cómo estructurarías el estado
cómo harías el render dinámico
cómo manejarías validación
cómo harías esto reusable / escalable
cómo evitarías re-renders innecesarios

⚠️ FOLLOW-UP
“What if some fields depend on others (conditional rendering)?”

-------------------------------------------------

🎤 Cómo lo explicás como senior (versión simple)

Decí esto y listo:

"I would store the form state as an object keyed by field id.
Then I’d dynamically render inputs by looping through the schema.
Each input would update the state through a generic handler.
Validation would run on submit based on the field type.
This approach is scalable because the form is driven entirely by configuration."

-------------------------------------------------


🚀 Seguimos (subimos presión)
🎤 BACKEND FOLLOW-UP
👉 “How would you persist and validate these dynamic forms on the backend?”

🧠 Versión ideal (cómo sonarías top)
“I would send the form data as JSON to a POST endpoint and validate it using a middleware on the backend, reapplying schema rules to ensure consistency and security.

I would persist the data as a JSON document, for example using JSONB in Postgres or a document database like MongoDB, which allows flexibility without schema changes.

I would also consider schema versioning and indexing key fields if querying is required.”


Client
  |
  v
POST /forms
  |
  v
Validation Middleware
  |
  |-- Invalid -> 400 Bad Request
  |
  v
Controller
  |
  v
Service
  |
  v
Database (JSONB)

-------------------------------------------------

🎤 SYSTEM DESIGN FOLLOW-UP
👉 “What if we need to query submissions by specific fields, like role = 'Admin'?”

If querying by specific fields becomes a common requirement, I would use PostgreSQL JSONB and create indexes on frequently queried fields such as role. This allows me to keep the flexibility of dynamic forms while still supporting efficient searches.