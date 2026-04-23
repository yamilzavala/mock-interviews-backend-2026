const express = require('express');
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/infiniteScroll/post.routes')

const app = express();

// middleware para parsear JSON
app.use(express.json());

// rutas
app.use('/api/users', userRoutes)

// endpoint básico
app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

//infine scroll
app.use('/api/posts', postRoutes)


module.exports = app;