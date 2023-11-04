const { Router } = require('express');
const router = Router();
const { Transaction } = require('../models');
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
    const allTransations = await Transaction.findAll();
    res.status(200).json(allTransations);
  });

  router.get('/:id', async (req, res) => {
    var lines = await sequelize.query('SELECT * FROM TransactionLines l  INNER JOIN Transactions t on t.transaction_id = l.transaction_id where l.transaction_id = :id',
    {replacements: { id: req.params.id} ,type: sequelize.QueryTypes.SELECT });
  
    res.status(200).json(lines[0]);
  });


  

  module.exports = router;
