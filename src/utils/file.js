/**
 * Triggers a file download in the browser.
 * @param {string} content - The file content
 * @param {string} fileName - The name of the file to save
 * @param {string} contentType - The MIME type (e.g., 'text/markdown' or 'application/json')
 */
export const downloadFile = (content, fileName, contentType) => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = fileName;
  
  // Append to body, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Cleanup
  setTimeout(() => URL.revokeObjectURL(url), 100);
};

/**
 * Opens a file picker and reads the selected file as text.
 * @param {string} accept - File types to accept (e.g., '.json')
 * @returns {Promise<string>}
 */
export const pickAndReadFile = (accept) => {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) {
        reject(new Error('No file selected'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      reader.readAsText(file);
    };

    input.click();
  });
};
