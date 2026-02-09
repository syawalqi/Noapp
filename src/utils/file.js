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
