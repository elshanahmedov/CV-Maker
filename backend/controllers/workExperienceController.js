const WorkExperience = require("../models/WorkExperience");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./crudController");

exports.createWorkExperience = createOne(WorkExperience);
exports.getWorkExperiences = getAll(WorkExperience, ["resume"]);
exports.getWorkExperienceById = getOne(WorkExperience, ["resume"]);
exports.updateWorkExperience = updateOne(WorkExperience);
exports.deleteWorkExperience = deleteOne(WorkExperience);
