const express = require('express') ;
const { registerController, loginController, testing, forgotPasswordController, updateUserController } = require('../controller/authController');
const{ requireLogin, isAdmin, userMiddleware} = require('../middleware/authMiddleware');
const authentication = express.Router() ;

authentication.post('/register' , registerController)
authentication.post('/login' , loginController)
authentication.post('/forgotpassword' , forgotPasswordController)
//user auth
authentication.get('/user-auth' ,requireLogin, userMiddleware ,(req,res)=>{
    res.status(200).send({ok : true});
})

//admin auth
authentication.get('/admin-auth' ,requireLogin, isAdmin,(req,res)=>{
    res.status(200).send({ok : true});
})
authentication.get('/test' ,requireLogin,isAdmin,  testing)
authentication.put('/update-user' ,requireLogin,  updateUserController)


module.exports = authentication ;