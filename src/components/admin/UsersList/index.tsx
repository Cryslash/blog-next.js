import { findAllUsers } from '@/lib/users/queries/admin';
import { DeleteUserButton } from '../DeleteUserButton';
import { ChangePasswordAdminButton } from '../ChangePasswordAdminButton';

export async function UsersList() {
  const users = await findAllUsers();

  return (
    <div className='flex flex-col mt-8 mb-16 mx-auto gap-y-8 sm:mb-32'>
      <h3 className='text-xl text-center'>Gerenciar usuários</h3>
      {users.map(user => {
        return (
          <div
            key={user.id}
            className='flex justify-between items-center w-72 px-3 bg-slate-200 sm:w-90'
          >
            <p>{user.name}</p>
            <p>{user.userType}</p>
            <div className='flex flex-row gap-5 h-9'>
              <ChangePasswordAdminButton username={user.name} id={user.id} />

              <DeleteUserButton username={user.name} id={user.id} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
