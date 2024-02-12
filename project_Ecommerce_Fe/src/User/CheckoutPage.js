import { Button, Col, Row, Table } from 'react-bootstrap'
import Header from '../Header';
import Footer from '../Footer';
import SubHeader from '../SubHeader';
import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

function CheckoutPage() {

    const [qty, setQty] = useState(1);
    const token = sessionStorage.getItem('token')
    const decodedToken = token ? jwtDecode(token) : null
    const userId = decodedToken ? decodedToken.userId : null
    const [products, setProducts] = useState({})


    const handleQtyAdd = () => {
        setQty(prev => prev + 1)
    }

    const handleQtySub = () => {
        setQty(prev => Math.max(prev - 1, 0))
    }

    // useEffect(()=>{
    //     const addedToCart = sessionStorage.getItem('addedToCart');
    //     console.log(addedToCart);
    //     sessionStorage.removeItem('addedToCart');
    //     console.log(addedToCart);
    // },[])

    useEffect(() => {
        if (userId) {
            const cartCookie = Cookies.get(userId) || '{}';
            try{
                const parsedCartCookie = JSON.parse(cartCookie);
                setProducts(parsedCartCookie)
                console.log(parsedCartCookie);
            } catch (error) {
                console.error('Error parsing cart cookie:', error);
            }           
        }
    }, [])

    return (
        <div>
            <Header />
            <SubHeader></SubHeader>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total Price</th>
                        <th>Action</th>
                        <th>Order Status</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(products).map(([productId, productInfo]) => {
                        return (
                            <tr key={productId}>
                                <td>{productInfo.productDetails.productName}
                                    <img src={productInfo.productDetails.productImage} style={{ width: '30px' }}></img>
                                </td>
                                <td style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div> {productInfo.quantity} </div>
                                    <div>
                                        <button onClick={handleQtyAdd} style={{ margin: '2px' }}>+</button>
                                        <button onClick={handleQtySub} style={{ margin: '2px' }}>-</button>
                                    </div>
                                </td>
                                <td>Price</td>
                                <td>
                                    Total
                                </td>
                                <td className="text-center">
                                    <Button variant='outline-secondary'>View Product</Button>
                                    <Button variant='outline-secondary'>Buy Now</Button>
                                    <Button variant='outline-secondary'>Delete</Button>
                                </td>
                                <td>Payment Status</td>
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