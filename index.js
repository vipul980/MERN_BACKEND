const express = require('express');
const { connect } = require("mongoose");
const http = require("http");
const { mongoURI } = require("./config/keys");
const {PORT} = require("./config/keys")
const bodyParser = require('body-parser');

const app = express();

const employeeRoutes = require('./routes/employee');


const startApp = async () => {

  app.use(bodyParser.urlencoded());

  app.use(bodyParser.json());
  var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  }
  
  app.use(allowCrossDomain);
  app.use('/api', employeeRoutes);

  const server = http.createServer(app);
  app.set("port", PORT);

  server.listen(PORT, () => { console.log(`Server started on port ${PORT}`)})

  await connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  }).then(() => {
        console.log("Connected to the database")
      })
      .catch((err) => {
        console.log("failed to connect with database")
        process.exit();
      });
    

}

startApp();
