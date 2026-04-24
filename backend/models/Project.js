const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    tags: [String],
    description: String,
    projectUrl: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", projectSchema);
