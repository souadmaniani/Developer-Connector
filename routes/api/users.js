const express = require('express')
const router = express.Router();
const User = require('../../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')

// GET USERS
router.get('/', (req, res) => {
    res.json({'msg': "users"})
})

// REGISTER USER
router.post('/register', (req, res) => {
    User.findOne({email: req.body.email})
    .then((user) => {
        if (user)
            res.status(404).json({"email: ": "email Exists"})
        else {
            const avatar =  gravatar.url(req.body.email,  {s: '200', r: 'pg', d: '404'})
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: avatar
            })
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                });
            });
            newUser.save()
            .then((user)=> res.json({'msg':user}))
            .catch((err) => res.json({'error': err}))
        }

    })
    .catch((err) => console.log(err));
})

module.exports = router