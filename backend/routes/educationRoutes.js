const express = require("express");
const router = express.Router();

const {
  createEducation,
  getEducations,
  getEducationById,
  updateEducation,
  deleteEducation,
} = require("../controllers/educationController");

router.route("/").post(createEducation).get(getEducations);

router
  .route("/:id")
  .get(getEducationById)
  .put(updateEducation)
  .delete(deleteEducation);

module.exports = router;
