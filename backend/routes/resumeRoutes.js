const express = require("express");
const router = express.Router();

const {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
} = require("../controllers/resumeController");

router.route("/").post(createResume).get(getResumes);

router.route("/:id").get(getResumeById).put(updateResume).delete(deleteResume);

module.exports = router;
