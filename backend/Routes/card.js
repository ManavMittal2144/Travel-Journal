const express = require('express')
const router = express.Router();
const Card = require('../Models/Card');
const User = require('../Models/User');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const secret = 'vikas';
router.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
router.use(cookieParser());

router.get('/allcards', async (req, res) => {
    try {
        let allCards = await Card.find({});
        res.status(200).json(allCards);
    }
    catch (e) {
        res.status(400).json({ msg: 'something galat' })
    }
})

router.post('/:cardId/add', async (req, res) => {
    let { cardId } = req.params;
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        let userId = info.id;
        let card = await Card.findById(cardId);
        let user = await User.findById(userId);
        user.cart.push(card);
        await user.save();
        res.status(200).json({ msg: 'created successfully' });
    });
})

router.get('/cards', async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        let userId = info.id;
        let user = await User.findById(userId).populate('cart');
        res.status(200).json(user);
    });
    // res.render('cart/cart', { user })
})



module.exports = router;