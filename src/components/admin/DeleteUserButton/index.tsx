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
      toast.success('Usuário apagado com sucesso');
    });
  }

  return (
    <>
      <button
        className={clsx(
          'text-red-500 [&_svg]:w-4 [&_svg]:h-4',
          'cursor-pointer transition',
          'hover:scale-120 hover:text-red-700',
        )}
        title={`Deletar o usuário ${username}`}
        aria-label={`Deletar o usuário ${username}`}
        onClick={handleClick}
      >
        <Trash2Icon />
      </button>
      {showDialog && (
        <Dialog
          isVisible={showDialog}
          title='Apagar usuário?'
          content={`Deseja apagar o usuário ${username}`}
          onCancel={() => setShowDialog(false)}
          onConfirm={handleConfirm}
          disabled={isPending}
        />
      )}
    </>
  );
}
