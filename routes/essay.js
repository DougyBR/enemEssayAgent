// routes/essay.js

const express = require('express');
const router = express.Router();
const { enviarRedacao } = require('../controllers/essayController');
const authenticateToken = require('../middleware/authMiddleware');

// Rota para enviar a redação (protegida)
router.post('/submit', authenticateToken, enviarRedacao);

module.exports = router;
