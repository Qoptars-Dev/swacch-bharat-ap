import React from 'react';
import BucketViewer from '@/app/components/BucketViewer';

export const metadata = {
  title: 'Bucket Viewer',
  description: 'Browse and manage files in your Google Cloud Storage bucket',
};

export default function BucketPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <BucketViewer />
    </main>
  );
}