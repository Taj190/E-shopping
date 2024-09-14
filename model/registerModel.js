const userSchema = require("../schema/userSchema")
const { encryptPassword, comparePassword, compareAnswer } = require("../utils/authHelper")

const registerUser = ({name , email , password , address , answer1 ,answer2 , answer3,phone}) =>{
    return new Promise ( async (resolve , reject)=>{
       try {
            const existingUser = await userSchema.findOne({email : email })
            if(existingUser){
                return reject(new Error("Email already exists"))
            }
           
            const hashPassword = await encryptPassword(password)
            const hashedAnswer1 = await encryptPassword(answer1)
            const hashedAnswer2 = await encryptPassword(answer2)
            const hashedAnswer3 = await encryptPassword(answer3)
            const newUser = await new userSchema({
                name,
                email,
                password: hashPassword ,
                phone,
                address,
                answer1 : hashedAnswer1,
                answer2 : hashedAnswer2,
                answer3 : hashedAnswer3
            }).save()

            resolve(newUser)
       } catch (error) {
        reject(error)
       }
    })
}

const loginUser = ({email, password})=>{
    return new Promise(async(resolve, reject)=>{
        try {
            const existingUser = await userSchema.findOne({email:email})
            if(!existingUser){
                return reject(new Error("Email not found"))
            }
            const match = await comparePassword(password, existingUser.password)
            if(!match){
                return reject(new Error("Incorrect password"))
            }
            resolve(existingUser)
        } catch (error) {
            reject(error)
        }
    })
}
const resetPassword = async ({ email, newPassword, answer1, answer2 , answer3 }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await userSchema.findOne({ email: email });
            
            if (!user) {
                return reject(new Error("User not found"));
            }

            const isAnswer1Valid = await compareAnswer(answer1, user.answer1);
            const isAnswer2Valid = await compareAnswer(answer2, user.answer2);
            const isAnswer3Valid = await compareAnswer(answer3, user.answer3);
    
            if (!isAnswer1Valid || !isAnswer2Valid || !isAnswer3Valid) {

                return reject(new Error("One or more security answers do not match"));
            }

            const hashedPassword = await encryptPassword(newPassword);
            const updatedUser = await userSchema.findByIdAndUpdate(
                user._id, 
                { password: hashedPassword },
                { new: true }  // This returns the updated user document
            );

            if (!updatedUser) {
                return reject(new Error("Failed to update the password"));
            }

            resolve({ 
                success: true,
                message: "Password reset successfully",
                user: updatedUser
            });
        } catch (error) {
            reject(error);
        }
    });
    
};
const updateUser = async({_id, name, email, phone, address})=>{
    return new Promise(async(resolve, reject)=>{
        try {
            const updatedUser = await userSchema.findByIdAndUpdate(_id, {name, email, phone, address},
                {new: true})
            if(!updatedUser){
                return reject(new Error("User not found"))
            }
            resolve(updatedUser)
        } catch (error) {
            reject(error)
        }
    })
}



module.exports = {
    registerUser,
    loginUser,
    resetPassword,
    updateUser
}