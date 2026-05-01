const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      enum: ["modern", "classic", "minimal", "creative", "professional"],
      default: "modern",
    },

    previewImage: {
      type: String,
      default: "",
    },

    layout: {
      type: String,
      enum: ["single-column", "two-column"],
      default: "single-column",
    },

    color: {
      type: String,
      default: "#000000",
    },

    isPremium: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Template", templateSchema);
