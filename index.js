const app = require('./src/app')

const PORT = 3000;

// levantar servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});