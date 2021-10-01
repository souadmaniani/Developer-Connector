const express = require('express')
const router = express.Router();
const User = require('../../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = require('../../config/keys').secretOrKey
const passport = require('passport')
// GET USERS
router.get('/', (req, res) => {
    res.json({'msg': "users"})
})

// REGISTER A USER
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

                    newUser.save()
                    .then((user)=> res.json({'msg': user}))
                    .catch((err) => res.json({'error': err}))
                });
            });
        }
    })
    .catch((err) => console.log(err));
})

// USER LOGIN / return a token
router.post('/login', (req, res)=> {
    const { email, password } = req.body;
    // Find user by Email
    User.findOne({ email })
    .then((user) => {
        if (!user)
            return res.status(404).json({email: 'email not found'})
        // Check password
        bcrypt.compare(password, user.password)
        .then ((match)=> {
            if (!match)
                return res.status(400).json({password: 'password incorrect'})
            // User Matched
            const payload = {id: user.id, username: user.username, avatar: user.avatar}
            // Sign token
            jwt.sign(payload, secret, {expiresIn: 3600}, (err, token) => {
                res.json({msg: "success", token: 'Bearer ' + token})
            })
        })
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
})

// PRIVATE ROUTE
router.get('/test' , passport.authenticate('jwt', { session: false }), (req , res)=>{
   res.send(req.user)

})

module.exports = router