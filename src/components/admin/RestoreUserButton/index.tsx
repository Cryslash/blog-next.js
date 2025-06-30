'use client';

import { RestoreUserAction } from '@/actions/users/restore-user-action';
import { Button } from '@/components/Button';
import { Dialog } from '@/components/Dialog';
import clsx from 'clsx';
import { RefreshCcwIcon } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'react-toastify';

type RestoreUserButtonProps = {
  userName: string;
  id?: number;
};

export function RestoreUserButton({ userName, id }: RestoreUserButtonProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleRestoreUser() {
    startTransition(async () => {
      const result = await RestoreUserAction(id);
      if (result.error) {
        toast.error(result.error);
        return;
      }

      setShowDialog(false);
      toast.success(`O usuário ${userName} foi restaurado`);
    });
  }

  return (
    <>
      <Button
        className={clsx(
          'text-slate-900 [&_svg]:w-4 [&_svg]:h-4 bg-transparent',
          'transition cursor-pointer',
          'hover:bg-transparent hover:scale-120',
        )}
        type='button'
        title={`Restaurar usuário ${userName}`}
        aria-label={`Restaurar usuário ${userName}`}
        value={id}
        onClick={() => setShowDialog(true)}
      >
        <RefreshCcwIcon />
      </Button>
      {showDialog && (
        <Dialog
          isVisible={showDialog}
          title='Restaurar Usuário?'
          content={
            <p>
              Deseja restaurar o usuário
              <span className='font-bold'> {userName}</span>
            </p>
          }
          onCancel={() => setShowDialog(false)}
          onConfirm={handleRestoreUser}
          disabled={isPending}
        />
      )}
    </>
  );
}
