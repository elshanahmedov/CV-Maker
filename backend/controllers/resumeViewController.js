const ResumeView = require("../models/ResumeView");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./crudController");

exports.createResumeView = createOne(ResumeView);
exports.getResumeViews = getAll(ResumeView, ["resume", "viewedBy"]);
exports.getResumeViewById = getOne(ResumeView, ["resume", "viewedBy"]);
exports.updateResumeView = updateOne(ResumeView);
exports.deleteResumeView = deleteOne(ResumeView);
