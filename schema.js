const Joi = require('joi');

module.exports.blogSchema = Joi.object({
    imgurl: Joi.string().required(),
    title: Joi.string().required(),
    blog_txt: Joi.string().required(),
    date: Joi.date().required()
});

 