// Frontend utility for rounded image API
export interface RoundedImageResponse {
  success: boolean;
  data: {
    original: {
      url: string;
      filename: string;
    };
    rounded: {
      url: string;
      filename: string;
    };
    sizes: {
      thumbnail: string;
      small: string;
      medium: string;
      large: string;
    };
    originalName: string;
    fileSize: number;
  };
}

export const uploadRoundedImage = async (file: File): Promise<RoundedImageResponse> => {
  const formData = new FormData();
  formData.append('image', file);
  
  console.log('🔄 UPLOADING FOR ROUNDED PROCESSING:', file.name);
  
  const response = await fetch('http://localhost:3000/api/upload/rounded', {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error(`Upload failed: ${response.status}`);
  }
  
  const result = await response.json();
  console.log('✅ ROUNDED IMAGE PROCESSED:', result);
  
  if (!result.success) {
    throw new Error(result.error || 'Processing failed');
  }
  
  return result;
};

export const getRoundedImageInfo = async (filename: string) => {
  const response = await fetch(`http://localhost:3000/api/images/rounded/${filename}`);
  
  if (!response.ok) {
    throw new Error(`Failed to get image info: ${response.status}`);
  }
  
  const result = await response.json();
  return result;
};