import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form, Nav, ToggleButton } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Header from './Header'
import Footer from './Footer'
import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker'; // Import datepicker module
import 'jquery-ui/themes/base/all.css';
import axios from 'axios';


function Register() {
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

    useEffect(() => {
        // Initialize datepicker
        $('#dob').datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: '1900:2023',
            dateFormat: 'yy-mm-dd',

        });
    }, []);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("");

    const validateEmail = ()=>{
        return email.includes('@');
    }
    
    const validateFirstName = ()=>{
        
    }

    const validateFields = ()=>{
        validateEmail()
    }

    const handleRegister = async (e)=>{
        e.preventDefault();

     

        try{
            const response = await axios.post('http://localhost:5000/api/user/register', {
                firstName, lastName, dob, email, password, userType
            });
            if (response.status == 200){
                alert('Registration Successful');//if registration is successful
            } else if (response.status === 400){
                alert('This email id is already in use, try another email')
            } else{
                alert('Registration failed, try again');
            }           
            
        } catch (error){
            console.error('Registration failed', error);
            alert('Server error, registration failed');
        }
    }

    return (
        <div>
            <Header buttonToggle={false} />
            <Form onSubmit={handleRegister}>
                <Container>
                    <Row className="justify-content-end" >
                        <Col xs={12} md={12} lg={12}>
                            <Navbar>
                                <Container>
                                    <Nav className="me-auto">
                                        <Nav.Link onClick={handleClick1}>Home</Nav.Link>
                                        <Nav.Link onClick={handleClick2} style={{ fontWeight: 'bold' }}>Register</Nav.Link>
                                        <Nav.Link onClick={handleClick3}>Sign in</Nav.Link>
                                    </Nav>
                                </Container>
                            </Navbar>
                        </Col>
                        <Col md={6} lg={8} className='Registerpage'></Col>
                        <Col xs={12} md={6} lg={4} className='style1'>
                            <h1 style={{ textAlign: 'center', fontSize: '30px', fontWeight: 'lighter', color: 'black' }}>Registration Form</h1>
                            <legend>
                                <label className='styleLabel'>First Name</label>
                            </legend>
                            <InputGroup className="mb-2">
                                <Form.Control
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder='Enter your first name'
                                />
                            </InputGroup>
                            <legend>
                                <label className='styleLabel'>Last Name</label>
                            </legend>
                            <InputGroup className="mb-2">
                                <Form.Control
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Enter your last name"
                                />
                            </InputGroup>
                            <legend>
                                <label className='styleLabel'>Date Of Birth</label>
                            </legend>
                            <InputGroup className="mb-2">
                                <Form.Control
                                    onSelect={(e) => setDob(e.target.value)}
                                    placeholder="Enter your Date of birth"
                                    id='dob' />
                            </InputGroup>
                            <legend>
                                <label className='styleLabel'>Email Address</label>
                            </legend>
                            <InputGroup className="mb-2">
                                <Form.Control
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                />
                            </InputGroup>
                            <legend>
                                <label className='styleLabel'>Preferred Password</label>
                            </legend>
                            <InputGroup className="mb-2">
                                <Form.Control
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter the preferred password"
                                />
                            </InputGroup>
                            <legend>
                                <label className='styleLabel'>User type: seller or user</label>
                            </legend>
                            <InputGroup className="mb-2">
                                <Form.Control
                                    onChange={(e) => setUserType(e.target.value)}
                                    placeholder= "Enter the user type"
                                />
                            </InputGroup>
                            <Row>
                                <Col xs={12} md={6} lg={6}>
                                    <Button type='submit' variant="outline-secondary mt-2">Register</Button>
                                </Col>
                                <Col xs={12} md={6} lg={6}>
                                    <p onClick={handleClick3}>Already a user? Click here to Signin</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Form>
            <Footer />
        </div>
    )
}

export default Register
