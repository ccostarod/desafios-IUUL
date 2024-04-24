'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('pacientes', {
       id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
       },
       name: {
        type: Sequelize.STRING,
        allowNull: false,
       },
       cpf: {
        type: Sequelize.INTEGER,
        allowNull: false,
       },
       data_nascimento: {
        type: Sequelize.DATE,
        allowNull: false,
       },
       created_at: {
        type: Sequelize.DATE,
        allowNull: false,
       }, 
       update_at: {
        type: Sequelize.DATE,
        allowNull: false,
       }
      });
     
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('users');

  }
};
