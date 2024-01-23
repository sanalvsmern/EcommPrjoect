import React from 'react'
import { Button, Table } from 'react-bootstrap'
import Header from '../Header'
import Footer from '../Footer'


function AddedItems() {
  return (
    <div>
      <Header buttonToggle={true}/>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Category Id</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Vendor Name</th>
            <th>Warrenty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="warning" style={{ margin: '2px' }}>Edit</Button>
              <Button variant="primary" style={{ margin: '2px' }}>View</Button>
              <Button variant="danger" style={{ margin: '2px' }}>delete</Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <Footer />
    </div>
  )
}

export default AddedItems