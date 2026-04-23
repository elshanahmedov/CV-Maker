import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Download, Save, Eye, ArrowLeft, Plus, Trash2, Loader, Sparkles, Check, X } from 'lucide-react';
import ResumePreview from '../components/ResumePreview';
import { generatePDF } from '../utils/pdfGenerator';
import { enhanceText } from '../services/api';

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  graduationDate: string;
  gpa?: string;
}

interface Skill {
  id: string;
  name: string;
  level: string;
}

const ResumeBuilder = () => {
  const { templateId } = useParams();
  const [activeSection, setActiveSection] = useState('personal');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedSummary, setEnhancedSummary] = useState('');
  const [showEnhancedPreview, setShowEnhancedPreview] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
  });

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    },
  ]);

  const [education, setEducation] = useState<Education[]>([
    {
      id: '1',
      degree: '',
      school: '',
      location: '',
      graduationDate: '',
      gpa: '',
    },
  ]);

  const [skills, setSkills] = useState<Skill[]>([
    { id: '1', name: '', level: 'Intermediate' },
  ]);

  const sections = [
    { id: 'personal', name: 'Personal Info' },
    { id: 'experience', name: 'Experience' },
    { id: 'education', name: 'Education' },
    { id: 'skills', name: 'Skills' },
  ];

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    setExperiences([...experiences, newExp]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      location: '',
      graduationDate: '',
      gpa: '',
    };
    setEducation([...education, newEdu]);
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'Intermediate',
    };
    setSkills([...skills, newSkill]);
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  const handleDownload = async () => {
    if (!personalInfo.name.trim()) {
      setDownloadMessage({ type: 'error', text: 'Please enter your name before downloading.' });
      setTimeout(() => setDownloadMessage(null), 3000);
      return;
    }

    setIsDownloading(true);
    setDownloadMessage(null);

    try {
      await generatePDF({
        personalInfo,
        experiences,
        education,
        skills,
        templateId: templateId || 'modern'
      });
      
      setDownloadMessage({ type: 'success', text: 'Resume downloaded successfully!' });
      setTimeout(() => setDownloadMessage(null), 3000);
    } catch (error) {
      console.error('Download error:', error);
      setDownloadMessage({ type: 'error', text: 'Failed to download resume. Please try again.' });
      setTimeout(() => setDownloadMessage(null), 3000);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleEnhanceSummary = async () => {
    if (!personalInfo.summary.trim()) {
      setDownloadMessage({ type: 'error', text: 'Please enter some text in the Professional Summary before enhancing.' });
      setTimeout(() => setDownloadMessage(null), 3000);
      return;
    }

    setIsEnhancing(true);
    setDownloadMessage(null);
    setShowEnhancedPreview(false);
    setEnhancedSummary('');

    try {
      console.log('Enhancing text:', personalInfo.summary);
      const apiResponse = await enhanceText(personalInfo.summary);
      console.log('Enhancement response:', apiResponse);
      
      if (apiResponse.success && apiResponse.enhancedText) {
        setEnhancedSummary(apiResponse.enhancedText);
        setShowEnhancedPreview(true);
        setDownloadMessage({ type: 'success', text: 'Professional Summary enhanced successfully! Review and accept the changes.' });
        setTimeout(() => setDownloadMessage(null), 5000);
      } else {
        setDownloadMessage({ type: 'error', text: apiResponse.message || 'Enhancement failed. Please try again.' });
        setTimeout(() => setDownloadMessage(null), 3000);
      }
    } catch (error) {
      console.error('Enhancement error:', error);
      setDownloadMessage({ type: 'error', text: 'Failed to enhance text. Please check your connection and try again.' });
      setTimeout(() => setDownloadMessage(null), 3000);
    } finally {
      setIsEnhancing(false);
    }
  };

  const acceptEnhancedSummary = () => {
    setPersonalInfo(prev => ({
      ...prev,
      summary: enhancedSummary
    }));
    setShowEnhancedPreview(false);
    setEnhancedSummary('');
    setDownloadMessage({ type: 'success', text: 'Enhanced summary applied successfully!' });
    setTimeout(() => setDownloadMessage(null), 3000);
  };

  const rejectEnhancedSummary = () => {
    setShowEnhancedPreview(false);
    setEnhancedSummary('');
  };

  const renderPersonalSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Full Name *</label>
          <input
            type="text"
            value={personalInfo.name}
            onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})}
            className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={personalInfo.email}
            onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
            className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
            className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="(555) 123-4567"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            value={personalInfo.location}
            onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
            className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="City, State"
          />
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">Professional Summary</label>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleEnhanceSummary}
              disabled={isEnhancing || !personalInfo.summary.trim()}
              className="flex items-center px-3 py-1 space-x-2 text-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-md transition-all hover:from-blue-700 hover:to-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isEnhancing ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Enhancing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Enhance with AI</span>
                </>
              )}
            </button>
          </div>
        </div>
        
        <textarea
          value={personalInfo.summary}
          onChange={(e) => setPersonalInfo(prev => ({...prev, summary: e.target.value}))}
          rows={4}
          className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Write a brief summary of your professional background and goals..."
        />

        {/* Enhanced Summary Preview */}
        {showEnhancedPreview && enhancedSummary && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-sm font-semibold text-blue-800">✨ AI Enhanced Version</h4>
              <div className="flex space-x-2">
                <button
                  onClick={acceptEnhancedSummary}
                  className="flex items-center px-3 py-1 space-x-1 text-xs text-white bg-green-600 rounded-md transition-colors hover:bg-green-700"
                  title="Accept enhanced version"
                >
                  <Check className="w-3 h-3" />
                  <span>Accept</span>
                </button>
                <button
                  onClick={rejectEnhancedSummary}
                  className="flex items-center px-3 py-1 space-x-1 text-xs text-white bg-red-600 rounded-md transition-colors hover:bg-red-700"
                  title="Reject enhanced version"
                >
                  <X className="w-3 h-3" />
                  <span>Reject</span>
                </button>
              </div>
            </div>
            <div className="p-3 bg-white rounded border text-sm text-gray-700 leading-relaxed">
              {enhancedSummary}
            </div>
            <p className="mt-2 text-xs text-blue-600">
              Review the enhanced version above. Click "Accept" to replace your current summary or "Reject" to keep the original.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderExperienceSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
        <button
          onClick={addExperience}
          className="flex items-center px-4 py-2 space-x-2 text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>
      
      {experiences.map((exp, index) => (
        <div key={exp.id} className="p-6 bg-gray-50 rounded-lg border">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-medium text-gray-900">Experience {index + 1}</h4>
            {experiences.length > 1 && (
              <button
                onClick={() => removeExperience(exp.id)}
                className="p-2 text-red-600 rounded-lg transition-colors hover:text-red-800 hover:bg-red-50"
                title="Remove experience"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* Job Details - Row 1 */}
          <div className="grid gap-4 mb-4 md:grid-cols-2">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Job Title</label>
              <input
                type="text"
                value={exp.title}
                onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Software Engineer"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Company</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Google Inc."
              />
            </div>
          </div>

          {/* Location and Dates - Row 2 */}
          <div className="grid gap-4 mb-4 md:grid-cols-3">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={exp.location}
                onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., San Francisco, CA"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="month"
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">End Date</label>
              <input
                type="month"
                value={exp.endDate}
                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                disabled={exp.current}
                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>
          </div>
          
          {/* Current Position Checkbox */}
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={exp.current}
                onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">I currently work here</span>
            </label>
          </div>
          
          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={exp.description}
              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
              rows={4}
              className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe your responsibilities, achievements, and key contributions..."
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderEducationSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Education</h3>
        <button
          onClick={addEducation}
          className="flex items-center px-4 py-2 space-x-2 text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>
      
      {education.map((edu, index) => (
        <div key={edu.id} className="p-6 bg-gray-50 rounded-lg border">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-medium text-gray-900">Education {index + 1}</h4>
            {education.length > 1 && (
              <button
                onClick={() => removeEducation(edu.id)}
                className="p-2 text-red-600 rounded-lg transition-colors hover:text-red-800 hover:bg-red-50"
                title="Remove education"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* Degree and School - Row 1 */}
          <div className="grid gap-4 mb-4 md:grid-cols-2">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Bachelor of Science in Computer Science"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">School</label>
              <input
                type="text"
                value={edu.school}
                onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Stanford University"
              />
            </div>
          </div>

          {/* Location, Date, and GPA - Row 2 */}
          <div className="grid gap-4 mb-4 md:grid-cols-3">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={edu.location}
                onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Stanford, CA"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Graduation Date</label>
              <input
                type="month"
                value={edu.graduationDate}
                onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">GPA (Optional)</label>
              <input
                type="text"
                value={edu.gpa || ''}
                onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 3.8"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSkillsSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
        <button
          onClick={addSkill}
          className="flex items-center px-4 py-2 space-x-2 text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>
      
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={skill.id} className="p-4 bg-gray-50 rounded-lg border">
            <div className="grid gap-3 md:grid-cols-3">
              <div className="md:col-span-1">
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                  className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Skill name"
                />
              </div>
              <div className="md:col-span-1">
                <select
                  value={skill.level}
                  onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                  className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
              <div className="flex justify-end items-center">
                {skills.length > 1 && (
                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="p-2 text-red-600 rounded-lg transition-colors hover:text-red-800 hover:bg-red-50"
                    title="Remove skill"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return renderPersonalSection();
      case 'experience':
        return renderExperienceSection();
      case 'education':
        return renderEducationSection();
      case 'skills':
        return renderSkillsSection();
      default:
        return renderPersonalSection();
    }
  };

  return (
    <div
      className="pt-32 min-h-screen"
      style={{
        background: "linear-gradient(152deg, rgba(8,0,0,1) 0%, rgba(106,78,205,1) 67%, rgba(46,43,43,1) 100%)"
      }}
    >
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <button className="p-2 text-white transition-colors hover:text-blue-200">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Resume Builder</h1>
              <p className="text-blue-200">Template: {templateId}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {downloadMessage && (
              <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
                downloadMessage.type === 'success' 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {downloadMessage.text}
              </div>
            )}
            
            <button className="flex items-center px-4 py-2 space-x-2 text-white bg-gray-600 rounded-lg transition-colors hover:bg-gray-700">
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button className="flex items-center px-4 py-2 space-x-2 text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700">
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center px-4 py-2 space-x-2 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg transition-all hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Sidebar - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
              {/* Section Navigation */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      {section.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6">
                {renderActiveSection()}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 bg-white rounded-xl border border-gray-200 shadow-lg max-h-[calc(100vh-8rem)] overflow-y-auto">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Live Preview</h3>
              <div className="overflow-hidden">
                <ResumePreview
                  personalInfo={personalInfo}
                  experiences={experiences}
                  education={education}
                  skills={skills}
                  templateId={templateId || 'modern'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;