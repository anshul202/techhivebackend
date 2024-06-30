const mongoose=require('mongoose');
const schema=mongoose.Schema({
    id:{
        type:String,
        unique:true
    },
    name:{
        type:String,
        required:true
    },main_category:{
        type:String,
        default:'tv, audio & cameras'
    },category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },link:{
        type:String,
        default:''
    },ratings:{
        type:String,
        default:"0"
    },no_of_ratings:{
        type:String,
        default:"0"
    },new_price:{
        type:String,
        required:true
    },old_price:{
        type:String,
        required:true
    },date:{
        type:Date,
        default:Date.now()
    },available:{
        type:Boolean,
        default:true
    }
    
})
const Product=mongoose.model('Product',schema);

module.exports=Product;