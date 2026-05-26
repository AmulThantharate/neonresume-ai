/**
 * OpenRouter API client for resume parsing, optimization and LaTeX generation.
 * Integrated with model: deepseek/deepseek-v4-flash:free
 */

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

/**
 * Common fetch wrapper for OpenRouter Chat Completions API
 */
async function callOpenRouterAPI(systemPrompt, userPrompt, apiKey) {
  const key = apiKey || import.meta.env.VITE_OPENROUTER_API_KEY;
  if (!key) {
    throw new Error('OpenRouter API key is missing. Please configure VITE_OPENROUTER_API_KEY in your .env or enter it in the header.');
  }

  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
      'HTTP-Referer': 'https://github.com/alexrivera-dev/neonresume-ai',
      'X-Title': 'NeonResume AI'
    },
    body: JSON.stringify({
      model: 'deepseek/deepseek-v4-flash:free',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
      temperature: 0.1
    })
  });

  if (!response.ok) {
    let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
    try {
      const errorJson = await response.json();
      if (errorJson?.error?.message) {
        errorMessage = errorJson.error.message;
      }
    } catch (e) {
      // Ignore JSON parse failure of error response
    }
    throw new Error(errorMessage);
  }

  const result = await response.json();
  if (!result.choices || result.choices.length === 0 || !result.choices[0].message) {
    throw new Error('Received an empty response from OpenRouter API.');
  }

  return result.choices[0].message.content;
}

/**
 * Step 1: Takes user's raw form inputs and turns them into a highly polished, quantified, ATS-optimized resume JSON.
 */
export async function generateResumeJson(formData, apiKey) {
  const systemPrompt = `You are a world-class executive resume writer and ATS optimization expert.
Generate an ATS-optimized technical resume in STRICT VALID JSON ONLY.

Requirements:
- No markdown formatting in output
- No markdown code fences (do NOT wrap in \`\`\`json ... \`\`\`)
- No explanations or opening/closing remarks
- Return ONLY valid JSON
- Quantify achievements with metrics (e.g., "boosted load times by 40%", "increased conversion rate by 12%"). If metrics are missing, intelligently infer realistic, positive professional business metrics.
- Every experience bullet must start with a strong, active verb (e.g., "Spearheaded", "Engineered", "Optimized", "Architected").
- Optimize sections heavily for standard ATS parser keywords.
- If a target Job Description (JD) is provided by the user, perform deep semantic alignment: naturally inject high-frequency keywords, key tech stacks, and critical criteria from that JD into the candidate's experience bullets, summary, and projects, ensuring they organically highlight their best matching strengths.
- Keep formatting professional, clear, concise, and highly impactful.
- Prioritize measurable impact above general descriptions.

Return JSON in this EXACT structure:
{
  "name": "Candidate Full Name",
  "email": "email@example.com",
  "phone": "123-456-7890",
  "linkedin": "linkedin.com/in/username",
  "github": "github.com/username",
  "portfolio": "portfolio.com",
  "location": "City, State",
  "summary": "High-impact summary focusing on credentials, core strengths, and target role.",
  "experience": [
    {
      "company": "Company Name",
      "role": "Job Title",
      "duration": "Month Year - Month Year or Present",
      "bullets": [
        "Action verb + achievement with concrete metrics.",
        "Action verb + architectural/operational improvement with measurable impact."
      ]
    }
  ],
  "education": [
    {
      "school": "University Name",
      "degree": "B.S. in Computer Science",
      "gpa": "3.8/4.0",
      "gradDate": "Month Year"
    }
  ],
  "skills": {
    "languages": ["JavaScript", "Python"],
    "frameworks": ["React", "Node.js"],
    "tools": ["Git", "Docker"],
    "databases": ["PostgreSQL", "MongoDB"]
  },
  "projects": [
    {
      "name": "Project Name",
      "stack": "React, Tailwind, Express",
      "description": "Short explanation of technical achievements and design patterns.",
      "impact": "Quantified impact (e.g. reduced load speeds by 50% or gained 2,000 users)."
    }
  ],
  "certifications": [
    {
      "name": "AWS Certified Solutions Architect",
      "issuer": "Amazon Web Services",
      "year": "2023"
    }
  ]
}`;

  const userPrompt = `Here is my raw resume data:
Target Role:
- Desired Position: ${formData.targetRole?.position || ''}
- Industry: ${formData.targetRole?.industry || ''}
- Seniority: ${formData.targetRole?.seniority || ''}
- Target Job Description (JD): ${formData.targetRole?.jobDescription || 'None provided'}

Personal Details:
- Name: ${formData.personal?.name || ''}
- Email: ${formData.personal?.email || ''}
- Phone: ${formData.personal?.phone || ''}
- Location: ${formData.personal?.location || ''}
- LinkedIn: ${formData.personal?.linkedin || ''}
- GitHub: ${formData.personal?.github || ''}
- Portfolio: ${formData.personal?.portfolio || ''}

Professional Summary:
${formData.personal?.summary || ''}

Work Experience:
${JSON.stringify(formData.experience || [], null, 2)}

Education:
${JSON.stringify(formData.education || [], null, 2)}

Skills:
- Languages: ${formData.skills?.languages || ''}
- Frameworks: ${formData.skills?.frameworks || ''}
- Tools: ${formData.skills?.tools || ''}
- Databases: ${formData.skills?.databases || ''}

Projects:
${JSON.stringify(formData.projects || [], null, 2)}

Certifications:
${JSON.stringify(formData.certifications || [], null, 2)}

Now, compile this raw data into an optimized, quantified, ATS-optimized JSON resume according to the requested schema. Ensure to output ONLY valid JSON.`;

  const rawJsonText = await callOpenRouterAPI(systemPrompt, userPrompt, apiKey);
  
  // Clean potential Markdown code fences
  let cleanJsonText = rawJsonText.trim();
  if (cleanJsonText.startsWith('```')) {
    cleanJsonText = cleanJsonText.replace(/^```(json)?\n/, '').replace(/\n```$/, '');
  }
  cleanJsonText = cleanJsonText.trim();

  try {
    return JSON.parse(cleanJsonText);
  } catch (error) {
    console.error('Failed to parse OpenRouter output as JSON. Raw output was:', rawJsonText);
    throw new Error('The AI generated an invalid JSON structure. Please try again.');
  }
}

/**
 * Step 2: Takes the structured resume JSON and converts it into compilable LaTeX moderncv.
 */
export async function generateResumeLatex(resumeJson, apiKey) {
  const systemPrompt = `You are a senior LaTeX engineer specializing in ATS-friendly resumes.
Convert the provided resume JSON into COMPLETE compilable moderncv LaTeX.

Requirements:
- Return ONLY raw LaTeX. Do not wrap inside markdown code block fences (do NOT use \`\`\`latex ... \`\`\`).
- No markdown formatting, explanation, or notes.
- Use the 'moderncv' documentclass.
- Use style 'banking' (which is highly professional and space-efficient).
- Use color 'blue'.
- Layout MUST fit on exactly one page. Keep vertical margins, spacing, and font sizes compact (e.g., scale coefficients, small spaces, concise list environments).
- Escape all LaTeX special characters (like &, _, %, $, etc.) in bullet points and titles to ensure it compiles instantly without modification in Overleaf.
- Include sections: Summary, Experience, Projects, Skills, Education, Certifications.
- Format contacts using moderncv standard macros: \\email, \\phone, \\social[linkedin], \\social[github], \\homepage, etc.
- Include hyperlinks for LinkedIn, GitHub, and Portfolio fields.
- Make it visually stunning with appropriate horizontal lines and spacing.

The final LaTeX output must compile successfully in Overleaf out-of-the-box.`;

  const userPrompt = `Here is the optimized structured JSON resume:
${JSON.stringify(resumeJson, null, 2)}

Convert it into a beautiful, ready-to-compile moderncv LaTeX document in the 'banking' style with 'blue' theme color.`;

  const rawLatex = await callOpenRouterAPI(systemPrompt, userPrompt, apiKey);
  
  // Clean markdown blocks if any exist
  let cleanLatex = rawLatex.trim();
  if (cleanLatex.startsWith('```')) {
    cleanLatex = cleanLatex.replace(/^```(latex)?\n/, '').replace(/\n```$/, '');
  }
  
  return cleanLatex.trim();
}

/**
 * Step 0: Dynamic resume parser. Takes raw unstructured text from PDF/DOCX and builds structured JSON matching our Form state schema.
 */
export async function parseRawResumeToSchema(rawText, apiKey) {
  const systemPrompt = `You are an expert executive resume writer and resume parser.
Parse raw unstructured resume text and output a highly optimized, complete resume in STRICT VALID JSON matching the required schema.

Requirements:
- Return ONLY valid JSON
- No markdown formatting, explanations, or opening/closing remarks
- Do NOT wrap in markdown code blocks or code fences
- Extract, optimize, and map details into our exact schema
- Keep experience bullets concise and formatted as arrays

Schema format to output:
{
  "targetRole": {
    "position": "Target Job Title if inferred or found",
    "industry": "Industry if inferred",
    "seniority": "Seniority Level (Junior, Mid, Senior, Staff/Lead, Executive) if inferred"
  },
  "personal": {
    "name": "Candidate Name",
    "email": "email@example.com",
    "phone": "123-456-7890",
    "location": "City, State",
    "linkedin": "linkedin.com/in/username",
    "github": "github.com/username",
    "portfolio": "portfolio.com",
    "summary": "Short 2-3 sentence executive professional summary"
  },
  "experience": [
    {
      "company": "Company Name",
      "role": "Job Title",
      "duration": "Duration (e.g. Month Year - Month Year)",
      "bullets": [
        "Achievement bullet 1",
        "Achievement bullet 2"
      ]
    }
  ],
  "education": [
    {
      "school": "University Name",
      "degree": "Degree Title",
      "gpa": "GPA if found",
      "gradDate": "Graduation Date"
    }
  ],
  "skills": {
    "languages": "Comma-separated programming languages",
    "frameworks": "Comma-separated frameworks/libraries",
    "tools": "Comma-separated tools/DevOps tech",
    "databases": "Comma-separated databases/storage engines"
  },
  "projects": [
    {
      "name": "Project Name",
      "stack": "Comma-separated tech stack",
      "description": "Short project description",
      "impact": "Measurable project metric or impact"
    }
  ],
  "certifications": [
    {
      "name": "Certification Name",
      "issuer": "Issuing Authority",
      "year": "Year"
    }
  ]
}`;

  const userPrompt = `Here is the raw extracted resume text:
--------------------
${rawText}
--------------------

Parse and organize this text into the requested structured JSON form state format. Ensure to output ONLY valid JSON.`;

  const rawJsonText = await callOpenRouterAPI(systemPrompt, userPrompt, apiKey);
  
  let cleanJsonText = rawJsonText.trim();
  if (cleanJsonText.startsWith('```')) {
    cleanJsonText = cleanJsonText.replace(/^```(json)?\n/, '').replace(/\n```$/, '');
  }
  cleanJsonText = cleanJsonText.trim();

  try {
    return JSON.parse(cleanJsonText);
  } catch (error) {
    console.error('Failed to parse raw resume parser output as JSON. Raw output was:', rawJsonText);
    throw new Error('The AI parser generated an invalid JSON structure. Please retry or adjust input.');
  }
}
