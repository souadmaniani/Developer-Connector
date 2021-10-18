const express = require('express');
const passport = require('passport');
const router = express.Router();
const Profile = require('../../models/Profile')
const validateProfileInput = require('../../validation/profile')
const validateExperienceInput = require('../../validation/experience')
const validateEducationInput = require('../../validation/education')

// Get Profile By Handle
router.get('/handle/:handle', (req, res)=> {
    const errors = {}
    Profile.findOne({handle: req.params.handle})
    .populate('user', ['name', 'avatar'])
    .then((profile)=> {
        if (!profile) {
            errors.noprofile = "There is no profile for this user";
            return res.status(404).json(errors);
        }
        res.json(profile)
    })
    .catch((err)=> res.status(404).json(err))
})

// Get Profile By Id
router.get('/user/:id', (req, res)=> {
    const errors = {}
    Profile.findOne({user: req.params.id})
    .populate('user', ['name', 'avatar'])
    .then((profile)=> {
        if (!profile) {
            errors.noprofile = "There is no profile";
            return res.status(404).json(errors);
        }
        res.json(profile)
    })
    .catch((err)=> res.status(404).json(err))
})

// Get All Profiles
router.get('/all', (req, res)=> {
    const errors = {}

    Profile.find({})
    .populate('user', ['name', 'avatar'])
    .then((profiles)=> {
        if (!profiles) {
            errors.noprofile = "There are no profiles";
            return res.status(404).json(errors);
        }
        res.json(profiles)
    })
    .catch((err)=> res.status(404).json(err))
})

// Get The User Profile
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};

    Profile.findOne({user: req.user.id})
    .populate('user', ['name', 'avatar'])
    .then((profile)=> {
        if (!profile) {
            errors.noprofile = 'There is no profile for this user';
            return res.status(404).json(errors);
        }
        res.json(profile);
        })
        .catch(err => res.status(404).json(err));
})

// Create Or Update User Profile
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid)
        return res.status(404).json(errors);
    // Get Fields
    const profileFields = {};
    if (req.user.id) profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (typeof req.body.skills !== undefined)
        profileFields.skills = req.body.skills.split(',');
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

    Profile.findOne({user: req.user.id})
    .then((profile)=> {
        if (profile) {
            // Update
            Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true})
            .then((profile)=> {
                return res.json(profile)
            })
            .catch((err)=> {
                return res.json(err)
            })
        }
        else {
            // Create
            Profile.findOne({handle: profileFields.handle })
            .then((profile)=> {
                if (profile) {
                    errors.handle="That handle already exists";
                    return res.status(404).json(errors)
                }
                // save profile
                new Profile(profileFields).save().then((profile)=> res.json(profile))
                .catch((err)=> res.json(err))
            })
        }
    })
})

// Add Experience To Profile
router.post('/experience', passport.authenticate('jwt', {session: false}), (req , res)=>{
    const { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid)
        return res.status(404).json(errors);

    Profile.findOne({user: req.user.id})
    .then((profile)=> {
        if (profile) {
            newExperience = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description,
            }
            // add experience to the arr
            profile.experience.unshift(newExperience);
            // save profile
            profile.save().then((profile)=> res.json(profile))
            .catch((err)=> res.status(404).json(err))
        }
        
    })
    .catch((err)=> res.status(404).json(err))
})

// Add Education To Profile
router.post('/education' , passport.authenticate('jwt', {session: false}),(req , res)=>{
    const { errors, isValid } = validateEducationInput(req.body);
    if (!isValid)
        return res.status(404).json(errors);

    Profile.findOne({user: req.user.id})
    .then((profile)=> {
        if (profile) {
            newEducation = {
                school: req.body.school,
                degree: req.body.degree,
                fieldofstudy: req.body.fieldofstudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description,
            }
            // add education to the arr
            profile.education.unshift(newEducation);
            // save profile
            profile.save().then((profile)=> res.json(profile))
            .catch((err)=> res.status(404).json(err))
        }
    })
    .catch((err)=> res.status(404).json(err))
})

// Delete Experience
router.delete('/experience/:exp_id',  passport.authenticate('jwt', {session: false}),(req, res)=>{
    Profile.findOne({user: req.user.id})
    .then((profile)=> {
        if (profile) {
            // Get remove index
            const removeIndex = profile.experience.findIndex((elem) => elem._id.toString() === req.params.exp_id);
            // Delete Experience
            profile.experience.splice(removeIndex, 1);
            // Profile Save
            profile.save().then((profile)=> res.json(profile))
            .catch((err)=> res.status(404).json(err))
        }
    })
    .catch((err)=> res.status(404).json(err))
})

// Delete education
router.delete('/education/:edu_id',  passport.authenticate('jwt', {session: false}),(req, res)=>{
    Profile.findOne({user: req.user.id})
    .then((profile)=> {
        if (profile) {
            // Get remove index
            const removeIndex = profile.education.findIndex((elem) => elem._id.toString() === req.params.edu_id);
            // Delete Education
            profile.education.splice(removeIndex, 1);
            // Profile Save
            profile.save().then((profile)=> res.json(profile))
        }
    })
})

// Delete Profil And User
router.delete('/', passport.authenticate('jwt', {session: false}),(req, res)=> {
    Profile.findOneAndDelete({ user: req.user.id})
    .then (()=>{
        User.findOneAndDelete({_id: req.user.id})
        .then(()=> res.json({success: true, "msg": "User was deleted"}))
        .catch(()=> res.status(404).json(err))
    })
    .catch((err)=> res.status(404).json(err))
})
module.exports = router