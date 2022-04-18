const express = require('express');
const app = express();
const nunjucks = require('nunjucks');

app.set('view engine', 'html');
nunjucks.configure('views',{
    express:app,
})

app.get('/',(req,res)=>{
    res.setHeader('Set-Cookie', 'token=true')
    res.render('index')
})

app.listen(3000,()=> {
    console.log('server start');
})
