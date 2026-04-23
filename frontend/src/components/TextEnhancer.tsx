import React, { useState } from 'react';
import { enhanceText, enhanceResumeSection } from '../services/api';

interface TextEnhancerProps {
  onTextEnhanced?: (originalText: string, enhancedText: string) => void;
  sectionType?: 'summary' | 'experience' | 'skills' | 'education' | 'projects' | 'general';
  initialText?: string;
  placeholder?: string;
}

const TextEnhancer: React.FC<TextEnhancerProps> = ({
  onTextEnhanced,
  sectionType = 'general',
  initialText = '',
  placeholder = 'Enter text to enhance...'
}) => {
  const [text, setText] = useState(initialText);
  const [enhancedText, setEnhancedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEnhance = async () => {
    if (!text.trim()) {
      setError('Please enter some text to enhance');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      let result;
      
      if (sectionType === 'general') {
        result = await enhanceText(text);
      } else {
        result = await enhanceResumeSection(text, sectionType);
      }

      if (result.success) {
        setEnhancedText(result.enhancedText);
        onTextEnhanced?.(text, result.enhancedText);
      } else {
        setError(result.message || 'Enhancement failed');
      }
    } catch (err) {
      setError('Failed to enhance text. Please try again.');
      console.error('Text enhancement error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (enhancedText) {
      navigator.clipboard.writeText(enhancedText);
    }
  };

  const handleReplace = () => {
    if (enhancedText) {
      setText(enhancedText);
      setEnhancedText('');
    }
  };

  return (
    <div className="p-6 mx-auto max-w-4xl bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          AI Text Enhancer
        </h2>
        <p className="text-gray-600">
          Enhance your text for better clarity, grammar, and professional tone
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Input Section */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Original Text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
            className="p-3 w-full h-64 rounded-md border border-gray-300 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          
          <div className="mt-4">
            <button
              onClick={handleEnhance}
              disabled={isLoading || !text.trim()}
              className="px-4 py-2 w-full text-white bg-blue-600 rounded-md transition-colors hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex justify-center items-center">
                  <svg className="mr-3 -ml-1 w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enhancing...
                </span>
              ) : (
                'Enhance Text'
              )}
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Enhanced Text
          </label>
          <div className="relative">
            <textarea
              value={enhancedText}
              readOnly
              placeholder="Enhanced text will appear here..."
              className="p-3 w-full h-64 bg-gray-50 rounded-md border border-gray-300 resize-none"
            />
            
            {enhancedText && (
              <div className="flex absolute top-2 right-2 gap-2">
                <button
                  onClick={handleCopy}
                  className="p-2 text-white bg-green-600 rounded-md transition-colors hover:bg-green-700"
                  title="Copy to clipboard"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                <button
                  onClick={handleReplace}
                  className="p-2 text-white bg-blue-600 rounded-md transition-colors hover:bg-blue-700"
                  title="Replace original text"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 mt-4 text-red-700 bg-red-100 rounded-md border border-red-400">
          {error}
        </div>
      )}

      {/* Section Type Info */}
      {sectionType !== 'general' && (
        <div className="p-3 mt-4 text-blue-700 bg-blue-50 rounded-md border border-blue-200">
          <p className="text-sm">
            <strong>Section Type:</strong> {sectionType.charAt(0).toUpperCase() + sectionType.slice(1)}
          </p>
          <p className="mt-1 text-xs">
            This text will be enhanced specifically for {sectionType} sections with tailored prompts.
          </p>
        </div>
      )}
    </div>
  );
};

export default TextEnhancer; 