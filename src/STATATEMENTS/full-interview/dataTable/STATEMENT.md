🎤 MOCK INTERVIEW — ROUND 7 (ajustado)
🧩 PARTE 1 — React (core)
👉 De TU lista:
🔥 DataTable (sorting + filtering + pagination)

Escenario
Tenés que construir una tabla que:
recibe datos
permite:
search (por name)
sorting (por columnas)
pagination (5 items por página)

🎤 Pregunta 1
👉 How would you design this component?


⚙️ PARTE 2 — Backend
🎤 Pregunta 2
👉 Would you handle filtering and sorting on the client or server? Why?

🏗️ PARTE 3 — System Design
🎤 Pregunta 3
👉 What happens if this table needs to handle 1 million rows?

---------------------------------

🧠 Respuesta FINAL (parte 1)

For small datasets, I would handle filtering and sorting on the client side.
“I would keep minimal state: search, page, sortKey, and sortDirection.

I would derive the displayed data using useMemo to avoid unnecessary recalculations.

The pipeline would be: first filter by search, then sort based on the selected column and direction, and finally paginate using slice.

For sorting, I would toggle between ascending and descending when clicking the same column.

To avoid mutations, I would always work on a copied array.

For performance, I would memoize row components using React.memo and use useCallback for handlers.

I would also extract the data transformation logic into a custom hook to keep the component clean and reusable.”

---------------------------------

🧠 Respuesta FINAL (parte 2)

"It depends on the dataset size and system constraints.

For small datasets, I would handle filtering and sorting on the client side because it avoids unnecessary network requests and provides instant feedback, improving the user experience.

However, for large datasets, I would move filtering, sorting, and pagination to the backend. Loading millions of records into the client is not feasible due to memory constraints and performance issues.

In that case, I would request already filtered and sorted data from the server and implement server-side pagination, preferably using cursor-based pagination, as it scales better than offset pagination.

Additionally, handling it on the backend ensures data consistency and allows leveraging database optimizations like indexing."

"In a real system, filtering and sorting would be delegated to the database using indexed queries, rather than processing in memory."

----------------------------------

🧠 Respuesta FINAL (Parte 3)

"At global scale with millions of rows, the main challenges are database load, latency, and concurrency.

I would design the system as a layered architecture: client → CDN → API → Redis cache → database or search engine.

I would introduce a multi-layer caching strategy, using CDN for frequently requested data and Redis to cache query results based on search, sort, and cursor parameters. This reduces repeated computation and database load.

On the database side, I would ensure proper indexing on searchable and sortable fields to avoid full table scans. For more advanced search requirements, I would integrate a search engine like Elasticsearch to handle full-text queries efficiently.

The API layer would be stateless and horizontally scalable behind a load balancer to handle high concurrency.

Finally, to reduce latency for global users, I would use CDN and potentially edge deployments.

The main bottlenecks would be database load, cache misses, and network latency, so the system should be designed to minimize direct database access as much as possible."