

// // src/app/dashboard/page.tsx

// 'use client';

// import { useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import WelcomeMessage from '../../components/dashboard/WelcomeMessage';

// export default function Dashboard() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.push('/login');
//     }
//   }, [status, router]);

//   if (status === 'loading') {
//     return (
//       <div className="p-6 max-w-4xl mx-auto">
//         <div className="bg-white p-6 rounded-xl shadow-md animate-pulse">
//           <div className="h-8 w-1/3 bg-[#E6E1DC] rounded mb-4"></div>
//           <div className="h-4 w-2/3 bg-[#E6E1DC] rounded"></div>
//         </div>
//       </div>
//     );
//   }

//   if (status !== 'authenticated') {
//     return null;
//   }

//   return (
//     <div className="p-6">
//       {session?.user && (
//         <WelcomeMessage 
//           name={session.user.name || 'User'} 
//           email={session.user.email || ''}
//           role={session.user.role} 
//         />
//       )}
//     </div>
//   );
// }









// ==================================================================================


// src/app/dashboard/page.tsx

'use client'; // Keep this here

import { useEffect, useState } from 'react'; // Import useState
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import WelcomeMessage from '../../components/dashboard/WelcomeMessage';
import { fetchProfileByUserId } from '@/lib/data/profile'; // Import the function

export default function Dashboard() { // Removed 'async' from here
  const { data: session, status } = useSession();
  const router = useRouter();

  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true); // Add a loading state for the profile

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Effect to fetch profile image when session is authenticated
  useEffect(() => {
    async function getProfileImage() {
      if (status === 'authenticated' && session?.user?.id) {
        setIsProfileLoading(true); // Start loading
        try {
          const profile = await fetchProfileByUserId(session.user.id);
          setProfileImageUrl(profile?.profileImageUrl || null);
        } catch (error) {
          console.error("Failed to fetch profile image:", error);
          setProfileImageUrl(null); // Ensure it's null on error
        } finally {
          setIsProfileLoading(false); // End loading
        }
      } else if (status !== 'loading') {
        // If not authenticated or session user ID is missing, clear image and stop loading
        setProfileImageUrl(null);
        setIsProfileLoading(false);
      }
    }

    getProfileImage();
  }, [status, session?.user?.id]); // Re-run when status or user ID changes

  // Display initial loading state for the page
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
    return null; // Or a redirect to login is already handled by useEffect
  }

  // Display the dashboard once authentication is confirmed and profile loading is complete
  return (
    <div className="p-6">
      {session?.user && !isProfileLoading ? ( // Ensure profile is not still loading
        <WelcomeMessage
          name={session.user.name || 'User'}
          email={session.user.email || ''}
          role={session.user.role}
          profileImageUrl={profileImageUrl} // Pass the fetched image URL
        />
      ) : (
        // You might want a loading spinner here for the WelcomeMessage while profile loads
        <div className="p-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md animate-pulse">
                <div className="h-8 w-1/3 bg-[#E6E1DC] rounded mb-4"></div>
                <div className="h-4 w-2/3 bg-[#E6E1DC] rounded"></div>
            </div>
        </div>
      )}
    </div>
  );
}