import { PublicPost } from '@/dto/post/dto';
import { returnCurrentUser } from '@/lib/login/manage-login';
import { ManagePostForm } from '../ManagePostForm';
import { toast } from 'react-toastify';

type Props = {
  mode: 'create' | 'update';
  publicPost?: PublicPost;
};

export default async function ManagePostFormWrapper({
  mode,
  publicPost,
}: Props) {
  const userReturned = await returnCurrentUser();

  if ('errors' in userReturned || 'error' in userReturned) {
    return toast.error('Erro ao obter usuário. Faça login novamente.');
  }

  if (mode === 'update' && publicPost) {
    return (
      <ManagePostForm
        mode='update'
        publicPost={publicPost}
        currentUser={userReturned.username}
      />
    );
  }

  if (mode === 'create') {
    return <ManagePostForm mode='create' currentUser={userReturned.username} />;
  }

  return <p>Erro: props inválidas</p>;
}
