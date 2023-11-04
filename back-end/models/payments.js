const Payment = (sequelize, DataTypes) => {
    return sequelize.define('Payment', {
        payment_id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        payment_type: DataTypes.STRING,
        tax_payable: DataTypes.FLOAT,
        net_total: DataTypes.FLOAT,
        gross_total: DataTypes.FLOAT,
        customer_id: DataTypes.STRING,
        month: DataTypes.INTEGER,
        payment_date: DataTypes.DATE,
        invoice_id: DataTypes.STRING
    });
};

module.exports = Payment;