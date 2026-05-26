/**
 * Overleaf Open-in API client-side integration.
 * Creates an on-the-fly hidden HTML form and submits it to Overleaf via POST.
 */
export function openInOverleaf(latex, candidateName) {
  if (!latex) {
    console.error('Cannot open Overleaf: LaTeX content is empty.');
    return false;
  }

  try {
    const documentName = `${candidateName || 'Candidate'}_Resume`;
    
    // Create form element
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://www.overleaf.com/docs';
    form.target = '_blank';
    form.style.display = 'none';

    // Add snip field (LaTeX content)
    const snipInput = document.createElement('input');
    snipInput.type = 'hidden';
    snipInput.name = 'snip';
    snipInput.value = latex;
    form.appendChild(snipInput);

    // Add snip_name field (Project title)
    const nameInput = document.createElement('input');
    nameInput.type = 'hidden';
    nameInput.name = 'snip_name';
    nameInput.value = documentName;
    form.appendChild(nameInput);

    // Append to document, submit, and clean up
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
    
    return true;
  } catch (error) {
    console.error('Failed to open project in Overleaf:', error);
    return false;
  }
}
