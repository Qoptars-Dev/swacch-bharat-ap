'use client';

import React, { useState } from 'react';
import { FileItem } from '@/app/types/bucket';
import { useBucketNavigation } from '@/app/hooks/useBucketNavigation';
import { useBucketContents } from '@/app/hooks/useBucketContents';
import FileCard from './FileCard';
import FolderCard from './FolderCard';
import Lightbox from './Lightbox';

const BucketViewer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const { currentPath, navigateToFolder, navigateToPath, getCurrentPrefix } = useBucketNavigation();
  const { rootFolder, loading, error, isBucketAccessible, refreshContents } = useBucketContents(getCurrentPrefix());

  if (!isBucketAccessible) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <h1 className="font-bold">Bucket Access Issue</h1>
          <p>Unable to access the bucket due to CORS restrictions. Please ensure that CORS is properly configured for the bucket.</p>
          <div className="mt-4">
            <h2 className="font-semibold">Recommended Solutions:</h2>
            <ol className="list-decimal ml-5 mt-2">
              <li>Configure CORS settings for your bucket</li>
              <li>Use a backend proxy to fetch bucket contents</li>
              <li>Make sure the bucket is public and properly configured</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <h1 className="font-bold">Error</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">File Explorer</h1>
        <button 
          onClick={refreshContents}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div className="flex flex-wrap items-center space-x-2 mb-6 text-sm text-gray-600">
        <span 
          className="cursor-pointer hover:text-blue-500"
          onClick={() => navigateToPath(0)}
        >
          Home
        </span>
        {currentPath.map((path, index) => (
          <React.Fragment key={path}>
            <span>/</span>
            <span 
              className="cursor-pointer hover:text-blue-500"
              onClick={() => navigateToPath(index + 1)}
            >
              {path}
            </span>
          </React.Fragment>
        ))}
      </div>

      {loading && currentPath.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Subfolders */}
          {rootFolder && rootFolder.subfolders.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Folders</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rootFolder.subfolders.map(folder => (
                  <FolderCard
                    key={folder.path}
                    folder={folder}
                    onClick={() => navigateToFolder(folder.name)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Files */}
          {rootFolder && rootFolder.files.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Files</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rootFolder.files.map(file => (
                  <FileCard 
                    key={file.url} 
                    file={file} 
                    onImageClick={() => setSelectedFile(file)}
                  />
                ))}
              </div>
            </div>
          )}

          {rootFolder && !rootFolder.subfolders.length && !rootFolder.files.length && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">This folder is empty.</p>
            </div>
          )}
        </>
      )}

      {/* Lightbox */}
      {selectedFile && (
        <Lightbox 
          imageUrl={selectedFile.url}
          fileName={selectedFile.name}
          onClose={() => setSelectedFile(null)}
        />
      )}

      {/* Footer with note about predictions */}
      <p className="text-xs text-gray-500 mt-8">
        * File previews and predictions are currently in beta and may not always be accurate. 
        We are continuously working to improve their reliability.
      </p>
    </div>
  );
};

export default BucketViewer;