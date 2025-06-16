// app/dashboard/layout.tsx
import  getServerSession  from 'next-auth';
import { authOptions } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div>
      {/* You can pass session down if needed */}
      {children}
    </div>
  );
}
