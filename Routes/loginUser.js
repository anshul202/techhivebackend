const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../Models/Users/users');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Validation rules for login
const loginValidationRules = [
    check('email').isEmail().withMessage('Email must be valid'),
    check('password').notEmpty().withMessage('Password is required')
];

// Middleware to handle validation errors
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Login endpoint
router.post('/', loginValidationRules, validate, async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: 0,
                message: 'Invalid email or password'
            });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: 0,
                message: 'Invalid email or password'
            });
        }

        // Create and sign the JWT
        const data = {
            user: {
                id: user.id
            }
        };
        const token = jwt.sign(data, 'secret_mine', { expiresIn: '1h' });

        res.json({
            success: 1,
            message: 'Login successful',
            token: token
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({
            success: 0,
            message: 'An error occurred while logging in'
        });
    }
});

module.exports = router;