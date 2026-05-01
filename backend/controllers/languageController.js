const Language = require("../models/Language");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./crudController");

exports.createLanguage = createOne(Language);
exports.getLanguages = getAll(Language, ["resume"]);
exports.getLanguageById = getOne(Language, ["resume"]);
exports.updateLanguage = updateOne(Language);
exports.deleteLanguage = deleteOne(Language);
