
// src/components/layout/header.tsx

'use client';

import UserDropdown from '../auth/user-dropdown';
import LoginButton from '../auth/login-button';
import { useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  // Extract the first name from the session user's name
  const firstName = session?.user?.name
    ? session.user.name.split(' ')[0] // Split by space and take the first part
    : 'User'; // Fallback to 'User' if name is null/undefined

  return (
    <nav>
      {session?.user ? (
        <div className="flex items-center gap-2 bg-[#B55B3D] hover:bg-[#9E4F37] text-white px-0 py-0 rounded-md transition-colors">
          {/* Pass the extracted first name to UserDropdown */}
          <UserDropdown name={firstName} />
        </div>
      ) : (
        <LoginButton />
      )}
    </nav>
  );
}