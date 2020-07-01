const express = require("express");
const bodyParser = require("body-parser");
const users = require("./routes/api/users.js");
const referral = require("./routes/api/referral.js");
const donate = require("./routes/api/donate.js");
const path = require("path");
const cors = require('cors');
const pug = require('pug');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname,'build')));
// app.use(express.static(path.join(__dirname, 'views')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/api/users', users);
app.use('/api/referral', referral);
app.use('/donate', donate);
app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
 });

module.exports = app;
