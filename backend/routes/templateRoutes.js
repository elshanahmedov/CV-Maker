const express = require("express");
const router = express.Router();

const {
  createTemplate,
  getTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
} = require("../controllers/templateController");

router.route("/").post(createTemplate).get(getTemplates);

router
  .route("/:id")
  .get(getTemplateById)
  .put(updateTemplate)
  .delete(deleteTemplate);

module.exports = router;
