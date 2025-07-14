import { Model, Sequelize } from 'sequelize';

class Curso extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        descricao: Sequelize.TEXT,
      },
      {
        sequelize,
        modelName: 'Curso', 
        tableName: 'cursos', 
      }
    );
  }
}

export default Curso;