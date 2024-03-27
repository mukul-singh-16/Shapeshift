const express = require('express')
const router = express.Router();
const passport=require('passport');
const path = require("path");

router.get('/login',(req,res)=>{
  res.render('auth/login');
})

router.post('/login',(req,res)=>{
  res.send("bhai gogel se login krle")
})



router.post('/register',(req,res)=>{
  res.send("bhai gogel se login krle")
})



router.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));



router.get( '/auth/google/callback',
passport.authenticate( 'google', {
      failureRedirect: '/login',
      failureFlash: true
}),(req,res)=>{
  req.flash('success', `Welcome ${req.user.displayName} Again!!`);
  console.log(req.user.displayName);
  res.redirect('/home');

});


router.get('/logout', (req, res) => {
  req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('success', 'GoodBye!!');
      res.redirect('/home');
    });
});


  

  module.exports = router;