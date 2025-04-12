const express = require('express');
const router = express.Router();

// In-memory storage
let users = [];

// Signup endpoint
router.post('/signup', (req, res) => {
    try {
        console.log('Signup request received:', req.body);
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const newUser = {
            id: users.length + 1,
            username,
            email,
            password
        };

        users.push(newUser);
        console.log('User created:', newUser);

        res.status(201).json({
            success: true,
            message: 'Registration successful',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Registration failed' 
        });
    }
});

// Login endpoint
router.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        res.json({
            success: true,
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Login failed' 
        });
    }
});

module.exports = router;