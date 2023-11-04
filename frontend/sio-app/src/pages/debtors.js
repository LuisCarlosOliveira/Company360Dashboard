import React, { Component } from 'react';
import { FaArrowLeft } from "react-icons/fa";

class Debtors extends Component {

    state = {
        debtors: []
    };

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        };

        fetch('http://localhost:3001/payments/indebted', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ debtors: data }));
    }


    render() {

        const { debtors } = this.state;

        return (
            <div className="container-fluid pt-4 px-4">
                <div className="bg-secondary text-center rounded p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h3 className="mb-0">Debtors</h3>
                    </div>
                    <div className="table-responsive">
                        <table className="table text-start align-middle table-bordered table-hover mb-0">
                            <thead>
                                <tr className="text-white">
                                    <th scope="col">Invoice ID</th>
                                    <th scope="col">Customer</th>
                                    <th scope="col">Tax Payable</th>
                                    <th scope="col">Net Total</th>
                                    <th scope="col">Gross Total</th>
                                    <th scope="col">Fiscal Year</th>
                                    <th scope="col">Date</th>
                                </tr>
                            </thead>
                            <tbody>

                                {debtors.map((debtor) => (
                                    <>
                                        <tr className="text-white">
                                            <td> {debtor.invoice_id} </td>
                                            <td> {debtor.company_name} </td>
                                            <td style={{ textAlign: 'right' }}> {debtor.tax_payable} € </td>
                                            <td style={{ textAlign: 'right' }}> {debtor.net_total} €</td>
                                            <td style={{ textAlign: 'right' }}> {debtor.gross_total} €  </td>
                                            <td> {debtor.fiscal_year} </td>
                                            <td> {debtor.invoice_date} </td>
                                        </tr>
                                    </>
                                ))}

                            </tbody>
                            <div className="text-center text-sm-start"><br />
                                <FaArrowLeft color='white' /> <a href="/home"> Go Back </a>
                            </div>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Debtors;