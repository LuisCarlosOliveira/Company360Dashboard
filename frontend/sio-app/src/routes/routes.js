import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from '../pages/home';
import SalesInvoiceDetails from '../pages/sales-invoice-details';
import PurchasesInvoiceDetails from '../pages/purchases-invoice-details';
import Purchases from '../pages/purchases';
import Sales from '../pages/sales';
import Clients from '../pages/clients';
import Suppliers from '../pages/suppliers';
import Products from '../pages/products';
import SuppliersDetails from '../pages/suppliers-details';
import Debtors from '../pages/debtors';
import Login from '../pages/login';

function Routing() {
 
  return (
    <>
    <Router>
      <Routes>
       <Route exact path='/' element={< Login />} />
        <Route path='/home' element={< HomePage />} />
        <Route path='/clients' element={< Clients />} />
        <Route path='/suppliers' element={< Suppliers />} />
        <Route path="/suppliers/:supplierId" element={<SuppliersDetails />} />
        <Route path='/products' element={< Products />} />
        <Route path='/purchases' element={< Purchases />} />
        <Route path="/purchases/:transactionId" element={<PurchasesInvoiceDetails />} />
        <Route path='/sales' element={< Sales />} />
        <Route path="/sales/:invoiceId" element={<SalesInvoiceDetails />} />
        <Route path="/debtors" element={<Debtors />} />
      </Routes>
    </Router>
  </>
  );
}

export default Routing;