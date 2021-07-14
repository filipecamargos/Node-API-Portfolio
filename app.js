const express = require("express");

//Import the config file
const CONFIG = require("./config");

const app = express();

app.use("/", (req, res, next) => {
    console.log("live");
    return res.send("<h1>Test</h1>")
})

app.listen(8000);