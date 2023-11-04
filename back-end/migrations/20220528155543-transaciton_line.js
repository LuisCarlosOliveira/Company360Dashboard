
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('TransactionLines', {
      transaction_line_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
      },
      transaction_id: {
        type: Sequelize.STRING,                          
        allowNull: false,
        references:{
          model: "Transactions",
          key:"transaction_id"
        }  
      },
      credit_amount: {
        type: Sequelize.FLOAT,
      },
      debit_amount: {
        type: Sequelize.FLOAT,
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
    return queryInterface.dropTable('TransactionLines');
  },
};