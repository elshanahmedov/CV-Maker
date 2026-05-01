const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: String,

    technologies: [String],

    projectUrl: String,

    githubUrl: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", projectSchema);
