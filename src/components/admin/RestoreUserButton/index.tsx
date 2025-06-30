'use client';

import { Button } from '@/components/Button';
import { Dialog } from '@/components/Dialog';
import clsx from 'clsx';
import { RefreshCcwIcon } from 'lucide-react';
import { useState } from 'react';

type RestoreUserButtonProps = {
  userName: string;
  id?: number;
};

export function RestoreUserButton({ userName, id }: RestoreUserButtonProps) {
  const [showDialog, setShowDialog] = useState(false);

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
      {!!showDialog && (
        <Dialog
          isVisible={showDialog}
          title='Restaurar Usuário?'
          content={`Deseja restaurar o usuário ${userName} ?`}
          onCancel={() => setShowDialog(false)}
          onConfirm={() => undefined}
          disabled={false}
        />
      )}
    </>
  );
}
