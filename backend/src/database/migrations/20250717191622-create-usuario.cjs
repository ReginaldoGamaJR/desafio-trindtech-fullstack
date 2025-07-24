'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('aluno_curso', 'dataConclusao', 'data_conclusao');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('aluno_curso', 'data_conclusao', 'dataConclusao');
  }
};
