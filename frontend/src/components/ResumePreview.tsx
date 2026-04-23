import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

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

interface ResumePreviewProps {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  templateId: string;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
  personalInfo,
  experiences,
  education,
  skills,
  templateId,
}) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const getSkillLevelWidth = (level: string) => {
    switch (level) {
      case 'Beginner': return 'w-1/4';
      case 'Intermediate': return 'w-1/2';
      case 'Advanced': return 'w-3/4';
      case 'Expert': return 'w-full';
      default: return 'w-1/2';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm text-sm scale-75 origin-top-left w-[133%] h-[150%] mt-32 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {personalInfo.name || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center space-x-1">
              <Mail className="h-3 w-3" />
              <span className="text-xs">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center space-x-1">
              <Phone className="h-3 w-3" />
              <span className="text-xs">{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span className="text-xs">{personalInfo.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2 pb-1 border-b border-gray-300">
            Professional Summary
          </h2>
          <p className="text-gray-700 text-xs leading-relaxed">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experiences.some(exp => exp.title || exp.company) && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2 pb-1 border-b border-gray-300">
            Work Experience
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              (exp.title || exp.company) && (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {exp.title || 'Job Title'}
                      </h3>
                      <p className="text-blue-600 text-xs">
                        {exp.company || 'Company Name'}
                        {exp.location && ` • ${exp.location}`}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500 text-right ml-2 flex-shrink-0">
                      {exp.startDate && formatDate(exp.startDate)}
                      {exp.startDate && (exp.endDate || exp.current) && ' - '}
                      {exp.current ? 'Present' : (exp.endDate && formatDate(exp.endDate))}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 text-xs leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.some(edu => edu.degree || edu.school) && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2 pb-1 border-b border-gray-300">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              (edu.degree || edu.school) && (
                <div key={edu.id} className="mb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {edu.degree || 'Degree'}
                      </h3>
                      <p className="text-blue-600 text-xs">
                        {edu.school || 'School Name'}
                        {edu.location && ` • ${edu.location}`}
                      </p>
                      {edu.gpa && (
                        <p className="text-gray-600 text-xs">GPA: {edu.gpa}</p>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 ml-2 flex-shrink-0">
                      {edu.graduationDate && formatDate(edu.graduationDate)}
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.some(skill => skill.name) && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2 pb-1 border-b border-gray-300">
            Skills
          </h2>
          <div className="space-y-2">
            {skills.map((skill) => (
              skill.name && (
                <div key={skill.id} className="mb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-gray-900 flex-1">
                      {skill.name}
                    </span>
                    <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                      {skill.level}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`bg-blue-600 h-1.5 rounded-full transition-all duration-300 ${getSkillLevelWidth(skill.level)}`}
                    ></div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!personalInfo.name && !personalInfo.summary && 
       !experiences.some(exp => exp.title || exp.company) &&
       !education.some(edu => edu.degree || edu.school) &&
       !skills.some(skill => skill.name) && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-sm">Start filling out your information to see the preview</p>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;