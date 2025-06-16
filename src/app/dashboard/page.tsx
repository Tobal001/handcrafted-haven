'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useProfileImage } from '@/hooks/useProfileImage';
import ProfileSidebar from '@/components/dashboard/ProfileSidebar';
import WelcomeMessage from '@/components/dashboard/WelcomeMessage';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { profileImageUrl, isProfileLoading } = useProfileImage(session?.user?.id);

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  if (status === 'loading' || !session?.user || isProfileLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-md animate-pulse">
          <div className="h-8 w-1/3 bg-[#E6E1DC] rounded mb-4"></div>
          <div className="h-4 w-2/3 bg-[#E6E1DC] rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
      <ProfileSidebar
        name={session.user.name || 'User'}
        email={session.user.email || ''}
        role={session.user.role}
        profileImageUrl={profileImageUrl} hasProfile={false} firstLogin={false}      />
      <div className="flex-1">
        <WelcomeMessage
          name={session.user.name || 'User'}
          email={session.user.email || ''}
          role={session.user.role}
          profileImageUrl={profileImageUrl}
        />
      </div>
    </div>
  );
}
