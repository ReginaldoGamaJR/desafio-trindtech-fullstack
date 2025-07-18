import { Router } from 'express';

import CursoControlador from './app/controladores/CursoControlador.js';

import AlunoCursoControlador from './app/controladores/AlunoCursoControlador.js';

import AlunoControlador from './app/controladores/AlunoControlador.js';

import alunoValidador from './app/validadores/alunoValidador.js';

import cursoValidador from './app/validadores/cursoValidador.js';

import alunoCursoValidador from './app/validadores/alunoCursoValidador.js';

import UsuarioControlador from './app/controladores/UsuarioControlador.js';

import usuarioValidador from './app/validadores/usuarioValidador.js';

const rotas = new Router();
//Pelos meus estudos percebi que uma boa prática é botar uma rota para checar o status como um estilo de função enfática
//Pois muitas vezes a rota não funciona, e com essa Mensagem de API funcionando posso saber onde está o erro mais facilmente
rotas.get('/', (req, res) => {

  return res.json({ message: 'APi funcionando' });
});
/*
Abaixo agora estou criando todos os caminhos necessários para a APi funcionar
*/
rotas.post('/cursos',cursoValidador.store, CursoControlador.store);

rotas.get('/cursos', CursoControlador.index);

rotas.put('/cursos/:id',cursoValidador.update, CursoControlador.update);

rotas.delete('/cursos/:id', CursoControlador.delete);

rotas.post('/alunos',alunoValidador.store, AlunoControlador.store);

rotas.get('/alunos', AlunoControlador.index);

rotas.put('/alunos/:id', alunoValidador.update, AlunoControlador.update);

rotas.delete('/alunos/:id', AlunoControlador.delete);

rotas.post('/cursos/:cursoId/alunos', AlunoCursoControlador.store);

rotas.get('/alunos/:alunoId/cursos', AlunoCursoControlador.index);

rotas.put('/cursos/:cursoId/alunos/:alunoId', alunoCursoValidador.update, AlunoCursoControlador.update);

rotas.delete('/cursos/:cursoId/alunos/:alunoId', AlunoCursoControlador.delete);

rotas.post('/usuarios', usuarioValidador.store, UsuarioControlador.store);



export default rotas;