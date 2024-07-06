const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET || 'vikas';

router.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
router.use(cookieParser());

router.post('/register', async (req, res) => {
    try {
        const { email, password, username } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const hashedPassword = bcrypt.hashSync(password, salt);
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });

        res.status(200).json({ msg: 'User created successfully' });
    } catch (err) {
        res.status(400).json({ msg: 'Something went wrong' });
    }
});

router.post('/login', async (req, res) => {
    const { password, username } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Wrong credentials' });
        }

        const passed = bcrypt.compareSync(password, user.password);
        if (passed) {
            jwt.sign({ username, id: user._id }, secret, {}, (err, token) => {
                if (err) {
                    return res.status(500).json({ msg: 'Error generating token' });
                }
                res.cookie('token', token).json({
                    id: user._id,
                    username,
                });
            });
        } else {
            res.status(400).json({ msg: 'Wrong credentials' });
        }
    } catch (e) {
        res.status(400).json({ msg: 'Wrong credentials' });
    }
});

router.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ msg: 'No token provided' });
    }

    jwt.verify(token, secret, (err, info) => {
        if (err) {
            return res.status(403).json({ msg: 'Invalid token' });
        }
        res.json(info);
    });
});

router.post('/logout', (req, res) => {
    res.cookie('token', '').json({ msg: 'Logged out successfully' });
});

module.exports = router;
