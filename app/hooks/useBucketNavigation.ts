import { useState, useCallback } from 'react';

export const useBucketNavigation = () => {
  const [currentPath, setCurrentPath] = useState<string[]>([]);

  const navigateToFolder = useCallback((folderName: string) => {
    setCurrentPath(prev => [...prev, folderName]);
  }, []);

  const navigateToPath = useCallback((index: number) => {
    setCurrentPath(prev => prev.slice(0, index));
  }, []);

  const getCurrentPrefix = useCallback(() => {
    return currentPath.length > 0 ? `${currentPath.join('/')}/` : '';
  }, [currentPath]);

  return {
    currentPath,
    navigateToFolder,
    navigateToPath,
    getCurrentPrefix
  };
};