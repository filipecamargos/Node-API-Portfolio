const express = require("express");
const { body } = require("express-validator");

const projectsController = require("../controllers/projects");
const router = express.Router();

//Router ->  Get all projects
router.get("/getProjects", projectsController.getAllProjects);

//Router -> Creat a project
router.post("/createProject", projectsController.createOneProject);

//Router -> Get a project by ID
router.get("/getProjectById/:projectId", projectsController.getProjectById);

//Router -> Edit a Project
router.put("/editProject/:projectId", projectsController.editProjectById);

//Router -> Detelet a project
router.delete("/deleteProject/:projectId", projectsController.deleteProjectById);

module.exports = router;
