const Project = require("../model/project");

/**
 * Get All the Projects
 */
 exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(401).json({
      Message: "No collections found!",
      err,
    });
  }
};

/**
 * Create a Project
 */
exports.createOneProject = async (req, res, next) => {

  //Instantiate the schema with the values received
  const project = new Project({
    title: req.body.title,
    imagePath: req.body.imagePath,
    description: req.body.description,
    stack: req.body.stack,
    link: req.body.link,
  });

  //save and handle the data
  try {
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(501).json({
      Message: "Error entering data!",
      err,
    });
  }
};

/**
 * Get One Project by ID
 */
exports.getProjectById = async (req, res, next) => {
  const projectId = req.params.projectId;

  try {
    let project = await Project.findById(projectId);
    res.status(200).json(project);
  } catch (err) {
    res.status(401).json({
      Message: "Project Not Found!",
      err,
    });
  }
};

/**
 * Edit A Project by ID
 */
exports.editProjectById = async (req, res, next) => {
  const id = req.params.projectId;

  res.status(200).json({
    test: "Edit A Project By ID",
    id: id,
  });
};

/**
 * Delete A Project by ID
 */
exports.deleteProjectById = async (req, res, next) => {
  const id = req.params.projectId;

  res.status(200).json({
    test: "Delete A Project By ID",
    id: id,
  });
};

/**
 * Helping Functions
 */

//General Error Handling Function

