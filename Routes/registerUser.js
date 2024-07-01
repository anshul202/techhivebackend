const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../Models/Users/users');
const router = express.Router();
require('dotenv').config();
const jwt=require('jsonwebtoken');

const userValidationRules = [
    check('username').notEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Email must be valid'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

// Middleware to handle validation errors
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.post('/', userValidationRules, validate, async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        let check = await User.findOne({ email });
        if (check) {
            return res.status(400).json({
                success: 0,
                message: 'Email already exists'
            });
        }

        // Create a cart with 300 items initialized to 0
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const user = new User({
            name: username,
            email: email,
            password: hashedPassword,
            cartData: cart
        });

        // Save the user to the database
        await user.save();
        const data={
            user:{
                id:user.id
            }
        }
        const token=jwt.sign(data,process.env.JWT_SECRET,{expiresIn:"1h"});
    
        res.json({
            success: 1,
            message: 'User registered successfully',
            token:token
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({
            success: 0,
            message: 'An error occurred while registering the user'
        });
    }
});

module.exports = router;
