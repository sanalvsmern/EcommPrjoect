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
import { toast } from 'react-toastify';
import SubHeader from './SubHeader';


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

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("user");

    useEffect(() => {
        // Initialize datepicker
        $('#dob').datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: '1900:2023',
            dateFormat: 'yy-mm-dd',
        });
    }, []);

    const handleUser = (event) => {
        setUserType(event.target.value)
    }

    const handleDob = (event) => {
        setDob(event.target.value)
    }

    const validateName = (i) => {
        const regex = /^[a-zA-Z]+$/;
        if (i === null || i === undefined || !regex.test(i)) {
            toast.error('Enter valid name')
            return false;
        } return true;
    }

    const validateEmail = (i) => {
        if (!i.includes('@')) {
            toast.error('Invalid Email');
            return false;
        } return true;

    }

    const validatePassword = (i) => {
        const regex = /.{8,}/;
        if (!regex.test(i)) {
            toast.error('Password should atleast contain 8 characters');
            return false
        } return true;

    }

    const validateFields = () => {
        return (
            validateName(firstName) &&
            validateName(lastName) &&
            validateEmail(email) &&
            validatePassword(password)
        )
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validateFields()) {
            return false;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/user/register', {
                firstName, lastName, dob, email, password, userType
            });

            if (response.status === 200) {
                toast.success(response.data.message);
                navigate('/Homepage/Signin');
            }
        } catch (error) {
            const { status, data } = error.response;

            if (status === 400) {
                toast.error(data.message)
            }
            if (status === 500) {
                toast.error(data.message)
            }
        }
    }

    return (
        <div>
            <Header/>
            <SubHeader></SubHeader>
            <Form onSubmit={handleRegister}>
                <Container>
                    <Row className="justify-content-end" >
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
                                    onSelect={handleDob}
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
                            <label className='styleLabel'>User type:&nbsp;&nbsp;</label>
                            <label>User</label>
                            <input type='radio'
                                value='user'
                                checked={userType === 'user'}
                                onChange={handleUser}/>&nbsp;&nbsp;
                            <label>Seller</label>
                            <input type='radio'
                                value='seller'
                                checked={userType === 'seller'}
                                onChange={handleUser} />
                            <Row>
                                <Col xs={12} md={12} lg={12}  className="text-center">
                                    <Button type='submit' variant="outline-secondary mt-2">Register</Button>
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
