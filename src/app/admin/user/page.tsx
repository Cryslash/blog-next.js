import UserForm from '@/components/admin/UserForm';
import { returnCurrentUser } from '@/lib/login/manage-login';
import { toast } from 'react-toastify';

export default async function UserPage() {
  const result = await returnCurrentUser().catch(() => undefined);

  if (!result) {
    throw toast.error('Faça login novamente.');
  }

  const { username, usertype } = result;

  return <UserForm username={username} usertype={usertype} />;
}
