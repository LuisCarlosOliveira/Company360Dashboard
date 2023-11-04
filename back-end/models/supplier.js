
const Supplier = (sequelize, DataTypes) => {
    return sequelize.define('Supplier', {
      supplier_id:{
        type: DataTypes.STRING,
        primaryKey: true
      }, 
      supplier_tax_id: DataTypes.STRING,
      company_name: DataTypes.STRING,
      self_billing_indicator: DataTypes.STRING,
      email: DataTypes.STRING,      
      contact: DataTypes.STRING,   
      address_id: DataTypes.INTEGER
    });
  };
  
  
  module.exports = Supplier;