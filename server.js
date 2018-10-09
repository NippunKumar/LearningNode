const express = require('express');
const hbs = require('hbs');
let app = express();

app.set('view engine','hbs');
app.use(express.static(__dirname + "/public"));
hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    })
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        "pageTitle" : "About page",
    })
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(3000,() => {
    console.log("App starts at port 3000")
});