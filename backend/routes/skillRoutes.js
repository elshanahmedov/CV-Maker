const express = require("express");
const router = express.Router();

const {
  createSkill,
  getSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
} = require("../controllers/skillController");

router.route("/").post(createSkill).get(getSkills);

router.route("/:id").get(getSkillById).put(updateSkill).delete(deleteSkill);

module.exports = router;
