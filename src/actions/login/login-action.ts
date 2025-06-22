'use server';

import { createLoginSession, verifyPassword } from '@/lib/login/manage-login';
import { AsyncDelay } from '@/utils/async-delay';
import { verify } from 'crypto';
import { redirect } from 'next/navigation';

type LoginActionState = {
  username: string;
  error: string;
};

export async function loginAction(state: LoginActionState, formData: FormData) {
  await AsyncDelay(5000); //vou manter

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
  //checa se o usuário existe na base de dados
  const isUsernameValid = username === process.env.LOGIN_USER;
  const isPasswordValid = await verifyPassword(
    password,
    process.env.LOGIN_PASS || '',
  );

  if (!isUsernameValid && !isPasswordValid) {
    return {
      username: '',
      error: 'Usuário ou senha inválidos',
    };
  }

  await createLoginSession(username);
  redirect('/admin/post');
}
