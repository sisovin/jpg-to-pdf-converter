import React, { useState } from 'react';
import axios from 'axios';
import FilePreview from './components/FilePreview';
import UploadZone from './components/UploadZone';

const JpgToPdf: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);

  const handleFileDelete = (fileToDelete: File) => {
    setFiles(files.filter(file => file !== fileToDelete));
  };

  const handleFilesAdded = (newFiles: File[]) => {
    setFiles([...files, ...newFiles]);
  };

  const handleConvert = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });

      const response = await axios.post('/api/convert/jpg-to-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setDownloadLink(response.data.outputPath);
    } catch (error) {
      console.error('Error converting files:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="jpg-to-pdf">
      <h1>JPG to PDF Converter</h1>
      <UploadZone onFilesAdded={handleFilesAdded} />
      <div className="file-previews">
        {files.map(file => (
          <FilePreview key={file.name} file={file} onDelete={handleFileDelete} />
        ))}
      </div>
      <button onClick={handleConvert} disabled={isLoading || files.length === 0}>
        {isLoading ? 'Converting...' : 'Convert to PDF'}
      </button>
      {downloadLink && (
        <div className="download-link">
          <a href={downloadLink} download>
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default JpgToPdf;
