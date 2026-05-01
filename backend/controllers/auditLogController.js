const AuditLog = require("../models/AuditLog");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./crudController");

exports.createAuditLog = createOne(AuditLog);
exports.getAuditLogs = getAll(AuditLog, ["user", "resume"]);
exports.getAuditLogById = getOne(AuditLog, ["user", "resume"]);
exports.updateAuditLog = updateOne(AuditLog);
exports.deleteAuditLog = deleteOne(AuditLog);
