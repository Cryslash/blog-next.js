import { Button } from '@/components/Button';
import { findAllUsers } from '@/lib/users/queries/admin';
import clsx from 'clsx';
import { RefreshCcwIcon, TrashIcon } from 'lucide-react';
import { DeleteUserButton } from '../DeleteUserButton';

export async function UsersList() {
  const users = await findAllUsers();

  return (
    <div className='flex flex-col mt-8 mb-16 mx-auto gap-y-8 sm:mb-32'>
      <h1 className='text-xl text-center'>Gerenciar usuários</h1>
      {users.map(user => {
        return (
          <div
            key={user.id}
            className='flex justify-between items-center px-2 gap-10 bg-slate-200 '
          >
            <p>{user.name}</p>
            <p>{user.userType}</p>
            <div className='flex flex-row'>
              <Button
                className={clsx(
                  'text-blue-800 [&_svg]:w-4 [&_svg]:h-4 bg-transparent',
                  'cursor-pointer transition',
                  'hover:scale-120 hover:text-blue-900 hover:bg-transparent',
                  'disabled:text-slate-600 disabled:cursor-not-allowed',
                )}
                title='Mudar senha'
                aria-label='Mudar senha'
              >
                <RefreshCcwIcon />
              </Button>
              <DeleteUserButton username={user.name} id={user.id} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
