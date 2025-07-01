'use client';

import { ChangeUserPasswordAdminAction } from '@/actions/users/change-user-password-admin-action';
import { Dialog } from '@/components/Dialog';
import { InputCheckBox } from '@/components/InputCheckBox';
import { InputText } from '@/components/InputText';
import clsx from 'clsx';
import { UserRoundPenIcon } from 'lucide-react';
import { useEffect, useRef, useState, useTransition } from 'react';
import { toast } from 'react-toastify';

type ChangePasswordAdminButtonProps = {
  id?: number;
  username: string;
  isAdmin: boolean;
};

export function ChangePasswordAdminButton({
  id,
  username,
  isAdmin,
}: ChangePasswordAdminButtonProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const newPasswordRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    newPasswordRef.current?.focus();
  }, [showDialog]);

  function resetInputValues() {
    setNewPassword('');
    setConfirmNewPassword('');
    newPasswordRef.current?.focus();
  }

  function handleClick() {
    setShowDialog(true);
  }

  function handleConfirm() {
    startTransition(async () => {
      if (newPassword != confirmNewPassword) {
        toast.error('As senhas devem ser iguais.');
        resetInputValues();
        return;
      }

      // TODO: update action to change user type
      const result = await ChangeUserPasswordAdminAction(newPassword, id);
      setShowDialog(false);

      if (result.error != '') {
        toast.error(result.error);
        resetInputValues();
        return;
      }
      toast.success('Senha atualizada com sucesso');
    });
  }

  return (
    <>
      <button
        className={clsx(
          'text-slate-900 [&_svg]:w-4 [&_svg]:h-4 bg-transparent',
          'cursor-pointer transition',
          'hover:scale-120 hover:bg-transparent',
        )}
        title={`Mudar senha do usuário ${username}`}
        aria-label={`Mudar senha do usuário ${username}`}
        onClick={handleClick}
      >
        <UserRoundPenIcon />
      </button>

      {showDialog && (
        <Dialog
          isVisible={showDialog}
          title={`Gerenciar usuário `}
          onCancel={() => {
            setShowDialog(false);
            resetInputValues();
          }}
          onConfirm={handleConfirm}
          disabled={isPending}
          content={
            <div className='flex flex-col gap-4'>
              <h3>
                Deseja mudar a senha do usuário{' '}
                <span className='font-bold'>{username}</span>?
              </h3>
              <InputText
                type='password'
                name='newPassword'
                labelText='Nova senha'
                placeholder='digite a nova senha'
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                ref={newPasswordRef}
              />
              <InputText
                type='password'
                name='confirmNewPassword'
                labelText='Confirmação'
                placeholder='confirme a nova senha'
                value={confirmNewPassword}
                onChange={e => setConfirmNewPassword(e.target.value)}
              />
              <InputCheckBox
                type='checkbox'
                labelText='Usuário administrador'
                checked={isAdmin}
              />
            </div>
          }
        />
      )}
    </>
  );
}
