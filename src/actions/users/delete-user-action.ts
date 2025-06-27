'use server';

import { returnCurrentUser } from '@/lib/login/manage-login';
import { findUserById } from '@/lib/users/queries/admin';
import { userRepository } from '@/repositories/user';
import { revalidateTag } from 'next/cache';

export async function deleteUserAction(id?: number) {
  const result = await returnCurrentUser().catch(() => undefined);
  if (!result) {
    return {
      error: 'Faça login novamente',
    };
  }

  if (!id) {
    return {
      error: 'Usuário inválido',
    };
  }

  const user = await findUserById(id);
  if (!user) {
    return {
      error: 'Usuário não existe na base de dados',
    };
  }

  try {
    await userRepository.delete(id);
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

  revalidateTag('users');

  return {
    error: '',
  };
}
