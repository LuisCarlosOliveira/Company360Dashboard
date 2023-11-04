const { Router } = require('express');
const router = Router();
const { Payment } = require('../models');
const sequelize = require('../config/global_function');

router.all('/', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});


router.all('/indebted', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});


router.all('/suppliersbycountry', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});


router.all('/accountsreceivable', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

router.all('/balance', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

router.all('/soldproductslist', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

router.all('/topcustomers', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

router.all('/topproducts', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});


router.all('/topproductsbymonth', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

router.all('/topmonthswon', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

router.all('/topsuppliers', function (req, res, next) {

  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");

  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

  next();

});



router.get('/', async (req, res) => {
  const allPayments = await Payment.findAll();
  res.status(200).json(allPayments);
});

router.get('/indebted', async (req, res) => {
  var lines = await sequelize.query('SELECT date_format(invoice_date, "%d %M %Y") as invoice_date,invoice_id,tax_payable,net_total,gross_total,fiscal_year,i.customer_id,address_id, c.company_name FROM invoices i inner join customers c on i.customer_id = c.customer_id WHERE i.invoice_id NOT IN  (SELECT c.invoice_id FROM payments c)');
  res.status(200).json(lines[0]);
});

router.get('/accountsreceivable', async (req, res) => {
  var lines = await sequelize.query('SELECT SUM(i.gross_total) FROM invoices i WHERE i.invoice_id NOT IN  (SELECT c.invoice_id FROM payments c)');
  var impost = await sequelize.query('SELECT SUM(i.net_total) FROM invoices i WHERE i.invoice_id NOT IN  (SELECT c.invoice_id FROM payments c)');
  var receive = await sequelize.query('Select SUM(gross_total) from sio.payments;');
  var without_impost = await sequelize.query('Select SUM(net_total) from sio.payments;');

  var json = JSON.stringify(lines[0][0]);
  var value = json.split(":")
  var gross_total_value = value[1].split("}")

  var json = JSON.stringify(impost[0][0]);
  var value = json.split(":")
  var net_total_value = value[1].split("}")

  var json = JSON.stringify(receive[0][0]);
  var value = json.split(":")
  var receive_value = value[1].split("}")


  var json = JSON.stringify(without_impost[0][0]);
  var value = json.split(":")
  var without_impost_value = value[1].split("}")


  var data2 = {
    gross_total_to_receive: parseFloat(gross_total_value[0]),
    net_total_to_receive: parseFloat(net_total_value[0]),
    tax_total_to_pay: parseFloat(gross_total_value[0]) - parseFloat(net_total_value[0]),
    receive: parseFloat(receive_value[0]),
    net_value: parseFloat(without_impost_value[0]),
    tax_pay: parseFloat(receive_value[0]) - parseFloat(without_impost_value[0])
  };

  res.status(200).json(data2);
});




router.get('/balance', async (req, res) => {
  var lines = await sequelize.query(' select SUM(tl.debit_amount) from sio.transactions t INNER JOIN sio.transactionlines tl on tl.transaction_id = t.transaction_id ;  ');
  var receive = await sequelize.query('select SUM(gross_total) from invoices;');

  var json = JSON.stringify(lines[0][0]);
  var value = json.split(":")
  var spend_value = value[1].split("}")

  var json = JSON.stringify(receive[0][0]);
  var value = json.split(":")
  var receive_value = value[1].split("}")

  var data2 = {
    spend_value: parseFloat(spend_value[0]),
    receive_value: parseFloat(receive_value[0]),
    balance_value: parseFloat(receive_value[0]) - parseFloat(spend_value[0])
  }
  res.status(200).json(data2);
});


router.get('/soldproductslist', async (req, res) => {
  var lines = await sequelize.query('SELECT l.product_code, l.unit_price, SUM(l.quantity) as quantity, COUNT(*) as number FROM invoicelines l group by  product_code ;');
  var list = []
  for (let j = 0; j < lines[0].length; j++) {
    var data = {
      unit_price: lines[0][j]['unit_price'],
      quantity: parseInt(lines[0][j]['quantity']),
      total_won: lines[0][j]['unit_price'] * parseInt(lines[0][j]['quantity']),
    }
    list[j] = data
  }

  res.status(200).json(list);
});

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

//Top Produtos vendidos
router.get('/topproducts', async (req, res) => {
  var lines = await sequelize.query('SELECT p.product_description, l.unit_price, SUM(l.quantity) as quantity, COUNT(*) as number FROM invoicelines l INNER JOIN products p on p.product_code = l.product_code  group by  l.product_code ;');
  var list = []

  for (let j = 0; j < lines[0].length; j++) {
    list[j] = lines[0][j]['unit_price'] * parseInt(lines[0][j]['quantity']);

  }

  var most = getMaxOfArray(list);

  list2 = [];
  for (let j = 0; j < list.length; j++) {
    if (most != list[j]) {
      list2[j] = list[j];
    } else {
      list2[j] = 0;
    }
  }


  var most2 = getMaxOfArray(list2);
  list3 = [];
  for (let j = 0; j < list2.length; j++) {
    if (most2 != list2[j]) {
      list3[j] = list2[j];
    } else {
      list3[j] = 0;
    }
  }
  var most3 = getMaxOfArray(list3);
  var data1 ;
  var data2 ;
  var data3 ;
  responsefinal = [];

  for (let j = 0; j < lines[0].length; j++) {

    if (lines[0][j]['unit_price'] * parseInt(lines[0][j]['quantity']) == most ) {
         data1 = {
        number1: 1,
        unit_price: lines[0][j]['unit_price'],
        product_description: lines[0][j]['product_description'],
        quantity: parseInt(lines[0][j]['quantity']),
        total_won: lines[0][j]['unit_price'] * parseInt(lines[0][j]['quantity']),
      }
      //responsefinal[0] = data;
      
    }

    if (lines[0][j]['unit_price'] * parseInt(lines[0][j]['quantity']) == most2 ) {
       data2 = {
        number1: 2,
        unit_price: lines[0][j]['unit_price'],
        product_description: lines[0][j]['product_description'],
        quantity: parseInt(lines[0][j]['quantity']),
        total_won: lines[0][j]['unit_price'] * parseInt(lines[0][j]['quantity']),
      }
      //responsefinal[1] = data;
      
    }

    if (lines[0][j]['unit_price'] * parseInt(lines[0][j]['quantity']) == most3 ) {
       data3 = {
        number1: 3,
        product_description: lines[0][j]['product_description'],
        unit_price: lines[0][j]['unit_price'],
        quantity: parseInt(lines[0][j]['quantity']),
        total_won: lines[0][j]['unit_price'] * parseInt(lines[0][j]['quantity']),
      }
      //responsefinal[2] = data;
      
    }
  }
  var response;
  if(data1!= undefined) {
     response = {
      unit_price_product_1: data1.unit_price,
      unit_price_product_2: data2.unit_price,
      unit_price_product_3: data3.unit_price,
      quantity_1: data1.quantity,
      quantity_2: data2.quantity,
      quantity_3: data3.quantity,
      total_won_1: data1.total_won,
      total_won_2: data2.total_won,
      total_won_3: data3.total_won,
      product_description_1: data1.product_description,
      product_description_2: data2.product_description,
      product_description_3: data3.product_description,
    }
  }


  res.status(200).json(response);
});


//Top Clientes
router.get('/topcustomers', async (req, res) => {
  var lines = await sequelize.query('select  i.customer_id,c.company_name, SUM(i.gross_total) as valueTotal from invoices i inner join customers c on  i.customer_id = c.customer_id  group by customer_id ORDER BY valueTotal desc limit 5;');
  if(lines[0].length != 0 ){
  var data = {
    customer_1_name:lines[0][0]['company_name'],
    customer_1_customer_id:lines[0][0]['customer_id'],
    customer_1_valueTotal:lines[0][0]['valueTotal'],
    customer_2_name:lines[0][1]['company_name'],
    customer_2_customer_id:lines[0][1]['customer_id'],
    customer_2_valueTotal:lines[0][1]['valueTotal'],
    customer_3_name:lines[0][2]['company_name'],
    customer_3_customer_id:lines[0][2]['customer_id'],
    customer_3_valueTotal:lines[0][2]['valueTotal']

  }
}
  res.status(200).json(data);
});

//Top Supplier com que gastamos mais
router.get('/topsuppliers', async (req, res) => {
  var lines = await sequelize.query(' select s.company_name, t.supplier_id, SUM(tl.credit_amount) as valueTotal from transactions t  inner join suppliers s on  s.supplier_id  = t.supplier_id inner join transactionlines tl on  tl.transaction_id = t.transaction_id group by supplier_id ORDER BY valueTotal desc limit 3;');
  if(lines[0].length != 0 ){
  var data = {
    supplier_1_name:lines[0][0]['company_name'],
    supplier_1_supplier_id:lines[0][0]['supplier_id'],
    supplier_1_valueTotal:lines[0][0]['valueTotal'],
    supplier_2_name:lines[0][1]['company_name'],
    supplier_2_supplier_id:lines[0][1]['supplier_id'],
    supplier_2_valueTotal:lines[0][1]['valueTotal'],
    supplier_3_name:lines[0][2]['company_name'],
    supplier_3_supplier_id:lines[0][2]['supplier_id'],
    supplier_3_valueTotal:lines[0][2]['valueTotal']

  }
}
  res.status(200).json(data);
});

//Suppliers by country
router.get('/suppliersbycountry', async (req, res) => {
  var lines = await sequelize.query('select country, count(country) as numberByCountry from addresses a inner join  suppliers s on a.address_id = s.address_id group by a.country;');
  
  if(lines[0].length != 0 ){
  var data = {
    country_1: lines[0][0]['country'],
    number_country_1: lines[0][0]['numberByCountry'],
    country_2: lines[0][1]['country'],
    number_country_2: lines[0][1]['numberByCountry'],
    country_3: lines[0][2]['country'],
    number_country_3: lines[0][2]['numberByCountry'],

  }
}
  res.status(200).json(data);
});

//select *, count(country) as numberByCountry from addresses a inner join  suppliers s on a.address_id = s.address_id group by a.country;
//Top produtos por mês
//Top produtos por mês
router.get('/topproductsbymonth', async (req, res) => {

  let response = [];
  let count = 0;


  var lines = await sequelize.query('select   p.product_description, l.product_code, SUM(l.quantity) as quantity from sio.invoices i  inner join sio.invoicelines l on l.invoice_id = i.invoice_id  inner join sio.products p on p.product_code = l.product_code WHERE MONTH(i.invoice_date) = :month   group by l.product_code  ORDER BY quantity desc limit 3;',
      {replacements: { month: 1 }});

  var lines2 = await sequelize.query('select   p.product_description, l.product_code, SUM(l.quantity) as quantity from sio.invoices i  inner join sio.invoicelines l on l.invoice_id = i.invoice_id  inner join sio.products p on p.product_code = l.product_code WHERE MONTH(i.invoice_date) = :month   group by l.product_code  ORDER BY quantity desc limit 3;',
      {replacements: { month: 11 }});

  var lines3 = await sequelize.query('select   p.product_description, l.product_code, SUM(l.quantity) as quantity from sio.invoices i  inner join sio.invoicelines l on l.invoice_id = i.invoice_id  inner join sio.products p on p.product_code = l.product_code WHERE MONTH(i.invoice_date) = :month   group by l.product_code  ORDER BY quantity desc limit 3;',
      {replacements: { month: 12 }});

  var lines4 = await sequelize.query('select   p.product_description, l.product_code, SUM(l.quantity) as quantity from sio.invoices i  inner join sio.invoicelines l on l.invoice_id = i.invoice_id  inner join sio.products p on p.product_code = l.product_code WHERE MONTH(i.invoice_date) = :month   group by l.product_code  ORDER BY quantity desc limit 3;',
      {replacements: { month: 9 }});

  var lines5 = await sequelize.query('select   p.product_description, l.product_code, SUM(l.quantity) as quantity from sio.invoices i  inner join sio.invoicelines l on l.invoice_id = i.invoice_id  inner join sio.products p on p.product_code = l.product_code WHERE MONTH(i.invoice_date) = :month   group by l.product_code  ORDER BY quantity desc limit 3;',
      {replacements: { month: 8 }});

  var lines6 = await sequelize.query('select   p.product_description, l.product_code, SUM(l.quantity) as quantity from sio.invoices i  inner join sio.invoicelines l on l.invoice_id = i.invoice_id  inner join sio.products p on p.product_code = l.product_code WHERE MONTH(i.invoice_date) = :month   group by l.product_code  ORDER BY quantity desc limit 3;',
      {replacements: { month: 7 }});


  var lines7 = await sequelize.query('select   p.product_description, l.product_code, SUM(l.quantity) as quantity from sio.invoices i  inner join sio.invoicelines l on l.invoice_id = i.invoice_id  inner join sio.products p on p.product_code = l.product_code WHERE MONTH(i.invoice_date) = :month   group by l.product_code  ORDER BY quantity desc limit 3;',
      {replacements: { month: 2 }});

   var lines8 = await sequelize.query('select   p.product_description, l.product_code, SUM(l.quantity) as quantity from sio.invoices i  inner join sio.invoicelines l on l.invoice_id = i.invoice_id  inner join sio.products p on p.product_code = l.product_code WHERE MONTH(i.invoice_date) = :month   group by l.product_code  ORDER BY quantity desc limit 3;',
      {replacements: { month: 10 }});

      if(lines7[0].length == 0){
        lines7[0] = [{'product_description': "null",'quantity': 0}];
        lines7[0][1] = {'product_description': "null2",'quantity': 0}
     
      }

  if(lines[0].length != 0 ){
    var data =  {
      "month": 1,
      "1_product_description_1" : lines[0][0]['product_description'],
      "1_quantity_product_1:" : lines[0][0]['quantity'],
      "1_product_description_2" : lines[0][1]['product_description'],
      "1_quantity_product_2:" : lines[0][1]['quantity'],
      "month_11": 11,
      "11_product_description_1" : lines2[0][0]['product_description'],
      "11_quantity_product_1:" : lines2[0][0]['quantity'],
      "11_product_description_2" : lines2[0][1]['product_description'],
      "11_quantity_product_2:" : lines2[0][1]['quantity'],
      "month_12": 12,
      "12_product_description_1" : lines3[0][0]['product_description'],
      "12_quantity_product_1:" : lines3[0][0]['quantity'],
      "12_product_description_2" : lines3[0][1]['product_description'],
      "12_quantity_product_2:" : lines3[0][1]['quantity'],
      "month_9": 9,
      "9_product_description_1" : lines4[0][0]['product_description'],
      "9_quantity_product_1:" : lines4[0][0]['quantity'],
      "9_product_description_2" : lines4[0][1]['product_description'],
      "9_quantity_product_2:" : lines4[0][1]['quantity'],
      "month_8": 8,
      "8_product_description_1" : lines5[0][0]['product_description'],
      "8_quantity_product_1:" : lines5[0][0]['quantity'],
      "8_product_description_2" : lines5[0][1]['product_description'],
      "8_quantity_product_2:" : lines5[0][1]['quantity'],
      "month_7": 7,
      "7_product_description_1" : lines6[0][0]['product_description'],
      "7_quantity_product_1:" : lines6[0][0]['quantity'],
      "7_product_description_2" : lines6[0][1]['product_description'],
      "7_quantity_product_2:" : lines6[0][1]['quantity'],
      "month_7": 2,
      "2_product_description_1" : lines7[0][0]['product_description'],
      "2_quantity_product_1:" : lines7[0][0]['quantity'],
      "2_product_description_2" : lines7[0][1]['product_description'],
      "2_quantity_product_2:" : lines7[0][1]['quantity'],
      "10_product_description_1" : lines8[0][0]['product_description'],
      "10_quantity_product_1:" : lines8[0][0]['quantity'],
      "10_product_description_2" : lines8[0][1]['product_description'],
      "10_quantity_product_2:" : lines8[0][1]['quantity'],
    
    }
  }

  res.status(200).json(data);
});


//Top 3 meses com mais faturacao
router.get('/topmonthswon', async (req, res) => {

  let response = [];
  let count = 0;

  var lines = await sequelize.query('select SUM(i.gross_total) as total , MONTH(i.invoice_date) as month  from invoices i group by MONTH (i.invoice_date) order by total desc ;');

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
 if( lines[0].length != 0){
    var data ={
      month1 : monthNames[lines[0][0]['month'] - 1],
      valuemonth1: lines[0][0]['total'],
      month2 : monthNames[lines[0][1]['month'] - 1],
      valuemonth2: lines[0][1]['total'],
      month3 : monthNames[lines[0][2]['month'] - 1],
      valuemonth3: lines[0][2]['total'],
      month4 : monthNames[lines[0][3]['month'] - 1],
      valuemonth4: lines[0][3]['total'],
      month5 : monthNames[lines[0][4]['month'] - 1],
      valuemonth5: lines[0][4]['total'],
      month6 : monthNames[lines[0][5]['month'] - 1],
      valuemonth6: lines[0][5]['total'],
      month7 : monthNames[lines[0][6]['month'] - 1],
      valuemonth7: lines[0][6]['total'],
      month8 : monthNames[lines[0][7]['month'] - 1],
      valuemonth8: lines[0][7]['total'],
      month9 : monthNames[1],
      valuemonth9: 0,
      month10 : monthNames[2],
      valuemonth10: 0,
      month11 : monthNames[3],
      valuemonth11: 0,
      month12 : monthNames[4],
      valuemonth12: 0,
    }
  }
  
  
  res.status(200).json(data);
});

//
//TOP produtos por mes
//s
//Quem compramos mais



module.exports = router;
