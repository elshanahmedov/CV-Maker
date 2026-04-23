import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  templateId: string;
}

export const generatePDF = async (resumeData: ResumeData): Promise<void> => {
  try {
    // Create a temporary container for the resume
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '210mm'; // A4 width
    tempContainer.style.minHeight = '297mm'; // A4 height
    tempContainer.style.backgroundColor = 'white';
    tempContainer.style.padding = '20mm';
    tempContainer.style.fontFamily = 'Arial, sans-serif';
    tempContainer.style.fontSize = '12px';
    tempContainer.style.lineHeight = '1.4';
    tempContainer.style.color = '#333';

    // Generate HTML content
    tempContainer.innerHTML = generateResumeHTML(resumeData);
    
    // Add to DOM temporarily
    document.body.appendChild(tempContainer);

    // Convert to canvas
    const canvas = await html2canvas(tempContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 794, // A4 width in pixels at 96 DPI
      height: 1123, // A4 height in pixels at 96 DPI
    });

    // Remove temporary container
    document.body.removeChild(tempContainer);

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Download the PDF
    const fileName = `${resumeData.personalInfo.name || 'Resume'}_Resume.pdf`;
    pdf.save(fileName);

  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};

const generateResumeHTML = (data: ResumeData): string => {
  const { personalInfo, experiences, education, skills } = data;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return `
    <div style="max-width: 100%; margin: 0 auto; background: white;">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #e5e7eb;">
        <h1 style="font-size: 28px; font-weight: bold; color: #1f2937; margin: 0 0 10px 0;">
          ${personalInfo.name || 'Your Name'}
        </h1>
        <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; color: #6b7280; font-size: 14px;">
          ${personalInfo.email ? `<span>📧 ${personalInfo.email}</span>` : ''}
          ${personalInfo.phone ? `<span>📞 ${personalInfo.phone}</span>` : ''}
          ${personalInfo.location ? `<span>📍 ${personalInfo.location}</span>` : ''}
        </div>
      </div>

      ${personalInfo.summary ? `
      <!-- Summary -->
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 18px; font-weight: bold; color: #1f2937; margin: 0 0 10px 0; padding-bottom: 5px; border-bottom: 1px solid #d1d5db;">
          Professional Summary
        </h2>
        <p style="color: #374151; line-height: 1.6; margin: 0;">
          ${personalInfo.summary}
        </p>
      </div>
      ` : ''}

      ${experiences.some(exp => exp.title || exp.company) ? `
      <!-- Experience -->
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 18px; font-weight: bold; color: #1f2937; margin: 0 0 15px 0; padding-bottom: 5px; border-bottom: 1px solid #d1d5db;">
          Work Experience
        </h2>
        <div style="space-y: 20px;">
          ${experiences.map(exp => {
            if (!exp.title && !exp.company) return '';
            return `
            <div style="margin-bottom: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px;">
                <div>
                  <h3 style="font-weight: bold; color: #1f2937; font-size: 16px; margin: 0;">
                    ${exp.title || 'Job Title'}
                  </h3>
                  <p style="color: #2563eb; font-size: 14px; margin: 2px 0;">
                    ${exp.company || 'Company Name'}${exp.location ? ` • ${exp.location}` : ''}
                  </p>
                </div>
                <div style="color: #6b7280; font-size: 12px; text-align: right;">
                  ${exp.startDate ? formatDate(exp.startDate) : ''}${exp.startDate && (exp.endDate || exp.current) ? ' - ' : ''}${exp.current ? 'Present' : (exp.endDate ? formatDate(exp.endDate) : '')}
                </div>
              </div>
              ${exp.description ? `
              <p style="color: #374151; font-size: 12px; line-height: 1.5; margin: 5px 0 0 0;">
                ${exp.description}
              </p>
              ` : ''}
            </div>
            `;
          }).join('')}
        </div>
      </div>
      ` : ''}

      ${education.some(edu => edu.degree || edu.school) ? `
      <!-- Education -->
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 18px; font-weight: bold; color: #1f2937; margin: 0 0 15px 0; padding-bottom: 5px; border-bottom: 1px solid #d1d5db;">
          Education
        </h2>
        <div>
          ${education.map(edu => {
            if (!edu.degree && !edu.school) return '';
            return `
            <div style="margin-bottom: 15px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                  <h3 style="font-weight: bold; color: #1f2937; font-size: 16px; margin: 0;">
                    ${edu.degree || 'Degree'}
                  </h3>
                  <p style="color: #2563eb; font-size: 14px; margin: 2px 0;">
                    ${edu.school || 'School Name'}${edu.location ? ` • ${edu.location}` : ''}
                  </p>
                  ${edu.gpa ? `<p style="color: #6b7280; font-size: 12px; margin: 2px 0;">GPA: ${edu.gpa}</p>` : ''}
                </div>
                <div style="color: #6b7280; font-size: 12px;">
                  ${edu.graduationDate ? formatDate(edu.graduationDate) : ''}
                </div>
              </div>
            </div>
            `;
          }).join('')}
        </div>
      </div>
      ` : ''}

      ${skills.some(skill => skill.name) ? `
      <!-- Skills -->
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 18px; font-weight: bold; color: #1f2937; margin: 0 0 15px 0; padding-bottom: 5px; border-bottom: 1px solid #d1d5db;">
          Skills
        </h2>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
          ${skills.map(skill => {
            if (!skill.name) return '';
            const getSkillWidth = (level: string) => {
              switch (level) {
                case 'Beginner': return '25%';
                case 'Intermediate': return '50%';
                case 'Advanced': return '75%';
                case 'Expert': return '100%';
                default: return '50%';
              }
            };
            return `
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                <span style="font-weight: 500; color: #1f2937; font-size: 14px;">
                  ${skill.name}
                </span>
                <span style="color: #6b7280; font-size: 12px;">
                  ${skill.level}
                </span>
              </div>
              <div style="width: 100%; background-color: #e5e7eb; border-radius: 3px; height: 6px;">
                <div style="background-color: #2563eb; height: 6px; border-radius: 3px; width: ${getSkillWidth(skill.level)};"></div>
              </div>
            </div>
            `;
          }).join('')}
        </div>
      </div>
      ` : ''}
    </div>
  `;
};