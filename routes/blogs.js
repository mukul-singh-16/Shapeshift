const express = require('express');
const router = express.Router();
const myblog = require("../Models/Blogs");
const Review = require("../Models/reviews")
const {islogin} =require('../middleware')


router.get("/blog",async(req, res) => {
  const blogs=await myblog.find()
  res.render("blogs/blog",{blogs:blogs});
});


router.get("/addblog", islogin ,(req, res) => {
  res.render("blogs/addBlog");
});


router.get("/blog/:id", async(req,res)=>{
  try{
    const {id} = req.params;;
    const blog=await myblog.findById(id).populate('reviews')                          
    res.render('blogs/showblog' ,{blog:blog} );
  }
  catch(e)
  {
    res.send(e.message);
  }
 
})



router.post("/blog", async (req, res) => {
  try {
    const blog_data = new myblog({
      url: req.body.url,
      title:req.body.title,
      blog_txt: req.body.blog_txt,
      userid:req.user._id
      
    });
    await blog_data.save();
    // console.log(blog_data);
    res.redirect("/blog");
  } catch (e) {
    res.status(500).render('error', { err: e.message });
  }
});

  
  

router.get("/blog/:id/update", async (req, res) => {
    
    try {
        const { id } = req.params;
        const blog = await myblog.findById(id);
        res.render('blogs/updateblog' ,{blog:blog});
    }
    catch (e) {
      res.status(500).render('error', { err: e.message });
    }  
});

router.patch('/blog/:id',async (req, res) => {
  try {
      const { id } = req.params;
      const { url, title, blog_txt } = req.body;
      await myblog.findByIdAndUpdate(id, {url, title, blog_txt});
      req.flash('success', 'Your blog has been edited');
      res.redirect('/blog');
  }
  catch (e) {
    res.status(500).render('error', { err: e.message });
      
  } 
});


router.delete("/blog/:id/",async(req,res)=>{
  try{
    const {id}=req.params;

     await myblog.findByIdAndDelete(id)
    res.redirect('/blog')
  }
  catch(e)
  {
    res.status(500).render('error', { err: e.message });
  }
})

  

router.post('/blog/:blogid/review', islogin ,async(req, res) => {
  try {
      const { blogid } = req.params;
      const {comment } = req.body;

      const blog = await myblog.findById(blogid);
      // res.send(blog)
      const name=req.user.username|| req.user.displayName;
      const review = new Review({ comment:comment , authorid:req.user._id ,authorname:name});
      
      blog.reviews.push(review);

      await review.save();
      await blog.save();

      // res.send("done");

      req.flash('success', 'Added your comment successfully!');
      res.redirect(`/blog/${blogid}`);
  }

  catch (e) {
      res.status(500).render('error', { err: e.message });
  }
  
});

router.delete('/blog/:blogId/review/:reviewId',async(req,res)=>{
  try {
      const { blogId ,reviewId} = req.params;
      const blog = await myblog.findById(blogId);
      const index = blog.reviews.indexOf(reviewId);

      
      if (index > -1) { 
          await blog.reviews.splice(index, 1); 
          blog.save();
          await Review.findByIdAndDelete(reviewId);
        }
      res.redirect(`/blog/${blogId}`);
  }

  catch (e) {
      res.status(500).render('error', { err: e.message });
  }
})

router.patch('/blog/:blogId/review/:reviewId',async(req,res)=>{
  try {
      const { productId ,reviewId} = req.params;
      const comment="mst cheej hai";
      await Review.findByIdAndUpdate(reviewId,{comment:comment});
     
      res.redirect(`/blog/${blogId}`);
  }

  catch (e) {
      res.status(500).render('error', { err: e.message });
  }
})



  
// Export the router
module.exports = router;
