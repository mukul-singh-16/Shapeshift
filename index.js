
const express = require("express");
const app=express();
const path=require('path');

app.use(express.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname,'public')))
app.set("view engine",'ejs');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/index',(req,res)=>{
    res.render('index')
})

app.get('/about',(req,res)=>{
    res.render('about')
})

app.get('/blog',(req,res)=>{
    res.render('blog')
})
app.get('/contact',(req,res)=>{
    res.render('contact')
})
app.get('/gallery',(req,res)=>{
    res.render('gallery')
})

app.get('/pricing',(req,res)=>{
    res.render('pricing')
})

app.get('/weightlifting',(req,res)=>{
    res.render('weightlifting')
})

app.get('/yoga',(req,res)=>{
    res.render('yoga')
})

app.get('/running',(req,res)=>{
    res.render('running')
})

app.listen(3000,()=>{
    console.log('connect to server');
})