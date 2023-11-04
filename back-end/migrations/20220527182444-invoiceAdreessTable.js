
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Addresses', {
      address_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      postal_code: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      address_detail: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Addresses');
  },
};