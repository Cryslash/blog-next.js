'use client';

import { createUserAction } from '@/actions/users/create-user-action';
import { Dialog } from '@/components/Dialog';
import { InputCheckBox } from '@/components/InputCheckBox';
import { InputText } from '@/components/InputText';
import { AsyncDelay } from '@/utils/async-delay';
import { PlusIcon } from 'lucide-react';
import { useEffect, useRef, useState, useTransition } from 'react';
import { toast } from 'react-toastify';

export function AddNewUserButton() {
  const [showDialog, setShowDialog] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [userNameValue, setUserNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmValue, setConfirmValue] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const inputUserNameRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputUserNameRef.current?.focus();
  }, [showDialog]);

  const inputPasswordRef = useRef<HTMLInputElement>(null);
  function clearPasswordFields() {
    setPasswordValue('');
    setConfirmValue('');
    inputPasswordRef.current?.focus();
  }

  function clearAllFields() {
    setUserNameValue('');
    setPasswordValue('');
    setConfirmValue('');
    setIsAdmin(false);
  }

  function handleClick() {
    setShowDialog(true);
  }

  async function handleConfirm() {
    if (userNameValue === '') {
      toast.error('O campo nome de usuário não pode ser vazio');
      return;
    }

    if (passwordValue !== confirmValue) {
      toast.error('As senhas devem ser iguais');
      clearPasswordFields();
      return;
    }

    startTransition(async () => {
      await AsyncDelay(3000, false);

      const result = await createUserAction({
        userName: userNameValue,
        password: passwordValue,
        isAdmin: isAdmin,
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      setShowDialog(false);
      clearAllFields();
      toast.success('Usuário cadastrado com sucesso');
    });
  }

  return (
    <>
      <div
        className='flex justify-center items-center w-72 px-3 bg-slate-200
      h-9 cursor-pointer hover:bg-slate-300 sm:w-90'
        onClick={handleClick}
      >
        <div>
          <PlusIcon />
        </div>
      </div>
      {showDialog && (
        <Dialog
          isVisible={showDialog}
          title='Novo usuário'
          onCancel={() => {
            setShowDialog(false);
            clearAllFields();
          }}
          onConfirm={handleConfirm}
          disabled={isPending}
          content={
            <div className='flex flex-col gap-5 min-w-65'>
              <p>Criar um novo usuário</p>
              <InputText
                type='text'
                name='inputUserName'
                labelText='Nome do usuário'
                placeholder='digite um nome de usuário'
                ref={inputUserNameRef}
                value={userNameValue}
                onChange={e => setUserNameValue(e.target.value)}
                disabled={isPending}
              />
              <InputText
                type='password'
                name='inputPassword'
                labelText='Senha'
                placeholder='digite a senha'
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                ref={inputPasswordRef}
                disabled={isPending}
              />
              <InputText
                type='password'
                name='inputConfirm'
                labelText='Confirme a senha'
                placeholder='digite a senha novamente'
                value={confirmValue}
                onChange={e => setConfirmValue(e.target.value)}
                disabled={isPending}
              />

              <InputCheckBox
                type='checkbox'
                name='checkBoxUserType'
                labelText='Usuário administrador'
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}
                disabled={isPending}
              />
            </div>
          }
        />
      )}
    </>
  );
}
