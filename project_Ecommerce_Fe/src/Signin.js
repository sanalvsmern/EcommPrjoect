import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import Header from './Header'
import Footer from './Footer'
import { toast } from 'react-toastify';
import SubHeader from './SubHeader';



function Signin() {

    const token = sessionStorage.getItem('token')
    const navigate = useNavigate()



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
                .then(async (res) => {
                    setProfile(res.data);
                    const firstName = res.data.given_name
                    const lastName = res.data.family_name
                    const email = res.data.email
                    const googleId = res.data.id
                    const userType = 'user'

                    try {
                        const response = await axios.post('http://localhost:5000/api/user/googleReg',
                            { firstName, lastName, email, googleId, userType })
                        if (response.status === 201) {
                            toast.success(response.message)
                            const token = response.data.token;
                            sessionStorage.setItem('token', token);
                            navigate('/User/CheckoutPage');
                        } else if (response.status === 200) {
                            toast.success(response.message)
                            const token = response.data.token;
                            sessionStorage.setItem('token', token);
                            navigate('/User/CheckoutPage');
                        }

                    } catch (error) {
                        if (error.response) {
                            const { status, data } = error.response;
                            if (status === 401) {
                                toast.error(data.message)
                            } else if (status === 500) {
                                toast.error(data.message)
                            }
                        }
                    }
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    // Google authentication till here

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false)

    const handleSignin = async (e) => {

        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/user/signin', {
                email, password
            });

            if (response.data) {
                if (response.data.userType === 'user') {
                    const token = response.data.token;
                    sessionStorage.setItem('token', token);
                    navigate('/User/CheckoutPage');
                }
                if (response.data.userType === 'seller') {
                    const token = response.data.token;
                    sessionStorage.setItem('token', token);
                    navigate('/Seller/AddedItems');
                }
            }

        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                if (status === 400) {
                    toast.error(data.message)
                }
                if (status === 401) {
                    toast.error(data.message)
                }
                if (status === 500) {
                    toast.error(data.message)
                }
            }
        }
    }

    return (
        <div>
            <Header/>
            <SubHeader></SubHeader>
            <Form onSubmit={handleSignin}>
                <Container>
                    <Row className="justify-content-end" >
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
                            <Row>
                                <Col xs={12} md={12} lg={12} className="text-center">
                                    <Button type='submit' variant="outline-secondary mt-3">Sign in</Button>
                                    <br></br>
                                    <a href='/Homepage/Register' style={{ cursor: 'pointer' }}>New user? register here</a>
                                    {token ? null : (
                                        <a onClick={login} style={{ cursor: 'pointer' }}> or Sign in with google </a>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Form>
            <Footer />
        </div >
    )
}

export default Signin
