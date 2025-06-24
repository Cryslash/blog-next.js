import ManagePostFormWrapper from '@/components/admin/ManagePostFormWrapper';
import { makePublicPostFromDb } from '@/dto/post/dto';
import { returnCurrentUser } from '@/lib/login/manage-login';
import { findPostByIdAdmin } from '@/lib/posts/queries/admin';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { toast } from 'react-toastify';

export const dynamic = 'force-dynamic';

type AdminPostIdPageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: 'Editar Post',
};

export default async function AdminPostIdPage({
  params,
}: AdminPostIdPageProps) {
  const { id } = await params;
  const post = await findPostByIdAdmin(id).catch(() => undefined);

  if (!post) notFound();

  const publicPost = makePublicPostFromDb(post);

  //Checar se o usuário tem autorização para editar o post
  const result = await returnCurrentUser().catch(() => undefined);

  if (!result) {
    throw toast.error('faça login novamente');
  }

  const { username, usertype } = result;

  const isAdmin = usertype === 'admin';
  const isAuthor = username === post.author;

  const isAuthorized = isAdmin || isAuthor;

  if (!isAuthorized) {
    redirect('/admin/post');
  }

  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-xl font-extrabold'>Editar post</h1>
      <ManagePostFormWrapper mode='update' publicPost={publicPost} />
    </div>
  );
}
