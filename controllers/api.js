const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');

router.get('/repos', (req, res) => {
  console.log(req.user)
  let config = {
    headers: {
      'Authorization': `Bearer ${req.user.accessToken}`,
      'User-Agent': 'KingKong-Boilerplate',
    }
  }
  axios.get('https://api.github.com/user/repos', config)
    .then((response) => {
      console.log(response.data)
      res.render('repos', { repos: response.data, user: req.user })
    })
    .catch(err => {
      console.log('fuckin yikes bud')
      console.log(err)
    })
})

module.exports = router;