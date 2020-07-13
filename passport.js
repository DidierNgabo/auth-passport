/* eslint-disable comma-dangle */
import passport from 'passport';

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '309514045535-21s22lssad1sl887se32cin087fetqfp.apps.googleusercontent.com',
      clientSecret: 'x-G8XPhRk_WKAVN4XwjLxsza',
      callbackURL: 'http://localhost:3000/google/callback',
    },
    (accessToken, refreshToken, profile, done) => done(null, profile)
  )
);
