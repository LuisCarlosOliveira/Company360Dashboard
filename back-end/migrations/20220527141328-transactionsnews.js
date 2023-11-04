
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Transactions', { 
      transaction_id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      transaction_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      posting_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      transaction_type: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      transaction_type: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      supplier_id: {
        type: Sequelize.STRING(255),
        allowNull: false,
        references:{
          model: "Suppliers",
          key:"supplier_id"
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
    return queryInterface.dropTable('Transactions');
  },
};