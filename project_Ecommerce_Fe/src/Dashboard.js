import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, ListGroup, Row, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
// import PropTypes from 'prop-types';

// Dashboard.propTypes = {
//     category: PropTypes.string.isRequired,
// };

// Dashboard.defaultProps = {
//     category: 'defaultCategory',
// };

function Dashboard(props) {

    const [loading, setLoading] = useState(true);
    const [conPerPage, setConPerPage] = useState(0);
    const [products, setProducts] = useState('')
    

    useEffect(() => {

        if(props.category === 'all'){
            const fetchProduct = async () => {

                try {
                    const response = await axios.get(`http://localhost:5000/api/admin/allProducts`);
                    const newResponse = response.data.slice(conPerPage, conPerPage + 12)
                    setProducts(newResponse)
                    console.log(newResponse);
                    setLoading(false)
                    console.log(props.category);
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
        } else {
            console.log('code pending');
        }
        
    },[props.category])

const handleClick4 = () => {
        setConPerPage(prev => Math.max(prev + 12, 0))
    }

    const handleClick5 = () => {
        setConPerPage(prev => Math.max(prev - 12, 0))
    }

    return (
        <div style={{width:'97%', paddingLeft: '3%'}}>
            <div style={{display:'flex', justifyContent:'center'}}>
                {loading ? (<Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>) :
                    (<Row>
                        {products.map((product) => (
                            <Col xs={12} md={4} lg={3} key={product._id}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={product.productImage} />
                                    <Card.Body>
                                        <Card.Title>{product.productName}</Card.Title>
                                        <Card.Text>
                                            Price: {product.price}</Card.Text>
                                            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                                            <Button variant="warning">View Product</Button>
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
                    <Button variant="outline-secondary" onClick={handleClick5}>Prev</Button>
                    <Button variant="outline-secondary" onClick={handleClick4}>Next</Button>
                </Col>
            </Row>
        </div>
    );
}

export default Dashboard