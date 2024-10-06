import Image from 'next/image';
import React, { useEffect } from 'react';

interface LightboxProps {
  imageUrl: string;
  fileName: string;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ imageUrl, fileName, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="relative max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image 
          src={imageUrl} 
          alt={fileName}
          className="max-h-[90vh] max-w-[90vw] object-contain"
        />
        <div className="absolute top-0 right-0 flex gap-2 m-4">
          <a
            href={imageUrl}
            download={fileName}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Download
          </a>
          <button 
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;