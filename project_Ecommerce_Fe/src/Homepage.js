import React, { useState } from 'react'
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

function Homepage() {
    const navigate = useNavigate()
    const handleClick1 = () => {
        navigate('/Homepage')
    }
    const handleClick2 = () => {
        navigate('/Homepage/Register')
    }
    const handleClick3 = () => {
        navigate('/Homepage/Signin')
    }
    const [currentUser, setCurrentUser] = useState('Guest')

    return (
        <div>
            <Header buttonToggle={false}/>
            <div className='Homepage'>
                <Form className='HomepageForm'>
                    <Container>
                        <Row>
                            <Col xs={12} md={12} lg={12}>
                                <Navbar>
                                    <Container>
                                        <Nav className="me-auto">
                                            <Nav.Link onClick={handleClick1} style={{ fontWeight: 'bold' }}>Home</Nav.Link>
                                            <Nav.Link onClick={handleClick2}>Register</Nav.Link>
                                            <Nav.Link onClick={handleClick3}>Sign in</Nav.Link>
                                            <NavDropdown title="Category" id="basic-nav-dropdown">
                                                <NavDropdown.Item href="#action/3.1">All</NavDropdown.Item>
                                                <NavDropdown.Item href="#action/3.2">Mobiles</NavDropdown.Item>
                                                <NavDropdown.Item href="#action/3.3">Watches</NavDropdown.Item>
                                                <NavDropdown.Item href="#action/3.4">Headphones</NavDropdown.Item>
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
                <Dashboard />
            </div>
            <Footer />
        </div>
    )
}

export default Homepage