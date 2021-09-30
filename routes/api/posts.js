const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.json({'POSTS': "posts"})
})

module.exports = router