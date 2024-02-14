import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


function PaymentPage() {

  const { productId } = useParams();
  const token = sessionStorage.getItem('token')
  const decodedToken = token ? jwtDecode(token) : null
  const userId = decodedToken ? decodedToken.userId : null
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);


  useEffect(() => {
    if (userId && productId) {
      const cartCookie = Cookies.get(userId) || '{}';
      try {
        const parsedCartCookie = JSON.parse(cartCookie);
        setProduct(parsedCartCookie[productId].productDetails);
        setQuantity(parsedCartCookie[productId].quantity)
        console.log(parsedCartCookie);
      } catch (error) {
        console.error('Error parsing cart cookie:', error);
      }
    }
  }, [])



  return (
    <div>{quantity}</div>
  )
}

export default PaymentPage