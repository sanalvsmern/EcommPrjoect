import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function PaymentPage() {

  const navigate = useNavigate();
  const { productId } = useParams();
  const token = sessionStorage.getItem('token')
  const decodedToken = token ? jwtDecode(token) : null
  const userId = decodedToken ? decodedToken.userId : null
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0)


  useEffect(() => {
    if (userId && productId) {
      const cartCookie = Cookies.get(userId) || '{}';
      try {
        const parsedCartCookie = JSON.parse(cartCookie);
        setProduct(parsedCartCookie[productId].productDetails);
        setQuantity(parsedCartCookie[productId].quantity);
        setPrice(parsedCartCookie[productId].productDetails.price * parsedCartCookie[productId].quantity)

      } catch (error) {
        console.error('Error parsing cart cookie:', error);
      }
    }
  }, [])

  const handlePayment = async (price) => {
    try {
      const { data } = await axios.post(`http://localhost:5000/api/user/userBuy`, { amount: price });
      console.log(data);
      initPayment(data.data)
    } catch (error) {
      console.log(error);
    }
  }

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_M0CMphSF0DupGc",
      amount: data.amount,
      currency: data.currency,
      name: product.productName,
      description: "Test Transaction",
      image: product.productImage,
      order_id: data.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post("http://localhost:5000/api/user/verifyPayment", response);
          console.log(data.message);
          saveOrder(data.message);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const saveOrder = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/saveOrder',
        {
          product, data, quantity, userId
        });

      if (response.status === 200) {
        toast.success('Order was successful')
        
        //deleting cookie
        const cartCookie = Cookies.get(userId);

        let parsedCartCookie = JSON.parse(cartCookie);

        delete parsedCartCookie[product.productId];

        Cookies.set(userId, JSON.stringify(parsedCartCookie));

        //deleting cookie till here

        navigate('/User/CheckoutPage')
      }


    } catch (error) {

      const { status, data } = error.response;

      if (status === 500) {
        toast.error(data.message)
      }
    }
  }


  return (
    <div>
      {(price !== 0) ? (
        <div>
          <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
          >
            <Modal.Dialog>
              <Modal.Header closeButton>
                <Modal.Title>Payment Page</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <p>The total amount will be rupees {price}. Please click proceed to continue with the payment</p>
              </Modal.Body>

              <Modal.Footer>
                <Button onClick={() => navigate('/User/CheckoutPage')} variant="secondary">Cancel</Button>
                <Button onClick={() => handlePayment(price)} variant="primary">proceed</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
        </div>
      ) : (
        <p>Not ready</p>
      )}

    </div>
  )
}

export default PaymentPage