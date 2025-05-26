
// src/components/layout/header.tsx

'use client';

import UserDropdown from '../auth/user-dropdown';
import LoginButton from '../auth/login-button';
import { useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <nav>
      {session?.user ? (
        <div className="flex items-center gap-2 bg-[#B55B3D] hover:bg-[#9E4F37] text-white px-0 py-0 rounded-md transition-colors">
          <UserDropdown name={session.user.name || 'User'} />
        </div>
      ) : (
        <LoginButton />
      )}
    </nav>
  );
}