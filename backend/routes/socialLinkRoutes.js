const express = require("express");
const router = express.Router();

const {
  createSocialLink,
  getSocialLinks,
  getSocialLinkById,
  updateSocialLink,
  deleteSocialLink,
} = require("../controllers/socialLinkController");

router.route("/").post(createSocialLink).get(getSocialLinks);

router
  .route("/:id")
  .get(getSocialLinkById)
  .put(updateSocialLink)
  .delete(deleteSocialLink);

module.exports = router;
