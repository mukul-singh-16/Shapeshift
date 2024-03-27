const express = require('express')
const router = express.Router();

const myblog = require('../Models/Blogs');

const {islogin}=require('../middleware')

router.get("/", (req, res) => {
  res.render("shapeshift/index");
  });

router.get("/home", (req, res) => {
    res.render("shapeshift/index");
  });
  
  router.get("/trainer", (req, res) => {
    res.render("shapeshift/trainer");
  });
   
 
  
  router.get("/contact", (req, res) => {
    res.render("shapeshift/contact");
  });
  router.get("/gallery", (req, res) => {
    res.render("shapeshift/gallery");
  });
  
  router.get("/pricing", (req, res) => {
    res.render("shapeshift/pricing");
  });
  
  router.get("/weightlifting", (req, res) => {
    res.render("shapeshift/weightlifting");
  });
  
  router.get("/yoga", (req, res) => {
    res.render("shapeshift/yoga");
  });
  
  router.get("/running", (req, res) => {
    res.render("shapeshift/running");
  });
  
  

  module.exports = router;