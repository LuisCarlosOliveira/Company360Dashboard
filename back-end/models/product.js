const Product = (sequelize, DataTypes) => {
  return sequelize.define('Product', {
    product_code: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    product_description: DataTypes.STRING,
    product_group: DataTypes.STRING,
    product_number_code: DataTypes.STRING,
    product_type: DataTypes.STRING
  });
};

module.exports = Product;