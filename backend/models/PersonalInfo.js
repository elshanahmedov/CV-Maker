const mongoose = require("mongoose");

const personalInfoSchema = new mongoose.Schema(
  {
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    fullName: { type: String, required: true },
    title: String,
    email: String,
    phone: String,
    location: String,
    website: String,
    linkedin: String,
    github: String,
    summary: String,
    photoUrl: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("PersonalInfo", personalInfoSchema);
