const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const multer = require('multer')

//Import the config file
const CONFIG = require("./config");
//Routers
const projectsRoutes = require("./routes/projects");
const projectManagerRoutes = require("./routes/projectManager");

const app = express();
const fileStore = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

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
app.use(express.json());
app.use(multer({storage: fileStorage, fileFilter: fileFileter}).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.urlencoded({extended: true}));

//Set up for path and handling the view 
app.use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('images', path.join(__dirname, 'images') )
    .set('view engine', 'ejs');

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