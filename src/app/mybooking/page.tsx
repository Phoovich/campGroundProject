'use client';

import { useSession } from 'next-auth/react';
import BookingList from '@/components/BookingList';
import AdminBookingList from '@/components/AdminBookingList'; // you need to create this component
import { redirect } from 'next/navigation';

export default function Page() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    redirect('/login'); // Or display a message instead
    return null;
  }

  const role = session.user.role;

  return role === 'admin' ? <AdminBookingList /> : <BookingList />;
}
