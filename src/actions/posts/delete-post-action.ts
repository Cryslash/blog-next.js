'use server';

import { drizzleDb } from '@/db/drizzle';
import { postsTable } from '@/db/drizzle/schemas';
import { postRepository } from '@/repositories/post';
import { logColor } from '@/utils/log-color';
import { eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';

export async function deletePostAction(id: string) {
  logColor('' + id);

  if (!id || typeof id != 'string') {
    return { error: 'dados inválidos' };
  }

  const post = await postRepository.findById(id).catch(() => undefined);

  if (!post) {
    return {
      error: 'Post não existe',
    };
  }

  //TODO: mover esse método para o repositório
  await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));

  //TODO: revalidateTag ou revalidatePath
  revalidateTag('posts');
  revalidateTag(`post-${post.slug}`);

  return {
    error: '',
  };
}
