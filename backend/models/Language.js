const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema(
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

module.exports = mongoose.model("Language", languageSchema);
