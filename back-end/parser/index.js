const parser = require("fast-xml-parser");
const fs = require("fs");
const he = require("he");
const { all } = require("../controllers/parser_controller");
const { Customer } = require('../models');
const { Supplier } = require("../models");
const { Product } = require("../models");
const { Invoice } = require("../models");
const { InvoiceLines } = require("../models");
const { Transaction } = require("../models");
const { Address } = require("../models");
const { Payment } = require("../models");
const { TransactionLine } = require("../models");
const sequelize = require('../config/global_function');


var options = {
  attributeNamePrefix: "@_",
  attrNodeName: "attr",
  ignoreAttributes: true,
  ignoreNameSpace: false,
  allowBooleanAttributes: false,
  parseNodeValue: true,
  parseAttributeValue: false,
  trimValues: true,
  cdataTagName: "__cdata",
  cdataPositionChar: "\\c",
  parseTrueNumberOnly: false,
  arrayMode: false,
  attrValueProcessor: (val, attrName) =>
    he.decode(val, { isAttributeValue: true }), //default is a=>a
  tagValueProcessor: (val, tagName) => he.decode(val), //default is a=>a
};

function getSupplierId(allSuppliers, idAcoount) {
  for (let i = 0; i < allSuppliers.length; i++) {
    if (allSuppliers[i].AccountID == idAcoount) {
      return allSuppliers[i].SupplierID;
    }


  }
  return null;
}

async function parseFile() {

  const fiscalYear = 2022;

  fileSales = fs.readFileSync("./files/" + "SAFT_TP1_01-01-2022_31-12-2022.xml", "utf-8");

  try {
    tObjSales = parser.getTraversalObj(fileSales, options);
    jsonObjSales = parser.convertToJson(tObjSales, options);
  } catch (err) {
    return err.toString();
  }

  //Costumers
  const allCustomers = jsonObjSales.AuditFile.MasterFiles.Customer;


  for (let i = 0; i < allCustomers.length; i++) {

    if (allCustomers[i].CompanyName != "Consumidor final") {
      Customer.findOrCreate({
        where: {
          customer_tax_id: allCustomers[i].CustomerTaxID, company_name: allCustomers[i].CompanyName,
          self_billing_indicator: allCustomers[i].SelfBillingIndicator, customer_id: allCustomers[i].CustomerID

        }
      });
    }

  }

  //Suppliers
  const allSuppliers = jsonObjSales.AuditFile.MasterFiles.Supplier;

  if (jsonObjSales.AuditFile.MasterFiles.Supplier.length == null) {

    await sequelize.query('INSERT INTO `Addresses` (`city`,`createdAt`,`postal_code`,`address_detail`,`country`,`updatedAt`) VALUES (:city,"2022-05-28 18:59:08",:postal_code ,:address_detail,:country,"2022-05-28 18:59:08");',
      {
        replacements: {
          address_detail: allSuppliers[i].ShipFromAddress.AddressDetail,
          city: allSuppliers[i].ShipFromAddress.City,
          postal_code: allSuppliers[i].ShipFromAddress.PostalCode,
          country: allSuppliers[i].ShipFromAddress.Country
        }, type: sequelize.QueryTypes.INSERT
      });

    const idAddress = await sequelize.query('select * from addresses order by address_id DESC;');
    var exists = await sequelize.query('SELECT * FROM suppliers WHERE supplier_id = :supplier_id ',
      { replacements: { supplier_id: allSuppliers.SupplierID }, type: sequelize.QueryTypes.SELECT });
    if (exists.length == 0) {
      Supplier.findOrCreate({
        where: {
          supplier_id: allSuppliers.SupplierID,
          supplier_tax_id: allSuppliers.SupplierTaxID, company_name: allSuppliers.CompanyName,
          self_billing_indicator: allSuppliers.SelfBillingIndicator, contact: allSuppliers.Telephone,
          email: "hugsilva@gmail.com",
          address_id: idAddress[idAddress.length - 1][0].address_id
        }
      });
    }


  } else {
    for (let i = 0; i < allSuppliers.length; i++) {

      var exists = await sequelize.query('SELECT * FROM suppliers WHERE supplier_id = :supplier_id ',
        { replacements: { supplier_id: allSuppliers[i].SupplierID }, type: sequelize.QueryTypes.SELECT });
      if (exists.length == 0) {
        await sequelize.query('INSERT INTO `Addresses` (`city`,`createdAt`,`postal_code`,`address_detail`,`country`,`updatedAt`) VALUES (:city,"2022-05-28 18:59:08",:postal_code ,:address_detail,:country,"2022-05-28 18:59:08");',
          {
            replacements: {
              address_detail: allSuppliers[i].ShipFromAddress.AddressDetail,
              city: allSuppliers[i].ShipFromAddress.City,
              postal_code: allSuppliers[i].ShipFromAddress.PostalCode,
              country: allSuppliers[i].ShipFromAddress.Country
            }, type: sequelize.QueryTypes.INSERT
          });

        const idAddress = await sequelize.query('select * from addresses order by address_id DESC;');

        Supplier.findOrCreate({
          where: {
            supplier_id: allSuppliers[i].SupplierID,
            supplier_tax_id: allSuppliers[i].SupplierTaxID, company_name: allSuppliers[i].CompanyName,
            self_billing_indicator: allSuppliers[i].SelfBillingIndicator, contact: allSuppliers[i].Telephone, email: "hugsilva@gmail.com",
            address_id: idAddress[idAddress.length - 1][0].address_id
          }
        });

      }
    }
  }


  //Products
  const allProducts = jsonObjSales.AuditFile.MasterFiles.Product;
  if (jsonObjSales.AuditFile.MasterFiles.Product.length == null) {
    const exists = await sequelize.query('SELECT * FROM Products WHERE product_code = :product_code ', { replacements: { product_code: allProducts.ProductCode }, type: sequelize.QueryTypes.SELECT });
    if (exists == null) {
      Product.findOrCreate({
        where: {
          product_type: allProducts.ProductType, product_code: allProducts.ProductCode, product_number_code: allProducts.ProductCode,
          product_number_code: allProducts.ProductNumberCode, product_group: allProducts.ProductGroup
          , product_description: allProducts.ProductDescription
        }
      });
    }
  } else {

    for (let i = 0; i < allProducts.length; i++) {
      const exists = await sequelize.query('SELECT * FROM Products WHERE product_code = :product_code ', { replacements: { product_code: allProducts[i].ProductCode }, type: sequelize.QueryTypes.SELECT });
      if (exists.length == 0) {
        Product.findOrCreate({
          where: {
            product_type: allProducts[i].ProductType, product_code: allProducts[i].ProductCode,
            product_number_code: allProducts[i].ProductCode, product_number_code: allProducts[i].ProductNumberCode,
            product_group: allProducts[i].ProductGroup, product_description: allProducts[i].ProductDescription
          }

        });
      }

    }
  }

  //Invoices
  const allInvoices = jsonObjSales.AuditFile.SourceDocuments.SalesInvoices.Invoice;

  if (jsonObjSales.AuditFile.SourceDocuments.SalesInvoices.Invoice.length == null) {

    const exists = await sequelize.query('SELECT * FROM Invoices WHERE invoice_id = :invoice_id ', { replacements: { invoice_id: allInvoices.InvoiceNo }, type: sequelize.QueryTypes.SELECT });
    if (exists.length == 0) {
      Address.findOrCreate({
        where: {
          address_detail: allInvoices.ShipTo.Address.AddressDetail,
          city: allInvoices.ShipTo.Address.City,
          postal_code: allInvoices.ShipTo.Address.PostalCode,
          country: allInvoices.ShipTo.Address.Country
        }

      });

      const idAddress = await sequelize.query('select * from addresses order by address_id ASC;');
      var res =  allInvoices.InvoiceNo.replace("/", "");

      var res = resultado.replace(" ", "");
        

      Invoice.findOrCreate({
        where: {
          invoice_id: res,
          fiscal_year: fiscalYear,
          tax_payable: allInvoices.DocumentTotals.TaxPayable,
          net_total: allInvoices.DocumentTotals.NetTotal,
          gross_total: allInvoices.DocumentTotals.GrossTotal,
          customer_id: allInvoices.CustomerID,
          invoice_date: allInvoices.InvoiceDate,
          address_id: idAddress[idAddress.length - 1][0].address_id
        }
      });

      for (let i = 0; i < allInvoices.Line.length; i++) {
        var res =  allInvoices.InvoiceNo.replace("/", "");
        var res = resultado.replace(" ", "");

        const exists = await sequelize.query('SELECT * FROM Invoices WHERE invoice_id = :invoice_id ', { replacements: { invoice_id: res }, type: sequelize.QueryTypes.SELECT });
        if (exists.length == 0) {
     
          
          InvoiceLines.findOrCreate({
            where: {
              line_number: allInvoices.Line[i].LineNumber,
              invoice_id: res,
              invoice_date: allInvoices.Line[i].TaxPointDate,
              quantity: allInvoices.Line[i].Quantity,
              unit_price: allInvoices.Line[i].UnitPrice,
              credit_amount: allInvoices.Line[i].CreditAmount,
              unit_of_measure: allInvoices.Line[i].UnitOfMeasure,
              tax_type: allInvoices.Line[i].Tax.TaxType,
              tax_percentage: allInvoices.Line[i].Tax.TaxPercentage,
              product_code: allInvoices.Line[i].ProductCode,
            }
          });

        }
      }

    }
  } else {

    for (let i = 0; i < allInvoices.length; i++) {
      var resultado =  allInvoices[i].InvoiceNo.replace("/", "");
      var resultado = resultado.replace(" ", "");
      const exists = await sequelize.query('SELECT * FROM Invoices WHERE invoice_id = :invoice_id ', { replacements: { invoice_id: resultado }, type: sequelize.QueryTypes.SELECT });

      if (exists.length == 0) {

        await sequelize.query('INSERT INTO `Addresses` (`city`,`createdAt`,`postal_code`,`address_detail`,`country`,`updatedAt`) VALUES (:city,"2022-05-28 18:59:08",:postal_code ,:address_detail,:country,"2022-05-28 18:59:08");',
          {
            replacements: {
              address_detail: allInvoices[i].ShipTo.Address.AddressDetail,
              city: allInvoices[i].ShipTo.Address.City,
              postal_code: allInvoices[i].ShipTo.Address.PostalCode,
              country: allInvoices[i].ShipTo.Address.Country
            }, type: sequelize.QueryTypes.INSERT
          });  

        const idAddress = await sequelize.query('select * from addresses order by address_id DESC;');

     
        var wer = await Invoice.findOrCreate({
          where: {
            invoice_id: resultado,
            fiscal_year: fiscalYear,
            tax_payable: allInvoices[i].DocumentTotals.TaxPayable,
            net_total: allInvoices[i].DocumentTotals.NetTotal,
            gross_total: allInvoices[i].DocumentTotals.GrossTotal,
            customer_id: allInvoices[i].CustomerID,
            invoice_date: allInvoices[i].InvoiceDate,
            address_id: idAddress[idAddress.length - 1][0].address_id
          }

        });
      }

      //Lines
      for (let j = 0; j < allInvoices[i].Line.length; j++) {

        var resultado =  allInvoices[i].InvoiceNo.replace("/", "");
        var resultado = resultado.replace(" ", "");

        InvoiceLines.findOrCreate({
          where: {
            line_number: allInvoices[i].Line[j].LineNumber,
            invoice_id: resultado,
            invoice_date: allInvoices[i].Line[j].TaxPointDate,
            quantity: allInvoices[i].Line[j].Quantity,
            unit_price: allInvoices[i].Line[j].UnitPrice,
            credit_amount: allInvoices[i].Line[j].CreditAmount,
            unit_of_measure: allInvoices[i].Line[j].UnitOfMeasure,
            tax_type: allInvoices[i].Line[j].Tax.TaxType,
            tax_percentage: allInvoices[i].Line[j].Tax.TaxPercentage,
            product_code: allInvoices[i].Line[j].ProductCode,
          }
        });

      }

    }

  }

  //Transactions
  const allTransations = jsonObjSales.AuditFile.GeneralLedgerEntries.Journal[1];


  for (let j = 0; j < allTransations.Transaction.length; j++) {
    var res =  allTransations.Transaction[j].TransactionID.replace("/", "");
    var res = res.replace(" ", "");
    var res = res.replace(" ", "");

    var exists = await sequelize.query('SELECT * FROM Transactions WHERE transaction_id = :transaction_id ', { replacements: { transaction_id: res }, type: sequelize.QueryTypes.SELECT });


    if (exists.length == 0) {
      const idSupplier = getSupplierId(allSuppliers, allTransations.Transaction[j].Lines.DebitLine.AccountID);
      if (idSupplier != undefined) {
        await Transaction.findOrCreate({
          where: {
            transaction_id: res,
            supplier_id: idSupplier,
            transaction_date: allTransations.Transaction[j].TransactionDate,
            description: allTransations.Transaction[j].Description,
            transaction_type: allTransations.Transaction[j].TransactionType,
            posting_date: allTransations.Transaction[j].GLPostingDate,
          }
        });
        await sequelize.query('INSERT INTO `TransactionLines` (`transaction_id`,`createdAt`,`credit_amount`,`debit_amount`,`updatedAt`) VALUES (:transaction_id,"2022-05-28 18:59:08",:credit_amount ,:debit_amount,"2022-05-28 18:59:08");',
          {
            replacements: {
              transaction_id: res,
              debit_amount: allTransations.Transaction[j].Lines.DebitLine.DebitAmount,
              credit_amount: allTransations.Transaction[j].Lines.CreditLine.CreditAmount
            }, type: sequelize.QueryTypes.INSERT
          });
      }
    }
  }



  //Payments
  const allPayments = jsonObjSales.AuditFile.SourceDocuments.Payments.Payment;

  if (jsonObjSales.AuditFile.SourceDocuments.Payments.Payment.length == null) {
    var res =  allPayments.Line.SourceDocumentID.OriginatingON.replace("/", "");
    var res = res.replace(" ", "");
    const exists = await sequelize.query('SELECT * FROM Payments WHERE payment_id = :payment_id ', { replacements: { payment_id: res }, type: sequelize.QueryTypes.SELECT });


    if (exists == null) {
      Payment.findOrCreate({
        where: {
          payment_id: res,
          tax_payable: allPayments.DocumentTotals.TaxPayable,
          net_total: allPayments.DocumentTotals.NetTotal,
          gross_total: allPayments.ProductGroup.GrossTotal,
          month: allPayments.Period,
          payment_type: allPayments.PaymentType,
          customer_id: allPayments.CustomerID,
          payment_date: allPayments.PaymentMethod.PaymentDate,
          invoice_id: res
        }
      });
    }
  } else {

    for (let i = 0; i < allPayments.length; i++) {
      var res =  allPayments[i].Line.SourceDocumentID.OriginatingON.replace("/", "");
      var res = res.replace(" ", "");

      const exists = await sequelize.query('SELECT * FROM Payments WHERE payment_id = :payment_id ', { replacements: { payment_id: res }, type: sequelize.QueryTypes.SELECT });
      if (exists.length == 0) {
        var res =  allPayments[i].Line.SourceDocumentID.OriginatingON.replace("/", "");
        var res = res.replace(" ", "");
    
        Payment.findOrCreate({
          where: {
            payment_id: res,
            tax_payable: allPayments[i].DocumentTotals.TaxPayable,
            net_total: allPayments[i].DocumentTotals.NetTotal,
            gross_total: allPayments[i].DocumentTotals.GrossTotal,
            month: allPayments[i].Period,
            payment_type: allPayments[i].PaymentType,
            customer_id: allPayments[i].CustomerID,
            payment_date: allPayments[i].PaymentMethod.PaymentDate,
            invoice_id: res
          }
        });
      }

    }
  }
  return allPayments;

}



module.exports = parseFile;