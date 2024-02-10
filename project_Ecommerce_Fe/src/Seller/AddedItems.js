import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import Header from '../Header'
import Footer from '../Footer'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import SubHeader from '../SubHeader'


function AddedItems() {

  const navigate = useNavigate();
  const token = sessionStorage.getItem('token')
  const [productList, setProductList] = useState([]);

  const [sellerId, setSellerId] = useState('');

  useEffect(() => {

    const fetchProduct = async () => {

      if (!token) {
        navigate('/Homepage/Signin')
      } else {

        try {
          const decodedToken = jwtDecode(token);
          setSellerId(decodedToken.userId);

          const response = await axios.get(`http://localhost:5000/api/admin/productsRoutes/${decodedToken.userId}`);
          setProductList(response.data);

        } catch (error) {
          const { status, data } = error.response;
          if (status === 500) {
            toast.error(data.message);
          }
        }
      }
    }
    fetchProduct()
  }, [token, navigate])

  const handleAdd = ()=>{
    navigate('/Seller/AddNewProduct')
  }

  const handleDelete = async (i)=>{
    try{
      const response = await axios.delete(`http://localhost:5000/api/admin/deleteProduct/${i}`)
      if (response.status === 200) {
        window.location.reload();
        toast.success('Product deleted successfully')
      }
    } catch (error) {

      const { status, data } = error.response;

      if (status === 404) {
        toast.error(data.message)
      }
      if (status === 500) {
        toast.error(data.message)
      }
    }
  }

  return (
    <div>
      <Header/>
      <SubHeader></SubHeader>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Category Id</th>
            <th>Description</th>
            <th>Price</th>
            <th>Is Available</th>
            <th>Product Image</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Vendor Name</th>
            <th>Warranty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr key={product.productId}>
              <td>{product.productId}</td>
              <td>{product.productName}</td>
              <td>{product.categoryId}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.isAvailable?<p>Yes</p>:<p>No</p>}</td>
              <td>{product.productImage}</td>
              <td>{product.rating}</td>
              <td>{product.review}</td>
              <td>{product.vendorName}</td>
              <td>{product.warranty}</td>
              <td style={{ display: 'flex', justifyContent: 'center' }}>
                <Link to={`/Seller/EditAddedItem/${product.productId}`}>
                <Button variant="warning" style={{ margin: '2px' }}>Edit</Button>
                </Link>
                <Link to={`/ViewProduct/${product.productId}`}>
                <Button variant="primary" style={{ margin: '2px' }}>View</Button>
                </Link>
                <Button onClick={()=>handleDelete(product.productId)} variant="danger" style={{ margin: '2px' }}>delete</Button>
              </td>
            </tr>
          )
          )}

        </tbody>
      </Table>
      <Button onClick={handleAdd} variant="outline-secondary mt-2">Add new product</Button>
      <Footer />
    </div>
  )
}

export default AddedItems