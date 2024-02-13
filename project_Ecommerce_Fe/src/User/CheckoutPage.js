import { Button, ButtonGroup, Col, Row, Table } from 'react-bootstrap'
import Header from '../Header';
import Footer from '../Footer';
import SubHeader from '../SubHeader';
import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function CheckoutPage() {

    const token = sessionStorage.getItem('token')
    const decodedToken = token ? jwtDecode(token) : null
    const userId = decodedToken ? decodedToken.userId : null
    const [products, setProducts] = useState({})
    const navigate = useNavigate()

    const handleQtyAdd = (productId) => {
        const cartCookie = Cookies.get(userId);

        let parsedCartCookie = JSON.parse(cartCookie);

        parsedCartCookie[productId].quantity += 1;

        Cookies.set(userId, JSON.stringify(parsedCartCookie));

        setProducts(parsedCartCookie)

    };

    const handleQtySub = (productId) => {

        const cartCookie = Cookies.get(userId);

        let parsedCartCookie = JSON.parse(cartCookie);

        parsedCartCookie[productId].quantity -= 1;

        if (parsedCartCookie[productId].quantity == 0) {
            delete parsedCartCookie[productId];

            Cookies.set(userId, JSON.stringify(parsedCartCookie));

            setProducts(parsedCartCookie)
        }

        Cookies.set(userId, JSON.stringify(parsedCartCookie));

        setProducts(parsedCartCookie)

    };

    const handleDelete = (productId) => {

        const cartCookie = Cookies.get(userId);

        let parsedCartCookie = JSON.parse(cartCookie);

        delete parsedCartCookie[productId];

        Cookies.set(userId, JSON.stringify(parsedCartCookie));

        setProducts(parsedCartCookie)

    };


    useEffect(() => {
        if (userId) {
            const cartCookie = Cookies.get(userId) || '{}';
            try {
                const parsedCartCookie = JSON.parse(cartCookie);
                setProducts(parsedCartCookie)
                console.log(parsedCartCookie);
            } catch (error) {
                console.error('Error parsing cart cookie:', error);
            }
        }
    }, [userId])


    return (
        <div>
            <Header />
            <SubHeader></SubHeader>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{ width: 'auto', textAlign: 'center' }}>Product</th>
                        <th style={{ width: 'auto', textAlign: 'center' }}>Qty</th>
                        <th style={{ width: 'auto', textAlign: 'center' }}>Price</th>
                        <th style={{ width: 'auto', textAlign: 'center' }}>Total Price</th>
                        <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        <th style={{ width: 'auto', textAlign: 'center' }}>Order Status</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(products).map(([productId, productInfo]) => {
                        return (
                            <tr key={productId}>
                                <td style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {productInfo.productDetails.productName}
                                    <img src={productInfo.productDetails.productImage} style={{ width: '30px' }}></img>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Button variant='secondary' size='sm' onClick={() => handleQtySub(productId)}>-</Button>
                                            {productInfo.quantity}
                                            <Button variant='secondary' size='sm' onClick={() => handleQtyAdd(productId)}>+</Button>
                                    </div>
                                </td>
                                <td>{productInfo.productDetails.price}</td>
                                <td>
                                    {productInfo.productDetails.price*productInfo.quantity}
                                </td>
                                <td className="text-center">
                                    <Button onClick={() => navigate(`/ViewProduct/${productId}`)} variant='secondary'>View</Button>
                                    <Button variant='success'>Buy</Button>
                                    <Button onClick={() => handleDelete(productId)} variant='danger'>Delete</Button>
                                </td>
                                <td>Will be updated</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Footer />
        </div>
    )
}

export default CheckoutPage