import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { PostFetured } from '@/components/PostFetured';
import { PostsList } from '@/components/PostsList';
import { SpinLoader } from '@/components/SpinLoader';
import React, { Suspense } from 'react';

export default async function HomePage() {
  return (
    <Container>
      <Header />

      <PostFetured />

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>

      <footer className='text-6xl font-bold text-center py-8'>Footer</footer>
    </Container>
  );
}
