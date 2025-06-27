import { findAllByAuthor, findAllPostsAdmin } from '@/lib/posts/queries/admin';
import clsx from 'clsx';
import Link from 'next/link';
import { DeletePostButton } from '../DeletePostButton';
import ErrorMessage from '../../ErrorMessage';
import { returnCurrentUser } from '@/lib/login/manage-login';
import { toast } from 'react-toastify';

export default async function PostsListAdmin() {
  const result = await returnCurrentUser().catch(() => undefined);

  if (!result) {
    throw toast.error('Faça login novamente.');
  }

  const { username, usertype } = result;

  const posts =
    usertype === 'admin'
      ? await findAllPostsAdmin()
      : await findAllByAuthor(username);

  if (posts.length <= 0) {
    return <ErrorMessage contentTitle='Ei' content='Bora criar algum post?' />;
  }

  return (
    <div className='mb-16'>
      {posts.map(post => {
        return (
          <div
            className={clsx(
              'py-2 px-2',
              !post.published && 'bg-slate-300',
              'flex gap-2 items-center justify-between',
            )}
            key={post.id}
          >
            <Link href={`/admin/post/${post.id}`}>{post.title}</Link>

            {!post.published && (
              <span className='text-xs text-slate-600 italic'>
                (Não publicado)
              </span>
            )}

            <DeletePostButton title={post.title} id={post.id} />
          </div>
        );
      })}
    </div>
  );
}
