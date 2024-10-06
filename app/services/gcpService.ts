import { FileItem, FolderItem, IMAGE_EXTENSIONS, DOWNLOADABLE_EXTENSIONS } from '../types/bucket';

export const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL || '';

if (!BUCKET_URL) {
  console.warn('NEXT_PUBLIC_BUCKET_URL is not defined in environment variables');
}

export const getFileType = (fileName: string): 'image' | 'file' => {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  return IMAGE_EXTENSIONS.includes(extension) ? 'image' : 'file';
};

export const getFileExtension = (fileName: string): string => {
  return fileName.split('.').pop()?.toLowerCase() || '';
};

export const fetchFolderContents = async (prefix: string): Promise<string> => {
  const response = await fetch(`${BUCKET_URL}?delimiter=/&prefix=${encodeURIComponent(prefix)}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch bucket contents: ${response.statusText}`);
  }
  return response.text();
};

export const parseBucketXML = (xmlData: string, currentPath: string): FolderItem => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlData, 'application/xml');
  
  // Parse folders (CommonPrefixes)
  const folders = Array.from(xml.getElementsByTagName('CommonPrefixes'))
    .map(prefixElement => {
      const prefix = prefixElement.getElementsByTagName('Prefix')[0]?.textContent || '';
      const folderName = prefix.split('/').filter(Boolean).pop() || '';
      return {
        name: folderName,
        path: prefix,
        files: [],
        subfolders: []
      };
    });
  
  // Parse files (Contents)
  const files = Array.from(xml.getElementsByTagName('Contents'))
    .map(content => {
      const key = content.getElementsByTagName('Key')[0]?.textContent || '';
      if (!key.endsWith('/')) {
        const name = key.split('/').pop() || '';
        const extension = getFileExtension(name);
        if (DOWNLOADABLE_EXTENSIONS.includes(extension)) {
          return {
            name,
            url: `${BUCKET_URL}/${key}`,
            type: getFileType(name),
            extension
          };
        }
      }
      return null;
    })
    .filter((file): file is FileItem => file !== null);

  return {
    name: currentPath.split('/').pop() || 'root',
    path: currentPath,
    files,
    subfolders: folders
  };
};