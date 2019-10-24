const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");

const app = express();
//view engine setup
app.disable("etag");
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Models
let models = require("./models");
//Sync Database
models.sequelize
  .sync()
  .then(function() {
    console.log("Database is ready!");
  })
  .catch(function(err) {
    console.log(err);
  });

// Require our routes into the application.
require("./routes")(app);

const port = parseInt(process.env.PORT, 10) || 8000;

app.set("port", port);

const server = http.createServer(app);

server.listen(port);

module.exports = app;
