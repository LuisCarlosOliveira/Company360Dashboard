const { Router } = require('express');
const { Costumer } = require('../models');
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/global_function');
const router = Router();

router.all('/', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
 });

 
router.post('/', async (req, res) => {
  await sequelize.query('set foreign_key_checks = 0');
  await sequelize.query('Delete  from transactions where transaction_id != " " ;');
  await sequelize.query('Delete  from Transactionlines where transaction_id != " " ;');
  await sequelize.query('Delete  from Products where product_code != " " ;');
  await sequelize.query('Delete  from Customers where customer_id != " " ;');
  await sequelize.query('Delete  from Suppliers where supplier_id != " " ;');
  await sequelize.query('Delete  from Payments where payment_id != " " ;');
  await sequelize.query('Delete  from Addresses where address_id != " " ;');
  await sequelize.query('Delete  from Invoicelines where line_id != " " ;');
  await sequelize.query('Delete  from Invoices where invoice_id != " " ;');

  res.status(200).json({ message: 'all rows removed!' });
});


module.exports = router;
