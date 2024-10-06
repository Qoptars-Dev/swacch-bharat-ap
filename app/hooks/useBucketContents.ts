import { useState, useCallback, useEffect } from 'react';
import { FolderItem } from '../types/bucket';
import { fetchFolderContents, parseBucketXML } from '../services/gcpService';

export const useBucketContents = (currentPrefix: string) => {
  const [rootFolder, setRootFolder] = useState<FolderItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isBucketAccessible, setIsBucketAccessible] = useState<boolean>(true);

  const fetchAndUpdateBucket = useCallback(async () => {
    try {
      setLoading(true);
      const xmlData = await fetchFolderContents(currentPrefix);
      const folderStructure = parseBucketXML(xmlData, currentPrefix);
      setRootFolder(folderStructure);
      setError(null);
    } catch (error) {
      console.error('Error fetching bucket contents:', error);
      setError(`Failed to load bucket contents: ${error}`);
      setIsBucketAccessible(false);
    //   if (error.toString().includes('CORS')) {
    //     setIsBucketAccessible(false);
    //   }
    } finally {
      setLoading(false);
    }
  }, [currentPrefix]);

  useEffect(() => {
    fetchAndUpdateBucket();
  }, [fetchAndUpdateBucket]);

  return {
    rootFolder,
    loading,
    error,
    isBucketAccessible,
    refreshContents: fetchAndUpdateBucket
  };
};