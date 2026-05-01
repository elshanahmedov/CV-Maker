const Education = require("../models/Education");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./crudController");

exports.createEducation = createOne(Education);
exports.getEducations = getAll(Education, ["resume"]);
exports.getEducationById = getOne(Education, ["resume"]);
exports.updateEducation = updateOne(Education);
exports.deleteEducation = deleteOne(Education);
