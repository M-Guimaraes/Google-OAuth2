const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const cors = require('cors');

const passport = require('passport');

const cookieSession = require('cookie-session');

require('./config/passport-google-oauth2');

let port = 3000;

app.use(cookieSession({
  name: 'OAuth2-session',
  keys: ['key1', 'key2']
}))

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => res.send('You are not logged in'));
app.get('/failed', (req, res) => res.send('You failed to log in'));
app.get('/good', isLoggedIn, (req, res) => res.send(`Welcome Mr ${req.user.displayName}`));


app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/good');
  });

app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/')
})
app.listen(port, () => console.log(`Listen on port ${port}`))