export interface FileItem {
    name: string;
    url: string;
    type: 'image' | 'file';
    extension: string;
  }
  
  export interface FolderItem {
    name: string;
    path: string;
    files: FileItem[];
    subfolders: FolderItem[];
  }
  
  export interface BucketViewerProps {
    bucketUrl: string;
    itemsPerPage?: number;
  }
  
  export type FileExtensionType = 'image' | 'file';
  
  export const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  export const DOWNLOADABLE_EXTENSIONS = [...IMAGE_EXTENSIONS, 'csv', 'pdf', 'xlsx', 'docx', 'txt'];