import React from 'react';

interface FilePreviewProps {
  file: File;
  onDelete: (file: File) => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, onDelete }) => {
  const handleDelete = () => {
    onDelete(file);
  };

  return (
    <div className="file-preview">
      <img src={URL.createObjectURL(file)} alt={file.name} className="thumbnail" />
      <button onClick={handleDelete} className="delete-button">Delete</button>
    </div>
  );
};

export default FilePreview;
