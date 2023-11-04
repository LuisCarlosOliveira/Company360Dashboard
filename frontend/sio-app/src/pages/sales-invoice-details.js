import React, { Component } from 'react';
import { FaArrowLeft } from "react-icons/fa";

class SalesInvoiceDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            invoicedetails: {},
            invoicelines: [],
            id: " "
        }

        document.title = "Engenheiros das Peles, Lda"
    }

    componentDidMount() {

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        };

        this.setState({ id: window.location.href.split('/')[4] });


        fetch("http://localhost:3001/invoices/" + window.location.href.split('/')[4], requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ invoicelines: data["invoicelines"], invoicedetails: data["invoicedetail"] }))

    }

    render() {

        const { invoicedetails, invoicelines } = this.state;

        return (
            <div className="container-fluid pt-3 px-3">
                <div className="bg-secondary text-center rounded p-3">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h3> Sale's Invoice: {this.state.id}</h3>
                    </div>

                    <div className="table-responsive">
                        <table className="table text-start align-middle table-bordered table-hover mb-0">
                            <thead>

                                <tr className="text-white">
                                    <th scope="col">Invoice ID</th>
                                    <th scope="col">Customer ID</th>
                                    <th scope="col">Company Name</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">City</th>
                                    <th scope="col">Postal Code</th>
                                    <th scope="col">Address Details</th>
                                    <th scope="col">Country</th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr className="text-white">
                                    <td> {invoicedetails.invoice_id} </td>
                                    <td> {invoicedetails.customer_id} </td>
                                    <td> {invoicedetails.company_name} </td>
                                    <td> {invoicedetails.invoice_date} </td>
                                    <td> {invoicedetails.city} </td>
                                    <td> {invoicedetails.postal_code} </td>
                                    <td> {invoicedetails.address_detail} </td>
                                    <td> {invoicedetails.country} </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
                
                <br />  <br />
                
                <div className="bg-secondary text-center rounded p-3">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h3> Products Sold: </h3>
                    </div>
                    <div className="table-responsive">
                        <table className="table text-start align-middle table-bordered table-hover mb-0">
                            <thead>

                                <tr className="text-white">

                                    <th scope="col">Product Code</th>
                                    <th scope="col">Line Number</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Unit Price</th>
                                    <th scope="col">Credit Amount</th>
                                    <th scope="col">Unit Of Measure</th>
                                    <th scope="col">Tax Type</th>
                                    <th scope="col">Tax Percentage</th>

                                </tr>

                            </thead>

                            <tbody>

                                {invoicelines.map((inv) => (
                                    
                                    <>
                                        <tr className="text-white">
                                            <td> {inv.product_code} </td>
                                            <td> {inv.line_number} </td>
                                            <td> {inv.quantity} unid. </td>
                                            <td> {inv.unit_price} € </td>
                                            <td style={{ textAlign: 'right' }}> {inv.credit_amount} € </td>
                                            <td> {inv.unit_of_measure}  </td>
                                            <td> {inv.tax_type} </td>
                                            <td> {inv.tax_percentage} % </td>

                                        </tr>
                                    </>
                                ))}

                            </tbody>

                            <div className="text-center text-sm-start"><br />
                                <FaArrowLeft /> <a href="/home"> Go Back </a>
                            </div>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default SalesInvoiceDetails;