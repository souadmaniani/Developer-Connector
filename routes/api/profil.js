const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.json({'profil': "profil"})
})

module.exports = router