
const express = require("express");
const app=express();
const path=require('path');
const mongoose = require("mongoose");

app.use(express.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname,'public')))
app.set("view engine",'ejs');
app.set('views',path.join(__dirname,'views'));
//mongoose connect

mongoose
  .connect(
    "mongodb+srv://shapeShiftDB:mukulbhai16@cluster0.vmp43iw.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((e) => {
    console.log("failed");
  });


  //schema

  const authentication = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    pass: {
      type: String,
      required: true,
    },
  });



  const auth = mongoose.model("auth", authentication);

app.post("/signup", async (req, res) => {
  try {
    const data = new auth({
      name: req.body.username,
      email: req.body.email,
      pass: req.body.password,
    });
    // console.log(data.username);
    // console.log(data);
    await data.save();
  } catch (err) {
    console.log(err);
  }
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.post("/login", async (req, res) => {
  try {
    const check = await auth.findOne({ email: req.body.email });
    if (check.pass === req.body.password) {
      res.render("index");
    } else {
      res.send("incorrect password");
    }
  } catch (e) {
    res.render("index");
    // res.send("Something Went Wrong");
  }
});








app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, "public", "login.html"));
})
app.get('/index',(req,res)=>{
    res.render('index')
})

app.get('/about',(req,res)=>{
    res.render('about')
})

app.get('/blog',(req,res)=>{
    res.render('blog')
})
app.get('/contact',(req,res)=>{
    res.render('contact')
})
app.get('/gallery',(req,res)=>{
    res.render('gallery')
})

app.get('/pricing',(req,res)=>{
    res.render('pricing')
})

app.get('/weightlifting',(req,res)=>{
    res.render('weightlifting')
})

app.get('/yoga',(req,res)=>{
    res.render('yoga')
})

app.get('/running',(req,res)=>{
    res.render('running')
})

app.listen(3000,()=>{
    console.log('connect to server');
})