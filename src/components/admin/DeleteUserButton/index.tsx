'use client';
import { deleteUserAction } from '@/actions/users/delete-user-action';
import { Dialog } from '@/components/Dialog';
import clsx from 'clsx';
import { Trash2Icon } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'react-toastify';

type DeleteUserButtonProps = {
  username: string;
  id?: number;
};

export function DeleteUserButton({ username, id }: DeleteUserButtonProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (username === 'admin') {
      toast.error('Usuário admin não pode ser inativado');
      return;
    }
    setShowDialog(true);
  }

  function handleConfirm() {
    toast.dismiss();

    startTransition(async () => {
      const result = await deleteUserAction(id);
      setShowDialog(false);

      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success('Usuário inativado com sucesso');
    });
  }

  return (
    <>
      <button
        className={clsx(
          'text-slate-900 [&_svg]:w-4 [&_svg]:h-4',
          'cursor-pointer transition',
          'hover:scale-120 ',
        )}
        title={`Inativar o usuário ${username}`}
        aria-label={`Inativar o usuário ${username}`}
        onClick={handleClick}
      >
        <Trash2Icon />
      </button>
      {showDialog && (
        <Dialog
          isVisible={showDialog}
          title='Inativar usuário?'
          content={
            <p>
              Deseja inativar o usuário
              <span className='font-bold'> {username}</span>
            </p>
          }
          onCancel={() => setShowDialog(false)}
          onConfirm={handleConfirm}
          disabled={isPending}
        />
      )}
    </>
  );
}
