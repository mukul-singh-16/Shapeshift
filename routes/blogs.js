const express = require('express');
const router = express.Router();
const myblog = require("../Models/Blogs");


router.get("/blog",async(req, res) => {
  const blogs=await myblog.find({})
  res.render("blogs/blog",{blogs:blogs});
});

router.get("/addblog", (req, res) => {
  res.render("blogs/addBlog");
});





router.get("/readblog/:id", async(req,res)=>{
  // const {id} = req.params;;
  // const blog=await myblog.findById(id)                                          
  res.render('blogs/showblog');
})

router.get("/readblog", async(req,res)=>{                                          
  res.render('blogs/showblog');
})



router.post("/addblog", async (req, res) => {
  try {
    const blog_data = new myblog({
      url: req.body.url,
      title:req.body.title,
      blog_txt: req.body.blog_txt,
      usermail:req.user.email
    });
    await blog_data.save();
    // console.log(blog_data);
    res.redirect("/blog");
  } catch (e) {
    console.log(e);
  }
});

  
  

router.get('/updateblog/:id', async (req, res) => {
    
    // try {
        // const { id } = req.params;
        // const blog = await myblog.findById(id);
        res.render('blogs/updateblog');
    // }
    // catch (e) {
    //   console.log(e);
    // }  
});

  router.patch('/blogupdate/:id',async (req, res) => {
    try {
        const { id } = req.params;
        const { url, title, blog_txt } = req.body;
        await myblog.findByIdAndUpdate(id, {url, title, blog_txt});
        req.flash('success', 'Edit Your Blog Successfully');
        res.redirect('/blog');
    }
    catch (e) {
      console.log(e);
        
    } 
});











router.post('/blog/:blogid/review',async(req, res) => {


  try {
      const { blogid } = req.params;
      const {comment } = req.body;

      const blog = await myblog.findById(blogid);

      const review = new Review({ comment:comment,usermail:req.user.email  });
      await review.save();

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
      // console.log(product.reviews.length)

      const index = myblog.reviews.indexOf(reviewId);
      if (index > -1) { 
          await product.reviews.splice(index, 1); 
          product.save();
          await Review.findByIdAndDelete(reviewId);
        
        }
      //   console.log(product.reviews.length)
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
