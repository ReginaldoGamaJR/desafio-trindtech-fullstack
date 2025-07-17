import { Model, Sequelize } from 'sequelize';
//Criação do modelo Curso
/*
A criação do Curso, utilizando o extends Model, significa que a nova classe Curso vai herdar
todos os métodos de Model, ou seja, o Create, o FindByPK, o Destroy() e muitos outros
*/
class Curso extends Model {
  static init(sequelize) {
    super.init(
      {
        //Aqui eu traduzo os atributos da table do SGBD PostgreSQL para sequelize
        nome: Sequelize.STRING,
        descricao: Sequelize.TEXT,
        
      },
      { 
        sequelize, 
        tableName: 'cursos',
        modelName: 'Curso',
       } 
    );
    return this;
  }

  //Agora eu só vou realmente criar o associate, para fazer a relação entre as duas tabelas
  static associate(models) {
    //É uma relação de N para N, ou seja muitos para muitos, 1 aluno pode ter N cursos e um curso pode ter N alunos
    this.belongsToMany(models.Aluno, {
      //E a foreignKey será o curso_id
      foreignKey: 'curso_id',
      //Essa relação vai se dar por meio da tabela aluno_curso
      through: 'aluno_curso',
      //Apelidada de alunos
      as: 'alunos',
    });
  }
}
//Exportando as duas
export default Curso;