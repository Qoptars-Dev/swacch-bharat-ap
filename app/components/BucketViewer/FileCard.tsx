import React from 'react';
import { FileItem } from '../../types/bucket';
import FileIcon from './FileIcon';
import LazyImage from '../LazyImage';

interface FileCardProps {
  file: FileItem;
  onImageClick: (file: FileItem) => void;
}

// eslint-disable-next-line react/display-name
export const FileCard: React.FC<FileCardProps> = React.memo(({ file, onImageClick }) => {
  const handleImageClick = () => onImageClick(file);

  return (
    <div className="relative group">
      {file.type === 'image' ? (
        <div className="aspect-square cursor-pointer" onClick={handleImageClick}>
          <LazyImage src={file.url} alt={file.name} className="rounded" />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white">Click to view</span>
          </div>
        </div>
      ) : (
        <div className="aspect-square border rounded flex items-center justify-center bg-gray-50">
          <div className="text-center flex">
            <FileIcon extension={file.extension} />
            <p className="mt-2 text-sm">{file.name}</p>
            <a
              href={file.url}
              download={file.name}
              className="absolute bottom-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              Download
            </a>
          </div>
        </div>
      )}
    </div>
  );
});

export default FileCard;