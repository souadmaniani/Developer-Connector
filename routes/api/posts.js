const express = require('express');
const passport = require('passport');
const router = express.Router();
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const validatePostInput = require('../../validation/post')

// Get All Posts
router.get('/', (req, res) => {
    Post.find({}).sort({date: -1})
    .then((posts)=> res.json(posts))
    .catch(()=> res.status(404).json({nopostfound: "no post found"}))
})

// Get Post By Id
router.get('/:id', (req, res) => {
    Post.findById({_id: req.params.id})
    .then((post)=> res.json(post))
    .catch(()=> res.status(404).json({nopostfound: "no post found"}))
})

// Create Post
router.post('/', passport.authenticate('jwt', {session: false}), (req, res)=>{
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid)
        return (res.status(404).json(errors))
    const newPost = new Post({
        user: req.user.id,
        text: req.body.text,
        username: req.body.username,
        avatar: req.body.avatar
    })
    newPost.save().then((post)=>res.json(post))
    .catch((err)=>res.status(404).json(err))
})

// Delete Post
router.delete('/:id',  passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id}).then(() => {
        Post.findById({_id: req.params.id})
        .then((post)=>{
            if (post.user.toString() === req.user.id) {
                Post.deleteOne({_id: post.id})
                .then(()=> res.json({success: true}))
                .catch((err)=> res.status(404).json(err))
            }
            else
                res.status(401).json({notauthorized: "user not authorized"})
        })
        .catch(()=> res.status(404).json({nopostfound: "no post found"}))
    })
    .catch((err)=> res.status(404).json(err))
})

// Add Like For Post
router.post('/like/:id',  passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id}).then(() => {
        Post.findById({_id: req.params.id})
        .then((post)=>{
            if (post.likes.filter((user) => user._id.toString() === req.user.id).length > 0)
                return res.status(400).json({alreadyliked: "User already liked this post"})
            post.likes.unshift(req.user.id)
            post.save().then((post)=> res.json(post))
            .catch((err)=> res.status(404).json(err))
        })
        .catch(()=> res.status(404).json({nopostfound: "no post found"}))
    })
    .catch((err)=> res.status(404).json(err))
})

// Add unlike For Post
router.post('/unlike/:id',  passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id}).then(() => {
        Post.findById({_id: req.params.id})
        .then((post)=>{
            if (post.likes.filter((user) => user._id.toString() === req.user.id).length === 0)
                return res.status(400).json({notliked: "not liked yet"})
            // Get index
            const removeIndex = post.likes.map(user => user._id.toString()).indexOf(req.user.id)
            // Remove Index
            post.likes.splice(removeIndex, 1);
            // Save Post
            post.save().then((post)=> res.json(post))
            .catch((err)=> res.status(400).json(err))
        })
        .catch(()=> res.status(404).json({nopostfound: "no post found"}))
    })
    .catch((err)=> res.status(404).json(err))
})

// Add Comment
router.post('/comment/:id', passport.authenticate('jwt', {session: false}),(req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid)
        return (res.status(404).json(errors))
    Post.findById({_id: req.params.id}).then ((post)=> {

        const newComment = {
            user: req.user.id,
            text: req.body.text,
            username: req.body.username,
            avatar: req.body.avatar
        }
        // Add comment to array
        post.comments.unshift(newComment);
        // Save post
        post.save().then((post)=>res.json(post))
        .catch((err)=> res.status(404).json(err))
    })
    .catch(()=>res.status(404).json({nopostfound: "post not found"}))
})

// Delete Comment
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {session: false}),(req, res) => {
    Profile.findById({_id: req.user.id}).then(()=> {
        Post.findById({_id: req.params.id}).then((post)=> {
            // Check if the comment exists
            if (post.comments.filter((item) => item._id.toString() === req.params.comment_id).length === 0)
                return res.status(404).json({commentnotexist: "comment does not exist"})
            const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id)
            post.comments.splice(removeIndex, 1);
            post.save().then(()=> res.json({success: true}))
            .catch((err)=> res.status(404).json(err))
                
        })
        .catch(()=> res.status(404).json({nopostfound: "post not found"}))
    })
    
})

module.exports = router