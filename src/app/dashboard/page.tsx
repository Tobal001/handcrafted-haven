// app/dashboard/page.tsx or components/DashboardShell.tsx
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getUserProfileMeta } from '@/lib/db'; // the helper above
import WelcomeMessage from '@/components/dashboard/WelcomeMessage';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const { email, name, role } = session.user;
  const { hasProfile, firstLogin } = await getUserProfileMeta(email);

  return (
    <WelcomeMessage
      name={name ?? 'User'}
      role={role}
      hasProfile={hasProfile}
      firstLogin={firstLogin}
    />
  );
}
