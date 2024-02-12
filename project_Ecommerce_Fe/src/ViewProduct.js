import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { toast } from 'react-toastify'
import SubHeader from './SubHeader'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

function ViewProduct() {

  const { productId } = useParams();
  const [product, setProduct] = useState('')
  const navigate = useNavigate()

  const token = sessionStorage.getItem('token')
  const decodedToken = token ? jwtDecode(token) : null
  const userId = decodedToken ? decodedToken.userId : null
  const [qty, setQty] = useState(1);
  const [selectedQty, setSelectedQty] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/viewProduct/${productId}`)
        setProduct(response.data)

      } catch (error) {
        const { status, data } = error.response;
        if (status === 404) {
          toast.error(data.message)
          navigate('/Homepage')
        } else if (status === 500) {
          toast.error(data.message)
        }
      }
    }

    fetchProduct()

  }, [productId])

  // const handleAddToCart = ()=>{
  //   // Save data to sessionStorage
  //   sessionStorage.setItem('addedToCart', productId);
  //   navigate('/User/CheckoutPage')
  // }

  const handleAddToCart=() => {
    if (userId) {
      // Get existing cart cookie or create an empty one
      const cartCookie = Cookies.get(userId) || '{}';
      const parsedCartCookie = JSON.parse(cartCookie);

      // Check if the product is already in the cart
      if (parsedCartCookie[productId]) {
        // Update existing product quantity
        parsedCartCookie[productId].quantity += qty;
        Cookies.set(userId, JSON.stringify(parsedCartCookie))
        console.log('Product added to existing cart entry');
      } else {
        parsedCartCookie[productId] = {
          productDetails: product,
          quantity: qty+selectedQty,
        }
        Cookies.set(userId, JSON.stringify(parsedCartCookie))
        toast.success('Added to cart successfully')
      }
    } else {
      toast.error("Please signin to proceed")
      navigate('/Homepage/Signin')
    }
  }

  return (
    <div>
      <Header />
      <SubHeader></SubHeader>
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
                <Button variant="outline-secondary mt-2" onClick={handleAddToCart}>Add To Cart</Button>
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



