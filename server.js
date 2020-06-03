const app = require("./backend/app");
const debug = require("debug")("node-angular");
const mongoose = require("mongoose");
const http = require("http");

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "5000");
app.set("port", port);

const server = http.createServer(app);

const db = require('./backend/config/keys').mongoURI;

mongoose
  .connect(db)
  // .connect("mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb")
    .then(() =>console.log('MongoDB Connected'))
    .catch((err)=> console.log(err));


server.on("error", onError);
server.on("listening", onListening);
server.listen(port);

