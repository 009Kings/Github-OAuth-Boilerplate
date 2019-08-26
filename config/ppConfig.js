const passport = require('passport');
const passportGithub2 = require('passport-github2');
const GitHubStrategy = passportGithub2.Strategy;
const db = require('../models');

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
},
function(accessToken, refreshToken, profile, cb) {
  db.user.findOrCreate({
    where: { githubId: profile.id},
    defaults: {
      token: accessToken
    }
  })
  .spread((user, created) => {
    console.log("Token: " + accessToken)
    return cb(null, user)
  })
  .catch(err => {
    return cb(err, null)
  })
}))

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((obj, cb) => {
  cb(null, obj)
})

module.exports = passport;