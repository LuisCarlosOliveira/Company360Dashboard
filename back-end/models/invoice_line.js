const InvoiceLine = (sequelize, DataTypes) => {
    return sequelize.define('InvoiceLines', {
        line_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        line_number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        invoice_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        invoice_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        unit_price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        credit_amount: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        unit_of_measure: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tax_type: { 
            type: DataTypes.STRING,
            allowNull: true
        },
      
        tax_percentage: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        product_code: {
            type: DataTypes.STRING,
            allowNull: true,
            key: "product_code",
            model: "Product",
        }
    });
};


module.exports = InvoiceLine;