const express = require('express')
const router = express.Router()
const passport = require('../config/ppConfig')

router.get('/github', passport.authenticate('github'))

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/auth/github' }),
  (req, res) => {
    console.log("this is the user!")
    console.log(req.user.dataValues)
    res.redirect('/')
})

module.exports = router;