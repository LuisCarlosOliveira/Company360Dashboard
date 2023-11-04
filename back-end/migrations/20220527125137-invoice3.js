
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Customers', {
      customer_id: {
        type: Sequelize.STRING(255),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      customer_tax_id: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      self_billing_indicator: {
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
    return queryInterface.dropTable('Customers');
  },
};