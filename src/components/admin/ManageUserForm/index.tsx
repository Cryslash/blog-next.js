import { returnCurrentUser } from '@/lib/login/manage-login';
import { ChangePasswordForm } from '../ChangePasswordForm';
import { toast } from 'react-toastify';
import { UsersList } from '../UsersList';

export default async function ManageUserForm() {
  const result = await returnCurrentUser().catch(() => undefined);

  if (!result) {
    throw toast.error('Faça login novamente');
  }
  const { usertype } = result;

  if (usertype === 'admin') {
    return (
      <div className='flex flex-col justify-center gap-x-20 sm:flex-row '>
        <ChangePasswordForm />

        <UsersList />
      </div>
    );
  }
  if (usertype === 'author') {
    return <ChangePasswordForm />;
  }
}
