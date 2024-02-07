import { jwtDecode } from 'jwt-decode';
import { Button, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';


function Header(props) {

  const toggleGroup = props.buttonToggle;
  const token = sessionStorage.getItem('token')
  const decodedToken = token ? jwtDecode(token) : null;
  
  if (decodedToken) {
    console.log(decodedToken);
  }


  const navigate = useNavigate()

  const handleSignout = () => {
    sessionStorage.removeItem('token');
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
      <Col xs={4} md={4} lg={4}>
        <div>E-COMMERCE</div>
      </Col>
      <Col xs={6} md={6} lg={6}>
        <Row>
          <Col xs={6} md={6} lg={6}></Col>
          <Col xs={2} md={2} lg={2} className={toggleGroup ? 'showButtonGroup' : 'hideButtonGroup'}>
            <p onClick={() => navigate('/Homepage')}>🏠</p>
          </Col>
          <Col xs={4} md={4} lg={4} className={token ? 'showButtonGroup' : 'hideButtonGroup'}>
            <Button onClick={handleSignout} variant="light">Signout</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Header