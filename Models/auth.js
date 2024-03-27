const mongoose=require("mongoose");
const passportLocolMongoose = require('passport-local-mongoose');

//auth model
const authentication = new mongoose.Schema({
    email:String
  })

  authentication.plugin(passportLocolMongoose);
  
  const Auth = mongoose.model("Auth", authentication);
  
module.exports={ Auth }