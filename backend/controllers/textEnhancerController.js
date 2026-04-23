const { PythonShell } = require('python-shell');
const path = require('path');

const enhanceText = async (req, res) => {
    try {
        const { text, sectionType = 'general' } = req.body;

        console.log('Received text enhancement request:', { text: text?.substring(0, 100) + '...', sectionType });

        if (!text || text.trim().length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'Text is required and cannot be empty' 
            });
        }

        // For now, provide a simple enhancement fallback
        // This will work while the Python AI integration is being fixed
        const enhancedText = enhanceTextFallback(text, sectionType);

        console.log('Enhancement successful (fallback)');
        
        res.json({
            success: true,
            originalText: text,
            enhancedText: enhancedText,
            sectionType: sectionType
        });

    } catch (error) {
        console.error('Text enhancement controller error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const enhanceResumeSection = async (req, res) => {
    try {
        const { text, sectionType } = req.body;

        console.log('Received resume section enhancement request:', { text: text?.substring(0, 100) + '...', sectionType });

        if (!text || text.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Section text is required and cannot be empty'
            });
        }

        if (!sectionType) {
            return res.status(400).json({
                success: false,
                message: 'Section type is required'
            });
        }

        // Valid section types
        const validSectionTypes = ['summary', 'experience', 'skills', 'education', 'projects'];
        
        if (!validSectionTypes.includes(sectionType)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid section type. Must be one of: summary, experience, skills, education, projects'
            });
        }

        // Use fallback enhancement for now
        const enhancedText = enhanceTextFallback(text, sectionType);

        console.log('Enhancement successful (fallback)');
        
        res.json({
            success: true,
            originalText: text,
            enhancedText: enhancedText,
            sectionType: sectionType
        });

    } catch (error) {
        console.error('Resume section enhancement controller error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Fallback text enhancement function
function enhanceTextFallback(text, sectionType = 'general') {
    const trimmedText = text.trim();
    
    if (sectionType === 'summary') {
        return enhanceProfessionalSummary(trimmedText);
    } else if (sectionType === 'experience') {
        return enhanceExperience(trimmedText);
    } else if (sectionType === 'skills') {
        return enhanceSkills(trimmedText);
    } else if (sectionType === 'education') {
        return enhanceEducation(trimmedText);
    } else if (sectionType === 'projects') {
        return enhanceProjects(trimmedText);
    } else {
        return enhanceGeneral(trimmedText);
    }
}

function enhanceProfessionalSummary(text) {
    // Basic enhancement for professional summary
    let enhanced = text;
    
    // Capitalize first letter
    enhanced = enhanced.charAt(0).toUpperCase() + enhanced.slice(1);
    
    // Add professional language patterns
    if (!enhanced.includes('experienced') && !enhanced.includes('skilled')) {
        enhanced = enhanced.replace(/i am/gi, 'Experienced');
        enhanced = enhanced.replace(/i have/gi, 'Possessing');
    }
    
    // Improve structure
    enhanced = enhanced.replace(/\bi\b/gi, '');
    enhanced = enhanced.replace(/\s+/g, ' ').trim();
    
    // Add professional closing if missing
    if (!enhanced.includes('seeking') && !enhanced.includes('looking') && !enhanced.includes('passionate')) {
        enhanced += ' Passionate about delivering high-quality solutions and contributing to team success.';
    }
    
    return enhanced;
}

function enhanceExperience(text) {
    let enhanced = text;
    
    // Convert to bullet points if not already
    if (!enhanced.includes('•') && !enhanced.includes('-')) {
        const sentences = enhanced.split(/[.!?]+/).filter(s => s.trim().length > 0);
        enhanced = sentences.map(sentence => `• ${sentence.trim()}`).join('\n');
    }
    
    // Add action verbs
    enhanced = enhanced.replace(/worked on/gi, 'Developed');
    enhanced = enhanced.replace(/did/gi, 'Executed');
    enhanced = enhanced.replace(/made/gi, 'Created');
    
    return enhanced;
}

function enhanceSkills(text) {
    let enhanced = text;
    
    // Organize skills better
    const skills = enhanced.split(/[,;]+/).map(skill => skill.trim()).filter(skill => skill.length > 0);
    
    if (skills.length > 1) {
        enhanced = skills.join(', ');
    }
    
    return enhanced;
}

function enhanceEducation(text) {
    let enhanced = text;
    
    // Capitalize important words
    enhanced = enhanced.replace(/\b(bachelor|master|phd|degree|university|college)\b/gi, (match) => {
        return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
    });
    
    return enhanced;
}

function enhanceProjects(text) {
    let enhanced = text;
    
    // Add project structure
    if (!enhanced.includes('•') && !enhanced.includes('-')) {
        const sentences = enhanced.split(/[.!?]+/).filter(s => s.trim().length > 0);
        enhanced = sentences.map(sentence => `• ${sentence.trim()}`).join('\n');
    }
    
    // Enhance technical language
    enhanced = enhanced.replace(/built/gi, 'Developed');
    enhanced = enhanced.replace(/created/gi, 'Engineered');
    
    return enhanced;
}

function enhanceGeneral(text) {
    let enhanced = text;
    
    // Basic grammar and structure improvements
    enhanced = enhanced.charAt(0).toUpperCase() + enhanced.slice(1);
    enhanced = enhanced.replace(/\s+/g, ' ').trim();
    
    // Ensure proper ending
    if (!enhanced.endsWith('.') && !enhanced.endsWith('!') && !enhanced.endsWith('?')) {
        enhanced += '.';
    }
    
    return enhanced;
}

module.exports = {
    enhanceText,
    enhanceResumeSection
};