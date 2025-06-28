'use server';

import { drizzleDb } from '@/db/drizzle';
import { usersTable } from '@/db/drizzle/schemas';
import { hashPassword, returnCurrentUser } from '@/lib/login/manage-login';
import { findUserById } from '@/lib/users/queries/admin';
import { eq } from 'drizzle-orm';

export async function ChangeUserPasswordAdminAction(
  newPassword: string,
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

  const { usertype } = result;
  if (usertype != 'admin') {
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

  const hash64Password = await hashPassword(newPassword);
  const newUserData = { password: hash64Password };

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

  return { error: '' };
}
