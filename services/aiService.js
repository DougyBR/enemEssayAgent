const OpenAI = require('openai');

// Certifique-se de que a variável de ambiente OPENAI_API_KEY está definida
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const corrigirRedacao = async (texto) => {
  try {
    const prompt = `Você é um corretor especializado em redações do ENEM. Avalie a redação abaixo, atribua uma nota de 0 a 1000 e forneça feedback detalhado sobre como melhorar.\n\nRedação:\n${texto}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Você é um corretor especializado em redações do ENEM.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 1500,
      temperature: 0.7
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Erro ao corrigir a redação:', error.response ? error.response.data : error.message);
    throw new Error('Erro ao processar a redação.');
  }
};

module.exports = {
  corrigirRedacao,
};