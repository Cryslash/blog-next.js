'use server';

import { drizzleDb } from '@/db/drizzle';
import { postsTable } from '@/db/drizzle/schemas';
import { makePartialPublicPost, PublicPost } from '@/dto/post/dto';
import { PostCreateSchema } from '@/lib/posts/validation';
import { PostModel } from '@/models/post/post-model';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { MakeSlugFromText } from '@/utils/make-slug-from-text';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidV4 } from 'uuid';

type CreatePostActionState = {
  formState: PublicPost;
  errors: string[];
};

export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  // TODO: verificar se o usuário tá logado

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = PostCreateSchema.safeParse(formDataToObj);

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error.format());
    return {
      errors,
      formState: makePartialPublicPost(formDataToObj),
    };
  }

  const validPostData = zodParsedObj.data;
  const newPost: PostModel = {
    ...validPostData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: uuidV4(),
    slug: MakeSlugFromText(validPostData.title),
  };

  await drizzleDb.insert(postsTable).values(newPost);

  revalidatePath('posts');
  redirect(`/admin/post/${newPost.id}`);
}
