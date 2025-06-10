import { findAllPostsAdmin } from '@/lib/posts/queries/admin';

export default async function PostsListAdmin() {
  const posts = await findAllPostsAdmin();

  return (
    <div className='py-16'>
      {posts.map(post => {
        return <p key={post.id}>{post.title}</p>;
      })}
    </div>
  );
}
