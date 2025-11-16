// Utility function to upload files directly to backend
export const uploadFileToBackend = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);
  
  console.log('🔥 UPLOADING TO BACKEND:', file.name);
  
  const response = await fetch('http://localhost:3000/api/upload/single', {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error(`Upload failed: ${response.status}`);
  }
  
  const result = await response.json();
  console.log('🔥 BACKEND RESPONSE:', result);
  
  if (!result.success) {
    throw new Error(result.error || 'Upload failed');
  }
  
  return result.data.url; // Return relative path
};

export const uploadBlobToBackend = async (blobUrl: string, filename: string): Promise<string> => {
  const blob = await fetch(blobUrl).then(r => r.blob());
  const file = new File([blob], filename, { type: 'image/jpeg' });
  return uploadFileToBackend(file);
};