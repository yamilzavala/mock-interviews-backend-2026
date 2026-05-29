“For the backend design, I chose to use PUT and DELETE endpoints because they are naturally idempotent operations. 

In a like system, the same request can be sent multiple times due to retries, network issues, spam clicks, or duplicated requests, so the backend must guarantee consistency. 

For the in-memory data structure, I used a Map where the key is the postId and the value is a Set of userIds. The Set is important because it guarantees uniqueness automatically, which prevents duplicated likes and gives constant-time add and delete operations. 

I also separated the architecture into routes, controllers, and services to keep responsibilities isolated. Routes only define endpoints, controllers handle HTTP concerns, and services contain the business logic. This makes the application easier to maintain, scale, and test. 

From the frontend perspective, I implemented optimistic UI updates to provide immediate feedback to the user without waiting for the server response, improving the user experience. 

To keep consistency, I added rollback logic in case the request fails and request versioning with requestId to avoid race conditions and stale responses arriving out of order. 

I also block interactions while a request is pending to reduce inconsistencies caused by spam clicking. 

Overall, the goal of the design is to prioritize responsiveness on the client side while still guaranteeing consistency and idempotency on the backend.”