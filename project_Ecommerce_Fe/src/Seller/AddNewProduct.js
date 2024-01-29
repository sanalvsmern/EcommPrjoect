import React, { useEffect, useState } from 'react'
import { Form, InputGroup, Table } from 'react-bootstrap'
import Header from '../Header'
import Footer from '../Footer'
import { useNavigate } from 'react-router-dom'

function AddNewProduct() {

  const token = sessionStorage.getItem('token')
  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/Homepage');
    } else {
      return (
        <div>
          <Header buttonToggle={true}/>
          <Form>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Input Data</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Seller Id</td>
                  <td>
                    <InputGroup>
                      <Form.Control
                        // onChange={handleInput}
                        name="SellerId"
                      />
                    </InputGroup>
                  </td>
                </tr>
                <tr>
                  <td>Product Id</td>
                  <td>
                    <InputGroup>
                      <Form.Control
                       
                        name="ProductId"
                      />
                    </InputGroup>
                  </td>
                </tr>
                <tr>
                  <td>Product Name</td>
                  <td>
                    <InputGroup>
                      <Form.Control
                        
                        name="ProductName"
                      />
                    </InputGroup>
                  </td>
                </tr>
                <tr>
                  <td>Product Image</td>
                  <td>
                    <InputGroup>
                      <Form.Control
                        
                        name="ProductImage"
                      />
                    </InputGroup>
                  </td>
                </tr>
                <tr>
                  <td>Category Id</td>
                  <td>
                    <InputGroup>
                      <Form.Control
                        
                        name="CategoryId"
                      />
                    </InputGroup>
                  </td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>
                    <InputGroup>
                      <Form.Control
                        
                        name="Price"
                      />
                    </InputGroup>
                  </td>
                </tr>
                <tr>
                  <td>Is Available</td>
                  <td>
                    <InputGroup>
                      <Form.Control
                        
                        name="IsAvailable"
                      />
                    </InputGroup>
                  </td>
                </tr>
                <tr>
                  <td>Rating</td>
                  <td>
                    <InputGroup>
                      <Form.Control
                        
                        name="Rating"
                      />
                    </InputGroup>
                  </td>
                </tr>
                <tr>
                  <td>Review</td>
                  <td>
                    <InputGroup>
                      <Form.Control
                        
                        name="Review"
                      />
                    </InputGroup>
                  </td>
                </tr>
                <tr>
                  <td>Vendor Name</td>
                  <td>
                    <InputGroup>
                      <Form.Control
                        
                        name="VendorName"
                      />
                    </InputGroup>
                  </td>
                </tr>
                <tr>
                  <td>Warranty</td>
                  <td>
                    <InputGroup>
                      <Form.Control
                        
                        name="Warranty"
                      />
                    </InputGroup>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Form>
          <Footer/>
        </div>
      )
    }
  })

}

export default AddNewProduct