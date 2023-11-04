const { Router } = require('express');
const router = Router();
const { Invoice } = require('../models');
const sequelize = require('../config/global_function');

router.all('/', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
 });

 router.all('/:id', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
 });

 router.get('/', async (req, res) => {
    const exists = await sequelize.query('SELECT * FROM Invoices');
    res.status(200).json(exists[0]);
  });

  router.get('/:id', async (req, res) => {
    var suppliers = await sequelize.query('SELECT * FROM Invoices i INNER JOIN  Addresses a  on  a.address_id = i.address_id   INNER JOIN  customers c  on   c.customer_id = i.customer_id where i.invoice_id = :id',
    {replacements: { id: req.params.id} ,type: sequelize.QueryTypes.SELECT });
     
    var lines = await sequelize.query('SELECT l.unit_of_measure, l.line_number,l.quantity,l.unit_price,l.credit_amount,l.product_code,l.tax_type,l.tax_percentage  FROM InvoiceLines l where invoice_id = :id',
   
    {replacements: { id: req.params.id} ,type: sequelize.QueryTypes.SELECT });

    var reponseT = {
      invoicedetail: suppliers[0],
      invoicelines:lines
    }

    
    res.status(200).json(reponseT);
  });


  //console.log("innvoices " + lines[0].country);

  module.exports = router;
