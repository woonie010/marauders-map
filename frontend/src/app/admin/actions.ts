'user server';

import { verifySession } from '@/app/_lib/session';

export async function banUser() {
  // verify user
  const session = await verifySession();
  const role = session?.role;

  if (role !== 'admin') {
    return { error: 'Unauthorized' };
  }
}
