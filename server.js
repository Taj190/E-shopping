const express = require('express');
const connectDb = require('./config/db');
const morgan = require('morgan');
const app = express();
const dotenv = require('dotenv');
const authentication = require('./route/register');
const cors = require('cors');
const categoryRouter = require('./route/category');
const ProductRoute = require('./route/product');
const path = require('path');
dotenv.config()

//database configuration
connectDb()

//middleware
// app.use(morgan('dev'))
app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, './client/dist')))
//Routes
app.use('/auth',authentication)
app.use('/category',categoryRouter)
app.use('/product',ProductRoute)
//rest api 
app.use('*', function(req,res){
    res.sendFile(path.join(__dirname, './client/dist/index.html'));
})
//Port
const PORT = process.env.PORT
//listen
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
