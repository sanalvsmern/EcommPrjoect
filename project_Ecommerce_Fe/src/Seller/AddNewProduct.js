import React, { useState } from 'react'
import { Form, InputGroup, Table } from 'react-bootstrap'
import Header from '../Header'
import Footer from '../Footer'

function AddNewProduct() {

  const [variable, setVariable] = useState({
    SellerId: "",
    ProductId: "",
    ProductName: "",
    ProductImage: "",
    CategoryId: "",
    Price: "",
    IsAvailable: "",
    Rating: "",
    Review: "",
    VendorName: "",
    Warranty: ""
  })

  const handleInput = (e) => {
    const { name, value } = e.target;
    setVariable({ ...variable, [name]: value })
  }

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
                    onChange={handleInput}
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
                    onChange={handleInput}
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
                    onChange={handleInput}
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
                    onChange={handleInput}
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
                    onChange={handleInput}
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
                    onChange={handleInput}
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
                    onChange={handleInput}
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
                    onChange={handleInput}
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
                    onChange={handleInput}
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
                    onChange={handleInput}
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
                    onChange={handleInput}
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

export default AddNewProduct