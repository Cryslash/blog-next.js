'use server';

import { drizzleDb } from '@/db/drizzle';
import { usersTable } from '@/db/drizzle/schemas';
import { hashPassword, returnCurrentUser } from '@/lib/login/manage-login';
import { findUserById } from '@/lib/users/queries/admin';
import { UserModel } from '@/models/user/user-model';
import { eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';

export async function ChangeUserPasswordAdminAction(
  newPassword: string,
  isAdmin: boolean,
  id?: number,
) {
  if (!id) {
    return { error: 'Usuário inválido' };
  }

  const result = await returnCurrentUser().catch(() => undefined);
  if (!result) {
    return {
      error: 'Faça login novamente',
    };
  }

  if (result.usertype != 'admin') {
    return {
      error: 'Você não tem autorização para realizar a ação',
    };
  }

  const user = await findUserById(id);
  if (!user) {
    return {
      error: 'Usuário não encontrado na base de dados',
    };
  }
  type userTypeProps = 'admin' | 'author';

  const userType: userTypeProps = isAdmin ? 'admin' : 'author';
  let newUserData: UserModel = { ...user, userType };

  if (newPassword.length < 5) {
    return {
      error: 'A senha deve ter no mínimo 6 caracteres',
    };
  }

  if (newPassword != '') {
    const hash64Password = await hashPassword(newPassword);
    newUserData = { ...newUserData, password: hash64Password };
  }

  try {
    await drizzleDb
      .update(usersTable)
      .set(newUserData)
      .where(eq(usersTable.id, id));
  } catch (e) {
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

  return { error: '' };
}
