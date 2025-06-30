import { findAllUsers } from '@/lib/users/queries/admin';
import { DeleteUserButton } from '../DeleteUserButton';
import { ChangePasswordAdminButton } from '../ChangePasswordAdminButton';
import { AddNewUserButton } from '../AddNewUserButton';
import clsx from 'clsx';
import { RestoreUserButton } from '../RestoreUserButton';

export async function UsersList() {
  const users = await findAllUsers();

  return (
    <div className='flex flex-col mt-8 mb-16 mx-auto gap-y-8 sm:mb-32'>
      <h3 className='text-xl text-center'>Gerenciar usuários</h3>

      <AddNewUserButton />

      {users.map(user => {
        return (
          <div
            key={user.id}
            className={clsx(
              'flex justify-between items-center w-72 px-3 bg-slate-200 sm:w-90',
              !user.isActive && 'bg-slate-300 text-slate-600',
            )}
          >
            <p>{user.name}</p>
            <p>{user.userType}</p>
            {!user.isActive && <p className='text-xs italic'>(inativo) </p>}
            <div className='flex flex-row gap-5 h-9'>
              {!user.isActive && (
                <button>
                  <RestoreUserButton userName={user.name} id={user.id} />
                </button>
              )}
              {!!user.isActive && (
                <>
                  <ChangePasswordAdminButton
                    username={user.name}
                    id={user.id}
                  />

                  <DeleteUserButton username={user.name} id={user.id} />
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
