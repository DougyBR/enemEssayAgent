// controllers/authController.js

const { users } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { email, senha, nome, cpf, cep, anoEnsinoMedio, dataNascimento } = req.body;

  // Verificar se o usuário já existe
  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'Usuário já cadastrado.' });
  }

  // Criptografar a senha
  const hashedPassword = await bcrypt.hash(senha, 10);

  // Criar novo usuário
  const newUser = {
    id: users.length + 1,
    email,
    senha: hashedPassword,
    nome,
    cpf,
    cep,
    anoEnsinoMedio,
    dataNascimento,
  };

  users.push(newUser);

  res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  // Verificar se o usuário existe
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(400).json({ message: 'Email ou senha incorretos.' });
  }

  // Verificar a senha
  const validPassword = await bcrypt.compare(senha, user.senha);
  if (!validPassword) {
    return res.status(400).json({ message: 'Email ou senha incorretos.' });
  }

  // Gerar token JWT
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ message: 'Login realizado com sucesso.', token });
};

module.exports = {
  register,
  login,
};
