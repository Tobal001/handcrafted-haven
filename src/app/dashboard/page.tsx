
// src/app/dashboard/page.tsx
'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import WelcomeMessage from '../../components/dashboard/WelcomeMessage';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-md animate-pulse">
          <div className="h-8 w-1/3 bg-[#E6E1DC] rounded mb-4"></div>
          <div className="h-4 w-2/3 bg-[#E6E1DC] rounded"></div>
        </div>
      </div>
    );
  }

  if (status !== 'authenticated') {
    return null;
  }

  return (
    <div className="p-6">
      {session?.user && (
        <WelcomeMessage 
          name={session.user.name || 'User'} 
          email={session.user.email || ''}
          role={session.user.role} 
        />
      )}
    </div>
  );
}