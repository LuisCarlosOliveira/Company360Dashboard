import React, { Component } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';

class Suppliers extends Component {

    state = {
        suppliers: []
    };

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        };

        fetch('http://localhost:3001/suppliers/', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ suppliers: data }));
          
    }


    render() {

        const { suppliers } = this.state;

        return (
            <div className="container-fluid pt-4 px-4">
                <div className="bg-secondary text-center rounded p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h3 className="mb-0">Suppliers</h3>
                    </div>
                    <div className="table-responsive">
                        <table className="table text-start align-middle table-bordered table-hover mb-0">
                            <thead>
                                <tr className="text-white">
                                    <th scope="col">ID</th>
                                    <th scope="col">Tax ID</th>
                                    <th scope="col">Company Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Contact</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {suppliers.map((supplier) => (
                                    <>
                                        <tr className="text-white">
                                            <td> {supplier.supplier_id} </td>
                                            <td> {supplier.supplier_tax_id} </td>
                                            <td> {supplier.company_name}  </td>
                                            <td> {supplier.email}  </td>
                                            <td> {supplier.contact}  </td>
                                            <td>
                                             <Link className="btn btn-sm btn-primary" to= {"/suppliers/" + supplier.supplier_id}>
                                            Details
                                            </Link>
                                            </td>
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

export default Suppliers;