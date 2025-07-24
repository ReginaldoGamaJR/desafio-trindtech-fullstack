import { Model, Sequelize } from 'sequelize';

class AlunoCurso extends Model {
  static init(sequelize) {
    super.init(
      {
        //Agora, já que no aluno_curso temos "Duas chaves primárias" , ou seja uma chave primária composta
        //Eu basicamente pego os dois Ids que são as chaves e boto elas como primárias junto com os seus tipos
        aluno_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        curso_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        //Precisei adicionar um novo atributo, dataConclusão, para guardar a data de conclusão do curso
        data_conclusao: {
          type: Sequelize.DATEONLY, 
          allowNull: true,
        },
        //Também criei o atributo status, ele é do tipo enumeração e só tem 4 estados possívels
        //Por default, sempre que criado uma matrícula com um aluno, ele ficará em andamento
        status: Sequelize.ENUM('em_andamento', 'concluido', 'trancado', 'encerrado'),
      },
      {
        sequelize,
        tableName: 'aluno_curso',
        modelName: 'aluno_curso',
      }
    );
    return this;
  }
}

export default AlunoCurso;