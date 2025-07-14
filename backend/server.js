import 'dotenv/config'; 
import express from 'express';
import './src/conexao.js';

const app = express();

app.use(express.json());

const PORT = process.env.APP_PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});