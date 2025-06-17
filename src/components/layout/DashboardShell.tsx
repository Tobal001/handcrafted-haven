// components/DashboardShell.tsx (server component)
import { Session } from 'next-auth';
import ProfileSidebar from '@/components/dashboard/ProfileSidebar';
import { getUserProfileMeta } from '@/lib/db';

interface DashboardShellProps {
  children: React.ReactNode;
  session: Session;
}

export default async function DashboardShell({ children, session }: DashboardShellProps) {
  const user = session.user;
  
   const { hasProfile } = await getUserProfileMeta(user.email);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {user && (
        <ProfileSidebar
          name={user.name || 'User'}
          email={user.email}
          role={user.role}
          profileImageUrl={undefined}
          hasProfile={hasProfile}
        />
      )}
      <section className='flex-1'>{children}</section>
    </div>
  );
}
