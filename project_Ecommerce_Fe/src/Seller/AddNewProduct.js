import React, { useEffect, useState } from 'react'
import { Form, InputGroup, Table } from 'react-bootstrap'
import Header from '../Header'
import Footer from '../Footer'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import { toast } from 'react-toastify';
import SubHeader from '../SubHeader'

function AddNewProduct() {

  const [sellerId, setSellerId] = useState('');
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);
  const [productImage, setProductImage] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [warranty, setWarranty] = useState('');


  const navigate = useNavigate();
  const token = sessionStorage.getItem('token')

  useEffect(()=>{
    if(!token){
      navigate('/Homepage/Signin')
    } else {
      const decodedToken = jwtDecode(token);
      setSellerId(decodedToken.userId);
    }
  },[token])

  useEffect(()=>{
    setCategoryId(categoryId.toLowerCase())
  },[categoryId])

  const handleAvailable = (event) => {
    setIsAvailable(event.target.value === 'true')
  }

  const validateProductId = (i) => {
    if (!i || i.trim() === '') {
      toast.error('Product Id is mandatory')
      return false
    } return true
  }

  const validateProductName = (i)=>{
    if (!i || i.trim() === ''){
      toast.error('Product name is mandatory')
      return false
    } return true
  }

  const validateCategoryId = (i)=>{
    const allowedCategory = ["watch", "smartphone", "headphone"]
    if(!allowedCategory.includes(categoryId)){
      toast.error('Category Id can be either watch, smartphone or headphone')
      return false
    } return true
  }

  const validatePrice = (i)=>{
    const numberRegex = /^(0|[1-9]\d*)$/;
    if(!i || !numberRegex.test(i)){
      toast.error('Invalid price, should be positive integer');
      return false
    } return true
  }

  const validateFields = () => {
    return (
      validateProductId(productId) &&
      validateProductName(productName) &&
      validateCategoryId(categoryId) &&
      validatePrice(price)
    );
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if(!validateFields()){
      return false
    }

    try {
      const response = await axios.post('http://localhost:5000/api/admin/productsRoutes',
        {
          sellerId, productId, productName, categoryId, description, price, isAvailable,
          productImage, rating, review, vendorName, warranty
        });

      if (response.status === 200) {
        toast.success('Product added successfully')
        window.location.reload();
      }

    } catch (error) {

      const { status, data } = error.response;

      if (status === 409) {
        toast.error(data.message)
      }
      if (status === 500) {
        toast.error(data.message)
      }
    }
  }

  const handleView = ()=>{
    navigate('/Seller/AddedItems')
  }

  return (
    <div>
      <Header/>
      <SubHeader></SubHeader>
      <Form onSubmit={handleAddProduct}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Field</th>
              <th>Input Data</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Product Id</td>
              <td>
                <InputGroup>
                  <Form.Control
                    onChange={(e) => setProductId(e.target.value)}
                  />
                </InputGroup>
              </td>
            </tr>
            <tr>
              <td>Product Name</td>
              <td>
                <InputGroup>
                  <Form.Control
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </InputGroup>
              </td>
            </tr>
            <tr>
              <td>Category Id</td>
              <td>
                <InputGroup>
                  <Form.Control
                    onChange={(e) => setCategoryId(e.target.value)}
                  />
                </InputGroup>
              </td>
            </tr>
            <tr>
              <td>Description</td>
              <td>
                <InputGroup>
                  <Form.Control
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </InputGroup>
              </td>
            </tr>
            <tr>
              <td>Price</td>
              <td>
                <InputGroup>
                  <Form.Control
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </InputGroup>
              </td>
            </tr>
            <tr>
              <td>Is Available</td>
              <td>
                <InputGroup>
                  <label>Yes</label>
                  <input type='radio'
                    value={true}
                    checked={isAvailable === true}
                    onChange={handleAvailable} />&nbsp;&nbsp;
                  <label>No</label>
                  <input type='radio'
                    value={false}
                    checked={isAvailable === false}
                    onChange={handleAvailable} />
                </InputGroup>
              </td>
            </tr>
            <tr>
              <td>Product Image</td>
              <td>
                <InputGroup>
                  <Form.Control
                    onChange={(e) => setProductImage(e.target.value)}
                  />
                </InputGroup>
              </td>
            </tr>
            <tr>
              <td>Rating</td>
              <td>
                <InputGroup>
                  <Form.Control
                    onChange={(e) => setRating(e.target.value)}
                  />
                </InputGroup>
              </td>
            </tr>
            <tr>
              <td>Review</td>
              <td>
                <InputGroup>
                  <Form.Control
                    onChange={(e) => setReview(e.target.value)}
                  />
                </InputGroup>
              </td>
            </tr>
            <tr>
              <td>Vendor Name</td>
              <td>
                <InputGroup>
                  <Form.Control
                    onChange={(e) => setVendorName(e.target.value)}
                  />
                </InputGroup>
              </td>
            </tr>
            <tr>
              <td>Warranty</td>
              <td>
                <InputGroup>
                  <Form.Control
                    onChange={(e) => setWarranty(e.target.value)}
                  />
                </InputGroup>
              </td>
            </tr>
          </tbody>
        </Table>
        <Button type='submit' variant="outline-secondary mt-2">Add Product</Button>
        <Button type='submit' onClick={handleView} variant="outline-secondary mt-2">View Added Products</Button>
      </Form>
      <Footer />
    </div>
  )
}

export default AddNewProduct
