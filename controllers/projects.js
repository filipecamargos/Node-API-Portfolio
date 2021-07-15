/**
 * Create a Project
 */
 exports.createOneProject = async (req, res, next) => {
    res.status(200).json({
        test: 'Create a Project'
    })
}

/**
 * Get One Project by ID
 */
 exports.getProjectById = async (req, res, next) => {
    res.status(200).json({
        test: 'Get One Project by ID'
    })
}

/**
 * Get All the Projects
 */
exports.getAllProjects = async (req, res, next) => {
    res.status(200).json({
        title: "Project Title",
        picture: "picture path",
        description: "Description of the Project",
        language: "Langague",
        framework: "framework",
    })
}

/**
 * Edit A Project by ID
 */
 exports.editProjectById = async (req, res, next) => {
    res.status(200).json({
        test: "Edit A Project by ID",
    })
}


/**
 * Delete A Project by ID
 */
 exports.deleteProjectById = async (req, res, next) => {
    res.status(200).json({
        test:"Delete A Project By ID"
    })
}