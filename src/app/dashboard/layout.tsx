// app/dashboard/layout.tsx
import { auth } from '@/auth';
import DashboardShell from '@/components/layout/DashboardShell';
import type { ReactNode } from 'react';
import { Session } from 'next-auth';

export default async function DashboardLayout({ children }: { children: ReactNode; }) {
  const session = await auth();

  if (!session?.user) {
    // Optional: redirect to login if no session
    return <div className="text-red-500">Unauthorized</div>;
  }

  return (
    <DashboardShell session={session}>
      {children}
    </DashboardShell>
  );
}
