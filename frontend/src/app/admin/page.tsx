import AdminContent from '@/components/Admin/AdminContent';
import { verifySession } from '../_lib/session';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const AdminPage = async () => {
  const session = await verifySession(); // verify the session before rendering any information
  const isAdmin = session?.role === 'admin';
  const isUser = session?.role == 'user';
  const username = session?.username;

  // check user state and determine that if it is required for sign in
  if (!isAdmin && !isUser) {
    redirect('/signin');
  }

  return (
    <>
      <AdminContent isAdmin={isAdmin} username={username} session={session} />
    </>
  );
};

export default AdminPage;
