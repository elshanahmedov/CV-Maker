const express = require("express");
const router = express.Router();

const {
  createWorkExperience,
  getWorkExperiences,
  getWorkExperienceById,
  updateWorkExperience,
  deleteWorkExperience,
} = require("../controllers/workExperienceController");

router.route("/").post(createWorkExperience).get(getWorkExperiences);

router
  .route("/:id")
  .get(getWorkExperienceById)
  .put(updateWorkExperience)
  .delete(deleteWorkExperience);

module.exports = router;
