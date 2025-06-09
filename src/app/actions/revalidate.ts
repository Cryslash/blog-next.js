'use server';

import { revalidateTag } from 'next/cache';

export async function revalidateAction(formData: FormData) {
  const path = formData.get('path') || '';
  console.log('server action ', path);

  revalidateTag('posts'); //home
  revalidateTag('posts-rotina-matinal-de-pessoas-altamente-eficazes'); //single
}
