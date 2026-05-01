const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
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
    current: {
      type: Boolean,
      default: false,
    },
    description: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Experience", experienceSchema);
