import React from 'react'
import { Col, Container, Form, } from 'react-bootstrap'

function Footer() {
  return (
    <div>
      <hr></hr>
      <Container className="footerContainer">
        <div>
          <p className='aboutUs'>About us</p>
        </div>
        <div>
          <p className='contactUs'>Contact Us</p>
        </div>
      </Container>
    </div>
  )
}

export default Footer