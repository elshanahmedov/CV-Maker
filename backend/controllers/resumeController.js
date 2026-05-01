const Resume = require("../models/Resume");
const Education = require("../models/Education");
const WorkExperience = require("../models/WorkExperience");
const Skill = require("../models/Skill");
const Project = require("../models/Project");
const Language = require("../models/Language");
const Certification = require("../models/Certification");
const SocialLink = require("../models/SocialLink");
const ResumeView = require("../models/ResumeView");
const AuditLog = require("../models/AuditLog");

const populateResume = (query) => {
  return query
    .populate("user")
    .populate("template")
    .populate("education")
    .populate("workExperience")
    .populate("skills")
    .populate("projects")
    .populate("languages")
    .populate("certifications")
    .populate("socialLinks");
};

exports.createResume = async (req, res) => {
  try {
    const {
      user,
      template,
      title,
      personalInfo,
      education = [],
      workExperience = [],
      skills = [],
      projects = [],
      languages = [],
      certifications = [],
      socialLinks = [],
      isPublic,
    } = req.body;

    const resume = await Resume.create({
      user,
      template,
      title,
      personalInfo,
      isPublic,
    });

    const educationDocs = await Education.insertMany(
      education.map((item) => ({ ...item, resume: resume._id })),
    );

    const workExperienceDocs = await WorkExperience.insertMany(
      workExperience.map((item) => ({ ...item, resume: resume._id })),
    );

    const skillDocs = await Skill.insertMany(
      skills.map((item) => ({ ...item, resume: resume._id })),
    );

    const projectDocs = await Project.insertMany(
      projects.map((item) => ({ ...item, resume: resume._id })),
    );

    const languageDocs = await Language.insertMany(
      languages.map((item) => ({ ...item, resume: resume._id })),
    );

    const certificationDocs = await Certification.insertMany(
      certifications.map((item) => ({ ...item, resume: resume._id })),
    );

    const socialLinkDocs = await SocialLink.insertMany(
      socialLinks.map((item) => ({ ...item, resume: resume._id })),
    );

    resume.education = educationDocs.map((doc) => doc._id);
    resume.workExperience = workExperienceDocs.map((doc) => doc._id);
    resume.skills = skillDocs.map((doc) => doc._id);
    resume.projects = projectDocs.map((doc) => doc._id);
    resume.languages = languageDocs.map((doc) => doc._id);
    resume.certifications = certificationDocs.map((doc) => doc._id);
    resume.socialLinks = socialLinkDocs.map((doc) => doc._id);

    await resume.save();

    await AuditLog.create({
      user,
      resume: resume._id,
      action: "CREATE_RESUME",
      description: "Resume created",
    });

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

    await ResumeView.create({
      resume: resume._id,
      viewedBy: req.body.viewedBy || null,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    await AuditLog.create({
      user: resume.user,
      resume: resume._id,
      action: "VIEW_RESUME",
      description: "Resume viewed",
    });

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
      template,
      title,
      personalInfo,
      education,
      workExperience,
      skills,
      projects,
      languages,
      certifications,
      socialLinks,
      isPublic,
    } = req.body;

    if (template !== undefined) resume.template = template;
    if (title !== undefined) resume.title = title;
    if (personalInfo !== undefined) resume.personalInfo = personalInfo;
    if (isPublic !== undefined) resume.isPublic = isPublic;

    if (education) {
      await Education.deleteMany({ resume: resume._id });
      const docs = await Education.insertMany(
        education.map((item) => ({ ...item, resume: resume._id })),
      );
      resume.education = docs.map((doc) => doc._id);
    }

    if (workExperience) {
      await WorkExperience.deleteMany({ resume: resume._id });
      const docs = await WorkExperience.insertMany(
        workExperience.map((item) => ({ ...item, resume: resume._id })),
      );
      resume.workExperience = docs.map((doc) => doc._id);
    }

    if (skills) {
      await Skill.deleteMany({ resume: resume._id });
      const docs = await Skill.insertMany(
        skills.map((item) => ({ ...item, resume: resume._id })),
      );
      resume.skills = docs.map((doc) => doc._id);
    }

    if (projects) {
      await Project.deleteMany({ resume: resume._id });
      const docs = await Project.insertMany(
        projects.map((item) => ({ ...item, resume: resume._id })),
      );
      resume.projects = docs.map((doc) => doc._id);
    }

    if (languages) {
      await Language.deleteMany({ resume: resume._id });
      const docs = await Language.insertMany(
        languages.map((item) => ({ ...item, resume: resume._id })),
      );
      resume.languages = docs.map((doc) => doc._id);
    }

    if (certifications) {
      await Certification.deleteMany({ resume: resume._id });
      const docs = await Certification.insertMany(
        certifications.map((item) => ({ ...item, resume: resume._id })),
      );
      resume.certifications = docs.map((doc) => doc._id);
    }

    if (socialLinks) {
      await SocialLink.deleteMany({ resume: resume._id });
      const docs = await SocialLink.insertMany(
        socialLinks.map((item) => ({ ...item, resume: resume._id })),
      );
      resume.socialLinks = docs.map((doc) => doc._id);
    }

    await resume.save();

    await AuditLog.create({
      user: resume.user,
      resume: resume._id,
      action: "UPDATE_RESUME",
      description: "Resume updated",
    });

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

    await Education.deleteMany({ resume: resume._id });
    await WorkExperience.deleteMany({ resume: resume._id });
    await Skill.deleteMany({ resume: resume._id });
    await Project.deleteMany({ resume: resume._id });
    await Language.deleteMany({ resume: resume._id });
    await Certification.deleteMany({ resume: resume._id });
    await SocialLink.deleteMany({ resume: resume._id });
    await ResumeView.deleteMany({ resume: resume._id });

    await AuditLog.create({
      user: resume.user,
      resume: resume._id,
      action: "DELETE_RESUME",
      description: "Resume deleted",
    });

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
