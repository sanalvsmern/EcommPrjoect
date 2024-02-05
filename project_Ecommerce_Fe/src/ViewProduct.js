import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, CardLink, Container, ListGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function ViewProduct() {

  const navigate = useNavigate()

  const handleClickHome = () => {
    navigate('/Homepage')
  }

  // const [products, setProducts] = useState([])
  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const product = await axios.get(`http://localhost:5000/api/admin/productsRoutes$`);
  //       const productData = product.data;

  //       setProducts(productData)
  //     }
  //     catch (error) {
  //       console.log('Error fetching data', error);

  //     }
  //   }
  //   fetchProduct();
  // }, [])

  const product = {
    sellerId: "65b7755eacf7ec42c0617cb8",
    productId: "casio",
    productName: "casio watch",
    categoryId: "watch",
    description: "normal casio watch",
    price: 300,
    isAvailable: true,
    productImage: "https://i.postimg.cc/L6TSbqNs/casio-Watch.jpg",
    rating: "3",
    review: "Nice",
    vendorName: "casio manufacturer",
    warranty: "2 years"
  };

  return (
    <div>
      <Header buttonToggle={true}/>
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



