const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session')
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const dotenv=require('dotenv').config()
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const User = require('./Models/auth')


//mongoos connection
mongoose
  .connect(
    // "mongodb+srv://shapeshiftDB:rajatdb448@shapeshift.s1s4lbp.mongodb.net/?retryWrites=true&w=majority"
    "mongodb://localhost:27017/shapeshift"
  )
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((e) => {
    console.log("failed");
  });


app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {  
    httpOnly: true,
    expires: Date.now() + 1000* 60 * 60 * 24 * 7,
    maxAge:1000* 60 * 60 * 24 * 7 * 1
  }
}));


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

  passport.serializeUser((user,done)=>{
    done(null,user);
  })
  passport.deserializeUser((user,done)=>{
    done(null,user);
  })

 
passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());
  //passport  check krega username and password using authenticate method provided by the passport-local-mongoose package
passport.use(new LocalStrategy(User.authenticate())); 


  passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://shapeshift.onrender.com./auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    done(null,profile);
  }
));




  app.use((req, res, next) => {
    res.locals.currentUser = "";
    res.locals.currentusermail="";
    res.locals.user="";
    res.locals.success=req.flash('success')
    res.locals.error=req.flash('error');
    res.locals.currenturl="/home";
    if(req.user && req.user.displayName)
    {
      res.locals.user=req.user;
      const username=(req.user.displayName.split(' '))[0];
     res.locals.currentUser= username.toUpperCase();
     res.locals.currentusermail= req.user.email;
    }
    if(req.user && req.user.username)
    {
      res.locals.user=req.user;
      res.locals.currentUser= req.user.username.toUpperCase();
      res.locals.currentusermail= req.user.email;
    }

    next();
  })
  


//all the routes
const BlogRoutes = require('./routes/blogs');
const AuthRoutes = require('./routes/auth');
const NormalRoutes = require('./routes/normalRoutes');

app.use(AuthRoutes);
app.use(BlogRoutes);
app.use(NormalRoutes);



app.listen(5000, () => {
  console.log("connect to server");
});