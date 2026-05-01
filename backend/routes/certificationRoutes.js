const express = require("express");
const router = express.Router();

const {
  createCertification,
  getCertifications,
  getCertificationById,
  updateCertification,
  deleteCertification,
} = require("../controllers/certificationController");

router.route("/").post(createCertification).get(getCertifications);

router
  .route("/:id")
  .get(getCertificationById)
  .put(updateCertification)
  .delete(deleteCertification);

module.exports = router;
