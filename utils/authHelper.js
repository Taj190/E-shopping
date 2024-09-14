const bcrypt = require('bcrypt')

const encryptPassword = async (password) => {
   try {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password , saltRounds)
    return hashedPassword
   } catch (error) {
    console.log(error)
   }
}

const comparePassword = async (password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword)
    return match
}
const compareAnswer = async (providedAnswer, storedHashedAnswer) => {
    return await bcrypt.compare(providedAnswer, storedHashedAnswer);
};

const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
// const passwordRegex = /^(?=.*[A-Z]{1})(?=.*[a-z]+)(?=.*\d)(?=.*[@#$%^&-+=()!? "]).{8,}$/;
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20}$/;

const emailValidation = (email)=>{
  if(!email){
    return("Email is required")
  }
  if(email.length > 254){
    return("Email should be less than or equal to 254 characters")
  }
  if(!emailRegex.test(email)){
    return("Invalid email format")
  }
  const parts = email.split("@")
  if(parts[0].length < 2 || parts[0].length >64){
    return("Invalid email format")
  }
  const domainParts = parts[1].split(".") ;
  if(domainParts.some((part)=>part.length > 63)) return false
  return true
}

const registerValidation = ({ name, email, password, phone, address, answer1, answer2, answer3 }) => {
    return new Promise((resolve, reject) => {
        if (!name) {
            return reject(new Error("Name is required"));
        }
        if (!email) {
            return reject(new Error("Email is required"));
        }
        if (!emailValidation(email)) {
            return reject(new Error("Invalid email format"));
        }
        if (!password) {
            return reject(new Error("Password is required"));
        }
        if (!passwordPattern.test(password)) {
            return reject(new Error("Invalid password format"));
        }
        if (!phone) {
            return reject(new Error("Phone number is required"));
        }
        if (!address) {
            return reject(new Error("Address is required"));
        }
        if (!answer1 || !answer2|| !answer3) {
            return reject(new Error("Answer is required"));
        }
        if(answer1==answer2 || answer1==answer3 || answer2==answer3){
            return reject(new Error("Answers should be different"));
        }
        resolve(true);  // If all validations pass
    });
};
const userUpdateValidation = ({ name, email, phone, address,}) => {
    return new Promise((resolve, reject) => {
        if (!name) {
            return reject(new Error("Name is required"));
        }
        if (!email) {
            return reject(new Error("Email is required"));
        }
        if (!emailValidation(email)) {
            return reject(new Error("Invalid email format"));
        }
        
        if (!phone) {
            return reject(new Error("Phone number is required"));
        }
        if (!address) {
            return reject(new Error("Address is required"));
        }
      
        resolve(true);  // If all validations pass
    });
};


const validateNewpassword = ({email , newPassword , answer1 , answer2, answer3})=>{
        return new Promise((resolve , reject)=>{
            if(!email) {
                return reject(new Error("Email is required"))

            }
            if(!emailValidation(email)){
                return reject(new Error("Invalid email"))
            }
            if(!newPassword){
                return reject(new Error("New password is required"))
            }
           
           if(!passwordPattern.test(newPassword)){
            return("Invalid password format")
        }



            if(!answer1 || !answer2 || !answer3){
                return reject(new Error("Answer is required"))
            }
            resolve({ success: true, message: "Validation successful" })
        })
}



module.exports = {
    encryptPassword,
    comparePassword,
    registerValidation,
    compareAnswer ,
    validateNewpassword,
    userUpdateValidation
   
}