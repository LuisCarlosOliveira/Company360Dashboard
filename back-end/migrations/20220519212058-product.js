
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      product_code: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
      },
      product_description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      product_number_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      product_group: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      product_type: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('Products');
  },
};