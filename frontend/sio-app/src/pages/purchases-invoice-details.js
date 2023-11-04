import React, { Component } from 'react';
import { FaArrowLeft } from "react-icons/fa";

class PurchasesInvoiceDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            transactiondetails: {},
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


        fetch("http://localhost:3001/transactions/" + window.location.href.split('/')[4], requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ transactiondetails: data }));

    }

    render() {

        const { transactiondetails } = this.state;
        const description = transactiondetails.description;

        return (
            <div className="container-fluid pt-3 px-3">
                <div className="bg-secondary text-center rounded p-3">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h3 className="mb-0">Purchase From: {description}</h3>
                    </div>

                    <div className="table-responsive">
                        <table className="table text-start align-middle table-bordered table-hover mb-0">
                            <thead>

                                <tr className="text-white">
                                    <th scope="col">Transaction Line ID</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Credit Amount</th>
                                    <th scope="col">Debit Amount</th>
                                    <th scope="col">Transaction Date</th>
                                    <th scope="col">Posting Date</th>

                                </tr>

                            </thead>

                            <tbody>
                                <tr className="text-white">
                                    <td> {transactiondetails.transaction_line_id} </td>
                                    <td> {transactiondetails.transaction_id} </td>
                                    <td> {transactiondetails.description} </td>
                                    <td style={{ textAlign: 'right' }}> {transactiondetails.credit_amount} €  </td>
                                    <td style={{ textAlign: 'right' }}> {transactiondetails.debit_amount} € </td>
                                    <td> {transactiondetails.transaction_date} </td>
                                    <td> {transactiondetails.posting_date}  </td>
                                </tr>
                            </tbody>

                            <div className="text-center text-sm-start"><br/>
                                <FaArrowLeft /> <a href="/home"> Go Back </a>
                            </div>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default PurchasesInvoiceDetails;