const express = require('express') ;
const { requireLogin, isAdmin } = require('../middleware/authMiddleware');
const ProductRoute = express.Router();
const formidable = require( "express-formidable");
const { ProductController, ReadProductController, ReadSingleProductController, getProductPhotoController, productDeleteController, productUpadteController,  filterProductController, searchProductController, similarProductController, ProductCategoryController, braintreeTokenController, braintreePaymentController, getOrderController, getAllOrderController, orderStatusController } = require('../controller/productController');

ProductRoute.post('/create-product' ,  requireLogin , isAdmin,formidable(), ProductController);
ProductRoute.get('/read-product' ,  ReadProductController);
ProductRoute.get('/read-single-product/:slug' ,  ReadSingleProductController);
ProductRoute.get('/get-photo/:p_id' ,  getProductPhotoController);
ProductRoute.delete('/delete-product/:id' , requireLogin, isAdmin , productDeleteController);
ProductRoute.post('/filter-products', filterProductController);
ProductRoute.put('/update-product/:id' , requireLogin, isAdmin ,formidable(), productUpadteController);
ProductRoute.get('/search-product/:keyword' ,searchProductController)
ProductRoute.get('/similar-product/:pid/:cid' ,similarProductController)
ProductRoute.get('/product-category/:slug' ,ProductCategoryController)
//payment routes
ProductRoute.get('/braintree/token' ,braintreeTokenController)
ProductRoute.post('/braintree/payment' ,requireLogin, braintreePaymentController)
ProductRoute.get('/order' ,requireLogin, getOrderController)
ProductRoute.get('/get-all-order' ,requireLogin,isAdmin, getAllOrderController)
ProductRoute.put('/order-status/:orderId' ,requireLogin,isAdmin, orderStatusController)
module.exports = ProductRoute;



