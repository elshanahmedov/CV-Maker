const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
      required: false,
    },

    title: {
      type: String,
      default: "Untitled Resume",
      trim: true,
    },

    personalInfo: {
      fullName: String,
      jobTitle: String,
      email: String,
      phone: String,
      location: String,
      website: String,
      linkedin: String,
      github: String,
      summary: String,
      photoUrl: String,
    },

    education: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Education",
      },
    ],

    workExperience: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WorkExperience",
      },
    ],

    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],

    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],

    languages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Language",
      },
    ],

    certifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Certification",
      },
    ],

    socialLinks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SocialLink",
      },
    ],

    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Resume", resumeSchema);
