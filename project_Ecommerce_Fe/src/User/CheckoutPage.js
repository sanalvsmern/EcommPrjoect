import { Button, Col, Row, Table } from 'react-bootstrap'
import Header from '../Header';
import Footer from '../Footer';
import SubHeader from '../SubHeader';
import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';


function CheckoutPage() {

    const [qty, setQty] = useState(1);
    const token = sessionStorage.getItem('token')
    const decodedToken = token ? jwtDecode(token) : null


    const handleQtyAdd = () => {
        setQty(prev => prev + 1)
    }

    const handleQtySub = () => {
        setQty(prev => Math.max(prev - 1, 0))
    }

    useEffect(()=>{
        const addedToCart = sessionStorage.getItem('addedToCart');
        console.log(addedToCart);
        sessionStorage.removeItem('addedToCart');
        console.log(addedToCart);
    },[])



    return (
        <div>
            <Header />
            <SubHeader></SubHeader>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                        <th>Action</th>
                        <th>Order Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Product Name</td>
                        <td>
                            <img src='https://via.placeholder.com/600/92c952' style={{ width: '30px' }}></img>
                        </td>
                        <td>Price</td>
                        <td style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div> {qty} </div>
                            <div>
                                <button onClick={handleQtyAdd} style={{ margin: '2px' }}>+</button>
                                <button onClick={handleQtySub} style={{ margin: '2px' }}>-</button>
                            </div>
                        </td>
                        <td>
                            Total
                        </td>
                        <td  className="text-center">
                                    <Button variant='outline-secondary'>View Product</Button>
                                    <Button variant='outline-secondary'>Buy Now</Button>
                                    <Button variant='outline-secondary'>Delete</Button>
                        </td>
                        <td>Payment Status</td>
                    </tr>
                </tbody>
            </Table>
            <Footer />
        </div>
    )
}

export default CheckoutPage