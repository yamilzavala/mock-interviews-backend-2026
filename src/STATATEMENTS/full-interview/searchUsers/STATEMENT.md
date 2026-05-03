🔥 ROUND FINAL — FULL INTERVIEW
🧩 Problema
👉 “Build a user dashboard”
search
filter
pagination
fetch API

🎤 Parte 1 — React

🎤 Parte 2 — Backend
👉 How would you design /users API?

🎤 Parte 3 — System Design
👉 How would it scale?

------------------------------------------

🧠 RESPUESTA FINAL (modo entrevista)

Si te lo preguntan todo junto:

"I would design the frontend using a custom hook that handles debouncing, caching, and request cancellation using AbortController to avoid race conditions. The UI would remain responsive by using local cache and proper loading states.

On the backend, I would design a /users endpoint that follows a pipeline: validation, scoring, filtering, sorting, and cursor-based pagination. I would also introduce Redis caching for repeated queries.

To scale the system, I would use a multi-layer caching strategy (frontend cache, CDN, Redis), database indexing, and potentially integrate a search engine like Elasticsearch for advanced querying and better performance."


----------------------------------------

🧠 RESPUESTA FINAL (Version corta)

I implemented a full-stack solution with debounced search, client-side caching, and request cancellation to optimize UX.
On the backend, I used a scoring system with cursor-based pagination and Redis caching to ensure scalability.
This design can scale horizontally with caching layers, database indexing, and eventually integrating a search engine like Elasticsearch.