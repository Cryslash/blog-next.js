import { MenuAdmin } from '@/components/admin/MenuAdmin';
import {
  requireLoginSessionOrRedirect,
  returnCurrentUser,
} from '@/lib/login/manage-login';
import { toast } from 'react-toastify';

type AdminPostLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminPostLayout({
  children,
}: Readonly<AdminPostLayoutProps>) {
  await requireLoginSessionOrRedirect();

  const result = await returnCurrentUser().catch(() => undefined);

  if (!result) {
    throw toast.error('Faça login novamente');
  }

  const { username, usertype } = result;

  return (
    <>
      <MenuAdmin username={username} usertype={usertype} />
      {children}
    </>
  );
}
