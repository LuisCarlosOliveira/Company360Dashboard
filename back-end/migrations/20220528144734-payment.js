
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Payments', {
      payment_id: {
        type: Sequelize.STRING(255),
        primaryKey: true,
        allowNull: false
      },
      payment_type: {
        type: Sequelize.STRING,
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
      customer_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references:{
          model: "Customers",
          key:"customer_id"
        }      
      },
      month: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      invoice_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references:{
          model: "Invoices",
          key:"invoice_id"
        }
      },
      payment_date: {
        type: Sequelize.DATE,
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
    return queryInterface.dropTable('Payments');
  },
};