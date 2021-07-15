const express = require("express");
const mongoose = require("mongoose");

//Import the config file
const CONFIG = require("./config");
const projectsRoutes = require("./routes/projects")

const app = express();

//Register a body parser
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/", projectsRoutes);

//Set the connection
mongoose
  .connect(CONFIG.db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });