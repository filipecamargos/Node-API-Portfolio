const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//The project schema to be saved in the DB
const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    stack: {type: String, required: true},
    link: {type: String},
    gitHubUrl: {type: String, required: true},
    imgUrl: {type: String, required: true}
  },
  { timestamps: true } //Construct a timeStamp automatically 
);

module.exports = mongoose.model('Project', projectSchema)