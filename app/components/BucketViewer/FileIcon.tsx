import React from 'react';
import { IMAGE_EXTENSIONS } from '../../types/bucket';

interface FileIconProps {
  extension: string;
}

const iconMap: { [key: string]: string } = {
  pdf: '📄',
  csv: '📊',
  xlsx: '📊',
  docx: '📝',
  txt: '📄',
  image: '🖼️',
};

// eslint-disable-next-line react/display-name
export const FileIcon: React.FC<FileIconProps> = React.memo(({ extension }) => {
  return <span>{iconMap[IMAGE_EXTENSIONS.includes(extension) ? 'image' : extension] || '📄'}</span>;
});

export default FileIcon;