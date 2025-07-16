import { Model, Sequelize  } from "sequelize";
//Agora, da mesma forma que fiz com curso, vou traduzir a table do SGBD para o Node.js
class Aluno extends Model {

    static init(sequelize){
        super.init(
            {
            //Inicializando todas as colunas para cá, com cada tipo do Sequelize
            //Menos o ID, e os TimeStamps, pois o Sequelize já cuida deles automaticamente
            nome: Sequelize.STRING,
            email: Sequelize.STRING,
            cpf: Sequelize.STRING,
            dataNascimento: Sequelize.DATEONLY,
            celular: Sequelize.STRING,
            cep: Sequelize.STRING, 
            logradouro: Sequelize.STRING,
            numero: Sequelize.STRING,
            complemento: Sequelize.STRING,
            bairro: Sequelize.STRING,
            cidade:  Sequelize.STRING,
            uf:  Sequelize.STRING,
            genero:  Sequelize.STRING,
            pais:  Sequelize.STRING
            },
            {
            //Relacionando o Model com a table referente
            sequelize,
            modelName: 'Aluno',
            tableName: 'alunos',
            }
        );
    }
}
//Exportando Aluno para que seja usado em outras partes do código

export default Aluno;