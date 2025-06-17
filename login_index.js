const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const WechatStrategy = require('passport-wechat').Strategy;
const InstagramStrategy = require('passport-instagram').Strategy;

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new GoogleStrategy({
  clientID: 'GOOGLE_CLIENT_ID',
  clientSecret: 'GOOGLE_SECRET',
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile);
}));

passport.use(new KakaoStrategy({
  clientID: 'KAKAO_CLIENT_ID',
  callbackURL: '/auth/kakao/callback'
}, (accessToken, refreshToken, profile, done) => done(null, profile)));

passport.use(new WechatStrategy({
  appID: 'WECHAT_APP_ID',
  appSecret: 'WECHAT_SECRET',
  callbackURL: '/auth/wechat/callback',
  scope: 'snsapi_login'
}, (accessToken, refreshToken, profile, done) => done(null, profile)));

passport.use(new InstagramStrategy({
  clientID: 'INSTAGRAM_CLIENT_ID',
  clientSecret: 'INSTAGRAM_SECRET',
  callbackURL: '/auth/instagram/callback'
}, (accessToken, refreshToken, profile, done) => done(null, profile)));

const app = express();
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Authentication routes
['google', 'kakao', 'wechat', 'instagram'].forEach(provider => {
  app.get(`/auth/${provider}`, passport.authenticate(provider));
  app.get(`/auth/${provider}/callback`,
    passport.authenticate(provider, { failureRedirect: '/' }),
    (req, res) => res.redirect('/profile')
  );
});

app.get('/profile', (req, res) => {
  if (!req.user) return res.redirect('/');
  res.send(`<h1>Welcome, ${req.user.displayName}</h1><pre>${JSON.stringify(req.user, null, 2)}</pre>`);
});

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
