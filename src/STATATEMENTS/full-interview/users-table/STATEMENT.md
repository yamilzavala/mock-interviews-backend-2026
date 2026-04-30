🎤 ROUND 6 — FULL INTERVIEW
👉 Dashboard de usuarios

Tenés que construir:
tabla de usuarios
búsqueda por nombre
filtro por rol
paginación
refresh de datos

🎯 Requerimientos
fetch API /users
query params: search, role, page
loading / error
mantener UI consistente

🎤 Parte 1 — React (principal)

🎤 Parte 2 — Backend
Pregunta 2
👉 How would you design the /users API?

🎤 Parte 3 — System Design
Pregunta 3
👉 What happens if this dashboard is used by thousands of users?

🎤 Parte 4 — Algoritmo (aplicado)
👉 Tenés una lista de usuarios que puede venir duplicada
¿Cómo la deduplicás eficientemente?

---------------------------------------

🎤 BACKEND (Justification)

On the backend, I would design a flexible and scalable /users endpoint that handles filtering, pagination, and data retrieval efficiently.

The API would accept query parameters such as search, role, and page, which are ideal for optional filtering and pagination. This allows the frontend to request only the necessary subset of data instead of loading everything at once.

The backend would be responsible for filtering the dataset based on the search term and role, and then applying pagination using limit and offset or page-based logic. It would also return metadata such as total results and total pages to support proper pagination in the UI.

To ensure performance at scale, I would rely on database-level optimizations instead of in-memory filtering. This includes adding indexes on frequently queried fields such as name and role, which significantly improves query performance.

For more advanced search capabilities or very large datasets, I would consider integrating a dedicated search engine like Elasticsearch, which provides efficient full-text search and relevance scoring.

I would also introduce caching at the backend level, for example using Redis, to store responses for frequently accessed queries. This reduces database load and improves response times.

Additionally, I would enforce limits on pagination parameters to prevent abuse and ensure consistent performance across requests.

From a scalability perspective, the backend can be horizontally scaled using multiple instances behind a load balancer, and database reads can be distributed using read replicas.

Overall, the backend is responsible for the heavy lifting, ensuring that the system remains efficient, scalable, and reliable as the number of users grows.

---------------------

🎯 CIERRE (opcional en entrevista)

If I had to summarize, I would say that the frontend focuses on user experience and state management, while the backend handles data processing and scalability, ensuring the system performs well under high load.

------------------------- version corta ----------------------------

🎤 🎯 1-MINUTE ANSWER

Backend:

On the backend, I would design a /users endpoint that supports query parameters like search, role, and page. The backend would handle filtering, pagination, and return metadata like total results and total pages.

To scale, I would rely on database indexing for fast queries, introduce caching for frequent requests, and potentially use a search engine like Elasticsearch for more advanced search capabilities.

Closing:

Overall, the frontend stays simple and focused on UX, while the backend handles data processing and scalability.