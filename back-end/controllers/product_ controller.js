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

 router.get('/', async (req, res) => {
  var lines = await sequelize.query('Select * from sio.products where product_code != "Especial";', { type: sequelize.QueryTypes.SELECT });
//Select * from sio.products where product_code != 'Especial';
    const allProducts = await Product.findAll();
    res.status(200).json(lines);
  });

  module.exports = router;
