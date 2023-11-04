'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Invoices', {
      invoice_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      invoice_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      tax_payable: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      net_total: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      gross_total: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      fiscal_year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      customer_id: {
        type: Sequelize.STRING(255),
        allowNull: false,
        references:{
          model: "Customers",
          key:"customer_id"
        }
      },
      address_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: "Addresses",
          key:"address_id"
        }
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
    return queryInterface.dropTable('Invoices');
  },
};