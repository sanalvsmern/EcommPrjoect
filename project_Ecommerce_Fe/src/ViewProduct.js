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

  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await axios.get(`http://localhost:5000/api/admin/productsRoutes$`);
        const productData = product.data;

        setProducts(productData)
      }
      catch (error) {
        console.log('Error fetching data', error);

      }
    }
    fetchProduct();
  }, [])

  return (
    <div>
      <Header buttonToggle={true}/>
      <Container className='viewProductClass'>
        {products.length > 0 ? (
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
            <Card.Body style={{ display: 'flex', justifyContent: 'center' }}>
              <Card.Link href="#">
                <Button variant="secondary">Add to cart</Button>
              </Card.Link>
              <Card.Link>
                <Button variant="warning">Buy Now</Button>
              </Card.Link>
              <Card.Link>
                <div onClick={handleClickHome}>🏠</div>
              </Card.Link>
            </Card.Body>
          </Card>
        ) : (<p>Loading...</p>)}
      </Container>
      <Footer />
    </div>
  )
}

export default ViewProduct



