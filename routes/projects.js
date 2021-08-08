const express = require("express");
const multer = require('multer');
const upload = multer();

const projectsController = require("../controllers/apis/projects");
const router = express.Router();

//Router ->  Get all projects
router.get("/getProjects", projectsController.getAllProjects);

//Router -> Creat a project
router.post("/createProject", upload.fields([]), projectsController.createOneProject);

//Router -> Get a project by ID
router.get("/getProjectById/:projectId", projectsController.getProjectById);

//Router -> Edit a Project
router.put("/editProject/:projectId", projectsController.editProjectById);

//Router -> Detelet a project
router.delete("/deleteProject/:projectId", projectsController.deleteProjectById);

module.exports = router;
