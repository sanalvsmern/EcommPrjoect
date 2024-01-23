import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, ListGroup, Row, Spinner } from 'react-bootstrap';

function Dashboard() {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [conPerPage, setConPerPage] = useState(0);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/photos`);
                const newData = response.data.slice(conPerPage, conPerPage + 12);


                setPhotos(newData);
                setLoading(false);

            } catch (error) {
                console.error('Error fetching photos:', error);
                setLoading(false);
            }
        };

        fetchPhotos();
    }, [conPerPage]);

    const handleClick4 = () => {
        setConPerPage(prev => Math.max(prev + 12, 0))
    }

    const handleClick5 = () => {
        setConPerPage(prev => Math.max(prev - 12, 0))
    }

    return (
        <div style={{width:'97%', paddingLeft: '3%'}}>
            <div style={{display:'flex', justifyContent:'center'}}>
                {loading ? (<Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>) :
                    (<Row>
                        {photos.map((photo) => (
                            <Col xs={12} md={4} lg={3} key={photo.id}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={photo.thumbnailUrl} />
                                    <Card.Body>
                                        <Card.Title>{photo.title}</Card.Title>
                                        <Card.Text>
                                            Category: {photo.albumId}
                                        </Card.Text>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item>Category: {photo.albumId}</ListGroup.Item>
                                        <ListGroup.Item>Vendor Name: {photo.albumId}</ListGroup.Item>
                                        <ListGroup.Item>Rating: {photo.albumId}</ListGroup.Item>
                                    </ListGroup>
                                    <Card.Body style={{display:'flex',justifyContent:'center'}}>
                                        <Card.Link href="#">
                                            <Button variant="warning">View Product</Button>
                                            <Button variant="secondary">Add to cart</Button>
                                        </Card.Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>)
                }
            </div>
            <Row>
                <Col className='pageButton'>
                    <Button variant="outline-secondary" onClick={handleClick5}>Prev</Button>
                    <Button variant="outline-secondary" onClick={handleClick4}>Next</Button>
                </Col>
            </Row>
        </div>
    );
}

export default Dashboard