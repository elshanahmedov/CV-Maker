const mongoose = require("mongoose");

const resumeProjectSchema = new mongoose.Schema(
  {
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    name: String,
    description: String,
    technologies: [String],
    projectUrl: String,
    githubUrl: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("ResumeProject", resumeProjectSchema);
