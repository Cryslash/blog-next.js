'use client';

import clsx from 'clsx';
import { Trash2Icon } from 'lucide-react';

type DeletePostButtonProps = {
  title: string;
  id: string;
};

export function DeletePostButton({ title, id }: DeletePostButtonProps) {
  function handleClick() {
    alert('Botão Clicado: ' + id);
  }

  return (
    <button
      className={clsx(
        'text-red-500 [&_svg]:w-4 [&_svg]:h-4',
        'cursor-pointer transition',
        'hover:scale-120 hover:text-red-700',
      )}
      aria-label={`Apagar post: ${title}`}
      title={`Apagar post: ${title}`}
      onClick={handleClick}
    >
      <Trash2Icon />
    </button>
  );
}
