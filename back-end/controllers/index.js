const { request } = require('express');

const parserXMLController = require('./parser_controller');
const customer = require('./customer_controller');
const product = require('./product_ controller');
const invoice  = require('./invoice_controller')
const reset = require('./reset_controller');
const supplier = require('./suppliers_controller');
const payment = require('./accounting_controller');
const transaction_recents = require('./transactions_recents');
const invoices_recent = require('./invoices_recent');
const transaction = require('./transaction_controller');
module.exports = {
  customer: customer,
  products: product,
  parser_endpoint:parserXMLController,
  invoices:invoice,
  resetdatabase:reset,
  suppliers:supplier,
  payments:payment,
  transaction_recents:transaction_recents,
  invoices_recents:invoices_recent,
  transactions: transaction
};
