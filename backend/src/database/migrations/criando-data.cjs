'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('aluno_curso', 'dataConclusao', {
      type: Sequelize.DATEONLY, // ou Sequelize.DATE se quiser data e hora
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('aluno_curso', 'dataConclusao');
  }
};

//Nesse migration. eu criei a coluna dataConclusao, para guardar a data de conclusão do curso
//Essa coluna é do tipo DATEONLY, ou seja, só guarda a data, sem a hora
//No postgreSQL mudei o nome da coluna para data_conclusao