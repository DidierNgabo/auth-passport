/* eslint-disable comma-dangle */
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import cookieSession from 'cookie-session';
import cors from 'cors';
import './passport';

const app = express();
const port = process.env.Port || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: 'google-auth2',
    keys: ['key1', 'key2'],
  })
);

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('hello google auth loggin first');
});
app.get('/failed', (req, res) => {
  res.send('failed to login');
});
app.get('/good', isLoggedIn, (req, res) => {
  res.send(`welcome ${req.user.displayName}`);
});

app.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
app.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/failed' }),
  (req, res) => {
    res.redirect('/good');
  }
);
app.get('/logout', (req, res) => {
  req.session = null;
  req.logOut();
  res.redirect('/');
});
app.listen(port, () => {
  console.log(`server running on 'http://localhost:${port}'`);
});
