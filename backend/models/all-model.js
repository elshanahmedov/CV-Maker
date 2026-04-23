// ─── 1. User.js ──────────────────────────────────────────────
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String }, // null → OAuth ilə girdi
    avatarUrl: { type: String, default: "" },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    website: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    bio: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    emailVerified: { type: Boolean, default: false },
    oauthProviders: [
      {
        provider: String, // 'google' | 'github'
        providerId: String,
        email: String,
      },
    ],
  },
  { timestamps: true },
);

UserSchema.methods.comparePassword = async function (plain) {
  if (!this.passwordHash) return false;
  return bcrypt.compare(plain, this.passwordHash);
};

UserSchema.pre("save", async function (next) {
  if (this.isModified("passwordHash") && this.passwordHash) {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);

// ─────────────────────────────────────────────────────────────
// ─── 2. RefreshToken.js ──────────────────────────────────────
const RefreshTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    isRevoked: { type: Boolean, default: false },
    ipAddress: { type: String, default: "" },
    userAgent: { type: String, default: "" },
  },
  { timestamps: true },
);

RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index
module.exports = mongoose.model("RefreshToken", RefreshTokenSchema);

// ─────────────────────────────────────────────────────────────
// ─── 3. Template.js ──────────────────────────────────────────
const TemplateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // 'modern', 'classic' ...
    description: { type: String, default: "" },
    previewUrl: { type: String, default: "" },
    isPremium: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Template", TemplateSchema);

// ─────────────────────────────────────────────────────────────
// ─── 4. Resume.js ────────────────────────────────────────────
const ResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    templateSlug: { type: String, default: "modern" },
    themeColor: { type: String, default: "#2563eb" },
    fontFamily: { type: String, default: "Inter" },
    isPublic: { type: Boolean, default: false },
    viewCount: { type: Number, default: 0 },
    downloadCount: { type: Number, default: 0 },
    lastDownloadedAt: { type: Date },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Resume", ResumeSchema);

// ─────────────────────────────────────────────────────────────
// ─── 5. WorkExperience.js ────────────────────────────────────
const WorkExperienceSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    company: { type: String, required: true },
    position: { type: String, required: true },
    location: { type: String, default: "" },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    isCurrent: { type: Boolean, default: false },
    description: { type: String, default: "" },
    achievements: { type: String, default: "" },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("WorkExperience", WorkExperienceSchema);

// ─────────────────────────────────────────────────────────────
// ─── 6. Education.js ─────────────────────────────────────────
const EducationSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    fieldOfStudy: { type: String, default: "" },
    location: { type: String, default: "" },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    isCurrent: { type: Boolean, default: false },
    gpa: { type: Number },
    description: { type: String, default: "" },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Education", EducationSchema);

// ─────────────────────────────────────────────────────────────
// ─── 7. Skill.js ─────────────────────────────────────────────
const SkillSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    name: { type: String, required: true },
    level: {
      type: String,
      enum: ["Beginner", "Elementary", "Intermediate", "Advanced", "Expert"],
      default: "Intermediate",
    },
    levelPercentage: { type: Number, min: 0, max: 100 },
    category: { type: String, default: "" }, // 'Frontend', 'Backend', 'Tools' ...
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Skill", SkillSchema);

// ─────────────────────────────────────────────────────────────
// ─── 8. Project.js ───────────────────────────────────────────
const ProjectSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    technologies: { type: String, default: "" }, // "React, Node.js, MongoDB"
    projectUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    startDate: { type: Date },
    endDate: { type: Date },
    isCurrent: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", ProjectSchema);

// ─────────────────────────────────────────────────────────────
// ─── 9. Certification.js ─────────────────────────────────────
const CertificationSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    name: { type: String, required: true },
    issuer: { type: String, required: true },
    issueDate: { type: Date },
    expiryDate: { type: Date },
    credentialId: { type: String, default: "" },
    credentialUrl: { type: String, default: "" },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Certification", CertificationSchema);

// ─────────────────────────────────────────────────────────────
// ─── 10. Language.js ─────────────────────────────────────────
const LanguageSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    name: { type: String, required: true },
    proficiency: {
      type: String,
      enum: [
        "Beginner",
        "Elementary",
        "Intermediate",
        "Upper-Intermediate",
        "Advanced",
        "Native",
      ],
      default: "Intermediate",
    },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Language", LanguageSchema);

// ─────────────────────────────────────────────────────────────
// ─── 11. SocialLink.js ───────────────────────────────────────
const SocialLinkSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    platform: { type: String, required: true }, // 'LinkedIn', 'GitHub', 'Twitter' ...
    url: { type: String, required: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("SocialLink", SocialLinkSchema);

// ─────────────────────────────────────────────────────────────
// ─── 12. ResumeView.js ───────────────────────────────────────
const ResumeViewSchema = new mongoose.Schema({
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
    required: true,
  },
  viewerIp: { type: String, default: "" },
  userAgent: { type: String, default: "" },
  referrer: { type: String, default: "" },
  viewedAt: { type: Date, default: Date.now },
});

ResumeViewSchema.index({ resumeId: 1, viewedAt: -1 });
module.exports = mongoose.model("ResumeView", ResumeViewSchema);

// ─────────────────────────────────────────────────────────────
// ─── 13. AuditLog.js ─────────────────────────────────────────
const AuditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: { type: String, required: true }, // 'LOGIN', 'RESUME_CREATED', 'RESUME_DELETED' ...
  entityType: { type: String }, // 'Resume', 'User' ...
  entityId: { type: String },
  oldValues: { type: mongoose.Schema.Types.Mixed },
  newValues: { type: mongoose.Schema.Types.Mixed },
  ipAddress: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AuditLog", AuditLogSchema);

// ─────────────────────────────────────────────────────────────
// ─── 14. Notification.js ─────────────────────────────────────
const NotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: { type: String, required: true }, // 'RESUME_VIEWED', 'WELCOME', 'SUBSCRIPTION_EXPIRING'
    title: { type: String, required: true },
    message: { type: String, default: "" },
    isRead: { type: Boolean, default: false },
    link: { type: String, default: "" }, // klik etdikdə hara gedəcək
  },
  { timestamps: true },
);

NotificationSchema.index({ userId: 1, isRead: 1 });
module.exports = mongoose.model("Notification", NotificationSchema);

// ─────────────────────────────────────────────────────────────
// ─── 15. Subscription.js ─────────────────────────────────────
const SubscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plan: {
      type: String,
      enum: ["free", "pro", "enterprise"],
      default: "free",
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date }, // free → null (ömürlük)
  },
  { timestamps: true },
);

module.exports = mongoose.model("Subscription", SubscriptionSchema);
