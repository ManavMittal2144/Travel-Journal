const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true
    },
    username: {
        type: String,
        trim: true,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Card'
        }
    ]
});

const User = mongoose.model('User', userSchema);
module.exports = User;