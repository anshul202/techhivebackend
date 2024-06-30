const express=require('express');
const router = express.Router();

// Validation rules for adding a product
const Product = require('../Models/Product/product'); // Assuming you have a Product model

router.post('/', async (req, res) => {
    let products=await Product.find({});
    let id;
    if(products.length>0){
        id=(Number(products[products.length-1].id)+1).toString();
    }else{
        id="1";
    }
    try {
        const product = new Product({
            id: id,
            name: req.body.name,
            category: req.body.category,
            image: req.body.image,
            link: req.body.link,
            ratings: req.body.ratings,
            no_of_ratings: req.body.no_of_ratings || 0,
            new_price:  req.body.new_price,
            old_price: req.body.old_price,
            available: req.body.available
        });
        const response=await product.save();

        return res.status(200).json({
            success: 1,
            productId: id,
            message: 'Product added successfully'
        });

    } catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json({
            success: 0,
            message: 'An error occurred while adding the product'
        });
    }
});

module.exports = router;
