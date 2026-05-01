const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    name: String,
    level: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Skill", skillSchema);
