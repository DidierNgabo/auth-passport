/* eslint-disable comma-dangle */
import passport from 'passport';

import LocalStrategy from 'passport-local';

import bcrypt from 'bcrypt';

import { User } from './models';

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

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const isValidPassword = (userpass, pass) => bcrypt.compare(pass, userpass);
    const user = await User.findOne({
      where: {
        name: username,
      },
    });
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (!isValidPassword(user.password, password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  })
);
