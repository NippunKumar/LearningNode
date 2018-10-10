const express = require('express');
const hbs = require('hbs');
let app = express();
const fs = require('fs')

const port = process.env.port || 4000;

app.set('view engine','hbs');

app.use((req,res,next)=>{
    let now = new Date().toString()
    let logVal = `${now} : ${req.method} : ${req.url}`
    console.log( logVal)
    fs.appendFile('server.log',logVal +'\n',(err)=>{
        if(err){
            console.log("--unable to append the file--")
        }
    })
    next();
})
/* app.use((req,res,next)=>{
    res.render('maintenance.hbs')
}) */
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

app.listen(port,() => {
    console.log(`App starts at port ${port}`)
});