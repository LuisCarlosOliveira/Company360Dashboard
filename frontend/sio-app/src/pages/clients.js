import React, { Component } from 'react';
import { FaArrowLeft } from "react-icons/fa";

class Clients extends Component {

    state = {
        clients: []
    };

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        };

        fetch('http://localhost:3001/customers/', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ clients: data }));
    }


    render() {
        //console.log(this.state.clients)
        const { clients } = this.state;

        return (
            <div className="container-fluid pt-4 px-4">
                <div className="bg-secondary text-center rounded p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h3 className="mb-0">Clients</h3>
                    </div>
                    <div className="table-responsive">
                        <table className="table text-start align-middle table-bordered table-hover mb-0">
                            <thead>
                                <tr className="text-white">
                                    <th scope="col">Customer ID</th>
                                    <th scope="col">Tax ID</th>
                                    <th scope="col">Company Name</th>
                                </tr>
                            </thead>
                            <tbody>

                                {clients.map((client) => (
                                    <>
                                        <tr className="text-white">
                                            <td> {client.customer_id} </td>
                                            <td> {client.customer_tax_id} </td>
                                            <td> {client.company_name}  </td>
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

export default Clients;