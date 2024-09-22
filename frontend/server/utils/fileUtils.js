import fileType from 'file-type';

// Function to check if a base64 string is valid
export const isValidBase64 = (base64String) => {
  const regex = /^[A-Za-z0-9+/=]+$/;
  return regex.test(base64String);
};

// Function to get file metadata (MIME type, size)
export const getFileMetadata = async (base64String) => {
  try {
    const buffer = Buffer.from(base64String, 'base64');
    const fileInfo = await fileType.fromBuffer(buffer); // Asynchronous call
    const size_kb = (buffer.length / 1024).toFixed(2); // Convert bytes to KB

    return {
      mime: fileInfo ? fileInfo.mime : 'unknown',
      size_kb
    };
  } catch (error) {
    console.error('Error getting file metadata:', error);
    return {
      mime: 'unknown',
      size_kb: '0.00'
    };
  }
};
