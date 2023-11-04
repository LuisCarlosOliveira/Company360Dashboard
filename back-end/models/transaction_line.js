const TransactionLine = (sequelize, DataTypes) => {
    return sequelize.define('TransactionLine', {
        transaction_line_id:{
        type:DataTypes.INTEGER,
        primaryKey: true
      }, 
      transaction_id: DataTypes.STRING,
      debit_amount: DataTypes.FLOAT,
      credit_amount: DataTypes.FLOAT
    });
  };
  
  module.exports = TransactionLine;