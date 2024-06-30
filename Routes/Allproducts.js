const express=require('express');
const Product=require('../Models/Product/product')
const router = express.Router();


router.get('/',async(req,res)=>{
    try{
        const products=await Product.find({});
        return res.send(products);
    }catch(err){
        console.log("error getting products:",err);
    }
})

module.exports=router;