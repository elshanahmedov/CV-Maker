const Resume = require("../models/Resume");
const PersonalInfo = require("../models/PersonalInfo");
const Education = require("../models/Education");
const Experience = require("../models/Experience");
const Skill = require("../models/Skill");
const ResumeProject = require("../models/ResumeProject");
const Language = require("../models/Language");
const Certification = require("../models/Certification");

const populateResume = (query) => {
  return query
    .populate("user")
    .populate("personalInfo")
    .populate("education")
    .populate("experience")
    .populate("skills")
    .populate("projects")
    .populate("languages")
    .populate("certifications");
};

exports.createResume = async (req, res) => {
  try {
    const {
      user,
      title,
      template,
      personalInfo,
      education = [],
      experience = [],
      skills = [],
      projects = [],
      languages = [],
      certifications = [],
    } = req.body;

    const resume = await Resume.create({
      user: user || undefined,
      title,
      template,
    });

    let personalInfoDoc = null;

    if (personalInfo) {
      personalInfoDoc = await PersonalInfo.create({
        ...personalInfo,
        resume: resume._id,
      });
    }

    const educationDocs = await Education.insertMany(
      education.map((item) => ({
        ...item,
        resume: resume._id,
      })),
    );

    const experienceDocs = await Experience.insertMany(
      experience.map((item) => ({
        ...item,
        resume: resume._id,
      })),
    );

    const skillDocs = await Skill.insertMany(
      skills.map((item) => ({
        ...item,
        resume: resume._id,
      })),
    );

    const projectDocs = await ResumeProject.insertMany(
      projects.map((item) => ({
        ...item,
        resume: resume._id,
      })),
    );

    const languageDocs = await Language.insertMany(
      languages.map((item) => ({
        ...item,
        resume: resume._id,
      })),
    );

    const certificationDocs = await Certification.insertMany(
      certifications.map((item) => ({
        ...item,
        resume: resume._id,
      })),
    );

    resume.personalInfo = personalInfoDoc?._id;
    resume.education = educationDocs.map((doc) => doc._id);
    resume.experience = experienceDocs.map((doc) => doc._id);
    resume.skills = skillDocs.map((doc) => doc._id);
    resume.projects = projectDocs.map((doc) => doc._id);
    resume.languages = languageDocs.map((doc) => doc._id);
    resume.certifications = certificationDocs.map((doc) => doc._id);

    await resume.save();

    const populatedResume = await populateResume(Resume.findById(resume._id));

    res.status(201).json({
      success: true,
      message: "Resume created successfully",
      resume: populatedResume,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getResumes = async (req, res) => {
  try {
    const resumes = await populateResume(Resume.find().sort({ createdAt: -1 }));

    res.status(200).json({
      success: true,
      count: resumes.length,
      resumes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getResumeById = async (req, res) => {
  try {
    const resume = await populateResume(Resume.findById(req.params.id));

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const {
      user,
      title,
      template,
      personalInfo,
      education,
      experience,
      skills,
      projects,
      languages,
      certifications,
    } = req.body;

    resume.user = user || resume.user;
    resume.title = title || resume.title;
    resume.template = template || resume.template;

    if (personalInfo) {
      if (resume.personalInfo) {
        await PersonalInfo.findByIdAndUpdate(
          resume.personalInfo,
          personalInfo,
          {
            new: true,
            runValidators: true,
          },
        );
      } else {
        const personalInfoDoc = await PersonalInfo.create({
          ...personalInfo,
          resume: resume._id,
        });
        resume.personalInfo = personalInfoDoc._id;
      }
    }

    if (education) {
      await Education.deleteMany({ resume: resume._id });
      const docs = await Education.insertMany(
        education.map((item) => ({
          ...item,
          resume: resume._id,
        })),
      );
      resume.education = docs.map((doc) => doc._id);
    }

    if (experience) {
      await Experience.deleteMany({ resume: resume._id });
      const docs = await Experience.insertMany(
        experience.map((item) => ({
          ...item,
          resume: resume._id,
        })),
      );
      resume.experience = docs.map((doc) => doc._id);
    }

    if (skills) {
      await Skill.deleteMany({ resume: resume._id });
      const docs = await Skill.insertMany(
        skills.map((item) => ({
          ...item,
          resume: resume._id,
        })),
      );
      resume.skills = docs.map((doc) => doc._id);
    }

    if (projects) {
      await ResumeProject.deleteMany({ resume: resume._id });
      const docs = await ResumeProject.insertMany(
        projects.map((item) => ({
          ...item,
          resume: resume._id,
        })),
      );
      resume.projects = docs.map((doc) => doc._id);
    }

    if (languages) {
      await Language.deleteMany({ resume: resume._id });
      const docs = await Language.insertMany(
        languages.map((item) => ({
          ...item,
          resume: resume._id,
        })),
      );
      resume.languages = docs.map((doc) => doc._id);
    }

    if (certifications) {
      await Certification.deleteMany({ resume: resume._id });
      const docs = await Certification.insertMany(
        certifications.map((item) => ({
          ...item,
          resume: resume._id,
        })),
      );
      resume.certifications = docs.map((doc) => doc._id);
    }

    await resume.save();

    const populatedResume = await populateResume(Resume.findById(resume._id));

    res.status(200).json({
      success: true,
      message: "Resume updated successfully",
      resume: populatedResume,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    await PersonalInfo.deleteMany({ resume: resume._id });
    await Education.deleteMany({ resume: resume._id });
    await Experience.deleteMany({ resume: resume._id });
    await Skill.deleteMany({ resume: resume._id });
    await ResumeProject.deleteMany({ resume: resume._id });
    await Language.deleteMany({ resume: resume._id });
    await Certification.deleteMany({ resume: resume._id });
    await Resume.findByIdAndDelete(resume._id);

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
