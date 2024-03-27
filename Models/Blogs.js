const mongoose=require("mongoose");
const Review=require('./reviews')

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
  usermail:{
    type:String,
    require:true
    // default:currentusermail
  },
  reviews: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Review'
    }
]
});


const myblog = mongoose.model("myblog", blog);


module.exports = myblog;