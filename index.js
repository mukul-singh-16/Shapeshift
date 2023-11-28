const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let username = "xyz";
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

app.post("/blog", (req, res) => {
  res.render("blog", { username });
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

app.listen(3000, () => {
  console.log("connect to server");
});
