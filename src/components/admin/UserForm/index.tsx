'use client';

import { Button } from '@/components/Button';
import { InputText } from '@/components/InputText';
import { SaveIcon } from 'lucide-react';

type UserFormProps = {
  username: string;
  usertype: string;
};

export default function UserForm(props: UserFormProps) {
  if (props.usertype != 'admin') {
    return (
      <div className='flex items-center justify-center text-center max-w-sm mt-16 mb-32 mx-auto'>
        <form action='' className='flex flex-col gap-6'>
          <p className='text-2xl text-slate-600'>
            Olá,
            <span className='font-bold text-2xl '> {props.username}</span>. Você
            é um <span className='font-bold text-2xl '>{props.usertype}.</span>
          </p>

          <p className='text-xl'>Deseja mudar a sua senha?</p>

          <InputText
            type='text'
            name='newPassword'
            placeholder='digite a nova senha'
            labelText='Nova senha'
          />

          <InputText
            type='text'
            name='newPasswordCheck'
            placeholder='confirme a nova senha'
            labelText='Confirmação'
          />

          <InputText
            type='text'
            name='password'
            placeholder='digite sua senha'
            labelText='Senha atual'
          />

          <Button type='submit' title='salvar' className='mt-4'>
            <SaveIcon />
            Salvar
          </Button>
        </form>
      </div>
    );
  }
  return <></>;
}
