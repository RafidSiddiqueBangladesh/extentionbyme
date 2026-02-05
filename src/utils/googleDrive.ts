// Handle both local and Google Drive image URLs
export const getGoogleDriveImageUrl = (imageUrl: string): string => {
  // If it's a local path, return as is
  if (imageUrl.startsWith("/")) {
    return imageUrl;
  }
  
  // If it's a Google Drive URL, convert to thumbnail
  const fileIdMatch = imageUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (fileIdMatch && fileIdMatch[1]) {
    const fileId = fileIdMatch[1];
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`;
  }
  
  return imageUrl;
};
