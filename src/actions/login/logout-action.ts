'use server';

import { deleteLoginSession } from '@/lib/login/manage-login';
import { AsyncDelay } from '@/utils/async-delay';
import { redirect } from 'next/navigation';

export async function LogoutAction() {
  await AsyncDelay(3000); //vou manter
  await deleteLoginSession();
  redirect('/admin/login');
}
