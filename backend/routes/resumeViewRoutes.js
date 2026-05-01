const express = require("express");
const router = express.Router();

const {
  createResumeView,
  getResumeViews,
  getResumeViewById,
  updateResumeView,
  deleteResumeView,
} = require("../controllers/resumeViewController");

router.route("/").post(createResumeView).get(getResumeViews);

router
  .route("/:id")
  .get(getResumeViewById)
  .put(updateResumeView)
  .delete(deleteResumeView);

module.exports = router;
