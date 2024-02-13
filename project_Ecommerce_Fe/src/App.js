import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage';
import Signin from './Signin'
import Register from './Register'
import AddedItems from './Seller/AddedItems';
import ViewProduct from './ViewProduct';
import EditAddedItem from './Seller/EditAddedItem';
import AddNewProduct from './Seller/AddNewProduct';
import CheckoutPage from './User/CheckoutPage';
import PaymentPage from './User/PaymentPage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path='/Homepage/:categoryId' element={<Homepage />}></Route>
          <Route path='/Homepage/Signin' element={<Signin />}></Route>
          <Route path='Homepage/Register' element={<Register />}></Route>
          <Route path='/Seller/AddedItems' element={<AddedItems />}></Route>
          <Route path='/Seller/AddNewProduct' element={<AddNewProduct />}></Route>
          <Route path='/Seller/EditAddedItem/:productId' element={<EditAddedItem />}></Route>
          <Route path='/ViewProduct/:productId' element={<ViewProduct />}></Route>
          <Route path='/User/CheckoutPage' element={<CheckoutPage />}></Route>
          <Route path='/User/PaymentPage' element={<PaymentPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


// import React from 'react';
// import { GoogleLogin } from '@react-oauth/google';

// function App() {
//     const responseMessage = (response) => {
//         console.log(response);
//         const {credential} =response
//         const payload = JSON.parse(atob(credential.split('.')[1]))

//         console.log(payload);

//     };
//     const errorMessage = (error) => {
//         console.log(error);
//     };
//     return (
//         <div>
//             <h2>React Google Login</h2>
//             <br />
//             <br />
//             <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
//         </div>
//     )
// }
// export default App;






// import React, { useState, useEffect } from 'react';
// import { googleLogout, useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';

// function App() {
//     const [user, setUser] = useState([]);
//     const [profile, setProfile] = useState([]);

//     // Replace 'YOUR_CLIENT_ID' with your actual Google OAuth client ID
//     const clientId = '1041505136467-hj60bg54hvahdh7i42s6bsv6lcciq10v.apps.googleusercontent.com';

//     const login = useGoogleLogin({
//         clientId: '1041505136467-hj60bg54hvahdh7i42s6bsv6lcciq10v.apps.googleusercontent.com',  // <-- Add your client ID here
//         onSuccess: (codeResponse) => setUser(codeResponse),
//         onError: (error) => console.log('Login Failed:', error)
//     });

//     useEffect(() => {
//         if (user) {
//             axios
//                 .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
//                     headers: {
//                         Authorization: `Bearer ${user.access_token}`,
//                         Accept: 'application/json'
//                     }
//                 })
//                 .then((res) => {
//                     setProfile(res.data);
//                 })
//                 .catch((err) => console.log(err));
//         }
//     }, [user]);

//     // log out function to log the user out of google and set the profile array to null
//     const logOut = () => {
//         googleLogout();
//         setProfile(null);
//     };

//     return (
//         <div>
//             <h2>React Google Login</h2>
//             <br />
//             <br />
//             {profile ? (
//                 <div>
//                     <img src={profile.picture} alt="user image" />
//                     <h3>User Logged in</h3>
//                     <p>Name: {profile.name}</p>
//                     <p>Email Address: {profile.email}</p>
//                     <br />
//                     <br />
//                     <button onClick={logOut}>Log out</button>
//                 </div>
//             ) : (
//                 <button onClick={() => login()}>Sign in with Google 🚀 </button>
//             )}
//         </div>
//     );
// }
// export default App;
