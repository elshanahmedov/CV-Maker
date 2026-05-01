const express = require("express");
const router = express.Router();

const {
  createAuditLog,
  getAuditLogs,
  getAuditLogById,
  updateAuditLog,
  deleteAuditLog,
} = require("../controllers/auditLogController");

router.route("/").post(createAuditLog).get(getAuditLogs);

router
  .route("/:id")
  .get(getAuditLogById)
  .put(updateAuditLog)
  .delete(deleteAuditLog);

module.exports = router;
