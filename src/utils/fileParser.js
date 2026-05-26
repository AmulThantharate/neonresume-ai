/**
 * Client-side file parser utility to extract raw text from PDF and DOCX files.
 * Loads PDF.js and Mammoth.js from secure CDNs dynamically to keep build bundles light.
 */

// CDN links
const PDFJS_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js';
const PDFJS_WORKER_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
const MAMMOTH_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js';

/**
 * Dynamically loads CDN scripts if not already present on the window object
 */
function loadScript(src, id) {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.id = id;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}

/**
 * Ensures PDF.js and Mammoth are loaded on the client side
 */
export async function loadParserLibraries() {
  try {
    // Load Mammoth for docx files
    await loadScript(MAMMOTH_CDN, 'mammoth-parser-script');
    
    // Load PDFJS for pdf files
    await loadScript(PDFJS_CDN, 'pdfjs-parser-script');
    
    // Setup PDF.js worker
    if (window.pdfjsLib) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_CDN;
    }
  } catch (error) {
    console.error('Error loading text extractor libraries:', error);
    throw new Error('Failed to load file-parsing engines from CDN. Please check your network connection.');
  }
}

/**
 * Extracts raw text from an ArrayBuffer containing PDF data
 */
async function extractTextFromPdf(arrayBuffer) {
  if (!window.pdfjsLib) {
    throw new Error('PDF.js library is not loaded.');
  }

  const loadingTask = window.pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
  const pdf = await loadingTask.promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    fullText += pageText + '\n';
  }

  return fullText;
}

/**
 * Extracts raw text from an ArrayBuffer containing DOCX data
 */
async function extractTextFromDocx(arrayBuffer) {
  if (!window.mammoth) {
    throw new Error('Mammoth.js library is not loaded.');
  }

  const result = await window.mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

/**
 * Reads a File object and extracts text depending on its extension
 * @param {File} file 
 * @returns {Promise<string>} Raw text content
 */
export async function extractTextFromFile(file) {
  await loadParserLibraries();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target.result;
        let text = '';

        if (file.name.endsWith('.pdf')) {
          text = await extractTextFromPdf(arrayBuffer);
        } else if (file.name.endsWith('.docx')) {
          text = await extractTextFromDocx(arrayBuffer);
        } else if (file.name.endsWith('.txt')) {
          const decoder = new TextDecoder('utf-8');
          text = decoder.decode(new Uint8Array(arrayBuffer));
        } else {
          throw new Error('Unsupported file format. Please upload a .pdf, .docx, or .txt file.');
        }

        resolve(text);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file buffer.'));
    };

    reader.readAsArrayBuffer(file);
  });
}
