import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, ListGroup, Row, Spinner } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from './Header';
import Footer from './Footer';
import SubHeader from './SubHeader';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

function Homepage() {

    const { categoryId } = useParams();
    const [loading, setLoading] = useState(true);
    const [conPerPage, setConPerPage] = useState(0);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate()


    const token = sessionStorage.getItem('token')
    const decodedToken = token ? jwtDecode(token) : null
    const userId = decodedToken ? decodedToken.userId : null

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

    const handleAddToCart = (product) => {
        if (userId) {
            // Get existing cart cookie or create an empty one
            const cartCookie = Cookies.get(userId) || '{}';
            const parsedCartCookie = JSON.parse(cartCookie);

            // Check if the product is already in the cart
            if (parsedCartCookie[product.productId]) {
                // Update existing product quantity
                parsedCartCookie[product.productId].quantity += 1;
                Cookies.set(userId, JSON.stringify(parsedCartCookie))
                toast.success('Product added to existing cart entry');
            } else {
                parsedCartCookie[product.productId] = {
                    productDetails: product,
                    quantity: 1,
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
            <Header></Header>
            <SubHeader></SubHeader>
            <div style={{ width: '97%', paddingLeft: '3%' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {loading ? (<Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>) :
                        (<Row>
                            {products.map((product) => (
                                <Col xs={12} md={4} lg={3} key={product.productId}>
                                    <Card style={{ width: '18rem', height: '30rem', marginBottom: '2rem' }}>
                                        <Card.Img variant="top" src={product.productImage} />
                                        <Card.Body>
                                            <Card.Title>{product.productName}</Card.Title>
                                            <Card.Text>
                                                Price: {product.price}</Card.Text>
                                        </Card.Body>
                                        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                                            <Link to={`/ViewProduct/${product.productId}`}>
                                                <Button variant="secondary">View Product</Button>
                                            </Link>
                                            <Button onClick={() => handleAddToCart(product)} variant="warning">Add to cart</Button>
                                        </div>

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