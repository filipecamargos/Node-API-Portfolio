const Project = require("../../model/project");
const path = require('path');
const fs = require('fs');

/**
 * Get All the Projects
 */
exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch(err) { erroHandler(res, 404, "Collections not found!", err) }
};

/**
 * Create a Project
 */
exports.createOneProject = async (req, res, next) => {

  //create an object
  const projectData  = {
    title: req.body.title,
    description: req.body.description,
    stack: req.body.stack,
    link: req.body.link,
    gitHubUrl: req.body.gitHubUrl
  }

  //Validations
  if (projectData.title.length < 1) {
    erroHandler(res, 400, "Invalid Request!", "Tille must be greater at least 1 characters" );
  } 

  if  (projectData.description.length < 10) {
    erroHandler(res, 400, "Invalid Request!", "Description must be greater at least 10 characters" );
  }

  //Instantiate the schema with the values received
  const project = new Project(projectData);

  //save and handle the data
  try {
    await project.save();
    res.status(201).json(project);
  } catch(err) { erroHandler(res, 501, "Error entering data!", err) }
};

/**
 * Get One Project by ID
 */
exports.getProjectById = async (req, res, next) => {
  const projectId = req.params.projectId;
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      throw new Error("Project not found!")
    } 
    res.status(200).json(project);
  } catch (err) { erroHandler(res, 404, "Project not found!", err ) }
};

/**
 * Edit A Project by ID
 */
exports.editProjectById = async (req, res, next) => {
  const projectId = req.params.projectId;
  try {
    const project = await Project.findById(projectId);

    project.title = req.body.title;
    project.description = req.body.description;
    project.stack = req.body.stack;
    project.link = req.body.link;
    project.gitHubUrl = req.body.gitHubUrl;

    const savedProject = await project.save();
    res.status(201).json(savedProject);

  } catch(err) { erroHandler(res, 400, "Unable to update passed project", err) }
};

/**
 * Delete A Project by ID
 */
exports.deleteProjectById = async (req, res, next) => {
  const projectId = req.params.projectId;
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      throw new Error("Project not found!")
    }
    await Project.findByIdAndDelete(projectId);
    res.status(200).json({status: 200, id: projectId, message: 'Project Deleted!'})
  } catch(err) { erroHandler(res, 404, "Project not found!", err) }
};

/**
 * Helping Functions
 */

//General Error Handling Function
const erroHandler = (res, statusCode, message, err) => {
  res.status(statusCode).json({
    message: message,
    err: err
  })
};
