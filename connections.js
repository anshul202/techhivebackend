const mongoose=require('mongoose');
require('dotenv').config()
const connectDB=async()=>{
    try {
        const res=await mongoose.connect(process.env.MONGO_URL)
        console.log('Connected to database')
    } catch (err) {
        console.log('Error in connecting to database',err)
    }
}
module.exports=connectDB;


