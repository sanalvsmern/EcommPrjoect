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
import { jwtDecode } from 'jwt-decode';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Homepage() {
    const navigate = useNavigate()
    const [categoryId, setCategoryId] = useState('all')

    //for sidebar
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //for sidebar ends here

    const token = sessionStorage.getItem('token')
    const decodedToken = token ? jwtDecode(token) : null;
    if (decodedToken) {
        console.log(decodedToken);
    }

    // Handle category selection
    const handleCategory = (cat) => {
        setCategoryId(cat)
    }

    return (
        <div>
            <Header buttonToggle={false} />
            {/* sidebar */}
            <>
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Row>
                            <Col xs={12} md={12} lg={12}>
                                <div className="d-grid gap-2">
                                    <Button variant="light" size="lg">
                                        Seller Dashboard
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Offcanvas.Body>
                </Offcanvas>
            </>
            {/* sidebar ends here */}
            <div className='Homepage'>
                <Form className='HomepageForm'>
                    <Container>
                        <Row>
                            <Col xs={12} md={12} lg={12}>
                                <Navbar>
                                    <Container>
                                        <Nav className="me-auto">
                                            <Button variant="outline-secondary" onClick={handleShow}>
                                                &#x25B8;
                                            </Button>
                                            <Nav.Link onClick={() => navigate('/Homepage')} style={{ fontWeight: 'bold' }}>Home</Nav.Link>
                                            <Nav.Link onClick={() => navigate('/Homepage/Register')}>Register</Nav.Link>
                                            <Nav.Link onClick={() => navigate('/Homepage/Signin')}>Sign in</Nav.Link>
                                            <NavDropdown title="Category" id="basic-nav-dropdown">
                                                <NavDropdown.Item onClick={() => handleCategory('all')}>All</NavDropdown.Item>
                                                <NavDropdown.Item onClick={() => handleCategory('smartphone')}>Smartphone</NavDropdown.Item>
                                                <NavDropdown.Item onClick={() => handleCategory('watch')}>Watch</NavDropdown.Item>
                                                <NavDropdown.Item onClick={() => handleCategory('headphone')}>Headphone</NavDropdown.Item>
                                            </NavDropdown>
                                        </Nav>
                                        <Nav className="ms-auto">
                                            <Nav.Link>{decodedToken ? `signedin as:` : ''} </Nav.Link>
                                        </Nav>
                                    </Container>
                                </Navbar>
                            </Col>
                        </Row>
                    </Container>
                </Form>
                <Dashboard categoryId={categoryId} onCategoryChange={handleCategory} />
            </div>
            <Footer />
        </div>
    )
}

export default Homepage