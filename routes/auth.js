const express = require('express')
const router = express.Router();
const passport=require('passport');
const path = require("path");
const User =require('../Models/auth');

// console.log("auth js route");

router.get('/login',(req,res)=>{
  res.render('auth/login');
})

router.get('/register',(req,res)=>{
  res.render('auth/signup');
})


router.post('/login', passport.authenticate('local', { 
  failureRedirect: '/register',
  failureFlash: true
}), 
(req, res) => {
  try
  {
    req.flash('success', `Welcome Back  ${req.user.username} Again!!`);
    console.log('Logged In Successfully!');

    let redirecturl=currenturl||'/home'

    if(redirecturl && redirecturl.indexOf('user')!==-1)
    {
        redirecturl = ('/home');
    }
    
    if(redirecturl && redirecturl.indexOf('review')!==-1)
    {
        redirecturl=redirecturl.split('/');
        redirecturl.pop();
        redirecturl=redirecturl.join('/');   
    }
  

    res.redirect('/home');
    }
    catch(e)
    {
      req.flash('fail', `u have to register first !!!`);
      res.redirect('/home')
    }
}
);




router.post('/register', async (req,res)=>{
  // console.log("hwloo")
  try {
    // console.log("register post request")
    const { username, password, email } = req.body;
    const user = new User({ username, email });
    const newUser = await User.register( user, password);

    req.login(newUser, function(err) {
        if (err){
            return next(err);
        }

        req.flash('success', 'Welcome , You are Registered Successfully');

        return res.redirect('/home');
    });
}
catch (e) {
    req.flash('error', e.message);
    // res.send(e.message)
    console.log(e.message);
    res.redirect('/login');
}
})



router.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));



router.get('/auth/google/callback',
passport.authenticate( 'google', {
      failureRedirect: '/login',
      failureFlash: true
}),(req,res)=>{
  req.flash('success', `Welcome ${req.user.displayName} Again!!`);
  console.log(req.user.displayName);
    res.redirect('/home');

});


router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { 
      console.log("Error during logout:", err);
      return next(err); // Pass the error to the next middleware
    }
    req.flash('success', 'GoodBye!!');
    res.redirect('/home');
  });
});




  

  module.exports = router;