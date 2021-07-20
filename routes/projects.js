const express = require("express");
const { body } = require("express-validator");

const projectsController = require("../controllers/projects");
const router = express.Router();

/**
 * Get Projects
 */
router.get("/getProjects", projectsController.getAllProjects);

/**
 *
 */
router.post("/createProject", projectsController.createOneProject);


/**
 *
 */
router.get("/getProjectById/:projectId", projectsController.getProjectById);

/**
 *
 */
router.put("/editProject/:projectId", projectsController.editProjectById);

/**
 *
 */
 router.delete("/deleteProject/:projectId", projectsController.deleteProjectById);

module.exports = router;
