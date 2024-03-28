const {blogSchema ,commentSchema} =  require('./schema')
module.exports.islogin = (req,res,next)=>{
    currenturl = req.originalUrl;
    if(!req.user)
    return  res.redirect('/login')
    next();
}


module.exports.validateblog = (req, res, next) => {
    
    const { url, title, blog_txt  } = req.body;
    const { error} = blogSchema.validate({ url, title, blog_txt });

    if (error) {
        const msg = error.details.map((err)=>err.message).join(',')
        return res.render('error', { err: msg });
    }

    next();

}


module.exports.validatecomment = (req,res,next) => {
    
    const { rating, comment } = req.body;
    const { error } = reviewSchema.validate({ rating, comment });

    if (error) {
        const msg = error.details.map((err)=>err.message).join(',')
        // console.log(msg);
        return res.render('error', { err: msg });
    }
    next();
}