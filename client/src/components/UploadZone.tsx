import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const UploadZone: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
    setUploadProgress(prevProgress => [
      ...prevProgress,
      ...acceptedFiles.map(() => 0)
    ]);
  }, []);

  const handleUpload = (file: File, index: number) => {
    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        setUploadProgress(prevProgress => {
          const newProgress = [...prevProgress];
          newProgress[index] = progress;
          return newProgress;
        });
      }
    };

    xhr.open('POST', '/upload');
    xhr.send(file);
  };

  return (
    <div className="upload-zone">
      <div {...useDropzone({ onDrop })}>
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <div className="file-list">
        {files.map((file, index) => (
          <div key={file.name} className="file-item">
            <span>{file.name}</span>
            <progress value={uploadProgress[index]} max="100" />
            <button onClick={() => handleUpload(file, index)}>Upload</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadZone;
