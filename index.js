require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Importar rotas
const authRoutes = require('./routes/auth');
const essayRoutes = require('./routes/essay');

// Usar rotas
app.use('/auth', authRoutes);
app.use('/essay', essayRoutes);

// Rota principal
app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
