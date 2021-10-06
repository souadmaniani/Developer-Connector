const express = require('express')
const router = express.Router();
const User = require('../../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = require('../../config/keys').secretOrKey
const passport = require('passport')
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


// GET USERS
router.get('/', (req, res) => {
    res.json({'msg': "users"})
})

// REGISTER A USER
router.post('/register', (req, res) => {

    // Validation
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid)
        return (res.status(404).json(errors));
    
    User.findOne({email: req.body.email})
    .then((user) => {
        if (user)
        {
            errors.email = "Email already exists"
            res.status(404).json(errors)
        }
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
                    .then((user)=> res.json(user))
                    .catch((err) => res.json(err))
                });
            });
        }
    })
    .catch((err) => console.log(err));
})

// USER LOGIN / return a token
router.post('/login', (req, res)=> {

    // Validation
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid)
        return (res.status(404).json(errors));

    const { email, password } = req.body;
    // Find user by Email
    User.findOne({ email })
    .then((user) => {
        if (!user)
        {
            errors.email = 'Email not found';
            return res.status(404).json(errors)
        }
        // Check password
        bcrypt.compare(password, user.password)
        .then ((match)=> {
            if (!match)
            {
                errors.password = 'Password incorrect'
                return res.status(400).json(errors)
            }
            // User Matched
            const payload = {id: user.id, username: user.username, avatar: user.avatar}
            // Sign token
            jwt.sign(payload, secret, {expiresIn: 3600}, (err, token) => {
                res.json({success: true, token: 'Bearer ' + token})
            })
        })
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
})

// PRIVATE ROUTE
router.get('/test' , passport.authenticate('jwt', { session: false }), (req , res)=>{
   res.send(req.user.id)

})

module.exports = router