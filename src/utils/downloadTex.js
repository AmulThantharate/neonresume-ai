/**
 * Utility to download generated LaTeX files client-side.
 * @param {string} latex - The full compilable LaTeX code string.
 * @param {string} candidateName - The name of the candidate to customize the filename.
 */
export function downloadTexFile(latex, candidateName) {
  if (!latex) return false;

  try {
    const formattedName = (candidateName || 'candidate')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-');
      
    const filename = `${formattedName}-resume.tex`;
    
    // Create blob with LaTeX content
    const blob = new Blob([latex], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    // Create temporary link and download
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('Failed to download .tex file:', error);
    return false;
  }
}
