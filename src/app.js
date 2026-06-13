const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/search/user.routes')
const postRoutes = require('./routes/infiniteScroll/post.routes')
const usersTableRoute = require('./routes/full-interview/users-table/users.route')
const dataTableRoute = require('./routes/full-interview/dataTable/dataTable.route')
const searchUsersRoute = require('./routes/full-interview/searchUsers/searchUsers.route')
const likesRoutes = require('./routes/full-interview/likes/likes.route')
const autocompleteRoute = require('./routes/full-interview/autocomplete/autocomplete.route')
const formBuilderRoute = require('./routes/full-interview/formBuilder/formBuilder.route')

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

// full interviews - data-table
app.use('/api/table', dataTableRoute)

// users-search
app.use('/api/search-users', searchUsersRoute)

// likes
app.use('/api/likes', likesRoutes)

// autocomplete
app.use('/api/autocomplete', autocompleteRoute)

// form builder
app.use('/api/forms', formBuilderRoute)

module.exports = app;