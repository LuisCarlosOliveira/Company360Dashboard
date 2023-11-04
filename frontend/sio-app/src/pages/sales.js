import React, { Component } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';

class Sales extends Component {

    state = {
        invoices: [],
        products_by_month: []
    };

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        };

        fetch('http://localhost:3001/invoices/', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ invoices: data }));

      /*  fetch('http://localhost:3001/payments/topproductsbymonth', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ products_by_month: data }));

            
            {products_by_month.map((month) => (
                <>
               <h1>{month.month} </h1>
               <h3>{month.number1.product_description} </h3>
               </>

           ))}*/


    }

    render() {
        const { products_by_month } = this.state;
        let cont = 0;



        const { invoices } = this.state;

        return (

            <div className="container-fluid pt-4 px-4">
                <div className="bg-secondary text-center rounded p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h3 className="mb-0">Sales Of Last Year</h3>
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
                                            <td style={{ textAlign: 'right' }}> {invoice.net_total} €</td>
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
                            <div className="text-center text-sm-start"><br />
                                <FaArrowLeft color='white' /><a href="/home"> Go Back </a>
                            </div>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sales;