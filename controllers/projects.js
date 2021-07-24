const Project = require("../model/project");

/**
 * Get All the Projects
 */
exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(404).json({
      Message: "Collections not found!",
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
    const project = await Project.findById(projectId);
    if (!project) {
      throw new Error("Project not found!")
    } 
    res.status(200).json(project);
  } catch (err) {
    res.status(404).json({
      Message: "Project not found!",
      err,
    });
  }
};

/**
 * Edit A Project by ID
 */
exports.editProjectById = async (req, res, next) => {
  const projectId = req.params.projectId;
  try {
    const project = await Project.findById(projectId);

    project.title = req.body.title;
    project.imagePath = req.body.imagePath;
    project.description = req.body.description;
    project.stack = req.body.stack;
    project.link = req.body.link;

    const savedProject = await project.save();
    res.status(201).json(savedProject);

  } catch (err) {
    res.status(400).json({
      message: "Unable to update passed project",
      err,
    });
  }
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
  } catch(err) {
    res.status(404).json({
      message: "Project not found!",
      err
    })
  }
};

/**
 * Helping Functions
 */

//General Error Handling Function
