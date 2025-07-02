'use server';

import { returnCurrentUser, verifyPassword } from '@/lib/login/manage-login';
import { findUserByName } from '@/lib/users/queries/admin';
import { userRepository } from '@/repositories/user';
import { toast } from 'react-toastify';

type ChangeUserPasswordActionState = {
  success: string;
  error: string;
};

export async function ChangeUserPasswordAction(
  state: ChangeUserPasswordActionState,
  formData: FormData,
) {
  const result = await returnCurrentUser().catch(() => undefined);
  if (!result) {
    throw toast.error('Faça login novamente');
  }

  const userData = await findUserByName(result.username);

  if (!userData) {
    return {
      success: '',
      error: 'Usuário não encontrado na base de dados',
    };
  }

  const password = formData.get('password')?.toString().trim() || '';
  const newPassword = formData.get('newPassword')?.toString().trim() || '';
  const confirmPassword =
    formData.get('newPasswordCheck')?.toString().trim() || '';

  const isPasswordValid = await verifyPassword(
    password,
    userData.password || '',
  );

  const isPasswordSame = newPassword === confirmPassword;

  if (!isPasswordValid) {
    return {
      success: '',
      error: 'Senha atual inválida.',
    };
  }

  if (!isPasswordSame) {
    return {
      success: '',
      error: 'O campo nova senha e o campo confirmação devem ser iguais',
    };
  }

  try {
    await userRepository.update(userData.name, newPassword);
  } catch (e) {
    if (e instanceof Error) {
      return {
        success: '',
        error: e.message,
      };
    }
    return {
      success: '',
      error: 'Erro desconhecido',
    };
  }

  return {
    success: 'Usuário atualizado com sucesso',
    error: '',
  };
}
