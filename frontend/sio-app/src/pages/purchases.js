import React, { Component } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';

class Purchases extends Component {

    state = {
        transactions: []
    };

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        };

        fetch('http://localhost:3001/transactions/', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ transactions: data }));
    }

    render() {

        const { transactions } = this.state;
 
        return (
            <div className="container-fluid pt-4 px-4">
                <div className="bg-secondary text-center rounded p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h3 className="mb-0">Purchases Of Last Year</h3>
                    </div>
                    <div className="table-responsive">
                        <table className="table text-start align-middle table-bordered table-hover mb-0">
                            <thead>
                                <tr className="text-white">
                                    <th scope="col">Transaction ID</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Posting Date</th>
                                    <th scope="col">Transaction Type</th>
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
                                      <td> {transaction.transaction_type} </td>
                                      <td>
                                       <Link className="btn btn-sm btn-primary" to= {"/purchases/" + transaction.transaction_id}>
                                      Details
                                      </Link>
                                      </td>
                                  </tr>
                              </>
                      ))}
                            </tbody>
                            <div className="text-center text-sm-start"><br/>
                                <FaArrowLeft color='white'/> <a href="/home"> Go Back </a>
                            </div>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Purchases;