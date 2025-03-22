import TopMenuItem from './TopMenuItem';
import Image from 'next/image';
import styles from './topmenu.module.css';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { Link } from '@mui/material';

export default async function TopMenu() {
  const session = await getServerSession(authOptions);
  return (
    <div className={styles.menucontainer}>
      <TopMenuItem title="Booking" pageRef="/booking" />
      <Image 
        src={'/img/logo.png'}
        className={styles.logoimg} 
        alt="logo" 
        width={0} 
        height={0} 
        sizes='100vh'
      />
      {session ? (
        <Link href="/api/auth/signout">
          <div className='flex items-center absolute left-0 h-full px-2 text-cyan-600 text-sm'>
            Sign-out of {session.user?.name}
          </div>
        </Link>
      ) : (
        <Link href="/api/auth/signin">
          <div className='flex items-center absolute left-0 h-full px-2 text-cyan-600 text-sm'>
            Sign-in
          </div>
        </Link>
      )}
      <div className='flex items-center absolute left-10 h-full px-2 ml-20 text-cyan-600 text-sm'>
        <TopMenuItem title="MyBooking" pageRef="/mybooking" />
      </div>
       
    </div>
  );
}