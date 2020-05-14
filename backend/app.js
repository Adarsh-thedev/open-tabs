const express = require("express");
const bodyParser = require("body-parser");
const users = require("./routes/api/users.js");
const app = express();


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Route to Register a user Just after he installs the extension
// app.get('/register',(req,res) =>{
//     //res.sendFile(__dirname+"/"+"index.html");

// })

app.use('/api/users', users);
//Normal route for new tab
// app.get('/newtab',(req,res)=>{

// });
module.exports = app;