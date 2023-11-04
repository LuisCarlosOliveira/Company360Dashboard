const { Router } = require('express');
const router = Router();
const { Product } = require('../models');
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
    const allSuppliers = await sequelize.query('SELECT * FROM Suppliers s', {type: sequelize.QueryTypes.SELECT });
    res.status(200).json(allSuppliers);
  });


  router.get('/:id', async (req, res) => {
    const suppliers = await sequelize.query('SELECT * FROM Suppliers s INNER JOIN  Addresses a  on  a.address_id = s.address_id where supplier_id = :id',
    {replacements: { id: req.params.id} ,type: sequelize.QueryTypes.SELECT });
    res.status(200).json(suppliers);
  });


  module.exports = router;
