'use server';

import { createLoginSession, verifyPassword } from '@/lib/login/manage-login';
import { findUserByName } from '@/lib/users/queries/admin';
import { AsyncDelay } from '@/utils/async-delay';
import { redirect } from 'next/navigation';

type LoginActionState = {
  username: string;
  error: string;
};

export async function loginAction(state: LoginActionState, formData: FormData) {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));

  if (!allowLogin) {
    return {
      username: '',
      error: 'Login não permitido.',
    };
  }

  await AsyncDelay(3000); //vou manter

  if (!(formData instanceof FormData)) {
    return {
      username: '',
      error: 'Dados inválidos',
    };
  }

  //Dados que o usuário digitou no form
  const username = formData.get('username')?.toString().trim() || '';
  const password = formData.get('password')?.toString().trim() || '';

  if (!username || !password) {
    return {
      username,
      error: 'Digite o usuário e a senha',
    };
  }

  const dbUser = await findUserByName(username);
  if (!dbUser) {
    return {
      username,
      error: 'Usuário ou senha inválidos',
    };
  }

  const isUsernameValid = username === dbUser.name;
  const isPasswordValid = await verifyPassword(password, dbUser.password || '');

  if (!isUsernameValid || !isPasswordValid) {
    return {
      username,
      error: 'Usuário ou senha inválidos',
    };
  }

  await createLoginSession(username, dbUser.userType);
  redirect('/admin/post');
}
