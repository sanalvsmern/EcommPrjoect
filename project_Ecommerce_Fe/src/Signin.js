import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form, Nav, NavDropdown, ToggleButton } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import Header from './Header'
import Footer from './Footer'


function Signin() {

    //Google Authentication
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const clientId = '1041505136467-hj60bg54hvahdh7i42s6bsv6lcciq10v.apps.googleusercontent.com'

    const login = useGoogleLogin({
        clientId: '1041505136467-hj60bg54hvahdh7i42s6bsv6lcciq10v.apps.googleusercontent.com',  // <-- Add your client ID here
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    })

    useEffect(() => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    const logOut = () => {
        googleLogout();
        setProfile(null);
    };
    // Google authentication till here

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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false)

    const handleSignin = async (e) => {

        e.preventDefault();

        try{
        const response = await axios.post('http://localhost:5000/api/user/signin', {
            email, password
        });

       if(response.data){
            if(response.data.userType === 'user'){
                const token = response.data.token;
                sessionStorage.setItem('token', token);
                navigate('/User/CheckoutPage');
            }
            if(response.data.userType === 'seller'){
                const token = response.data.token;
                sessionStorage.setItem('token', token);
                navigate('/Seller/AddedItems');
            }
        }

    } catch (error){
        if(error.response){
            const {status, data} = error.response;
            if(status === 400){
                alert(data.message)
            }
            if(status === 401){
                alert(data.message)
            }
            if(status === 500){
                alert(data.message)
            }
        }
    }
}

    return (
        <div>
            <Header buttonToggle={false} />
            <Form onSubmit={handleSignin}>
                <Container>
                    <Row className="justify-content-end" >
                        <Col xs={12} md={12} lg={12}>
                            <Navbar>
                                <Container>
                                    <Nav className="me-auto">
                                        <Nav.Link onClick={handleClick1}>Home</Nav.Link>
                                        <Nav.Link onClick={handleClick2}>Register</Nav.Link>
                                        <Nav.Link onClick={handleClick3} style={{ fontWeight: 'bold' }}>Sign in</Nav.Link>
                                    </Nav>
                                    <Nav className="ms-auto">
                                        {profile ? (
                                            <NavDropdown title="Signed in as:" id="basic-nav-dropdown">
                                                <NavDropdown.Item onClick={logOut}>Sign Out</NavDropdown.Item>
                                            </NavDropdown>) : null}
                                        <Nav.Link>
                                            {profile ? profile.name : 'Guest'}
                                        </Nav.Link>
                                    </Nav>
                                </Container>
                            </Navbar>
                        </Col>
                        <Col md={6} lg={8} className='Signinpage'>
                        </Col>
                        <Col xs={12} md={6} lg={4} className='style2'>
                            <h1 style={{ textAlign: 'center', fontSize: '30px', fontWeight: 'lighter', color: 'black' }}>Sign In</h1>
                            <legend>
                                <label className='styleLabel'>Email Address</label>
                            </legend>
                            <InputGroup className="mb-2">
                                <Form.Control
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    name='Email'
                                />
                            </InputGroup>
                            <legend>
                                <label className='styleLabel'>Password</label>
                            </legend>
                            <InputGroup className="mb-2">
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter the password"
                                    name='Password'
                                />
                            </InputGroup>
                            <Form.Check
                                type="switch"
                                label="View password"
                                checked={showPassword}
                                onChange={(e) => setShowPassword(e.currentTarget.checked)}
                            />
                            <Button type='submit' variant="outline-secondary mt-3" style={{ marginLeft: '140px' }}>Sign in</Button>
                            {profile ? null : (
                                <Button variant="outline-secondary mt-3" style={{ marginLeft: '95px' }} onClick={login}>
                                    Sign in with google
                                </Button>
                            )}
                        </Col>
                    </Row>
                </Container>
            </Form>
            <Footer />
        </div >
    )
}

export default Signin
