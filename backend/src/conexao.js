/*
Esse arquivo, eu criei com a intenção dele conectar com o banco de dados do PostgreSQL por meio do sequelize
*/

import Sequelize from 'sequelize';
import databaseConfig from './config/bancoDeDados.js';
import Curso from './app/modelos/Curso.js';
import Aluno from './app/modelos/Aluno.js';

//Aqui vou usar um array para botar os meus modelos, no caso serão três, o Curso, os Alunos e o Aluno_Curso, mesma quantidade que as tabelas do SGBD
const models = [Curso, Aluno]; 

class Connection {
  /* Agora na classe assim que iniciarmos ela, o constructor já chama o método init que foi definido mais embaixo, que usa
  o this.database para criar um novo elemento para a class conection que é o database, e depois utilizando um map
  ele varre o array de modelos, iniciando cada um deles no banco de dados.
  */
  constructor() {
    this.init();
  }
  init() {
    this.database = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.database));
  }
}
//Depois eu só exporto ele, para ser utilizado em outras partes do projeto
export default new Connection();