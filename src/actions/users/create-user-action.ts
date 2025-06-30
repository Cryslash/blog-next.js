'use server';
import { findUserByName } from '@/lib/users/queries/admin';
import { userRepository } from '@/repositories/user';
import { revalidateTag } from 'next/cache';

type createUserActionProps = {
  userName: string;
  password: string;
  isAdmin: boolean;
};

export async function createUserAction({
  userName,
  password,
  isAdmin,
}: createUserActionProps) {
  const user = await findUserByName(userName);

  if (user) {
    return {
      error: 'Usuário já existe na base de dados',
    };
  }

  try {
    await userRepository.create(userName, password, isAdmin);
  } catch (e: unknown) {
    if (e instanceof Error)
      return {
        error: e.message,
      };
    return {
      error: 'Erro desconhecido',
    };
  }

  revalidateTag('users');

  return {
    error: '',
  };
}
