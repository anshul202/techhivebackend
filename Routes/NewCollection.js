const express=require('express');
const Product=require('../Models/Product/product')
const router = express.Router();


router.get('/',async(req,res)=>{
    let products=await Product.find({});
    let newcollection=[];
    if(products.length>0){
        console.log("products fetched");
        newcollection=products.slice(-1).slice(-8);
    }
    console.log("newcollection fetched");
    res.send(newcollection)
})

module.exports=router;