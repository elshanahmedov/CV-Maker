const mongoose = require("mongoose");

const workExperienceSchema = new mongoose.Schema(
  {
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },

    company: String,
    position: String,
    location: String,
    startDate: String,
    endDate: String,

    currentlyWorking: {
      type: Boolean,
      default: false,
    },

    description: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("WorkExperience", workExperienceSchema);
