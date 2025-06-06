import { PostCoverImage } from '../PostCoverImage';
import { PostHeading } from '../PostHeading';
import { PostSummary } from '../PostSummary';

export function PostFetured() {
  const slug = 'adsasd';
  const postLink = `/post/${slug}`;

  return (
    <section className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group'>
      <PostCoverImage
        linkProps={{
          href: postLink,
        }}
        imageProps={{
          width: 1200,
          height: 720,
          src: '/images/bryen_9.png',
          alt: 'Alt da imagem',
          priority: true,
        }}
      />
      <PostSummary
        postHeading='h2'
        postLink={postLink}
        title={'Dicas para manter a saúde mental em dia'}
        createdAt={'2025-04-07T00:24:38.616Z'}
        excerpt={
          'Em vez de configurar tudo manualmente, basta criar um arquivo com o nome certo e o Next.js entende que aquilo representa uma página.'
        }
      />
    </section>
  );
}
