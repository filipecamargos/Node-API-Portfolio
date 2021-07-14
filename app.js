const express = require("express");
const mongoose = require("mongoose");

//Import the config file
const CONFIG = require("./config");

const app = express();

//Register a body parser
app.use(express.json());

app.use("/", (req, res, next) => {
    console.log("live");
    return res.send("<h1>Test</h1>")
})

//Set the connection
mongoose
  .connect(CONFIG.db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });