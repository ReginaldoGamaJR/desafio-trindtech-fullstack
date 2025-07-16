import { Router } from 'express';

import CursoControlador from './app/controladores/CursoControlador.js';

import AlunoControlador from './app/controladores/AlunoControlador.js';

const rotas = new Router();
//Pelos meus estudos percebi que uma boa prática é botar uma rota para checar o status como um estilo de função enfática
//Pois muitas vezes a rota não funciona, e com essa Mensagem de API funcionando posso saber onde está o erro mais facilmente
rotas.get('/', (req, res) => {

  return res.json({ message: 'APi funcionando' });
});
/*
Abaixo agora estou criando todos os caminhos necessários para a APi funcionar
*/
rotas.post('/cursos', CursoControlador.store);

rotas.get('/cursos', CursoControlador.index);

rotas.put('/cursos/:id', CursoControlador.update);

rotas.put('/cursos/:id', CursoControlador.delete);

rotas.post('/alunos', AlunoControlador.store);


export default rotas;