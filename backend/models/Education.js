const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
  {
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },

    school: String,
    degree: String,
    fieldOfStudy: String,
    startDate: String,
    endDate: String,
    description: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Education", educationSchema);
