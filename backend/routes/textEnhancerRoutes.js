const express = require('express');
const router = express.Router();
const { enhanceText, enhanceResumeSection } = require('../controllers/textEnhancerController');

// Route to enhance general text
router.post('/enhance', enhanceText);

// Route to enhance specific resume sections
router.post('/enhance-resume-section', enhanceResumeSection);

module.exports = router; 