
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('InvoiceLines', {
      line_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      line_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
        invoice_id: {
          type: Sequelize.STRING(300),
          allowNull: false,
          references:{
            model: "Invoices",
            key:"invoice_id"
          }
        },
      invoice_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      unit_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      credit_amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      unit_of_measure: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      tax_type: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      tax_percentage: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      product_code: {
        type: Sequelize.STRING(300),
        allowNull: false,
        references:{
          model: "Products",
          key:"product_code"
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
    return queryInterface.dropTable('InvoiceLines');
  },
};