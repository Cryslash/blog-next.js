'use client';

import { ChangeUserPasswordAction } from '@/actions/users/change-user-password-action';
import { Button } from '@/components/Button';
import { InputText } from '@/components/InputText';
import { SaveIcon } from 'lucide-react';
import { useActionState, useEffect } from 'react';
import { toast } from 'react-toastify';

export function ChangePasswordForm() {
  const initalState = {
    success: '',
    error: '',
  };

  const [state, action, isPending] = useActionState(
    ChangeUserPasswordAction,
    initalState,
  );

  useEffect(() => {
    if (state.error) {
      toast.dismiss();
      toast.error(state.error);
    }
  }, [state]);

  useEffect(() => {
    if (state.success) {
      toast.dismiss();
      toast.success(state.success);
    }
  }, [state]);
  return (
    <div className='flex items-center self-center justify-center text-center max-w-sm my-8 mx-auto sm:mb-32'>
      <form action={action} className='flex flex-col gap-6'>
        <p className='text-xl'>Deseja mudar a sua senha?</p>

        <InputText
          type='password'
          name='newPassword'
          placeholder='digite a nova senha'
          labelText='Nova senha'
          disabled={isPending}
        />

        <InputText
          type='password'
          name='newPasswordCheck'
          placeholder='confirme a nova senha'
          labelText='Confirmação'
          disabled={isPending}
        />

        <InputText
          type='password'
          name='password'
          placeholder='digite sua senha'
          labelText='Senha atual'
          disabled={isPending}
        />

        <Button
          type='submit'
          title='salvar'
          disabled={isPending}
          className='mt-4'
        >
          <SaveIcon />
          Salvar
        </Button>
      </form>
    </div>
  );
}
