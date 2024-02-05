import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form, Nav, NavDropdown } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Header from './Header'
import Footer from './Footer'
// import PropTypes from 'prop-types';

// Homepage.propTypes = {
//     category: PropTypes.string.isRequired,
// };

// Homepage.defaultProps = {
//     category: 'all',
// };

function Homepage() {
    const navigate = useNavigate()
    const [category, setCategory] = useState('all')

    const [currentUser, setCurrentUser] = useState('Guest')

    // Handle category selection
    const handleCategory=(cat)=>{
        setCategory(cat)
    }

    return (
        <div>
            <Header buttonToggle={false} />
            <div className='Homepage'>
                <Form className='HomepageForm'>
                    <Container>
                        <Row>
                            <Col xs={12} md={12} lg={12}>
                                <Navbar>
                                    <Container>
                                        <Nav className="me-auto">
                                            <Nav.Link onClick={()=>navigate('/Homepage')} style={{ fontWeight: 'bold' }}>Home</Nav.Link>
                                            <Nav.Link onClick={() => navigate('/Homepage/Register')}>Register</Nav.Link>
                                            <Nav.Link onClick={() => navigate('/Homepage/Signin')}>Sign in</Nav.Link>
                                            <NavDropdown title="Category" id="basic-nav-dropdown">
                                                <NavDropdown.Item onClick={()=>handleCategory('all')}>All</NavDropdown.Item>
                                                <NavDropdown.Item onClick={()=>handleCategory('mobile')}>Mobiles</NavDropdown.Item>
                                                <NavDropdown.Item onClick={()=>handleCategory('watch')}>Watches</NavDropdown.Item>
                                                <NavDropdown.Item onClick={()=>handleCategory('headphone')}>Headphones</NavDropdown.Item>
                                            </NavDropdown>
                                        </Nav>
                                        <Nav className="ms-auto">
                                            <Nav.Link>Signed in as: {currentUser}</Nav.Link>
                                        </Nav>
                                    </Container>
                                </Navbar>
                            </Col>
                        </Row>
                    </Container>
                </Form>
                <Dashboard category={category} onCategoryChange={handleCategory}/>
            </div>
            <Footer />
        </div>
    )
}

export default Homepage