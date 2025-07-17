import Sequelize from 'sequelize';
import databaseConfig from './config/bancoDeDados.js';

import Aluno from './app/modelos/Aluno.js';
import Curso from './app/modelos/Curso.js';
import AlunoCurso from './app/modelos/AlunoCurso.js';
//Criando um array para guardar todos os meus modelos
const models = [Aluno, Curso, AlunoCurso];
//Vou iniciar a classe connection, será ela quem vai conectar ao SGBD PostgreSQL
class Connection {
  constructor() {
    this.connection = new Sequelize(databaseConfig);
    this.init();
    this.associate();
  }
  //Aqui está usando o forEach, para iniciar cada um dos modelos no array Models
  init() {
    models.forEach((model) => model.init(this.connection));
  }
  //Aqui está apenas iciando a associação entre eles
  associate() {
    models.forEach((model) => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
}

export default new Connection();