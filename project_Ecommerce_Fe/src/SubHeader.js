import { jwtDecode } from 'jwt-decode';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

function SubHeader() {

    const navigate = useNavigate()
    const token = sessionStorage.getItem('token')
    const decodedToken = token ? jwtDecode(token) : null
    const userType = decodedToken ? decodedToken.userType : null

    const handleSignout = () => {
        sessionStorage.removeItem('token');
        navigate('/Homepage/all')
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary mb-4">
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/Homepage/all">Home</Nav.Link>
                        <NavDropdown title="Category" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/Homepage/all">All</NavDropdown.Item>
                            <NavDropdown.Item href="/Homepage/watch">Watch</NavDropdown.Item>
                            <NavDropdown.Item href="/Homepage/smartphone">Smartphone</NavDropdown.Item>
                            <NavDropdown.Item href="/Homepage/headphone">Headphone</NavDropdown.Item>
                        </NavDropdown>
                        {token ? null : (
                            <>
                                <Nav.Link href="/Homepage/Signin">SignIn</Nav.Link>
                            </>
                        )}

                        {userType === 'user' ?
                            (
                                <>
                                    <Nav.Link href="/User/CheckoutPage">Go to cart</Nav.Link>
                                </>
                            )
                            : null}
                        {userType === 'seller' ?
                            (
                                <>
                                    <Nav.Link href="/Seller/AddedItems">Added items</Nav.Link>
                                </>
                            )
                            : null}
                    </Nav>
                    <Form className="d-flex">
                        {token ? (
                            <>
                                <NavDropdown title={`${decodedToken.firstName}👤`} id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="/Homepage/all">
                                        <a onClick={handleSignout}>Sign Out</a>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : null}
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default SubHeader;