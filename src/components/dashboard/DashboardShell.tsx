// components/dashboard/DashboardShell.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useProfileImage } from '@/hooks/useProfileImage';
import ProfileSidebar from './ProfileSidebar';

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const { profileImageUrl, isProfileLoading } = useProfileImage(session?.user?.id);

  if (status === 'loading' || !session?.user || isProfileLoading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <ProfileSidebar
          name={session.user.name || 'User'}
          email={session.user.email || ''}
          role={session.user.role}
          profileImageUrl={profileImageUrl}
          hasProfile={false}
          firstLogin={false}
        />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        {children}
      </div>
    </div>
  );
}
