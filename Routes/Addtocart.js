const express=require('express');
const Product=require('../Models/Product/product')
const router = express.Router();

const fetchuser=async(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({
            errors:"Please authenticate using a valid token"
        });
    }else{
        try {
            const data=jwt.verify(token,'secret_mine');
            req.user=data.user;
        } catch(err){
            res.status(401).send({
                errors:"Please authenticate using a valid token"
            })
        }
    }
}

router.get('/',fetchuser,async(req,res)=>{
    console.log(req.body,req.user);
})

module.exports=router;