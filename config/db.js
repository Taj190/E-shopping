const mongoose = require('mongoose') ;

const connectDb = async()=>{
     try {
        const db  = await mongoose.connect(process.env.MONGO_URL) ;
        console.log("database connection established")
     } catch (error) {
        console.log(error)
     }
}

module.exports = connectDb ;