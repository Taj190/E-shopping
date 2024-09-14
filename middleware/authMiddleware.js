const jwt = require("jsonwebtoken");
const userSchema = require("../schema/userSchema");

const requireLogin = (req, res , next)=>{
    
      const authHeader = req.headers.authorization;
      if(!authHeader){
          return res.status(401).json({msg: "Not authorized, token is required"})
      }
      const token = authHeader
      jwt.verify(token , process.env.JWT_KEY , (err, user)=>{
         if(err){
             return res.status(403).json({msg: "Token is not valid"})
         }
         console.log('User from token:', user); 
         req.user = user;
         next();
         
      })
    
       

}
const userMiddleware = async (req, res, next) => {
    try {
        console.log(req.user.id)
        const userId = await userSchema.findById(req.user.id);
        if (!userId) {
            return res.status(404).json({ msg: "User not found" });
        }
        if (userId.role !== 0) {
            return res.status(403).json({ msg: "Not authorized, you are not to user admin" });
        }
        next();
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(403).send({
            success: false,
            message: "You are not authorized"
        });
    }
}
const isAdmin = async (req, res, next) => {
    try {
        console.log(req.user.id)
        const userId = await userSchema.findById(req.user.id);
        if (!userId) {
            return res.status(404).json({ msg: "User not found" });
        }
        if (userId.role !== 1) {
            return res.status(403).json({ msg: "Not authorized, you are not admin" });
        }
        next();
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(403).send({
            success: false,
            message: "You are not authorized"
        });
    }
};

module.exports = {
    requireLogin  ,
     isAdmin,
     userMiddleware
};