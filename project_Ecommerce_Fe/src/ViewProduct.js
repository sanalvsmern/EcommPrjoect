import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, CardLink, Container, ListGroup } from 'react-bootstrap'
import { Navigate, useParams } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { toast } from 'react-toastify'

function ViewProduct() {

  const { productId }= useParams();
  const [product, setProduct] = useState('')

  useEffect (()=>{
    const fetchProduct = async ()=>{
      try{
        const response = await axios.get(`http://localhost:5000/api/admin/viewProduct/${productId}`)
        setProduct(response.data)

      } catch(error){
        const { status, data } = error.response;
        if(status === 404){
          toast.error(data.message)
          Navigate('/Homepage')
        } else if(status === 500){
          toast.error(data.message)
        }
      }
    }

    fetchProduct()

  },[productId])

  return (
    <div>
      <Header/>
      <Container className='viewProductClass'>
        {product ? (
          <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={product.productImage} />
          <Card.Body>
            <Card.Title>{product.productName}</Card.Title>
            <Card.Text> {product.description}</Card.Text>
            <Card.Text> Price: {product.price}</Card.Text>
            <Card.Text> Rating: {product.rating}</Card.Text>
            <Card.Text> Review: {product.review}</Card.Text>
            <Card.Text> Vendor Name: {product.vendorName}</Card.Text>
            <Card.Text> Warranty: {product.warranty}</Card.Text>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <Button variant="outline-secondary mt-2">Add To Cart</Button>
            <Button variant="outline-secondary mt-2">Buy Now</Button>
            </div>
          </Card.Body>
        </Card>
        ) : (<p>Loading...</p>)}
      </Container>
      <Footer />
    </div>
  )
}

export default ViewProduct



