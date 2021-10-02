const express = require('express');
const passport = require('passport');
const router = express.Router();
const Profile = require('../../models/Profile')
const mongoose = require('mongoose')

// Private Route
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const Errors = {};
    Profile.findOne({user: req.user._id})
    .then((profile)=> {
        if (!profile)
        {
            Errors.profile = "Profile not found"
            return res.status(404).json(Errors)
        }
        res.json(profile)
    })
    .catch((err)=> {
        res.status(404).json(err);
    })
})

module.exports = router