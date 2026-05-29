🧪 PARTE 1 — React (CORE)
🧩 Enunciado
👉 Autocomplete (Async Search) (de tu lista)

Escenario
Tenés que construir:

input de búsqueda
fetch API /users?search=query
mostrar resultados
seleccionar un resultado
cerrar dropdown

Requisitos
1️⃣ Input controlado
2️⃣ Mostrar lista de resultados
3️⃣ Selección → setea valor
4️⃣ Cerrar dropdown al seleccionar
5️⃣ Cerrar dropdown al click afuera

⚠️ Presión real
👉 El interviewer te dice:
“When users type fast, we see too many requests and inconsistent results.”

🎤 Pregunta 1
👉 Explicame:
cómo evitás demasiadas requests
cómo manejás race conditions
cómo estructurás el componente
qué estados necesitás

⚙️ PARTE 2 — Backend
🎤 Pregunta 2
👉 “How would you design the /users?search= endpoint?”

🔥 FOLLOW-UP (te interrumpo)
👉 “What if the API is slow and takes 2–3 seconds?”

🏗️ PARTE 3 — System Design
🎤 Pregunta 3
👉“What breaks first if this autocomplete is used by 100k users?”

---------------------------------

🧠 Respuesta FINAL

Part 1 — React

To avoid too many requests, I would use a debounce of around 500ms so the API is not called on every keystroke. To handle race conditions, I would use an AbortController and cancel any previous request before sending a new one. I would also add a client-side cache to avoid repeated requests for the same search term. The component would be split into Autocomplete, useAutocomplete, useDebounce, DropdownList, and OptionItem to keep responsibilities separated. The main states would be inputValue, results, loading, error, isOpen, and highlightedIndex. When a user is selected, I update the input value and close the dropdown. I also close it when the user clicks outside the component.

---------------------------------

Part 2 — Backend

I would design the endpoint as:

GET /users?search=john&limit=10&cursor=100

The API should validate and normalize inputs, support cursor-based pagination, and return metadata such as total results, hasMore, and nextCursor. For search relevance, I would rank results using a simple scoring strategy: exact match, startsWith, and contains. I would also cache frequent searches using Redis. If the API becomes slow, I would use caching, database indexes, query optimization, and potentially move the search to a dedicated search engine.

---------------------------------

Part 3 — System Design

With 100k users, the first bottleneck would usually be the search layer or the database due to the large number of autocomplete requests. To scale, I would use debounce and caching on the frontend, Redis caching and optimized queries on the backend, load balancers for horizontal scaling, and eventually move search operations to Elasticsearch or OpenSearch. The database would remain the source of truth while the search engine handles autocomplete queries efficiently.