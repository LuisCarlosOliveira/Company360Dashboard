
const { Router } = require('express');
const router = Router();
const sequelize = require('../config/global_function');

router.all('', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
 });

router.get('', async (req, res) => {

    var lines = await sequelize.query('select transaction_id, description, date_format(transaction_date, "%d %M %Y") as transaction_date, date_format(posting_date, "%Y %M %d") as posting_date  from transactions order by transaction_date desc limit 5;', {type: sequelize.QueryTypes.SELECT });
  
    res.status(200).json(lines);
  });
  module.exports = router;