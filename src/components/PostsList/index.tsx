import { PostCoverImage } from '../PostCoverImage';
import { PostSummary } from '../PostSummary';
import { findAllPublicPostsCached } from '@/lib/posts/queries/public';

export async function PostsList() {
  // await new Promise(r => setTimeout(r, 5000));
  const posts = await findAllPublicPostsCached();

  if (posts.length <= 0) return null;

  return (
    <div className='grid grid-cols-1 mb-16 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
      {posts.slice(1).map(post => {
        const postLink = `/post/${post.slug}`;
        return (
          <div className='flex flex-col gap-4 group' key={post.id}>
            <PostCoverImage
              linkProps={{
                href: postLink,
              }}
              imageProps={{
                width: 1200,
                height: 720,
                src: post.coverImageUrl,
                alt: post.title,
              }}
            />

            <PostSummary
              postHeading='h2'
              postLink={postLink}
              title={post.title}
              createdAt={post.createdAt}
              excerpt={post.excerpt}
            />
          </div>
        );
      })}
    </div>
  );
}
