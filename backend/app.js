const express = require("express");
const bodyParser = require("body-parser");
const users = require("./routes/api/users.js");
const referral = require("./routes/api/referral.js");
const path = require("path");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Route to Register a user Just after he installs the extension
// app.get('/register',(req,res) =>{
//     //res.sendFile(__dirname+"/"+"index.html");

// })
app.use(express.static(path.join(__dirname,'build')));
app.use('/api/users', users);
app.use('/api/referral', referral);
app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
 });
//Normal route for new tab
// app.get('/newtab',(req,res)=>{

// });
module.exports = app;
