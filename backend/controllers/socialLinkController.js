const SocialLink = require("../models/SocialLink");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./crudController");

exports.createSocialLink = createOne(SocialLink);
exports.getSocialLinks = getAll(SocialLink, ["resume"]);
exports.getSocialLinkById = getOne(SocialLink, ["resume"]);
exports.updateSocialLink = updateOne(SocialLink);
exports.deleteSocialLink = deleteOne(SocialLink);
