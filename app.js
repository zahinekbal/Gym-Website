const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;
//Express specific stuff
app.use('/static', express.static('static')) //for serving static files
app.use(express.urlencoded())

//Pug specific stuff
app.set('view engine', 'pug') //set the template engine as pug
app.set('views', path.join(__dirname,'views')) //set the views directory

//End points
app.get('/',(req, res)=>{
    const con = "this is the best content on the internet so far so use it wisely"
    const params = {'title':'pubg is the best game', 'content': con}
    res.status(200).render('index.pug',params);
});
app.post('/',(req,res)=>{
    name = req.body.name
    age = req.body.age
    gender = req.body.gender
    address = req.body.address
    more = req.body.more
    let outputToWrite = `the name of the client is ${name}, ${age} years old, ${gender}, residing at ${address},
    More about him/her: ${more}`
    fs.writeFileSync('output.txt', outputToWrite)
    const params = {'message':'Your form has been submitted successfully'}
    res.status(200).render('index.pug',params);
});

//Start the Server
app.listen(port,()=>{
    console.log(`the application started succesfully on port ${port}`);
});