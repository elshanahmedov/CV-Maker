const Project = require("../models/Project");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./crudController");

exports.createProject = createOne(Project);
exports.getProjects = getAll(Project, ["resume"]);
exports.getProjectById = getOne(Project, ["resume"]);
exports.updateProject = updateOne(Project);
exports.deleteProject = deleteOne(Project);
