const Joi = require('joi');

module.exports.blogSchema = Joi.object({
    url: Joi.string().required(),
    title: Joi.string().required(),
    blog_txt: Joi.string().required()
});

 
module.exports.commentSchema = Joi.object({
    comment: Joi.string().required(),
    gmail:Joi.string().required()
});