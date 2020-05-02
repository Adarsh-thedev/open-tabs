const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//Route to Register a user Just after he installs the extension
app.get('/register',(req,res) =>{
    //res.sendFile(__dirname+"/"+"index.html");
    
})

//Normal route for new tab
app.get('/newtab',(req,res)=>{

});
module.exports = app;