import React, { useEffect, useState } from 'react'
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';


function Header(props) {

  const toggleGroup = props.buttonToggle;
  const [token1, setToken1] = useState(() => {
    return sessionStorage.getItem('token')
  })
  const navigate = useNavigate()

  const handleClick1 = () => {
    navigate('/Homepage')
  }


  const handleSignout = () => {
    const token = sessionStorage.getItem('token');
    console.log(token);
    sessionStorage.removeItem('token');
    setToken1('');
    navigate('/Homepage')
  }

  return (
      <Row className='headerClass'>
        <Col xs={2} md={2} lg={2}>
          <img
            src="https://i.postimg.cc/3JN1qYCW/logo-for-ecommerce-removebg-preview.png"
            width="130"
            height="100"
          />
        </Col>
        <Col xs={8} md={8} lg={8}>
          <div>E-COMMERCE</div>
        </Col>
        <Col xs={1} md={1} lg={1} className={toggleGroup ? 'showButtonGroup' : 'hideButtonGroup'}>
            <p onClick={handleClick1}>🏠</p>
        </Col>
        <Col xs={1} md={1} lg={1} className={token1 ? 'showButtonGroup' : 'hideButtonGroup'}>
            <p onClick={handleSignout}>Signout</p>
        </Col>
      </Row>
  )
}

export default Header