const mongoose = require('mongoose')

const { Schema, model } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    date: {
        type: String,
        default: Date.now
    },
})

module.exports = User = model('users', UserSchema)
