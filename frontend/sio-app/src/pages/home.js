import React from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { wait } from "@testing-library/user-event/dist/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);


class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      finance: "",
      customers: [],
      products: [],
      invoices: [],
      transactions: [],
      products_by_month: [],
      suppliers: [],
      topmonthswon: [],
      balance: {},
      indebted: {},
      transaction_length: [],
      invoices_length: [],
      top_suppliers: [],
      top_customers: [],
      suppliers_by_country: [],
      topproducts: []
    }

    this.state.finance = localStorage.getItem("type");
    document.title = "Engenheiros das Peles, Lda"
  }

  resetDB = async e => {

    e.preventDefault();

    try {

      await axios.post("http://localhost:3001/reset/");
      window.location.reload(false);

    } catch (err) {
      this.setState({ error: "Erro no reset." });
    }
  };

  addData = async e => {

    e.preventDefault();

    try {

      await axios.post("http://localhost:3001/parser/");
      window.location.reload(false);

    } catch (err) {
      this.setState({ error: "Erro ao inserir os dados." });
    }
  };

  perfil() {
    if (this.state.finance === true) {
      return true;
    }
    else {
      return false;
    }
  };

  componentDidMount() {

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    };

    fetch('http://localhost:3001/payments/suppliersbycountry', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ suppliers_by_country: data }))

    fetch('http://localhost:3001/payments/topcustomers/', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ top_customers: data }))

    fetch('http://localhost:3001/transactions/', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ transaction_length: data }));

    fetch('http://localhost:3001/payments/balance', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ balance: data }));

    fetch('http://localhost:3001/payments/accountsreceivable', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ indebted: data }));

    fetch('http://localhost:3001/invoices/', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ invoices_length: data }));

    fetch('http://localhost:3001/products/', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ products: data }));

    fetch('http://localhost:3001/customers/', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ customers: data }));

    fetch('http://localhost:3001/recentinvoices/', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ invoices: data }));

    fetch('http://localhost:3001/recenttransactions/', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ transactions: data }));

    fetch('http://localhost:3001/payments/topproductsbymonth', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ products_by_month: data }));

    fetch('http://localhost:3001/suppliers', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ suppliers: data }));
    fetch('http://localhost:3001/payments/topmonthswon', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ topmonthswon: data }));

    fetch('http://localhost:3001/payments/topsuppliers/', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ top_suppliers: data }));
    fetch('http://localhost:3001/payments/topproducts', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ topproducts: data }));

  }

  render() {

    const counts = {};
    const balance_value = (this.state.balance.receive_value - this.state.indebted.tax_total_to_pay) - this.state.balance.spend_value;
    var balance_value2 = parseFloat(balance_value).toFixed(2);
    balance_value2 = balance_value2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");;
    const receive_value = parseFloat(this.state.balance.receive_value).toFixed(2);
    var receive_value_2 = receive_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    if (this.state.balance.receive_value != undefined) {
      var spend_value_formated = this.state.balance.spend_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      console.log("RECEIVE " +receive_value_2 );
      console.log("Spend " + spend_value_formated );
  
      var margem = ((parseFloat(receive_value) / this.state.balance.spend_value) - 1) * 100;
       margem = parseFloat(margem).toFixed(2);
     
    }


 

    var gross_total_to_receive = parseFloat(this.state.indebted.gross_total_to_receive).toFixed(2);
    gross_total_to_receive = receive_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    const receive = parseFloat(this.state.indebted.receive).toFixed(2);
    var receive_2 = receive.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    var tax_total_to_pay = parseFloat(this.state.indebted.tax_total_to_pay).toFixed(2);
    tax_total_to_pay = tax_total_to_pay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    var net_value = parseFloat(this.state.indebted.net_value).toFixed(2);
    net_value = net_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    var tax_pay = parseFloat(this.state.indebted.tax_pay).toFixed(2);
    tax_pay = tax_pay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    const countsPurchaches = {};
    var customer1per = (this.state.top_customers['customer_1_valueTotal'] / this.state.balance.receive_value) * 100
    customer1per = parseFloat(customer1per).toFixed(2);


    var customer2per = (this.state.top_customers['customer_2_valueTotal'] / this.state.balance.receive_value) * 100
    customer2per = parseFloat(customer2per).toFixed(2);

    var customer3per = (this.state.top_customers['customer_3_valueTotal'] / this.state.balance.receive_value) * 100
    customer3per = parseFloat(customer3per).toFixed(2);


    var supplier1per = (this.state.top_suppliers['supplier_1_valueTotal'] / this.state.balance.receive_value) * 100
    supplier1per = parseFloat(supplier1per).toFixed(2);

    var supplier2per = (this.state.top_suppliers['supplier_2_valueTotal'] / this.state.balance.receive_value) * 100
    supplier2per = parseFloat(supplier2per).toFixed(2);

    var supplier3per = (this.state.top_suppliers['supplier_3_valueTotal'] / this.state.balance.receive_value) * 100
    supplier3per = parseFloat(supplier3per).toFixed(2);

    var othersSup = 100 - supplier3per - supplier2per - supplier1per;
    othersSup = parseFloat(othersSup).toFixed(2);

    var othersCus = 100 - customer3per - customer2per - customer1per;
    othersCus = parseFloat(othersCus).toFixed(2);

    var total_won_3 = parseFloat(this.state.topproducts.total_won_3).toFixed(2);

    total_won_3 = total_won_3.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");



    var total_won_2 = parseFloat(this.state.topproducts.total_won_2).toFixed(2);

    total_won_2 = total_won_2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

   
    var total_won_1 = parseFloat(this.state.topproducts.total_won_1).toFixed(2);

    total_won_1 = total_won_1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    for (const num of this.state.products) {
      counts[num.product_group] = counts[num.product_group] ? counts[num.product_group] + 1 : 1;
    }

    const { invoices, transactions } = this.state;

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    for (const num of this.state.invoices) {
      countsPurchaches[num.invoice_date] = countsPurchaches[num.invoice_date] ? countsPurchaches[num.invoice_date] + 1 : 1;
    }

    const dataTopsalesperMonths = {
      labels,
      datasets: [
        {
          data: [this.state.topmonthswon['valuemonth6'], this.state.topmonthswon['valuemonth9'], this.state.topmonthswon['valuemonth10'], this.state.topmonthswon['valuemonth11'],
          this.state.topmonthswon['valuemonth12'], this.state.topmonthswon['valuemonth7'], this.state.topmonthswon['valuemonth5'], this.state.topmonthswon['valuemonth8'], this.state.topmonthswon['valuemonth4'],
          this.state.topmonthswon['valuemonth3'], this.state.topmonthswon['valuemonth1'], this.state.topmonthswon['valuemonth2']],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
        },
      ],
    };
    const optionsStacked = {
      plugins: {
        title: {
          display: false,
          text: 'Chart.js Bar Chart - Stacked',
        },
        legend: {
          display: false,

        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          max: 12000,
          min: 0,
          ticks: {
            stepSize: 2
          }
        },
      },
    };

    const dataDonut = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const optionsStacked2 = {
      plugins: {
        title: {
          display: false,
          text: 'Chart.js Bar Chart - Stacked',
        },
        legend: {
          display: false,
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          max: 20000,
          min: 10,
          ticks: {
            stepSize: 2
          }
        },
      },
    };

    const dataTop3Product = {

      labels,
      datasets: [
        {
          label: [this.state.products_by_month['1_product_description_1']],
          data: [this.state.products_by_month['1_quantity_product_1:']], // INSERIR DATA 1-12 TOP 1
          backgroundColor: 'rgb(255, 99, 132)',
        },
        {
          label: this.state.products_by_month['1_product_description_2'],
          data: [this.state.products_by_month['1_quantity_product_2:']],
          backgroundColor: 'rgb(75, 192, 192)',
        },
        {
          label: this.state.products_by_month['7_product_description_1'],
          data: [0, 0, 0, 0, 0, 0, this.state.products_by_month['7_quantity_product_1:']],
          backgroundColor: 'rgb(75,192,85)',
        },
        {
          label: this.state.products_by_month['7_product_description_2'],
          data: [0, 0, 0, 0, 0, 0, this.state.products_by_month['7_quantity_product_2:']],
          backgroundColor: 'rgb(192,190,75)',
        },

        {
          label: this.state.products_by_month['9_product_description_1'],
          data: [0, 0, 0, 0, 0, 0, 0, 0, this.state.products_by_month['9_quantity_product_1:']],
          backgroundColor: 'rgb(163,88,238)',
        },
        {
          label: this.state.products_by_month['9_product_description_2'],
          data: [0, 0, 0, 0, 0, 0, 0, 0, this.state.products_by_month['9_quantity_product_2:']],
          backgroundColor: 'rgb(192,75,93)',
        },
        {
          label: this.state.products_by_month['10_product_description_2'],
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, this.state.products_by_month['10_quantity_product_2:']],
          backgroundColor: 'rgb(192,75,93)',
        },
        {
          label: this.state.products_by_month['11_product_description_1'],
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, this.state.products_by_month['11_quantity_product_1:']],
          backgroundColor: 'rgb(238,141,88)',

        },
        {
          label: this.state.products_by_month['11_product_description_2'],
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, this.state.products_by_month['11_quantity_product_2:']],
          backgroundColor: 'rgb(53,59,229)',
        },
        {
          label: this.state.products_by_month['12_product_description_1'],
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, this.state.products_by_month['12_quantity_product_1:']],
          backgroundColor: 'rgb(88,238,90)',
        },
        {
          label: this.state.products_by_month['12_product_description_2'],
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, this.state.products_by_month['12_quantity_product_2:']],
          backgroundColor: 'rgb(192,190,75)',
        },

      ],
    };

    var otherSupplier = this.state.balance.spend_value - (this.state.top_suppliers['supplier_1_valueTotal'] + this.state.top_suppliers['supplier_2_valueTotal'] + this.state.top_suppliers['supplier_3_valueTotal']);

    const dataSuppliers = {
      plugins: {
        title: {
          display: false,
          text: 'Chart.js Bar Chart - Stacked',
        },
        labels: {
          color: 'rgb(255, 99, 132)'
        },

      },
      labels: [this.state.top_suppliers['supplier_1_name'], this.state.top_suppliers['supplier_2_name'], this.state.top_suppliers['supplier_3_name'], 'Others'],
      datasets: [
        {
          label: '# of Products',
          data: [this.state.top_suppliers['supplier_1_valueTotal'], this.state.top_suppliers['supplier_2_valueTotal'], this.state.top_suppliers['supplier_3_valueTotal'], otherSupplier],
          backgroundColor: [
            'rgb(255,99,132)',
            'rgb(255, 165, 0)',
            'rgb(60, 179, 113)',
            'rgb(106, 90, 205)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgb(255, 165, 0)',
            'rgb(60, 179, 113)',
            'rgb(106, 90, 205)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,

        },
      ],
    };

    var othercustomer = this.state.balance.receive_value - (this.state.top_customers['customer_1_valueTotal'] + this.state.top_customers['customer_2_valueTotal'] + this.state.top_customers['customer_3_valueTotal']);
    var othercustomer = parseFloat(otherSupplier).toFixed(2);
    const dataCustomers = {
      plugins: {
        title: {
          display: false,
          text: 'Chart.js Bar Chart - Stacked',
        },

      },
      labels: [this.state.top_customers['customer_1_name'], this.state.top_customers['customer_2_name'], this.state.top_customers['customer_3_name'], 'Others'],
      datasets: [
        {
          label: '# of Products',
          data: [this.state.top_customers['customer_1_valueTotal'], this.state.top_customers['customer_2_valueTotal'], this.state.top_customers['customer_3_valueTotal'], othercustomer],
          backgroundColor: [
            'rgb(255,99,132)',
            'rgb(255, 165, 0)',
            'rgb(60, 179, 113)',
            'rgb(106, 90, 205)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgb(255, 165, 0)',
            'rgb(60, 179, 113)',
            'rgb(106, 90, 205)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,

        },
      ],
    };

    const dataSuppliersByCountry = {
      plugins: {
        title: {
          display: false,
          text: 'Chart.js Bar Chart - Stacked',
        },

      },
      labels: [this.state.suppliers_by_country['country_1'], this.state.suppliers_by_country['country_2'], this.state.suppliers_by_country['country_3']],
      datasets: [
        {
          label: '# of Country',
          data: [this.state.suppliers_by_country['number_country_1'], this.state.suppliers_by_country['number_country_2'], this.state.suppliers_by_country['number_country_3']],
          backgroundColor: [
            'rgb(255, 165, 0)',
            'rgb(60, 179, 113)',
            'rgb(255, 0, 0)',
          ],
          borderColor: [
            'rgb(255, 165, 0)',
            'rgb(60, 179, 113)',
            'rgb(255, 0, 0)',

          ],
          borderWidth: 1,

        },
      ],
    };

    const optionsStacked3 = {

      plugins: {

        title: {

          display: false,

          text: 'Chart.js Bar Chart - Stacked',

        },

        legend: {

          display: false,

        },

      },

      responsive: true,

      scales: {

        x: {

          stacked: true,

        },

        y: {

          max: 0,

          min: 7,

          ticks: {

            stepSize: 2

          }

        },

      },
    };

    var ola = counts['Forro Anilina'];

    var ola_2 = counts['Forro Crute'];

    var ola_3 = counts['Pele Afelpado'];

    var ola_4 = counts['Pele Camurça'];

    var ola_5 = counts['Pele Crust'];

    var ola_6 = counts['Pele Nobuck'];  

    var ola_7 = counts['Pele Verniz'];

    const dataOfTypesProducts = {



      labels: ['Forro Anilina', 'Forro Crute', 'Pele Afelpado', 'Pele Camurça', 'Pele Crust', 'Pele Nobuck', 'Pele Verniz'],

      datasets: [

        {

          label: '# of Products',

          data: [ola,ola_2,ola_3,ola_4,ola_5,ola_6,ola_7],

          backgroundColor: [

            'rgb(255,99,132)',

            'rgb(255, 165, 0)',

            'rgb(164, 214, 243)',

            'rgb(106, 90, 205)',

            'rgb(180, 180, 180)',

            'rgb(255, 10, 0)',

            'rgb(80, 221, 4)',

          ],

          borderColor: [

            'rgba(255, 99, 132, 1)',

            'rgb(255, 165, 0)',

            'rgb(164, 214, 243)',

            'rgb(106, 90, 205)',

            'rgb(180, 180, 180)',

            'rgb(255, 10, 0)',

            'rgb(80, 221, 4)',

          ],

          borderWidth: 1,

        },

      ],

    };

    return (

      <div className="container-fluid position-relative d-flex p-0">

        <div className="sidebar pe-4 pb-3">
          <nav className="navbar bg-secondary navbar-dark">
            <a href="/home" className="navbar-brand mx-1 mb-3">
              <h6 className="text-primary"><i className="fa fa-truck me-2" />Engenheiros das Peles, Lda.</h6>
            </a>

            {this.state.finance === "finance" &&
              <>
                <div className="d-flex align-items-center ms-4 mb-4">
                  <div className="position-relative">
                    <img className="rounded-circle" src="assets/img/user.jpg" alt="" style={{ width: '40px', height: '40px' }} />
                    <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1" />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0">Hugo Silva</h6>
                    <span className=" text-white">Diretor Financeiro</span>

                  </div>
                </div>
              </>

            }
            {this.state.finance === "sales" &&
              <>
                <div className="d-flex align-items-center ms-4 mb-4">
                  <div className="position-relative">
                    <img className="rounded-circle" src="assets/img/user3.jpg" alt="" style={{ width: '40px', height: '40px' }} />
                    <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1" />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0">Jaques Resende</h6>
                    <span className=" text-white">Diretor Comercial</span>

                  </div>
                </div>

              </>

            }
            {this.state.finance === "armazem" &&
              <>
                <div className="d-flex align-items-center ms-4 mb-4">
                  <div className="position-relative">
                    <img className="rounded-circle" src="assets/img/user2.jpg" alt="" style={{ width: '40px', height: '40px' }} />
                    <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1" />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0">Luis Oliveira</h6>
                    <span className=" text-white">Gestor de Armazém</span>
                  </div>
                </div>

              </>
            }

            <div className="navbar-nav w-100">
              <a href="/" className="nav-item nav-link active"><i className="fa fa-tachometer-alt me-2" />Home</a>
              <a href="/sales" class="nav-item nav-link"><i class="fa fa-credit-card me-2"></i>Vendas</a>
              <a href="/purchases" class="nav-item nav-link"><i class="fa fa-shopping-cart me-2"></i>Compras</a>
              {this.state.finance === "finance" &&
                <a href="/clients" class="nav-item nav-link"><i class="fa fa-users me-2"></i>Clientes</a>
              }
              {this.state.finance === "sales" &&
                <a href="/clients" class="nav-item nav-link"><i class="fa fa-users me-2"></i>Clientes</a>
              }
              <a href="/suppliers" class="nav-item nav-link"><i class="fa fa-handshake me-2"></i>Fornecedores</a>
              <a href="/products" class="nav-item nav-link"><i class="fab fa-product-hunt me-2"></i>Produtos</a>
              {this.state.finance === "finance" &&
                <a href="/debtors" class="nav-item nav-link"><i class="fa fa-coins me-2"></i>Incumpridores</a>
              }

              <br /><br />
              <button class="nav-item nav-link active" onClick={this.addData}>Adicionar Dados</button>
              <br />
              <button class="nav-item nav-link active" onClick={this.resetDB}>Reset Base de dados</button>
            </div>
          </nav>
        </div>

        <div className="content">

          <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
            <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
              <h2 className="text-primary mb-0"><i className="fa fa-user-edit" /></h2>
            </a>

            <div className="navbar-nav align-items-center ms-auto">

              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                  2022
                </a>
                <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">


                  <a href="#" className="dropdown-item">2021</a>
                  <a href="#" className="dropdown-item">2020</a>
                  <a href="#" className="dropdown-item">2019</a>
                </div>
              </div>

              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">

                  {this.state.finance === "armazem" &&
                    <>
                      <img className="rounded-circle me-lg-2" src="assets/img/user2.jpg" alt="" style={{ width: '40px', height: '40px' }} />
                      <span className="d-none d-lg-inline-flex">Luis Oliveira</span>

                    </>
                  }
                  {this.state.finance === "finance" &&
                    <>
                      <img className="rounded-circle me-lg-2" src="assets/img/user.jpg" alt="" style={{ width: '40px', height: '40px' }} />
                      <span className="d-none d-lg-inline-flex">Hugo Silva</span>
                    </>
                  }
                  {this.state.finance === "sales" &&
                    <>
                      <img className="rounded-circle me-lg-2" src="assets/img/user3.jpg" alt="" style={{ width: '40px', height: '40px' }} />
                      <span className="d-none d-lg-inline-flex">Jaques Resende</span>
                    </>
                  }

                </a>
                <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">

                  <a href="/" className="dropdown-item">Log Out</a>
                </div>
              </div>

            </div>
          </nav>

          {this.state.finance === "finance" &&
            <>
              <div className="container-fluid pt-4 px-4">
                <div className="row g-4">
                  <div className="col-sm-6 col-xl-3">
                    <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4" style={{ height: 120 }}>
                      <i className="fa fa-chart-line fa-3x text-primary" />
                      <div className="ms-3">
                        <p className="mb-2 text-white" style={{ fontWeight: 'bold' }}>Compras Último Ano</p>
                        <h6 className="mb-0" style={{ float: 'right' }} >{spend_value_formated} €</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-xl-3">
                    <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4" style={{ height: 120 }}>
                      <i className="fas fa-cash-register fa-3x text-primary" />
                      <div className="ms-3">
                        <p className="mb-2 text-white" style={{ fontWeight: 'bold' }}>Total Faturado</p>
                        <h6 className="mb-0" style={{ float: 'right' }} >{receive_value_2} €</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-xl-3">
                    <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4" style={{ height: 120 }}>
                      <i className="fas fa-balance-scale-right fa-3x text-primary" />
                      <div className="ms-3">
                        <p className="mb-2 text-white" style={{ fontWeight: 'bold' }}> Lucro Esperado</p>
                        <h6 className="mb-0" style={{ float: 'right' }}> {balance_value2} €</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-xl-3">
                    <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4" style={{ height: 120 }}>
                      <i className="fas fa-coins fa-3x text-primary" />
                      <div className="ms-3">
                        <p className="mb-2 text-white" style={{ fontWeight: 'bold' }}>Valor Total Recebido</p>
                        <h6 className="mb-0" style={{ float: 'right' }}>{receive_2} €</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-xl-3">
                    <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4" style={{ height: 120 }}>
                      <i className="fa fa-chart-bar fa-3x text-primary" />
                      <div className="ms-3">
                        <p className="mb-2 text-white" style={{ fontWeight: 'bold' }}>Margem Bruta </p>
                        <h6 className="mb-0" style={{ float: 'right' }}>{margem} %</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-xl-3">
                    <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4" style={{ height: 120 }}>
                      <i className="fa fa-chart-bar fa-3x text-primary" />
                      <div className="ms-3">
                        <p className="mb-2 text-white" style={{ fontWeight: 'bold' }}>Impostos a Pagar </p>
                        <h6 className="mb-0" style={{ float: 'right' }}>{tax_total_to_pay} €</h6>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6 col-xl-3">
                    <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4" style={{ height: 120 }}>
                      <i className="fas fa-coins fa-3x text-primary" />
                      <div className="mb-4">
                        <p className="mb-2 text-white" style={{ fontWeight: 'bold' }}>Valor Líquido Recebido </p>
                        <h6 className="mb-0" style={{ float: 'right' }}>{net_value} €</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-xl-3">
                    <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4" style={{ height: 120 }}>
                      <i className="fas fa-file-invoice fa-3x text-primary" />
                      <div className="mb-4">
                        <p className="mb-2 text-white" style={{ fontWeight: 'bold' }}>Impostos já Pagos</p>
                        <h6 className="mb-0" style={{ float: 'right' }}>{tax_pay} €</h6>
                      </div>
                    </div>
                  </div>
                
                </div>
              </div>
            </>
          }

          {this.state.finance === "sales" &&
            <>
              <div className="container-fluid pt-4 px-4">
                <div className="row g-4">
                  <div className="col-sm-6 col-xl-3">
                    <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4" style={{ height: 120 }}>
                      <i className="fa fa-chart-line fa-3x text-primary" />
                      <div className="ms-3">
                        <p className="mb-2 text-white" style={{ fontWeight: 'bold' }}>Compras Último Ano</p>
                        <h6 className="mb-0" style={{ float: 'right' }} >{spend_value_formated} €</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-xl-3">
                    <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4" style={{ height: 120 }}>
                      <i className="fas fa-cash-register fa-3x text-primary" />
                      <div className="ms-3">
                        <p className="mb-2 text-white" style={{ fontWeight: 'bold' }}>Total Faturado</p>
                        <h6 className="mb-0" style={{ float: 'right' }} >{receive_value_2} €</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-xl-3">
                    <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4" style={{ height: 120 }}>
                      <i className="fas fa-balance-scale-right fa-3x text-primary" />
                      <div className="ms-3">
                        <p className="mb-2 text-white" style={{ fontWeight: 'bold' }}> Lucro Esperado</p>
                        <h6 className="mb-0" style={{ float: 'right' }}> {balance_value2} €</h6>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6 col-xl-3">
                    <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4" style={{ height: 120 }}>
                      <i className="fa fa-chart-bar fa-3x text-primary" />
                      <div className="ms-3">
                        <p className="mb-2 text-white" style={{ fontWeight: 'bold' }}>Total a Receber</p>
                        <h6 className="mb-0" style={{ float: 'right' }}>{gross_total_to_receive} €</h6>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </>

          }

          <div className="container-fluid pt-4 px-4" >
            <div className="row g-4">
              {this.state.finance === "sales" &&
                <>
                  <div className="col-sm-12 col-xl-6" >
                    <div className="bg-secondary text-center rounded p-4">
                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <h6 className="mb-0">Top Productos vendidos por mês</h6>
                      </div>
                      <Bar options={optionsStacked} data={dataTop3Product} />
                    </div>
                  </div>
                  <div className="col-sm-12 col-xl-6" >
                    <div className="bg-secondary text-center rounded p-4" >
                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <h6 className="mb-0" style={{ height: 55 }}>Top Produtos Vendidos  </h6>
                      </div>
                      <div >
                        <table className="table text-start align-middle table-bordered table-hover mb-0">
                          <thead>
                            <tr className="text-white">
                              <th scope="col">Top</th>
                              <th scope="col">Produtos</th>
                              <th scope="col">€/Unid </th>
                              <th scope="col">Quant</th>
                              <th scope="col">Valor Faturado</th>
                            </tr>
                          </thead>
                          <tbody>
                            <>
                              <tr className="text-white">
                                <td> 1 </td>
                                <td> {this.state.topproducts.product_description_1} </td>
                                <td> {this.state.topproducts.unit_price_product_1} </td>
                                <td> {this.state.topproducts.quantity_1}  </td>
                                <td> {total_won_1} €  </td>
                              </tr>
                              <tr className="text-white">
                                <td> 2 </td>
                                <td> {this.state.topproducts.product_description_2} </td>
                                <td> {this.state.topproducts.unit_price_product_2} </td>
                                <td> {this.state.topproducts.quantity_2} </td>
                                <td> {total_won_2} €  </td>
                              </tr>
                              <tr className="text-white">
                                <td> 3 </td>
                                <td> {this.state.topproducts.product_description_3} </td>
                                <td> {this.state.topproducts.unit_price_product_3} </td>
                                <td> {this.state.topproducts.quantity_3} </td>
                                <td> {total_won_3} €  </td>
                              </tr>
                            </>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>


                  <div className="col-sm-12 col-xl-6 ">
                    <div className="bg-secondary text-center rounded p-4" style={{ height: 750 }}>
                      <div className="d-flex align-items-center justify-content-between mb-4" >
                        <h6 className="mb-0">Top fornecedores último ano</h6>
                      </div>
                      <div >

                        <Pie data={dataSuppliers} height="370px" width="370px" options={{ maintainAspectRatio: false }} />

                      </div>
                      <table className="table text-start align-middle table-bordered table-hover mb-0" style={{ marginTop: 30 }}>
                        <thead>
                          <tr className="text-white">
                            <th scope="col">Top </th>
                            <th scope="col">Fornecedores  </th>
                            <th scope="col">Valor</th>
                            <th scope="col">Percentagem</th>
                          </tr>
                          <tr className="text-white">
                            <th scope="col">1 </th>
                            <th scope="col">{this.state.top_suppliers['supplier_1_name']} </th>
                            <th scope="col">{this.state.top_suppliers['supplier_1_valueTotal']}€</th>
                            <th scope="col">{supplier1per} %</th>
                          </tr>
                          <tr tr className="text-white" >
                            <th scope="col">2 </th>
                            <th scope="col">{this.state.top_suppliers['supplier_2_name']} </th>
                            <th scope="col">{this.state.top_suppliers['supplier_2_valueTotal']}€</th>
                            <th scope="col">{supplier2per} %</th>
                          </tr>
                          <tr tr className="text-white">
                            <th scope="col">3 </th>
                            <th scope="col">{this.state.top_suppliers['supplier_3_name']} </th>
                            <th scope="col">{this.state.top_suppliers['supplier_3_valueTotal']}€</th>
                            <th scope="col">{supplier3per} %</th>
                          </tr>
                          <tr tr className="text-white">
                            <th scope="col">O </th>
                            <th scope="col">Others </th>
                            <th scope="col">{otherSupplier}</th>
                            <th scope="col">{othersSup} %</th>
                          </tr>

                        </thead>
                      </table>
                    </div>

                  </div>

                  <div className="col-sm-12 col-xl-6 ">
                    <div className="bg-secondary text-center rounded p-4" style={{ height: 750 }}>
                      <div className="d-flex align-items-center justify-content-between mb-4" >
                        <h6 className="mb-0">Top Clientes último ano</h6>
                      </div>
                      <div >
                        <Pie data={dataCustomers} height="370px"

                          width="370px"

                          options={{ maintainAspectRatio: false }} />

                      </div>

                      <table className="table text-start align-middle table-bordered table-hover mb-0" style={{ marginTop: 30 }}>
                        <thead>
                          <tr className="text-white">
                            <th scope="col">Top </th>
                            <th scope="col">Cliente </th>
                            <th scope="col">Valor</th>
                            <th scope="col">Percentagem</th>
                          </tr>
                          <tr className="text-white">
                            <th scope="col">1 </th>
                            <th scope="col">{this.state.top_customers['customer_1_name']} </th>
                            <th scope="col">{this.state.top_customers['customer_1_valueTotal']}€</th>
                            <th scope="col">{customer1per} %</th>
                          </tr>
                          <tr className="text-white">
                            <th scope="col">2 </th>
                            <th scope="col">{this.state.top_customers['customer_2_name']} </th>
                            <th scope="col">{this.state.top_customers['customer_2_valueTotal']}€</th>
                            <th scope="col">{customer2per} %</th>
                          </tr>
                          <tr className="text-white" >
                            <th scope="col">3 </th>
                            <th scope="col">{this.state.top_customers['customer_3_name']} </th>
                            <th scope="col">{this.state.top_customers['customer_3_valueTotal']}€</th>
                            <th scope="col">{customer3per} %</th>
                          </tr>
                          <tr className="text-white">
                            <th scope="col">O </th>
                            <th scope="col">Outros </th>
                            <th scope="col">{othercustomer}€</th>
                            <th scope="col">{othersCus}%</th>
                          </tr>
                        </thead>
                      </table>
                    </div>

                  </div>

                  <div className="col-sm-12 col-xl-6 ">
                    <div className="bg-secondary text-center rounded p-4" style={{ height: 450 }}>
                      <div className="d-flex align-items-center justify-content-between mb-4" >
                        <h6 className="mb-0">Tipos de Produtos</h6>
                      </div>
                      <div >

                      <Bar options={optionsStacked3} data={dataOfTypesProducts} />

                      </div>
                    </div>
                  </div>

                  <div className="col-sm-12 col-xl-6">

                    <div className="bg-secondary text-center rounded p-4" style={{ height: 450 }}>
                      <div className="d-flex align-items-center justify-content-between mb-4" >
                        <h6 className="mb-0">Valor das Vendas por Mês</h6>
                      </div>
                      <Bar options={optionsStacked2} data={dataTopsalesperMonths} />
                    </div>
                  </div>
                </>
              }

              {this.state.finance === "finance" &&
                <>
                  <div className="col-sm-12 col-xl-6"  style={{ height: 400 }} >
                    <div className="bg-secondary text-center rounded p-4" >
                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <h6 className="mb-0" style={{ height: 55 }}>Top Produtos Vendidos  </h6>
                      </div>
                      <div >
                        <table className="table text-start align-middle table-bordered table-hover mb-0">
                          <thead>
                            <tr className="text-white">
                              <th scope="col">Top</th>
                              <th scope="col">Produtos</th>
                              <th scope="col">€/Unid </th>
                              <th scope="col">Quant</th>
                              <th scope="col">Valor Faturado</th>
                            </tr>
                          </thead>
                          <tbody>
                            <>
                              <tr className="text-white">
                                <td> 1 </td>
                                <td> {this.state.topproducts.product_description_1} </td>
                                <td> {this.state.topproducts.unit_price_product_1} </td>
                                <td> {this.state.topproducts.quantity_1}  </td>
                                <td> {total_won_1} €  </td>
                              </tr>
                              <tr className="text-white">
                                <td> 2 </td>
                                <td> {this.state.topproducts.product_description_2} </td>
                                <td> {this.state.topproducts.unit_price_product_2} </td>
                                <td> {this.state.topproducts.quantity_2} </td>
                                <td> {total_won_2} €  </td>
                              </tr>
                              <tr className="text-white">
                                <td> 3 </td>
                                <td> {this.state.topproducts.product_description_3} </td>
                                <td> {this.state.topproducts.unit_price_product_3} </td>
                                <td> {this.state.topproducts.quantity_3} </td>
                                <td> {total_won_3} €  </td>
                              </tr>
                            </>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>


                  <div className="col-sm-12 col-xl-6">

                    <div className="bg-secondary text-center rounded p-4">
                      <div className="d-flex align-items-center justify-content-between mb-4" >
                        <h6 className="mb-0">Vendas por Mês</h6>
                      </div>
                      <Bar options={optionsStacked2} data={dataTopsalesperMonths} />
                    </div>
                  </div>

                  <div className="col-sm-12 col-xl-6 ">
                    <div className="bg-secondary text-center rounded p-4" style={{ height: 750 }}>
                      <div className="d-flex align-items-center justify-content-between mb-4" >
                        <h6 className="mb-0">Top fornecedores último ano</h6>
                      </div>
                      <div >

                        <Pie data={dataSuppliers} height="370px"

                          width="370px"

                          options={{ maintainAspectRatio: false }} />

                      </div>
                      <table className="table text-start align-middle table-bordered table-hover mb-0" style={{ marginTop: 30 }}>
                        <thead>
                          <tr className="text-white">
                            <th scope="col">Top </th>
                            <th scope="col">Fornecedores  </th>
                            <th scope="col">Valor</th>
                            <th scope="col">Percentagem</th>
                          </tr>
                          <tr className="text-white">
                            <th scope="col">1 </th>
                            <th scope="col">{this.state.top_suppliers['supplier_1_name']} </th>
                            <th scope="col">{this.state.top_suppliers['supplier_1_valueTotal']}€</th>
                            <th scope="col">{supplier1per} %</th>
                          </tr>
                          <tr tr className="text-white" >
                            <th scope="col">2 </th>
                            <th scope="col">{this.state.top_suppliers['supplier_2_name']} </th>
                            <th scope="col">{this.state.top_suppliers['supplier_2_valueTotal']}€</th>
                            <th scope="col">{supplier2per} %</th>
                          </tr>
                          <tr tr className="text-white">
                            <th scope="col">3 </th>
                            <th scope="col">{this.state.top_suppliers['supplier_3_name']} </th>
                            <th scope="col">{this.state.top_suppliers['supplier_3_valueTotal']}€</th>
                            <th scope="col">{supplier3per} %</th>
                          </tr>
                          <tr tr className="text-white">
                            <th scope="col">O </th>
                            <th scope="col">Others </th>
                            <th scope="col">{otherSupplier}</th>
                            <th scope="col">{othersSup} %</th>
                          </tr>

                        </thead>
                      </table>
                    </div>

                  </div>

                  <div className="col-sm-12 col-xl-6 ">
                    <div className="bg-secondary text-center rounded p-4" style={{ height: 750 }}>
                      <div className="d-flex align-items-center justify-content-between mb-4" >
                        <h6 className="mb-0">Top Clientes último ano</h6>
                      </div>
                      <div >
                        <Pie data={dataCustomers} height="370px"

                          width="370px"

                          options={{ maintainAspectRatio: false }} />

                      </div>

                      <table className="table text-start align-middle table-bordered table-hover mb-0" style={{ marginTop: 30 }}>
                        <thead>
                          <tr className="text-white">
                            <th scope="col">Top </th>
                            <th scope="col">Cliente </th>
                            <th scope="col">Valor</th>
                            <th scope="col">Percentagem</th>
                          </tr>
                          <tr className="text-white">
                            <th scope="col">1 </th>
                            <th scope="col">{this.state.top_customers['customer_1_name']} </th>
                            <th scope="col">{this.state.top_customers['customer_1_valueTotal']}€</th>
                            <th scope="col">{customer1per} %</th>
                          </tr>
                          <tr className="text-white">
                            <th scope="col">2 </th>
                            <th scope="col">{this.state.top_customers['customer_2_name']} </th>
                            <th scope="col">{this.state.top_customers['customer_2_valueTotal']}€</th>
                            <th scope="col">{customer2per} %</th>
                          </tr>
                          <tr className="text-white" >
                            <th scope="col">3 </th>
                            <th scope="col">{this.state.top_customers['customer_3_name']} </th>
                            <th scope="col">{this.state.top_customers['customer_3_valueTotal']}€</th>
                            <th scope="col">{customer3per} %</th>
                          </tr>
                          <tr className="text-white">
                            <th scope="col">O </th>
                            <th scope="col">Outros </th>
                            <th scope="col">{othercustomer}€</th>
                            <th scope="col">{othersCus}%</th>
                          </tr>
                        </thead>
                      </table>
                    </div>

                  </div>

                </>
              }

              {this.state.finance === "armazem" &&
                <>
                  <div className="col-sm-12 col-xl-6 ">
                    <div className="bg-secondary text-center rounded p-4" style={{ height: 450 }}>
                      <div className="d-flex align-items-center justify-content-between mb-4" >
                        <h6 className="mb-0">Tipos de Produtos</h6>
                      </div>
                      <div >

                        <Bar options={optionsStacked3} data={dataOfTypesProducts} />
                      </div>

                    </div>

                  </div>
                  <div className="col-sm-12 col-xl-6 ">
                    <div className="bg-secondary text-center rounded p-4" style={{ height: 450 }}>
                      <div className="d-flex align-items-center justify-content-between mb-4" >
                        <h6 className="mb-0">Fornecedores por País</h6>
                      </div>
                      <div >
                        <Pie options={{
                          maintainAspectRatio: false, legend: {
                            labels: { color: 'rgba(153, 102, 255, 0.2)' }
                          },
                        }} data={dataSuppliersByCountry} height="370px"

                          width="370px"

                        >

                        </Pie>
                      </div>

                    </div>

                  </div>

                </>
              }

            </div>
          </div>

          <div className="container-fluid pt-4 px-4">
            <div className="bg-secondary text-center rounded p-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h6 className="mb-0">Vendas Recentes</h6>
                <a href="/sales">Ver todas</a>
              </div>
              <div className="table-responsive">
                <table className="table text-start align-middle table-bordered table-hover mb-0">
                  <thead>
                    <tr className="text-white">
                      <th scope="col">Invoice ID</th>
                      <th scope="col">Customer ID</th>
                      <th scope="col">Date</th>
                      <th scope="col">Tax Payable</th>
                      <th scope="col">Net Total</th>
                      <th scope="col">Gross Total</th>
                      <th scope="col">Fiscal Year</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (

                      <>
                        <tr className="text-white">
                          <td> {invoice.invoice_id} </td>
                          <td> {invoice.customer_id} </td>
                          <td> {invoice.invoice_date} </td>
                          <td style={{ textAlign: 'right' }}> {invoice.tax_payable} € </td>
                          <td style={{ textAlign: 'right' }}> {invoice.net_total} € </td>
                          <td style={{ textAlign: 'right' }}> {invoice.gross_total} €  </td>
                          <td> {invoice.fiscal_year} </td>
                          <td>
                            <Link className="btn btn-sm btn-primary" to={"/sales/" + invoice.invoice_id}>
                              Details
                            </Link>
                          </td>
                        </tr>
                      </>

                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="container-fluid pt-4 px-4">
            <div className="bg-secondary text-center rounded p-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h6 className="mb-0">Compras Recentes</h6>
                <a href="/purchases">Ver todas</a>
              </div>
              <div className="table-responsive">
                <table className="table text-start align-middle table-bordered table-hover mb-0">
                  <thead>
                    <tr className="text-white">
                      <th scope="col">Transaction ID</th>
                      <th scope="col">Description</th>
                      <th scope="col">Date</th>
                      <th scope="col">Posting Date</th>
                      <th scope="col">Action</th>
                    </tr>

                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (

                      <>
                        <tr className="text-white">
                          <td> {transaction.transaction_id} </td>
                          <td> {transaction.description} </td>
                          <td> {transaction.transaction_date} </td>
                          <td> {transaction.posting_date} </td>
                          <td>
                            <Link className="btn btn-sm btn-primary" to={"/purchases/" + transaction.transaction_id}>
                              Details
                            </Link>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="container-fluid pt-4 px-4">
            <div className="bg-secondary rounded-top p-4">
              <div className="row">
                <div className="col-12 col-sm-6 text-center text-sm-start">
                  © <a href="#">Engenheiros das Peles, Lda.</a>, All Right Reserved.
                </div>
                <div className="col-12 col-sm-6 text-center text-sm-end">
                  Designed By <b>Grupo 1 - SIO</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage