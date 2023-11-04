import React, { Component } from 'react';
import { FaArrowLeft } from "react-icons/fa";

class SuppliersDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            suppliersdetails: [],
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

        fetch("http://localhost:3001/suppliers/" + window.location.href.split('/')[4], requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ suppliersdetails: data }));
    }

    render() {
        
        const { suppliersdetails } = this.state;

        return (
            <div className="container-fluid pt-3 px-3">
                <div className="bg-secondary text-center rounded p-3">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h3> Supplier's ID : {this.state.id}</h3>
                    </div>
                 
                    <div className="table-responsive">
                        <table className="table text-start align-middle table-bordered table-hover mb-0">
                            <thead>
                           
                                <tr className="text-white">
                                    <th scope="col">Supplier ID</th>
                                    <th scope="col">Supplier Tax ID</th>
                                    <th scope="col">Company Name</th>
                                    <th scope="col">City</th>
                                    <th scope="col">Postal Code</th>
                                    <th scope="col">Address Details</th>
                                    <th scope="col">Country</th>
                                </tr>
                       
                            </thead>
                            
                            <tbody>
                            {suppliersdetails.map((supplier) => (
                              <>
                                 <tr className="text-white">                     
                                      <td> {supplier.supplier_id} </td>
                                      <td> {supplier.supplier_tax_id}</td>
                                      <td> {supplier.company_name} </td>
                                      <td> {supplier.city} </td>
                                      <td> {supplier.postal_code} </td>
                                      <td> {supplier.address_detail} </td>
                                      <td> {supplier.country} </td>    
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

export default SuppliersDetails;