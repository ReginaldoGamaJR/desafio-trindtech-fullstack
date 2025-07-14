import { Router } from 'express';

import CursoControlador from '.src/app/controladores/CursoControlador.js';

const rotas = new Router();

rotas.get('/', (req, res) => {

  return res.json({ message: 'APi funcionando' });
});

rotas.post('/cursos', CursoControlador.store);

export default rotas;