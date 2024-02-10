import { Button, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

function Header() {

  const navigate = useNavigate()

    return (
    <Row className='headerClass'>
      <Col xs={2} md={2} lg={2}>
        <img
          src="https://i.postimg.cc/3JN1qYCW/logo-for-ecommerce-removebg-preview.png"
          width="130"
          height="100"
        />
      </Col>
      <Col xs={4} md={4} lg={4}>
        <div>E-COMMERCE</div>
      </Col>
      <Col xs={4} md={4} lg={4}>
      </Col>
    </Row>
  )
}

export default Header