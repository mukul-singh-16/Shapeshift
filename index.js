const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//mongoose connect

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
    await data.save();
  } catch (err) {
    console.log(err);
  }
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.post("/index", async (req, res) => {
  try {
    const check = await auth.findOne({ email: req.body.email });
    if (check.pass === req.body.password) {
      res.render("index");
    } else {
      res.send("email or password is incorrect");
    }
  } catch (e) {
    res.send("Something Went Wrong");
  }
});

app.post("/home", (req, res) => {
  res.render("index");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.post("/about", (req, res) => {
  res.render("about");
});

app.post("/blog", (req, res) => {
  res.render("blog");
});
app.post("/contact", (req, res) => {
  res.render("contact");
});
app.post("/gallery", (req, res) => {
  res.render("gallery");
});

app.post("/pricing", (req, res) => {
  res.render("pricing");
});

app.post("/weightlifting", (req, res) => {
  res.render("weightlifting");
});

app.post("/yoga", (req, res) => {
  res.render("yoga");
});

app.post("/running", (req, res) => {
  res.render("running");
});

app.listen(3000, () => {
  console.log("connect to server");
});
