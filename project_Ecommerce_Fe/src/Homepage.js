import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, ListGroup, Row, Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from './Header';
import Footer from './Footer';
import SubHeader from './SubHeader';

function Homepage() {

    const { categoryId } = useParams();
    const [loading, setLoading] = useState(true);
    const [conPerPage, setConPerPage] = useState(0);
    const [products, setProducts] = useState([])

    useEffect(() => {

        if (categoryId === 'all') {
            const fetchProduct = async () => {

                try {
                    const response = await axios.get(`http://localhost:5000/api/admin/allProducts`);
                    const newResponse = response.data.slice(conPerPage, conPerPage + 12)
                    setProducts(newResponse)
                    setLoading(false)
                    console.log(categoryId);
                } catch (error) {
                    const { status, data } = error.response;
                    if (status === 404) {
                        toast.error(data.message);
                    } else if (status === 500) {
                        toast.error(data.message)
                    }
                }
            }
            fetchProduct()
        } else if (categoryId !== 'all') {
            const fetchFilteredProducts = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/admin/filteredProducts/${categoryId}`)
                    const newResponse = response.data.slice(conPerPage, conPerPage + 12)
                    setProducts(newResponse)
                    setLoading(false)
                    console.log(categoryId);
                } catch (error) {
                    const { status, data } = error.response;
                    if (status === 404) {
                        toast.error(data.message);
                    } else if (status === 500) {
                        toast.error(data.message)
                    }
                }
            }
            fetchFilteredProducts()
        }

    }, [categoryId, conPerPage])

    return (
        <div>
            <Header></Header>
            <SubHeader></SubHeader>
            <div style={{ width: '97%', paddingLeft: '3%' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {loading ? (<Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>) :
                        (<Row>
                            {products.map((product) => (
                                <Col xs={12} md={4} lg={3} key={product._id}>
                                    <Card style={{ width: '18rem', height: '30rem', marginBottom: '2rem' }}>
                                        <Card.Img variant="top" src={product.productImage} />
                                        <Card.Body>
                                            <Card.Title>{product.productName}</Card.Title>
                                            <Card.Text>
                                                Price: {product.price}</Card.Text>
                                            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                                                <Link to={`/ViewProduct/${product.productId}`}>
                                                    <Button variant="warning">View Product</Button>
                                                </Link>
                                                <Button variant="secondary">Add to cart</Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>)
                    }
                </div>
                <Row>
                    <Col className='pageButton'>
                        <Button variant="outline-secondary" onClick={() => setConPerPage(prev => Math.max(prev - 12, 0))}>Prev</Button>
                        <Button variant="outline-secondary" onClick={() => setConPerPage(prev => Math.max(prev + 12, 0))}>Next</Button>
                    </Col>
                </Row>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Homepage