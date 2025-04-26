/**
 * Utility functions for file operations
 */

/**
 * Format file size to a human-readable string
 * @param size - File size in bytes
 * @returns Formatted file size string
 */
export function formatFileSize(size: number): string {
  if (size < 1024) {
    return `${size} B`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  } else if (size < 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  } else {
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }
}

/**
 * Get file extension from file name
 * @param fileName - File name
 * @returns File extension
 */
export function getFileExtension(fileName: string): string {
  return fileName.split('.').pop() || '';
}

/**
 * Check if file is an image
 * @param fileName - File name
 * @returns True if file is an image, false otherwise
 */
export function isImageFile(fileName: string): boolean {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  const fileExtension = getFileExtension(fileName).toLowerCase();
  return imageExtensions.includes(fileExtension);
}
