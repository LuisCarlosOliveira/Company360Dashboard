const { Router } = require('express');
const { Costumer } = require('../models');
const { QueryTypes } = require('sequelize');
var Sequelize = require("sequelize");
const parser = require("../Parser");
const router = Router();

const sequelize = new Sequelize("sio", "root", "ohmygod", {
  host: "localhost",
  dialect: "mysql",
});

router.all('/', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
 });


router.post('/', async (req, res) => {
  const allCostumersInsert = await parser();
  res.status(200).json(allCostumersInsert);
});

router.delete('/:id', async (req, res) => {
  await Costumer.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ message: 'excluido com sucesso' });
  
});
/*
router.put('/:id', async (req, res) => {
  const { name, description, salary } = req.body;

  await Product.update(
    { name, description, salary },
    {
      where: { id: req.params.id },
    }
  );

  res.status(200).json({ message: 'atualizado com sucesso' });
});
*/
module.exports = router;
