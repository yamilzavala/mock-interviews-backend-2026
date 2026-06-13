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

🎤 Cómo lo explicás como senior
I would send the form values as JSON to a POST endpoint. On the backend, I would use a validation middleware to validate the payload before it reaches the controller. The middleware would apply the same schema rules used by the frontend, including required fields, data types, allowed values, and conditional fields. This ensures that invalid data is rejected early and keeps the controller focused on business logic.

Once the request passes validation, the controller would delegate persistence to a service layer. Since the form is dynamic, I would persist the submission as a JSON document in the database rather than creating columns for every field. This makes the solution scalable because new fields can be added through configuration without requiring database schema changes or backend code modifications.

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