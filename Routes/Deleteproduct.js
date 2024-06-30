const express=require('express');
const Product = require('../Models/Product/product');
const router = express.Router();


router.delete('/',async(req,res)=>{
    const {id}=req.body;
    try{
        const response=await Product.findOneAndDelete({id,id});
        if(response){
            return res.status(200).json({
                success:1,
                message:'Product deleted successfully'
            })
        }else{
            return res.status(404).json({
                success:0,
                message:'Product not found'
            })
        }
    }catch(err){
        console.log("error deleting product:",err);
    }
})

module.exports=router;