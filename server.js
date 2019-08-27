require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const layouts = require('express-ejs-layouts')
const session = require('express-session');
const passport = require('./config/ppConfig')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./models');

const app = express();

//Config the express
app.use(express.static('static'));
app.use(layouts);
app.set('view engine', 'ejs');
app.use(helmet);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const sessionStore = new SequelizeStore({
  db: db.sequelize,
  expiration: 30 * 60 * 1000
})

// Configure the express-session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: sessionStore
}));

sessionStore.sync();

app.use(passport.initialize());
app.use(passport.session());

// ROUTES
app.get('/', (req, res) => {
  console.log(req.user || "🍑")
  res.render('index', { user: req.user || null })
})

function fuckOff(req, res, next) {
  console.log("eat my shorts")
  if(req.isAuthenticated()) { return next(); }
  res.redirect('/auth/github')
}

// Controllers
app.use('/auth', require('./controllers/auth'));
app.use('/api', fuckOff, require('./controllers/api'));
app.use('/', fuckOff, require('./controllers/protected'))

app.listen(process.env.PORT || 3000, () => {
  console.log(`🎧You're listening to the smooth sounds of port ${process.env.PORT || 3000}🎧`)
})