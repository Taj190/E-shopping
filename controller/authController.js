const {registerUser, loginUser, resetPassword, updateUser} = require("../model/registerModel")

const { registerValidation, validateNewpassword, userUpdateValidation } = require("../utils/authHelper")
const JWT = require("jsonwebtoken")

const registerController = async (req, res)=>{
   const {name , email , password , phone , address , answer1, answer2, answer3} = req.body
  

   try {
     await registerValidation({name, email, password, phone, address , answer1, answer2,answer3 })
   } catch (error) {
    console.log(error)

    return res.status(400).send({  // Always return here to stop further execution
        success: false,
        message: error.message || "An error occurred while registering user"
    });
}
    //Create a new user in the database
    const userDb  = await registerUser({name, email, password, phone, address , answer1, answer2, answer3})
    try {
      if (userDb){
        res.send({
            success: true,
            message: "User registered successfully",
            user: userDb
        })
      }
    } catch (error) {
      
        res.send({
            success: false,
            message: error|| "An error occurred while saving user to the database"
        })
    }
}
const loginController = async (req, res)=>{
  const {email, password} = req.body ;

  if(!email || !password){
    return res.send({
      success: false,
      message: "Email and password are required"
    })
  }
  const userDb = await loginUser({email, password})
  
  try {
    if(userDb){
      const token = JWT.sign({id: userDb._id}, process.env.JWT_KEY, {expiresIn: '1h'})
      res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV }); 
      return res.send({
        status : 200,
        success: true,
        message: "User logged in successfully",
        user: {
          _id: userDb._id,
          name: userDb.name,
          email: userDb.email,
          phone: userDb.phone,
          address: userDb.address,
          role : userDb.role
        } ,
        token
      
      })
      
    }
  } catch (error) {
    
    return res.send({
      success: false,
      message: error.message,
    })
  }

}

const forgotPasswordController = async(req, res)=>{

  const {email , newPassword , answer1, answer2, answer3}= req.body ;

  if(!email || ! newPassword || !answer1|| !answer2 || !answer3){
    return res.send({
      success: false,
      message: "Email, new password and answer are required"
    })
  }
  try {
    await validateNewpassword({email, newPassword , answer1, answer2, answer3})
  } catch (error) {
     
    return res.send({

      success: false,
      message: error.message || "An error occurred while validating newPassword"
    })
  }
 
  const userDb = await resetPassword({email , newPassword , answer1, answer2, answer3})
  try {
      if(userDb){
        return res.send({
          success: true,
          message: "Password reset successfully",
          user: userDb
        })
      }
  } catch (error) {
    
    return res.send({
      success: false,
      message: "One or more security answers do not match"
    })
  }

}

const updateUserController = async (req, res) =>{
  const {_id,name, email, phone, address} = req.body
  console.log(_id,name, email, phone, address)
 
 try {
 await userUpdateValidation({name , email, phone , address})
 } catch (error) {
  console.log(error)
  res.send({
    success: false,
    message:  "An error occurred while updating user details"
  })
 }
  const data = await updateUser({_id, name, email, phone, address})
  try {
    if(data){
      
      res.send({
        success: true,
        message: "User details updated successfully",
        data
      })

    }
  } catch (error) {
    res.send({
      success: false,
      message: "An error occurred while updating user details"
    })
  }
}

const testing = (req , res)=>{
  res.send({
    message: "This is a testing route",
    user:req.user
  })
}

module.exports={
    registerController,
    loginController,
    testing,
    forgotPasswordController,
    updateUserController 
}