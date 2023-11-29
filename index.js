const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


let username = "xyz";

//mongoos connection
mongoose
  .connect(
    "mongodb+srv://shapeshiftDB:rajatdb448@shapeshift.s1s4lbp.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((e) => {
    console.log("failed");
  });




//auth model
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






//blog model

let arr=new Date().toDateString().split(" ");
let date=arr[2]+" "+arr[1]
const blog = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  title:{
    type: String,
    required: true,

  },
  blog_txt: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: date,
  },
});


const myblog = mongoose.model("myblog", blog);






//all the routes
app.post("/signup", async (req, res) => {
  try {
    const data = new auth({
      name: req.body.username.toUpperCase(),
      email: req.body.email.toLowerCase(),
      pass: req.body.password.toLowerCase(),
    });
    await data.save();
  } catch (err) {
    console.log(err);
  }
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/logout", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.post("/index", async (req, res) => {
  try {
    const user_email = req.body.email.toLowerCase();
    const user_pass = req.body.password.toLowerCase();
    const data = await auth.findOne({ email: user_email });
    if (data.pass === user_pass) {
      username = data.name.split(" ")[0];
      res.render("index", { username });
    } else {
      res.send("password is incorrect");
    }
  } catch (e) {
    res.send("Email Id not Found");
  }
});

app.post("/home", (req, res) => {
  res.render("index", { username });
});

app.post("/trainer", (req, res) => {
  res.render("trainer", { username });
});

app.post("/blog",async(req, res) => {
  const blogs=await myblog.find({})
  res.render("blog", { username:username , blogs:blogs });
});

app.get("/blog",async(req, res) => {
  const blogs=await myblog.find({})
  res.render("blog",{
    username:username , blogs:blogs});
});

app.post("/contact", (req, res) => {
  res.render("contact", { username });
});
app.post("/gallery", (req, res) => {
  res.render("gallery", { username });
});

app.post("/pricing", (req, res) => {
  res.render("pricing", { username });
});

app.post("/weightlifting", (req, res) => {
  res.render("weightlifting", { username });
});

app.post("/yoga", (req, res) => {
  res.render("yoga", { username });
});

app.post("/running", (req, res) => {
  res.render("running", { username });
});
app.get("/addblog", (req, res) => {
  res.render("addBlog", { username });
});

app.post("/addblog", async (req, res) => {
  // console.log(req.body);
  try {
    const blog_data = new myblog({
      url: req.body.url,
      title:req.body.title,
      blog_txt: req.body.blog_txt,
    });
    await blog_data.save();
    // console.log(blog_data);
    res.redirect("/blog");
  } catch (e) {
    console.log("error");
  }
});

app.listen(3000, () => {
  console.log("connect to server");
});