const Address = (sequelize, DataTypes) => {
    return sequelize.define('Address', {
        address_id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
      }, 
      address_detail: DataTypes.STRING,
      city: DataTypes.STRING,
      postal_code: DataTypes.STRING,
      country: DataTypes.STRING  
    });
  };
  
  module.exports = Address;