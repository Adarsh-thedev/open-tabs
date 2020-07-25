
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

const app = require("src/App")
const http = require("http");

const normalizePort = val => {
  var port = parseInt(val,10);

  if(isNaN(port)){
    return val;
  }

  if(port>=0){
    return port;
  }

  return false;
};

const port = normalizePort(process.env.PORT || "3000")
console.log(port);
app.set("port",port)
const server = http.createServer(app);

server.listen(port);