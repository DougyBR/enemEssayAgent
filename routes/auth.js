// routes/auth.js

const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Rota de cadastro
router.post('/register', register);

// Rota de login
router.post('/login', login);

module.exports = router;
