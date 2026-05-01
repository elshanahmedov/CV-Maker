const Certification = require("../models/Certification");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./crudController");

exports.createCertification = createOne(Certification);
exports.getCertifications = getAll(Certification, ["resume"]);
exports.getCertificationById = getOne(Certification, ["resume"]);
exports.updateCertification = updateOne(Certification);
exports.deleteCertification = deleteOne(Certification);
