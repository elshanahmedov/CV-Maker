const mongoose = require("mongoose");

const resumeViewSchema = new mongoose.Schema(
  {
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },

    viewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    ipAddress: String,

    userAgent: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("ResumeView", resumeViewSchema);
