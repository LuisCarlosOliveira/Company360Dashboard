const { Router } = require('express');
const router = Router();
const { Customer } = require('../models');


router.all('/', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
 });

 router.get('/', async (req, res) => {
    const allCustomers = await Customer.findAll();
    res.status(200).json(allCustomers);
  });

  module.exports = router;
