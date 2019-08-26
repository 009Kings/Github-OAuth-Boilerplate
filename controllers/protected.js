const express = require('express')
const router = express.Router()
const passport = require('../config/ppConfig')

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;