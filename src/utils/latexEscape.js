/**
 * Utility to escape LaTeX special characters to ensure error-free compilation in Overleaf.
 * Special characters in LaTeX: & % $ # _ { } ~ ^ \
 */
export function escapeLatexString(str) {
  if (!str) return '';
  if (typeof str !== 'string') return String(str);

  // 1. Escape backslash first so we don't double-escape it later
  let result = str.replace(/\\/g, '\\textbackslash{}');

  // 2. Escape standard characters that have special meaning in LaTeX
  const escapes = {
    '&': '\\&',
    '%': '\\%',
    '$': '\\$',
    '#': '\\#',
    '_': '\\_',
    '{': '\\{',
    '}': '\\}',
    '~': '\\textasciitilde{}',
    '^': '\\textasciicircum{}'
  };

  result = result.replace(/[&%$#_{}~^]/g, (match) => escapes[match]);

  return result;
}

/**
 * Recursively scans a resume object and escapes all string fields for LaTeX compatibility.
 */
export function escapeResumeData(data) {
  if (!data) return data;
  
  if (typeof data === 'string') {
    return escapeLatexString(data);
  }
  
  if (Array.isArray(data)) {
    return data.map(item => escapeResumeData(item));
  }
  
  if (typeof data === 'object') {
    const escapedObj = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        // Skip link fields that should keep their raw URLs (like LinkedIn, GitHub, Website)
        const isUrlField = ['linkedin', 'github', 'portfolio', 'email'].includes(key.toLowerCase());
        if (isUrlField && typeof data[key] === 'string') {
          escapedObj[key] = data[key];
        } else {
          escapedObj[key] = escapeResumeData(data[key]);
        }
      }
    }
    return escapedObj;
  }
  
  return data;
}
