import React from "react";
import { Code, TestTube, Monitor, Lightbulb } from "lucide-react";

// Replace these with Elshan's actual image import if available
import elshanImg from "../images/elshan.jpeg";

const AboutUs = () => {
  const stats = [
    { label: "Resumes Created", value: "50,000+" },
    { label: "Happy Users", value: "25,000+" },
    { label: "Templates Available", value: "100+" },
    { label: "Countries Served", value: "120+" },
  ];

  const team = [
    {
      name: "Elshan Ahmadov",
      role: "Frontend Developer & QA Engineer",
      image: elshanImg, // Replace with: elshanImg
      initials: "EA",
    },
  ];

  const values = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Web Development",
      description:
        "Passionate about building responsive, clean digital solutions using HTML, CSS, JavaScript, and React.",
    },
    {
      icon: <TestTube className="w-6 h-6" />,
      title: "Software Quality",
      description:
        "Experienced in manual testing, bug reporting, regression testing, and test case writing to ensure high-quality products.",
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "UI & Design",
      description:
        "Focused on responsive web design and intuitive UI — crafting interfaces that create real user value.",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Continuous Growth",
      description:
        "Motivated by teamwork, critical thinking, and hands-on experience in professional environments.",
    },
  ];

  const skills = [
    "Manual Testing",
    "Bug Reporting",
    "Regression Testing",
    "Test Case Writing",
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Git & GitHub",
    "Responsive Web Design",
    "Web UI Testing",
    "Problem Solving",
    "Critical Thinking",
    "Teamwork",
    "Communication",
    "Leadership",
  ];

  const experience = [
    {
      period: "August 2025 — January 2026",
      company: "Toormate MMC",
      description:
        "Worked with a travel and tourism company providing transportation services for tourists. Responsible for safe and punctual driving for tours, airport transfers, and sightseeing trips. Delivered professional customer service and maintained compliance with traffic regulations.",
    },
    {
      period: "July 2025 — October 2025",
      company: "TestPark LLC",
      description:
        "Conducted manual game/software testing to identify bugs and usability issues. Documented and reported defects with clear reproduction steps. Assisted in regression testing and quality verification.",
    },
    {
      period: "October 2024 — July 2025",
      company: "Dostlar Lounge Cafe Warsaw",
      description:
        "Provided friendly and professional customer service in a fast-paced lounge environment. Assisted guests with orders, maintained cleanliness and worked effectively as part of a team.",
    },
  ];

  const projects = [
    {
      name: "Hospital App",
      type: "CODE",
      tags: ["React", "Web App", "Healthcare"],
      description:
        "A hospital management web application focused on organizing patient-related workflows with a clean and practical interface.",
    },
    {
      name: "Personal Portfolio",
      type: "UI",
      tags: ["Portfolio", "SCSS", "Responsive"],
      description:
        "A modern personal portfolio website designed to present profile, experience, skills, and projects in a professional way.",
    },
    {
      name: "Music App",
      type: "CODE",
      tags: ["Music", "DevOps", "Frontend"],
      description:
        "A music application project built with a focus on user interaction, media experience, and development workflow.",
    },
    {
      name: "Netflix Clone",
      type: "UI",
      tags: ["Netflix Clone", "UI", "Frontend"],
      description:
        "A Netflix-inspired frontend project that recreates a cinematic streaming interface with modern layout and styling.",
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(152deg, rgba(8,0,0,1) 0%, rgba(106,78,205,1) 67%, rgba(46,43,43,1) 100%)",
      }}
    >
      {/* Story Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
              Our Story
            </h2>
            <div className="mb-8 text-lg leading-relaxed text-white text-opacity-70 sm:text-xl">
              <p className="mb-6">
                <strong>
                  Building with clarity, learning through practice.
                </strong>{" "}
                🚀
              </p>
              <p className="mb-6">
                My name is <strong>Elshan Ahmadov</strong>, and I am a Bachelor
                of Information Technology student at{" "}
                <strong>Vistula University</strong>. I have a strong foundation
                in practical problem-solving and I am motivated to gain hands-on
                experience in a professional environment. I am passionate about
                technology, software quality, teamwork, and building practical
                digital solutions that create real value. I am especially
                interested in web design, software testing, and continuous
                professional growth.
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-16">
            <h3 className="mb-6 text-2xl font-bold text-center text-white">
              Skills & Focus
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-2 text-sm font-medium text-white rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Meet the Developer
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-white text-opacity-70 sm:text-xl">
              Passionate about technology, software quality, and building
              digital solutions that matter.
            </p>
          </div>

          <div className="flex justify-center">
            {team.map((member, index) => (
              <div
                key={index}
                className="overflow-hidden bg-white rounded-xl shadow-lg transition-shadow hover:shadow-xl"
                style={{ maxWidth: 280, width: "100%" }}
              >
                {/* Avatar */}
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full h-64"
                  />
                ) : (
                  <div
                    className="flex items-center justify-center w-full h-64"
                    style={{
                      background:
                        "linear-gradient(135deg, #6a4ecd 0%, #08001a 100%)",
                    }}
                  >
                    <span
                      className="text-6xl font-bold text-white"
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {member.initials}
                    </span>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="mb-1 text-xl font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="mb-2 font-medium text-blue-600">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-500">
                    Vistula University · Warsaw, Poland
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-3xl font-bold text-center text-white sm:text-4xl">
            Values & Approach
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div
                key={i}
                className="p-6 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <div
                  className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg text-white"
                  style={{ background: "rgba(106,78,205,0.6)" }}
                >
                  {v.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {v.title}
                </h3>
                <p
                  className="text-sm leading-relaxed text-white"
                  style={{ opacity: 0.7 }}
                >
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-3xl font-bold text-center text-white sm:text-4xl">
            Education
          </h2>
          <div
            className="p-8 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <p className="mb-1 text-sm font-medium text-purple-300">
              2022 — Present
            </p>
            <h3 className="mb-1 text-xl font-bold text-white">
              Vistula University
            </h3>
            <p className="text-white" style={{ opacity: 0.7 }}>
              Bachelor in Computer Science — Information Technology · Warsaw,
              Poland
            </p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-3xl font-bold text-center text-white sm:text-4xl">
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp, i) => (
              <div
                key={i}
                className="p-8 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <p className="mb-1 text-sm font-medium text-purple-300">
                  {exp.period}
                </p>
                <h3 className="mb-3 text-xl font-bold text-white">
                  {exp.company}
                </h3>
                <p
                  className="text-sm leading-relaxed text-white"
                  style={{ opacity: 0.75 }}
                >
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-3xl font-bold text-center text-white sm:text-4xl">
            Projects
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((proj, i) => (
              <div
                key={i}
                className="p-6 rounded-xl transition-all hover:scale-105"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  cursor: "pointer",
                }}
              >
                <span
                  className="inline-block px-3 py-1 mb-3 text-xs font-bold rounded"
                  style={{
                    background:
                      proj.type === "UI"
                        ? "rgba(99,102,241,0.5)"
                        : "rgba(16,185,129,0.4)",
                    color: "white",
                  }}
                >
                  {proj.type}
                </span>
                <h3 className="mb-2 text-lg font-bold text-white">
                  {proj.name}
                </h3>
                <p
                  className="mb-4 text-sm leading-relaxed text-white"
                  style={{ opacity: 0.7 }}
                >
                  {proj.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {proj.tags.map((tag, ti) => (
                    <span
                      key={ti}
                      className="px-3 py-1 text-xs font-medium text-white rounded-full"
                      style={{ background: "rgba(255,255,255,0.1)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 text-white bg-gradient-to-r from-blue-600 to-black-600">
        <div className="px-4 mx-auto max-w-4xl text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl">Get in Touch</h2>
          <p className="mb-8 text-xl">
            Have questions or feedback? I'd love to hear from you.
          </p>
          <button className="px-8 py-4 font-semibold text-blue-600 bg-white rounded-lg transition-colors transform hover:bg-gray-50 hover:scale-105">
            Contact Me
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
