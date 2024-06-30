const mongoose=require('mongoose');

const connectDB=async()=>{
    try {
        const res=await mongoose.connect('mongodb+srv://sainian45:Indoisla%40123@cluster0.aklgnh7.mongodb.net/')
        console.log('Connected to database')
    } catch (err) {
        console.log('Error in connecting to database',err)
    }
}
module.exports=connectDB;


