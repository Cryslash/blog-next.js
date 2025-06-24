'use server';

import { returnCurrentUser } from '@/lib/login/manage-login';
import { postRepository } from '@/repositories/post';
import { revalidateTag } from 'next/cache';

export async function deletePostAction(id: string) {
  const result = await returnCurrentUser().catch(() => undefined);

  if (!result) {
    return {
      error: 'Faça login novamente',
    };
  }

  const { username, usertype } = result;

  let post;
  try {
    post = await postRepository.delete(id, username, usertype);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        error: e.message,
      };
    }

    return {
      error: 'Erro desconhecido',
    };
  }

  revalidateTag('posts');
  revalidateTag(`post-${post.slug}`);

  return {
    error: '',
  };
}
