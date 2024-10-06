import React from 'react';
import { FolderItem } from '../../types/bucket';

interface FolderCardProps {
  folder: FolderItem;
  onClick: () => void;
}

// eslint-disable-next-line react/display-name
export const FolderCard: React.FC<FolderCardProps> = React.memo(({ folder, onClick }) => (
  <button
    onClick={onClick}
    className="p-4 border rounded hover:bg-gray-50 transition-colors text-left"
  >
    <div className="flex items-center">
      <span className="mr-2">📁</span>
      <div>
        <h3 className="font-medium">{folder.name}</h3>
        {/* <p className="text-sm text-gray-500">
          {folder.files.length} files, {folder.subfolders.length} folders
        </p> */}
      </div>
    </div>
  </button>
));

export default FolderCard;