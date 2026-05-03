const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/search/user.routes')
const postRoutes = require('./routes/infiniteScroll/post.routes')
const usersTableRoute = require('./routes/full-interview/users-table/users.route')
const searchUsersRoute = require('./routes/full-interview/searchUsers/searchUsers.route')

const app = express();
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

// middleware para parsear JSON
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// rutas
app.use('/api/users', userRoutes)

// endpoint básico
app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

//infine scroll
app.use('/api/posts', postRoutes)

// full interviews - users-table
app.use('/api/users-table', usersTableRoute)

// users-search
app.use('/api/search-users', searchUsersRoute)

module.exports = app;