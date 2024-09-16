// controllers/essayController.js

const { corrigirRedacao } = require('../services/aiService');

const enviarRedacao = async (req, res) => {
  const { texto } = req.body;

  if (!texto) {
    return res.status(400).json({ message: 'Texto da redação é obrigatório.' });
  }

  try {
    // Chama a função para corrigir a redação
    const resultado = await corrigirRedacao(texto);

    res.json({
      message: 'Redação corrigida com sucesso.',
      resultado,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  enviarRedacao,
};
