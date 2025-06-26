'use client';

import { ChangeUserPasswordAction } from '@/actions/users/change-user-password-action';
import { Button } from '@/components/Button';
import { InputText } from '@/components/InputText';
import { SaveIcon } from 'lucide-react';
import { useActionState, useEffect } from 'react';
import { toast } from 'react-toastify';

type UserFormProps = {
  username: string;
  usertype: string;
};

export default function UserForm(props: UserFormProps) {
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
    <div className='flex items-center justify-center text-center max-w-sm mt-16 mb-32 mx-auto'>
      <form action={action} className='flex flex-col gap-6'>
        <p className='text-2xl text-slate-600'>
          Olá,
          <span className='font-bold text-2xl '> {props.username}</span>. Você é
          um <span className='font-bold text-2xl '>{props.usertype}.</span>
        </p>

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
