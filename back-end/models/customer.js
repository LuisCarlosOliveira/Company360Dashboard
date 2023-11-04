const Customer = (sequelize, DataTypes) => {
  return sequelize.define('Customer', {
    customer_id: {
      type: DataTypes.STRING(255),
      primaryKey: true
    },
    customer_tax_id: DataTypes.STRING,
    company_name: DataTypes.STRING,
    self_billing_indicator: DataTypes.STRING
  });
};

module.exports = Customer;