import { Model, Sequelize } from 'sequelize';
//Seguindo exatamente a mesma ideia de Cursos
class Aluno extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        email: Sequelize.STRING,
        cpf: Sequelize.STRING,
        dataNascimento: Sequelize.DATEONLY,
        celular: Sequelize.STRING,
        genero: Sequelize.STRING,
        pais: Sequelize.STRING,
        cep: Sequelize.STRING,
        logradouro: Sequelize.STRING,
        numero: Sequelize.STRING,
        complemento: Sequelize.STRING,
        bairro: Sequelize.STRING,
        cidade: Sequelize.STRING,
        uf: Sequelize.STRING,
      },
      { 
        sequelize,
        tableName: 'alunos',
        modelName: 'Aluno',
        } 
    );
    return this;
  }

  //Associete só mudou a foreignKey e o as, a tabela de relação obviamente é a mesma
  static associate(models) {
    this.belongsToMany(models.Curso, {
      foreignKey: 'aluno_id',
      through: 'aluno_curso',
      as: 'cursos',
    });
  }
}

export default Aluno;