/*
Os modelos são uma forma de mapear a tabela criada no PostgreSQL, essa no caso é o modelo que se refere a Cursos
todo curso na tabela tem 5 atributos, 
os dois atributos aqui são o nome, e a descrição
*/
import { Model, Sequelize } from 'sequelize';
//Ao criar o curso extends model, significa que a class Curso herdou todos os métodos que a class Model do sequelize tem
//E um desses poderes é o Create que utilizei no CursoControlador

class Curso extends Model {
  /*
    O método init é chamado pela conexão do Sequelize para registrar este modelo
    As colunas id, created_at e updated_at são gerenciadas
    automaticamente pelo Sequelize e pelo banco de dados, por isso não são
    definidas aqui.
   */
  static init(sequelize) {
    super.init(
      {
        //Agora vou definir as colunas da tabela
        nome: Sequelize.STRING,
        descricao: Sequelize.TEXT,
        // Aqui eu só simplesmente traduzi os tipos abstratos do sequelize para os primitivos do SGBD
      },
      {
        sequelize,
        modelName: 'Curso', 
        tableName: 'cursos', 
        //Aqui eu interligo o nome do modelo que é Curso com a sua devida tabela que é cursos, criada no PostgreSQL
      }
    );
  }
}
//Eu agora exporto essa classe para que ela possa ser usada em outras partes do meu código 
export default Curso;