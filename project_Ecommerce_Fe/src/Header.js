import React from 'react'
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap'


function Header(props) {

  const toggleGroup = props.buttonToggle;

  return (
        <Row>
          <Col xs={10} md={10} lg={10}>
            <Navbar className='headerClass'>
              <img
                src="https://i.postimg.cc/3JN1qYCW/logo-for-ecommerce-removebg-preview.png"
                width="130"
                height="100"
              />
              <div>E-COMMERCE</div>
            </Navbar>
          </Col>
          <Col xs={2} md={2} lg={2}>
            <Navbar className='headerClass'>
              <div className={toggleGroup ? 'showButtonGroup' : 'hideButtonGroup'}>
                <p>🏠</p>
              </div>
            </Navbar>
          </Col>
        </Row>
  )
}

export default Header