const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require('multer')

//Import the config file
const CONFIG = require("./config");
//Routers
const projectsRoutes = require("./routes/projects");
const projectManagerRoutes = require("./routes/projectManager");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//Register routers
app.use(bodyParser.urlencoded({ extended: false}))
  .use(bodyParser.json());

//Set up for path and handling the view 
app.use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
const upload = multer({ storage: storage });

app.use(projectsRoutes);
app.use(projectManagerRoutes);

//Set the connection
mongoose
  .connect(CONFIG.db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });