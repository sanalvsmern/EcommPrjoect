import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import Header from '../Header';
import Footer from '../Footer';

function CheckoutPage() {

    const [qty,setQty]=useState(0);


    const handleQtyAdd = () =>{
        setQty(prev=> prev + 1)
    }

    const handleQtySub = () =>{
        setQty(prev=> Math.max(prev-1,0))
    }

    return (
        <div>
            <Header buttonToggle={true}/>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Buy Now</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Product Name</td>
                        <td>
                            <img src='https://via.placeholder.com/600/92c952' style={{width:'30px'}}></img>
                        </td>
                        <td>Price</td>
                        <td style={{display:'flex', justifyContent:'space-between'}}>
                            <div> {qty} </div>
                            <div>
                                <button onClick={handleQtyAdd} style={{margin:'2px'}}>+</button>
                                <button onClick={handleQtySub} style={{margin:'2px'}}>-</button>
                            </div>
                        </td>
                        <td>
                        <Button variant="warning">View Product</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Footer/>
        </div>
    )
}

export default CheckoutPage