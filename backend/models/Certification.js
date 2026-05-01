const mongoose = require("mongoose");

const certificationSchema = new mongoose.Schema(
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

    issuer: String,

    issueDate: String,

    credentialUrl: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Certification", certificationSchema);
