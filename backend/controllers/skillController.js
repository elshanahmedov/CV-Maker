const Skill = require("../models/Skill");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./crudController");

exports.createSkill = createOne(Skill);
exports.getSkills = getAll(Skill, ["resume"]);
exports.getSkillById = getOne(Skill, ["resume"]);
exports.updateSkill = updateOne(Skill);
exports.deleteSkill = deleteOne(Skill);
