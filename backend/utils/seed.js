require("dotenv").config();
const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB connected");

  const colls = mongoose.connection.db.listCollections();
  const names = await (
    await mongoose.connection.db.listCollections().toArray()
  ).map((c) => c.name);
  for (const n of names)
    await mongoose.connection.db.collection(n).deleteMany({});
  console.log("🗑  Old data cleared");

  const db = mongoose.connection.db;

  // 1. users
  const passwordHash = await bcrypt.hash("Password123!", 12);
  const user = await db.collection("users").insertOne({
    firstName: "Elshan",
    lastName: "Ahmadov",
    email: "elshan@example.com",
    passwordHash,
    phone: "+994501234567",
    location: "Warsaw, Poland",
    website: "https://elshan.dev",
    linkedinUrl: "https://linkedin.com/in/elshan",
    githubUrl: "https://github.com/elshan",
    bio: "Building with clarity, learning through practice.",
    isActive: true,
    emailVerified: true,
    oauthProviders: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const userId = user.insertedId;
  console.log("✅ 1. users");

  // 2. refreshtokens
  await db.collection("refreshtokens").insertOne({
    userId,
    token: "sample-refresh-token-xyz-123",
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    isRevoked: false,
    ipAddress: "127.0.0.1",
    userAgent: "Mozilla/5.0",
    createdAt: new Date(),
  });
  console.log("✅ 2. refreshtokens");

  // 3. templates
  const templates = [
    {
      name: "Modern",
      slug: "modern",
      description: "Clean professional design",
      isPremium: false,
      isActive: true,
    },
    {
      name: "Classic",
      slug: "classic",
      description: "Traditional layout",
      isPremium: false,
      isActive: true,
    },
    {
      name: "Minimal",
      slug: "minimal",
      description: "Simple elegant",
      isPremium: false,
      isActive: true,
    },
    {
      name: "Creative",
      slug: "creative",
      description: "Bold designer style",
      isPremium: true,
      isActive: true,
    },
    {
      name: "Executive",
      slug: "executive",
      description: "Senior professional",
      isPremium: true,
      isActive: true,
    },
  ];
  await db.collection("templates").insertMany(
    templates.map((t) => ({
      ...t,
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
  );
  console.log("✅ 3. templates");

  // 4. resumes
  const resume = await db.collection("resumes").insertOne({
    userId,
    title: "Software QA Engineer Resume",
    slug: `elshan-resume-${Date.now()}`,
    templateSlug: "modern",
    themeColor: "#2563eb",
    fontFamily: "Inter",
    isPublic: true,
    viewCount: 12,
    downloadCount: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const resumeId = resume.insertedId;
  console.log("✅ 4. resumes");

  // 5. workexperiences
  await db.collection("workexperiences").insertMany([
    {
      resumeId,
      company: "TestPark LLC",
      position: "Manual QA Tester",
      location: "Warsaw, Poland",
      startDate: new Date("2025-07-01"),
      endDate: new Date("2025-10-31"),
      isCurrent: false,
      description:
        "Conducted manual game/software testing to identify bugs and usability issues. Documented and reported defects with clear reproduction steps.",
      achievements:
        "Identified 50+ critical bugs; reduced regression cycle time by 30%.",
      sortOrder: 0,
      createdAt: new Date(),
    },
    {
      resumeId,
      company: "Toormate MMC",
      position: "Operations & Customer Service",
      location: "Baku, Azerbaijan",
      startDate: new Date("2025-08-01"),
      endDate: new Date("2026-01-31"),
      isCurrent: false,
      description:
        "Worked with a travel and tourism company. Responsible for safe and punctual service delivery and professional customer care.",
      achievements: "",
      sortOrder: 1,
      createdAt: new Date(),
    },
  ]);
  console.log("✅ 5. workexperiences");

  // 6. educations
  await db.collection("educations").insertOne({
    resumeId,
    institution: "Vistula University",
    degree: "Bachelor of Science",
    fieldOfStudy: "Information Technology",
    location: "Warsaw, Poland",
    startDate: new Date("2022-10-01"),
    isCurrent: true,
    gpa: 3.7,
    description:
      "Focus on web development, software testing, and practical project work.",
    sortOrder: 0,
    createdAt: new Date(),
  });
  console.log("✅ 6. educations");

  // 7. skills
  await db.collection("skills").insertMany([
    {
      resumeId,
      name: "Manual Testing",
      level: "Advanced",
      levelPercentage: 85,
      category: "QA",
      sortOrder: 0,
      createdAt: new Date(),
    },
    {
      resumeId,
      name: "Bug Reporting",
      level: "Advanced",
      levelPercentage: 90,
      category: "QA",
      sortOrder: 1,
      createdAt: new Date(),
    },
    {
      resumeId,
      name: "HTML & CSS",
      level: "Intermediate",
      levelPercentage: 75,
      category: "Frontend",
      sortOrder: 2,
      createdAt: new Date(),
    },
    {
      resumeId,
      name: "JavaScript",
      level: "Elementary",
      levelPercentage: 50,
      category: "Frontend",
      sortOrder: 3,
      createdAt: new Date(),
    },
    {
      resumeId,
      name: "React",
      level: "Elementary",
      levelPercentage: 45,
      category: "Frontend",
      sortOrder: 4,
      createdAt: new Date(),
    },
    {
      resumeId,
      name: "Git & GitHub",
      level: "Intermediate",
      levelPercentage: 70,
      category: "Tools",
      sortOrder: 5,
      createdAt: new Date(),
    },
    {
      resumeId,
      name: "Responsive Web Design",
      level: "Intermediate",
      levelPercentage: 75,
      category: "Frontend",
      sortOrder: 6,
      createdAt: new Date(),
    },
  ]);
  console.log("✅ 7. skills");

  // 8. projects
  await db.collection("projects").insertMany([
    {
      resumeId,
      name: "Hospital App",
      description:
        "A hospital management web application focused on organizing patient-related workflows.",
      technologies: "React, Node.js, MongoDB",
      githubUrl: "https://github.com/elshan/hospital-app",
      projectUrl: "",
      isCurrent: false,
      sortOrder: 0,
      createdAt: new Date(),
    },
    {
      resumeId,
      name: "Personal Portfolio",
      description:
        "A modern personal portfolio website presenting profile, experience, skills, and projects.",
      technologies: "React, SCSS",
      githubUrl: "https://github.com/elshan/portfolio",
      projectUrl: "https://elshan.dev",
      isCurrent: false,
      sortOrder: 1,
      createdAt: new Date(),
    },
    {
      resumeId,
      name: "Netflix Clone",
      description:
        "A Netflix-inspired frontend project with modern layout and styling.",
      technologies: "HTML, CSS, JavaScript",
      githubUrl: "https://github.com/elshan/netflix-clone",
      projectUrl: "",
      isCurrent: false,
      sortOrder: 2,
      createdAt: new Date(),
    },
  ]);
  console.log("✅ 8. projects");

  // 9. certifications
  await db.collection("certifications").insertOne({
    resumeId,
    name: "Manual Software Testing Fundamentals",
    issuer: "TestPark Academy",
    issueDate: new Date("2025-09-01"),
    credentialId: "TST-2025-001",
    credentialUrl: "",
    sortOrder: 0,
    createdAt: new Date(),
  });
  console.log("✅ 9. certifications");

  // 10. languages
  await db.collection("languages").insertMany([
    {
      resumeId,
      name: "Azerbaijani",
      proficiency: "Native",
      sortOrder: 0,
      createdAt: new Date(),
    },
    {
      resumeId,
      name: "English",
      proficiency: "Upper-Intermediate",
      sortOrder: 1,
      createdAt: new Date(),
    },
    {
      resumeId,
      name: "Polish",
      proficiency: "Elementary",
      sortOrder: 2,
      createdAt: new Date(),
    },
    {
      resumeId,
      name: "Russian",
      proficiency: "Intermediate",
      sortOrder: 3,
      createdAt: new Date(),
    },
  ]);
  console.log("✅ 10. languages");

  // 11. sociallinks
  await db.collection("sociallinks").insertMany([
    {
      resumeId,
      platform: "LinkedIn",
      url: "https://linkedin.com/in/elshan",
      sortOrder: 0,
      createdAt: new Date(),
    },
    {
      resumeId,
      platform: "GitHub",
      url: "https://github.com/elshan",
      sortOrder: 1,
      createdAt: new Date(),
    },
  ]);
  console.log("✅ 11. sociallinks");

  // 12. resumeviews
  await db.collection("resumeviews").insertMany([
    {
      resumeId,
      viewerIp: "192.168.1.1",
      userAgent: "Chrome/120",
      referrer: "linkedin.com",
      viewedAt: new Date(Date.now() - 86400000),
    },
    {
      resumeId,
      viewerIp: "10.0.0.5",
      userAgent: "Firefox/119",
      referrer: "",
      viewedAt: new Date(Date.now() - 3600000),
    },
    {
      resumeId,
      viewerIp: "172.16.0.2",
      userAgent: "Safari/17",
      referrer: "google.com",
      viewedAt: new Date(),
    },
  ]);
  console.log("✅ 12. resumeviews");

  // 13. auditlogs
  await db.collection("auditlogs").insertMany([
    {
      userId,
      action: "REGISTER",
      entityType: "User",
      entityId: userId.toString(),
      ipAddress: "127.0.0.1",
      createdAt: new Date(Date.now() - 200000),
    },
    {
      userId,
      action: "LOGIN",
      entityType: "User",
      entityId: userId.toString(),
      ipAddress: "127.0.0.1",
      createdAt: new Date(Date.now() - 100000),
    },
    {
      userId,
      action: "RESUME_CREATED",
      entityType: "Resume",
      entityId: resumeId.toString(),
      newValues: { title: "Software QA Engineer Resume" },
      ipAddress: "127.0.0.1",
      createdAt: new Date(),
    },
  ]);
  console.log("✅ 13. auditlogs");

  // 14. notifications
  await db.collection("notifications").insertMany([
    {
      userId,
      type: "WELCOME",
      title: "Welcome to Resume Maker!",
      message: "Create your first professional resume.",
      isRead: true,
      link: "/dashboard",
      createdAt: new Date(Date.now() - 200000),
    },
    {
      userId,
      type: "RESUME_VIEWED",
      title: "Someone viewed your resume",
      message: "Your resume was viewed 3 times today.",
      isRead: false,
      link: `/resume/${resumeId}`,
      createdAt: new Date(),
    },
  ]);
  console.log("✅ 14. notifications");

  // 15. subscriptions
  await db.collection("subscriptions").insertOne({
    userId,
    plan: "free",
    status: "active",
    startedAt: new Date(),
    expiresAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  console.log("✅ 15. subscriptions");

  console.log("\n🎉 Seed tamamlandı! 15 kolleksiya dolduruldu.");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("❌ Seed xəta:", err);
  process.exit(1);
});
