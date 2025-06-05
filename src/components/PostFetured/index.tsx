import { PostCoverImage } from '../PostCoverImage';
import { PostHeading } from '../PostHeading';

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
      <div className='flex flex-col gap-4 sm:justify-center'>
        <time className='text-slate-600 text-sm' dateTime='2025-06-05'>
          05/06/2025 13:53
        </time>
        <PostHeading as='h1' url={postLink}>
          Lorem ipsum dolor sit amet.
        </PostHeading>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil
          quibusdam totam iusto, asperiores saepe eveniet laboriosam
          exercitationem, officiis sint blanditiis in nostrum laudantium
          voluptatum quia placeat dignissimos commodi, error sed.
        </p>
      </div>
    </section>
  );
}
