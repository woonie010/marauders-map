'use client';
import React, { useState } from 'react';
import { FileUpload } from '@/components/ui/file-upload';

const FileUploadComponent = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    uploadFile(files[0]); // Assuming single file upload
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    if (file.name.toLowerCase().endsWith('.json')) {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/upload/', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json(); // Assuming the API returns JSON
          console.log('File uploaded successfully:', data);
        } else {
          console.error('Error uploading file: ', response.statusText);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      setFiles([]);
      alert('Only JSON files are allowed.');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border bg-black border-customBlue_700 rounded-lg">
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
};

export default FileUploadComponent;
