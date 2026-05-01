const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema(
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

    level: {
      type: String,
      enum: ["basic", "intermediate", "advanced", "native"],
      default: "intermediate",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Language", languageSchema);
