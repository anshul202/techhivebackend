const mongoose=require('mongoose');
const schema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
        default:{}
    },
    date:{
        type:Date,
        default:Date.now()
    }
})
const User=mongoose.model('User',schema);

module.exports=User;