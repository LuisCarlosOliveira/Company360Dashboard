
const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controllers');
const cors = require("cors");
const app = express();
const port = 3001;

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('HEY QUEIMA!'));

//Routes
app.use('/customers', controllers.customer);
app.use('/products', controllers.products);
app.use('/parser', controllers.parser_endpoint);
app.use('/invoices', controllers.invoices);
app.use('/reset', controllers.resetdatabase);
app.use('/suppliers', controllers.suppliers);
app.use('/payments', controllers.payments);
app.use('/recentinvoices', controllers.invoices_recents);
app.use('/recenttransactions', controllers.transaction_recents);
app.use('/transactions', controllers.transactions);



app.use(cors());


app.listen(port, () => console.log(`Listening on port ${port}!`));