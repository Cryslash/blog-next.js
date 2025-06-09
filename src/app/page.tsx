import { PostFetured } from '@/components/PostFetured';
import { PostsList } from '@/components/PostsList';
import { SpinLoader } from '@/components/SpinLoader';
import React, { Suspense } from 'react';

export const dynamic = 'force-static';

export default async function HomePage() {
  return (
    <>
      <Suspense fallback={<SpinLoader className='min-h-20 mb-16' />}>
        <PostFetured />

        <PostsList />
      </Suspense>
    </>
  );
}
