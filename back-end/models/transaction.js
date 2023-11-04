const Transaction = (sequelize, DataTypes) => {
    return sequelize.define('Transaction', {
        transaction_id:{
        type:DataTypes.STRING,
        primaryKey: true
      }, 
      transaction_date: DataTypes.DATE,
      description: DataTypes.STRING,
      transaction_type: DataTypes.STRING,
      posting_date: DataTypes.DATE,
      supplier_id: DataTypes.STRING,      
    });
  };
  
  module.exports = Transaction;