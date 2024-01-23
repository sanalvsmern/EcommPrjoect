import React from 'react'
import { Form, InputGroup, Table } from 'react-bootstrap'
import Header from '../Header'
import Footer from '../Footer'

function EditAddedItem() {

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
                    // onChange={handleInput}
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
                    // onChange={handleInput}
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
                    // onChange={handleInput}
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
                    // onChange={handleInput}
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
                    // onChange={handleInput}
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
                    // onChange={handleInput}
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
                    // onChange={handleInput}
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
                    // onChange={handleInput}
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
                    // onChange={handleInput}
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
                    // onChange={handleInput}
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

export default EditAddedItem










{/* <Container className='viewProductClass'>

        {products.lengtd > 0 ? (
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={products[0].url} />
            <Card.Body>
              <Card.Title>{products[0].title}</Card.Title>
              <Card.Text>
                Description about the product
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Category: {products[0].albumId}</ListGroup.Item>
              <ListGroup.Item>Price: {products[0].albumId}</ListGroup.Item>
            </ListGroup>
            <Card.Body style={{display:'flex', justifyContent:'center'}}>
              <Card.Link href="#">
                <Button variant="secondary">Add to cart</Button>
              </Card.Link>
              <Card.Link>
                <Button variant="warning">Buy Now</Button>
              </Card.Link>
            </Card.Body>
          </Card>
        ) : (<p>Loading...</p>)}
      </Container> */}




