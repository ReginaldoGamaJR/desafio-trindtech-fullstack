import Sequelize from 'sequelize';
import databaseConfig from './config/bancoDeDados.js';
import Curso from './app/modelos/Curso.js';

const models = [Curso]; 

class Connection {
  constructor() {
    this.init();
  }
  init() {
    this.database = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.database));
  }
}
export default new Connection();