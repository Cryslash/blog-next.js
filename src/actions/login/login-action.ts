'use server';

import { AsyncDelay } from '@/utils/async-delay';

type LoginActionState = {
  username: string;
  error: string;
};

export async function loginAction(state: LoginActionState, formData: FormData) {
  await AsyncDelay(5000); //vou manter

  return {
    username: '',
    error: 'Teste de erro',
  };
}
