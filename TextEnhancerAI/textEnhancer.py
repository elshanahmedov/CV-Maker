import requests
import os
import sys
from dotenv import load_dotenv
import json

# Load environment variables
load_dotenv()
API_KEY = os.getenv("GROQ_API_KEY")

# Choose the model: "mixtral-8x7b-32768", "llama3-70b-8192"
MODEL = "llama3-70b-8192"

def enhance_text(text):
    """
    Enhance text using Groq API for better clarity, grammar, and professional tone
    """
    if not API_KEY:
        raise ValueError("GROQ_API_KEY not found in environment variables")
    
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "meta-llama/llama-4-scout-17b-16e-instruct",
        "messages": [
            {
                "role": "system", 
                "content": "You are a helpful assistant that improves the clarity, grammar, and tone of professional background text to make it more professional with bullet points."
            },
            {
                "role": "user", 
                "content": f"Enhance this text:\n\n{text}"
            }
        ],
        "temperature": 0.7,
        "max_tokens": 1000
    }

    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        result = response.json()
        
        if 'choices' in result and len(result['choices']) > 0:
            return result['choices'][0]['message']['content']
        else:
            raise ValueError("No response content received from API")
            
    except requests.exceptions.RequestException as e:
        raise Exception(f"API request failed: {str(e)}")
    except json.JSONDecodeError as e:
        raise Exception(f"Invalid JSON response: {str(e)}")
    except Exception as e:
        raise Exception(f"Text enhancement failed: {str(e)}")

def enhance_resume_section(section_text, section_type="general"):
    """
    Enhance specific resume sections with tailored prompts
    """
    if not API_KEY:
        raise ValueError("GROQ_API_KEY not found in environment variables")
    
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    # Different prompts for different resume sections
    section_prompts = {
        "summary": "You are a professional resume writer. Improve this professional summary to be more compelling and impactful:",
        "experience": "You are a professional resume writer. Enhance these work experience bullet points to be more achievement-oriented and impactful:",
        "skills": "You are a professional resume writer. Improve the presentation and organization of these skills:",
        "education": "You are a professional resume writer. Enhance this education section to be more professional:",
        "projects": "You are a professional resume writer. Improve these project descriptions to highlight achievements and impact:",
        "general": "You are a professional resume writer. Enhance this section to be more clear, professional, and impactful:"
    }
    
    prompt = section_prompts.get(section_type, section_prompts["general"])

    payload = {
        "model": "meta-llama/llama-4-scout-17b-16e-instruct",
        "messages": [
            {"role": "system", "content": prompt},
            {"role": "user", "content": f"Enhance this {section_type} section:\n\n{section_text}"}
        ],
        "temperature": 0.7,
        "max_tokens": 1000
    }

    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        result = response.json()
        
        if 'choices' in result and len(result['choices']) > 0:
            return result['choices'][0]['message']['content']
        else:
            raise ValueError("No response content received from API")
            
    except requests.exceptions.RequestException as e:
        raise Exception(f"API request failed: {str(e)}")
    except json.JSONDecodeError as e:
        raise Exception(f"Invalid JSON response: {str(e)}")
    except Exception as e:
        raise Exception(f"Text enhancement failed: {str(e)}")

if __name__ == "__main__":
    # Handle command-line arguments for Node.js integration
    if len(sys.argv) >= 2:
        text = sys.argv[1]
        section_type = sys.argv[2] if len(sys.argv) >= 3 else "general"
        
        try:
            if section_type == "general":
                enhanced = enhance_text(text)
            else:
                enhanced = enhance_resume_section(text, section_type)
            print(enhanced)
        except Exception as e:
            print(f"Error: {e}", file=sys.stderr)
            sys.exit(1)
    else:
        # Interactive mode for testing
        try:
            user_input = input("Input text to enhance: ")
            enhanced = enhance_text(user_input)
            print("Enhanced Text:\n", enhanced)
        except Exception as e:
            print(f"Error: {e}") 