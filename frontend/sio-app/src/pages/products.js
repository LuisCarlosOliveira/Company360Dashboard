import React, { Component } from 'react';
import { FaArrowLeft } from "react-icons/fa";

class Products extends Component {

    state = {
        products: []
    };

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        };

        fetch('http://localhost:3001/products/', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ products: data }));
    }


    render() {

        const { products } = this.state;

        return (
            <div className="container-fluid pt-4 px-4">
                <div className="bg-secondary text-center rounded p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h3 className="mb-0">Products</h3>
                    </div>
                    <div className="table-responsive">
                        <table className="table text-start align-middle table-bordered table-hover mb-0">
                            <thead>
                                <tr className="text-white">
                                    <th scope="col">Product Code</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Number Code</th>
                                    <th scope="col">Group</th>
                                    <th scope="col">Type</th>
                                </tr>
                            </thead>
                            <tbody>

                                {products.map((product) => (
                                    <>
                                        <tr className="text-white">
                                            <td> {product.product_code} </td>
                                            <td> {product.product_description} </td>
                                            <td> {product.product_number_code}  </td>
                                            <td> {product.product_group} </td>
                                            <td> {product.product_type} </td>
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

export default Products;