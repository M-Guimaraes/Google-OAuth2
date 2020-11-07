const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: '606142039818-vsb968q1ui9fm1jm80p9kjt2j0p3j8b3.apps.googleusercontent.com',
  clientSecret: '224uolgoA5uR3Jy9-Z8MiDqD',
  callbackURL: 'http://localhost:3000/google/callback'
},
  function (accessToken, refreshToken, profile, done) {
    //use the profile info(mainly profile id) to check if the user is registered in your db
    return done(null, profile);
  }
));