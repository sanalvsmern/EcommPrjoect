const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')


const userRegistrationRoutes = require('./routes/userRegistrationRoutes');
// const userLoginRoutes = require('./routes/userLoginRoutes');
// const userLogoutRoutes = require('./routes/userLogoutRoutes');
// const productsRoutes = require('./routes/productsRoutes');
// const cartRouter = require('./routes/cartRouter');
// const userDetails = require('./routes/userDetails')


const app = express();
app.use(cors());
app.use(bodyParser.json())


mongoose.connect('mongodb://0.0.0.0:27017/ecommercePlatform', { useNewUrlParser:true, useUnifiedTopology: true })

.then(()=>{
    console.log('Connected to MongoDB');
})
.catch((error)=>{
    console.log('Error connecting to MongoDB:', error.message);
})

app.use('/api/user', userRegistrationRoutes);
// app.use('/api/user/login', userLoginRoutes);
// app.use('/api/user/logout', userLogoutRoutes);
// app.use('/api/admin/products', productsRoutes);
// app.use('/api/admin/cart', cartRouter);
// app.use('/api/user/details', userDetails)


app.listen(5000, () => {
    console.log('Server is running on port 5000');
  })


