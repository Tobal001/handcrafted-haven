

// // src/app/dashboard/profile/page.tsx

// 'use client';

// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import { fetchProfileByUserId, createProfile, updateProfile, deleteProfile } from '@/lib/data/profile';
// import ProfileForm from '@/components/profile/ProfileForm';
// import ProfileView from '@/components/profile/ProfileView';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';

// export default function ProfilePage() {
//   const { data: session } = useSession();
//   const [profile, setProfile] = useState<any>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isCreating, setIsCreating] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     async function loadProfile() {
//       if (session?.user?.id) {
//         try {
//           const profileData = await fetchProfileByUserId(session.user.id);
//           setProfile(profileData || null);
//           setIsLoading(false);
//         } catch (error) {
//           console.error('Failed to load profile:', error);
//           setIsLoading(false);
//         }
//       }
//     }
//     loadProfile();
//   }, [session]);

//   const handleCreateProfile = async (formData: FormData) => {
//     try {
//       if (!session?.user?.id) return;
//       await createProfile(session.user.id, formData);
//       const newProfile = await fetchProfileByUserId(session.user.id);
//       setProfile(newProfile);
//       setIsCreating(false);
//     } catch (error) {
//       console.error('Failed to create profile:', error);
//     }
//   };

//   const handleUpdateProfile = async (formData: FormData) => {
//     try {
//       if (!session?.user?.id) return;
//       await updateProfile(session.user.id, formData);
//       const updatedProfile = await fetchProfileByUserId(session.user.id);
//       setProfile(updatedProfile);
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Failed to update profile:', error);
//     }
//   };

//   const handleDeleteProfile = async () => {
//     try {
//       if (!session?.user?.id) return;
//       await deleteProfile(session.user.id);
//       setProfile(null);
//     } catch (error) {
//       console.error('Failed to delete profile:', error);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="p-6">
//         <div className="bg-white p-6 rounded-xl shadow-md animate-pulse">
//           <div className="h-8 w-1/3 bg-[#E6E1DC] rounded mb-4"></div>
//           <div className="space-y-4">
//             <div className="h-4 w-full bg-[#E6E1DC] rounded"></div>
//             <div className="h-4 w-2/3 bg-[#E6E1DC] rounded"></div>
//             <div className="h-4 w-1/2 bg-[#E6E1DC] rounded"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!profile && !isCreating) {
//     return (
//       <div className="p-6">
//         <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6 text-center">
//           <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-4">No Profile Found</h2>
//           <p className="text-[#6C6C6C] mb-6">You haven't created a profile yet.</p>
//           <Button 
//             onClick={() => setIsCreating(true)}
//             className="bg-[#B55B3D] hover:bg-[#9E4F37]"
//           >
//             Create Profile
//           </Button>
//           <div className="mt-4">
//             <Link href="/dashboard" className="text-[#B55B3D] hover:underline text-sm">
//               Back to Dashboard
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (isCreating) {
//     return (
//       <div className="p-6">
//         <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6">
//           <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6">Create Profile</h2>
//           <ProfileForm 
//             onSubmit={handleCreateProfile}
//           />
//           <div className="mt-4">
//             <Button 
//               onClick={() => setIsCreating(false)}
//               variant="outline"
//               className="border-[#3E3E3E] text-[#3E3E3E] hover:bg-[#F9F4EF]"
//             >
//               Cancel
//             </Button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (isEditing) {
//     return (
//       <div className="p-6">
//         <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6">
//           <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6">Edit Profile</h2>
//           <ProfileForm 
//             profile={profile}
//             onSubmit={handleUpdateProfile}
//             isEditing={true}
//           />
//           <div className="mt-4">
//             <Button 
//               onClick={() => setIsEditing(false)}
//               variant="outline"
//               className="border-[#3E3E3E] text-[#3E3E3E] hover:bg-[#F9F4EF]"
//             >
//               Cancel
//             </Button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <ProfileView 
//         profile={profile}
//         onEdit={() => setIsEditing(true)}
//         onDelete={handleDeleteProfile}
//       />
//       <div className="mt-4">
//         <Link href="/dashboard" className="text-[#B55B3D] hover:underline text-sm">
//           Back to Dashboard
//         </Link>
//       </div>
//     </div>
//   );
// }












'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { fetchProfileByUserId, createProfile, updateProfile, deleteProfile } from '@/lib/data/profile';
import ProfileForm from '@/components/profile/ProfileForm';
import ProfileView from '@/components/profile/ProfileView';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (session?.user?.id) {
        try {
          const profileData = await fetchProfileByUserId(session.user.id);
          setProfile(profileData || null);
          setIsLoading(false);
        } catch (error) {
          console.error('Failed to load profile:', error);
          setIsLoading(false);
        }
      }
    }
    loadProfile();
  }, [session]);

  const handleCreateProfile = async (formData: FormData) => {
    try {
      if (!session?.user?.id) return;
      await createProfile(session.user.id, formData);
      const newProfile = await fetchProfileByUserId(session.user.id);
      setProfile(newProfile);
      setIsCreating(false);
    } catch (error) {
      console.error('Failed to create profile:', error);
    }
  };

  const handleUpdateProfile = async (formData: FormData) => {
    try {
      if (!session?.user?.id) return;
      await updateProfile(session.user.id, formData);
      const updatedProfile = await fetchProfileByUserId(session.user.id);
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      if (!session?.user?.id) return;
      await deleteProfile(session.user.id);
      setProfile(null);
    } catch (error) {
      console.error('Failed to delete profile:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="bg-white p-6 rounded-xl shadow-md animate-pulse">
          <div className="h-8 w-1/3 bg-[#E6E1DC] rounded mb-4"></div>
          <div className="space-y-4">
            <div className="h-4 w-full bg-[#E6E1DC] rounded"></div>
            <div className="h-4 w-2/3 bg-[#E6E1DC] rounded"></div>
            <div className="h-4 w-1/2 bg-[#E6E1DC] rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile && !isCreating) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6 text-center">
          <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-4">No Profile Found</h2>
          <p className="text-[#6C6C6C] mb-6">You haven't created a profile yet.</p>
          <Button 
            onClick={() => setIsCreating(true)}
            className="bg-[#B55B3D] hover:bg-[#9E4F37]"
          >
            Create Profile
          </Button>
          <div className="mt-4">
            <Link href="/dashboard" className="text-[#B55B3D] hover:underline text-sm">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isCreating) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6">
          <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6">Create Profile</h2>
          <ProfileForm 
            onSubmit={handleCreateProfile}
          />
          <div className="mt-4">
            <Button 
              onClick={() => setIsCreating(false)}
              variant="outline"
              className="border-[#3E3E3E] text-[#3E3E3E] hover:bg-[#F9F4EF]"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6">
          <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6">Edit Profile</h2>
          <ProfileForm 
            profile={profile}
            onSubmit={handleUpdateProfile}
            isEditing={true}
          />
          <div className="mt-4">
            <Button 
              onClick={() => setIsEditing(false)}
              variant="outline"
              className="border-[#3E3E3E] text-[#3E3E3E] hover:bg-[#F9F4EF]"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        {/* <h2 className="text-xl font-serif font-bold text-[#3E3E3E]">Your Profile</h2> */}
        <div className="flex gap-2">
          <Button
            onClick={() => router.push('/artisans')}
            variant="outline"
            className="border-[#B55B3D] text-[#B55B3D] hover:bg-[#F9F4EF]"
          >
            Go to Artisan Profile
          </Button>
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            className="border-[#3E3E3E] text-[#3E3E3E] hover:bg-[#F9F4EF]"
          >
            Edit Profile
          </Button>
        </div>
      </div>
      
      <ProfileView 
        profile={profile}
        onEdit={() => setIsEditing(true)}
        onDelete={handleDeleteProfile}
      />
      
      <div className="mt-4">
        <Link href="/dashboard" className="text-[#B55B3D] hover:underline text-sm">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}