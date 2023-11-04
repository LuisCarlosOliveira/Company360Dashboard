const Invoice = (sequelize, DataTypes) => {
    return sequelize.define('Invoice', {
        invoice_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        invoice_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        address_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tax_payable: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        net_total: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        gross_total: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        fiscal_year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        customer_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

    });
};



module.exports = Invoice;