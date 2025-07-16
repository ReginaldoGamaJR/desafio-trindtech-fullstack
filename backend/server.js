import 'dotenv/config'; 
import express from 'express';
import './src/conexao.js';
import rotas from './src/rotas.js';

const app = express();

app.use(express.json());
app.use(rotas);

const PORT = process.env.APP_PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});