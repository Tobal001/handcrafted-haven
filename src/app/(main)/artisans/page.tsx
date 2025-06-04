

// // src/app/(main)/artisans/page.tsx:

// 'use client';

// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import {
//   fetchArtisanProfileByUserId,
//   createArtisanProfile,
//   updateArtisanProfile,
//   deleteArtisanProfile
// } from '@/lib/data/artisans';
// import ArtisanProfileForm from '@/components/artisans/ArtisanProfileForm';
// import ArtisanProfileView from '@/components/artisans/ArtisanProfileView';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';

// export default function ArtisansPage() {
//   const { data: session } = useSession();
//   const [profile, setProfile] = useState<any>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isCreating, setIsCreating] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     async function loadProfile() {
//       if (session?.user?.id) {
//         try {
//           const profileData = await fetchArtisanProfileByUserId(session.user.id);
//           setProfile(profileData || null);
//           setIsLoading(false);
//         } catch (error) {
//           console.error('Failed to load artisan profile:', error);
//           setIsLoading(false);
//         }
//       }
//     }
//     loadProfile();
//   }, [session]);

//   const handleCreateProfile = async (formData: FormData) => {
//     try {
//       if (!session?.user?.id) return;
//       await createArtisanProfile(session.user.id, formData);
//       const newProfile = await fetchArtisanProfileByUserId(session.user.id);
//       setProfile(newProfile);
//       setIsCreating(false);
//     } catch (error) {
//       console.error('Failed to create artisan profile:', error);
//     }
//   };

//   const handleUpdateProfile = async (formData: FormData) => {
//     try {
//       if (!session?.user?.id) return;
//       await updateArtisanProfile(session.user.id, formData);
//       const updatedProfile = await fetchArtisanProfileByUserId(session.user.id);
//       setProfile(updatedProfile);
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Failed to update artisan profile:', error);
//     }
//   };

//   const handleDeleteProfile = async () => {
//     try {
//       if (!session?.user?.id) return;
//       await deleteArtisanProfile(session.user.id);
//       setProfile(null);
//     } catch (error) {
//       console.error('Failed to delete artisan profile:', error);
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
//           <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-4">No Artisan Profile Found</h2>
//           <p className="text-[#6C6C6C] mb-6">You haven't created an artisan profile yet.</p>
//           <Button 
//             onClick={() => setIsCreating(true)}
//             className="bg-[#B55B3D] hover:bg-[#9E4F37]"
//           >
//             Create Artisan Profile
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
//           <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6">Create Artisan Profile</h2>
//           <ArtisanProfileForm 
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
//           <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6">Edit Artisan Profile</h2>
//           <ArtisanProfileForm 
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
//       <ArtisanProfileView 
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











// 'use client';

// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import {
//   fetchArtisanProfileByUserId,
//   createArtisanProfile,
//   updateArtisanProfile,
//   deleteArtisanProfile,
// } from '@/lib/data/artisans';
// import ArtisanProfileForm from '@/components/artisans/ArtisanProfileForm';
// import ArtisanProfileView from '@/components/artisans/ArtisanProfileView';
// import { Button } from '@/components/ui/button';
// import { fetchProfileByUserId } from '@/lib/data/profile'; 
// import Link from 'next/link';

// export default function ArtisansPage() {
//   const { data: session } = useSession();
//   const [profile, setProfile] = useState<any>(null);
//   const [artisanProfile, setArtisanProfile] = useState<any>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isCreating, setIsCreating] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [hasProfile, setHasProfile] = useState(false);

//   useEffect(() => {
//     async function loadData() {
//       if (session?.user?.id) {
//         try {
//           // Check if user has a profile first
//           const userProfile = await fetchProfileByUserId(session.user.id);
//           setProfile(userProfile || null);
//           setHasProfile(!!userProfile);

//           // Only load artisan profile if user has a regular profile
//           if (userProfile) {
//             const artisanData = await fetchArtisanProfileByUserId(session.user.id);
//             setArtisanProfile(artisanData || null);
//           }
          
//           setIsLoading(false);
//         } catch (error) {
//           console.error('Failed to load profiles:', error);
//           setIsLoading(false);
//         }
//       }
//     }
//     loadData();
//   }, [session]);

//   const handleCreateProfile = async (formData: FormData) => {
//     try {
//       if (!session?.user?.id) return;
//       await createArtisanProfile(session.user.id, formData);
//       const newProfile = await fetchArtisanProfileByUserId(session.user.id);
//       setArtisanProfile(newProfile);
//       setIsCreating(false);
//     } catch (error) {
//       console.error('Failed to create artisan profile:', error);
//     }
//   };

//   const handleUpdateProfile = async (formData: FormData) => {
//     try {
//       if (!session?.user?.id) return;
//       await updateArtisanProfile(session.user.id, formData);
//       const updatedProfile = await fetchArtisanProfileByUserId(session.user.id);
//       setArtisanProfile(updatedProfile);
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Failed to update artisan profile:', error);
//     }
//   };

//   const handleDeleteProfile = async () => {
//     try {
//       if (!session?.user?.id) return;
//       await deleteArtisanProfile(session.user.id);
//       setArtisanProfile(null);
//     } catch (error) {
//       console.error('Failed to delete artisan profile:', error);
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

//   // If user doesn't have a profile yet
//   if (!hasProfile) {
//     return (
//       <div className="p-6">
//         <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6 text-center">
//           <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-4">Profile Required</h2>
//           <p className="text-[#6C6C6C] mb-6">
//             You need to create a personal profile before you can create an artisan profile.
//           </p>
//           <Link href="/dashboard/profile">
//             <Button className="bg-[#B55B3D] hover:bg-[#9E4F37]">
//               Create Profile
//             </Button>
//           </Link>
//           <div className="mt-4">
//             <Link href="/dashboard" className="text-[#B55B3D] hover:underline text-sm">
//               Back to Dashboard
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // If user has profile but no artisan profile
//   if (!artisanProfile && !isCreating) {
//     return (
//       <div className="p-6">
//         <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6 text-center">
//           <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-4">No Artisan Profile Found</h2>
//           <p className="text-[#6C6C6C] mb-6">You haven't created an artisan profile yet.</p>
//           <Button 
//             onClick={() => setIsCreating(true)}
//             className="bg-[#B55B3D] hover:bg-[#9E4F37]"
//           >
//             Create Artisan Profile
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
//           <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6">Create Artisan Profile</h2>
//           <ArtisanProfileForm 
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
//           <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6">Edit Artisan Profile</h2>
//           <ArtisanProfileForm 
//             profile={artisanProfile}
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

//   // Display both profile and artisan profile when both exist
//   return (
//     <div className="p-6 space-y-6">
//       {/* Personal Profile Section */}
//       <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6">
//         <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6">Personal Information</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             {profile.profileImageUrl && (
//               <div className="mb-4">
//                 <img 
//                   src={profile.profileImageUrl} 
//                   alt="Profile" 
//                   className="h-32 w-32 rounded-full object-cover border-2 border-[#B55B3D]"
//                 />
//               </div>
//             )}
//             {profile.bio && (
//               <div className="mb-4">
//                 <h3 className="text-sm font-medium text-[#6C6C6C] mb-2">About</h3>
//                 <p className="text-[#3E3E3E]">{profile.bio}</p>
//               </div>
//             )}
//           </div>
//           <div>
//             {(profile.address || profile.city || profile.state || profile.zipCode) && (
//               <div className="mb-4">
//                 <h3 className="text-sm font-medium text-[#6C6C6C] mb-2">Address</h3>
//                 <p className="text-[#3E3E3E]">
//                   {profile.address && <>{profile.address}<br /></>}
//                   {profile.city && <>{profile.city}, </>}
//                   {profile.state} {profile.zipCode}
//                 </p>
//               </div>
//             )}
//             {profile.country && (
//               <div className="mb-4">
//                 <h3 className="text-sm font-medium text-[#6C6C6C] mb-2">Country</h3>
//                 <p className="text-[#3E3E3E]">{profile.country}</p>
//               </div>
//             )}
//             {profile.phoneNumber && (
//               <div className="mb-4">
//                 <h3 className="text-sm font-medium text-[#6C6C6C] mb-2">Phone</h3>
//                 <p className="text-[#3E3E3E]">{profile.phoneNumber}</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Artisan Profile Section */}
//       <ArtisanProfileView 
//         profile={artisanProfile}
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
















// // src/app/(main)/artisans/page.tsx:

// 'use client';

// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import {
//   fetchArtisanProfileByUserId,
//   createArtisanProfile,
//   updateArtisanProfile,
//   deleteArtisanProfile
// } from '@/lib/data/artisans';
// import { fetchProfileByUserId } from '@/lib/data/profile';
// import ArtisanProfileForm from '@/components/artisans/ArtisanProfileForm';
// import ArtisanProfileView from '@/components/artisans/ArtisanProfileView';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// export default function ArtisansPage() {
//   const { data: session } = useSession();
//   const router = useRouter();
//   const [profile, setProfile] = useState<any>(null);
//   const [artisanProfile, setArtisanProfile] = useState<any>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isCreating, setIsCreating] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [hasProfile, setHasProfile] = useState(false);

//   useEffect(() => {
//     async function loadData() {
//       if (session?.user?.id) {
//         try {
//           const userProfile = await fetchProfileByUserId(session.user.id);
//           setProfile(userProfile || null);
//           setHasProfile(!!userProfile);

//           if (userProfile) {
//             const artisanData = await fetchArtisanProfileByUserId(session.user.id);
//             setArtisanProfile(artisanData || null);
//           }
          
//           setIsLoading(false);
//         } catch (error) {
//           console.error('Failed to load profiles:', error);
//           setIsLoading(false);
//         }
//       }
//     }
//     loadData();
//   }, [session]);

//   const handleCreateProfile = async (formData: FormData) => {
//     try {
//       if (!session?.user?.id) return;
//       await createArtisanProfile(session.user.id, formData);
//       const newProfile = await fetchArtisanProfileByUserId(session.user.id);
//       setArtisanProfile(newProfile);
//       setIsCreating(false);
//     } catch (error) {
//       console.error('Failed to create artisan profile:', error);
//     }
//   };

//   const handleUpdateProfile = async (formData: FormData) => {
//     try {
//       if (!session?.user?.id) return;
//       await updateArtisanProfile(session.user.id, formData);
//       const updatedProfile = await fetchArtisanProfileByUserId(session.user.id);
//       setArtisanProfile(updatedProfile);
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Failed to update artisan profile:', error);
//     }
//   };

//   const handleDeleteProfile = async () => {
//     try {
//       if (!session?.user?.id) return;
//       await deleteArtisanProfile(session.user.id);
//       setArtisanProfile(null);
//     } catch (error) {
//       console.error('Failed to delete artisan profile:', error);
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

//   // If user doesn't have a profile yet
//   if (!hasProfile) {
//     return (
//       <div className="p-6">
//         <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6 text-center">
//           <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-4">Profile Required</h2>
//           <p className="text-[#6C6C6C] mb-6">
//             You need to create a personal profile before you can create an artisan profile.
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <Button 
//               onClick={() => router.push('/dashboard/profile')}
//               className="bg-[#B55B3D] hover:bg-[#9E4F37]"
//             >
//               Create Profile
//             </Button>
//             <Link href="/dashboard">
//               <Button 
//                 variant="outline"
//                 className="border-[#3E3E3E] text-[#3E3E3E] hover:bg-[#F9F4EF]"
//               >
//                 Back to Dashboard
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // If user has profile but no artisan profile
//   if (!artisanProfile && !isCreating) {
//     return (
//       <div className="p-6">
//         <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6 text-center">
//           <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-4">No Artisan Profile Found</h2>
//           <p className="text-[#6C6C6C] mb-6">You haven't created an artisan profile yet.</p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <Button 
//               onClick={() => setIsCreating(true)}
//               className="bg-[#B55B3D] hover:bg-[#9E4F37]"
//             >
//               Create Artisan Profile
//             </Button>
//             <Link href="/dashboard">
//               <Button 
//                 variant="outline"
//                 className="border-[#3E3E3E] text-[#3E3E3E] hover:bg-[#F9F4EF]"
//               >
//                 Back to Dashboard
//               </Button>
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
//           <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6">Create Artisan Profile</h2>
//           <ArtisanProfileForm 
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
//           <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6">Edit Artisan Profile</h2>
//           <ArtisanProfileForm 
//             profile={artisanProfile}
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

//   // Display both profile and artisan profile when both exist
//   return (
//     <div className="p-6 space-y-6">
//       {/* Personal Profile Section */}
//       <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6">
//         <div className="flex justify-between items-start mb-6">
//           <h2 className="text-xl font-serif font-bold text-[#3E3E3E]">Personal Information</h2>
//           <Button 
//             onClick={() => router.push('/dashboard/profile')}
//             variant="outline"
//             className="border-[#B55B3D] text-[#B55B3D] hover:bg-[#F9F4EF]"
//           >
//             Edit Profile
//           </Button>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             {profile.profileImageUrl && (
//               <div className="mb-4">
//                 <img 
//                   src={profile.profileImageUrl} 
//                   alt="Profile" 
//                   className="h-32 w-32 rounded-full object-cover border-2 border-[#B55B3D]"
//                 />
//               </div>
//             )}
//             {profile.bio && (
//               <div className="mb-4">
//                 <h3 className="text-sm font-medium text-[#6C6C6C] mb-2">About</h3>
//                 <p className="text-[#3E3E3E]">{profile.bio}</p>
//               </div>
//             )}
//           </div>
//           <div>
//             {(profile.address || profile.city || profile.state || profile.zipCode) && (
//               <div className="mb-4">
//                 <h3 className="text-sm font-medium text-[#6C6C6C] mb-2">Address</h3>
//                 <p className="text-[#3E3E3E]">
//                   {profile.address && <>{profile.address}<br /></>}
//                   {profile.city && <>{profile.city}, </>}
//                   {profile.state} {profile.zipCode}
//                 </p>
//               </div>
//             )}
//             {profile.country && (
//               <div className="mb-4">
//                 <h3 className="text-sm font-medium text-[#6C6C6C] mb-2">Country</h3>
//                 <p className="text-[#3E3E3E]">{profile.country}</p>
//               </div>
//             )}
//             {profile.phoneNumber && (
//               <div className="mb-4">
//                 <h3 className="text-sm font-medium text-[#6C6C6C] mb-2">Phone</h3>
//                 <p className="text-[#3E3E3E]">{profile.phoneNumber}</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Artisan Profile Section */}
//       <ArtisanProfileView 
//         profile={artisanProfile}
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














// src/app/(main)/artisans/page.tsx:

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  fetchArtisanProfileByUserId,
  createArtisanProfile,
  updateArtisanProfile,
  deleteArtisanProfile
} from '@/lib/data/artisans';
import { fetchProfileByUserId } from '@/lib/data/profile';
import ArtisanProfileForm from '@/components/artisans/ArtisanProfileForm';
import ArtisanProfileView from '@/components/artisans/ArtisanProfileView';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ArtisansPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [artisanProfile, setArtisanProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (session?.user?.id) {
        try {
          const userProfile = await fetchProfileByUserId(session.user.id);
          setProfile(userProfile || null);
          setHasProfile(!!userProfile);

          if (userProfile) {
            const artisanData = await fetchArtisanProfileByUserId(session.user.id);
            setArtisanProfile(artisanData || null);
          }
          
          setIsLoading(false);
        } catch (error) {
          console.error('Failed to load profiles:', error);
          setIsLoading(false);
        }
      }
    }
    loadData();
  }, [session]);

  const handleCreateProfile = async (formData: FormData) => {
    try {
      if (!session?.user?.id) return;
      await createArtisanProfile(session.user.id, formData);
      const newProfile = await fetchArtisanProfileByUserId(session.user.id);
      setArtisanProfile(newProfile);
      setIsCreating(false);
    } catch (error) {
      console.error('Failed to create artisan profile:', error);
    }
  };

  const handleUpdateProfile = async (formData: FormData) => {
    try {
      if (!session?.user?.id) return;
      await updateArtisanProfile(session.user.id, formData);
      const updatedProfile = await fetchArtisanProfileByUserId(session.user.id);
      setArtisanProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update artisan profile:', error);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      if (!session?.user?.id) return;
      await deleteArtisanProfile(session.user.id);
      setArtisanProfile(null);
    } catch (error) {
      console.error('Failed to delete artisan profile:', error);
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

  // If user doesn't have a profile yet
  if (!hasProfile) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6 text-center">
          <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-4">Profile Required</h2>
          <p className="text-[#6C6C6C] mb-6">
            You need to create a personal profile before you can create an artisan profile.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              onClick={() => router.push('/dashboard/profile')}
              className="bg-[#B55B3D] hover:bg-[#9E4F37]"
            >
              Create Profile
            </Button>
            <Link href="/dashboard">
              <Button 
                variant="outline"
                className="border-[#3E3E3E] text-[#3E3E3E] hover:bg-[#F9F4EF]"
              >
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If user has profile but no artisan profile
  if (!artisanProfile && !isCreating) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6 text-center">
          <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-4">No Artisan Profile Found</h2>
          <p className="text-[#6C6C6C] mb-6">You haven't created an artisan profile yet.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              onClick={() => setIsCreating(true)}
              className="bg-[#B55B3D] hover:bg-[#9E4F37]"
            >
              Create Artisan Profile
            </Button>
            <Link href="/dashboard">
              <Button 
                variant="outline"
                className="border-[#3E3E3E] text-[#3E3E3E] hover:bg-[#F9F4EF]"
              >
                Back to Dashboard
              </Button>
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
          <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6">Create Artisan Profile</h2>
          <ArtisanProfileForm 
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
          <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6">Edit Artisan Profile</h2>
          <ArtisanProfileForm 
            profile={artisanProfile}
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

  // Display both profile and artisan profile when both exist
  return (
    <div className="p-6 space-y-6">



      {/* Personal Profile Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6C1DC] p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-serif font-bold text-[#3E3E3E]">Personal Information</h2>
          <Button 
            onClick={() => router.push('/dashboard/profile')}
            variant="outline"
            className="border-[#B55B3D] text-[#B55B3D] hover:bg-[#F9F4EF]"
          >
            Edit Profile
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            
            {profile?.profileImageUrl && (
              <div className="mb-4">
                <img 
                  src={profile.profileImageUrl} 
                  alt="Profile" 
                  className="h-32 w-32 rounded-full object-cover border-2 border-[#B55B3D]"
                />
              </div>
            )}

            {/* Display full name from session */}
            {session?.user?.name && (
              <div className="mb-4">
                {/* <h3 className="text-sm font-medium text-[#6C6C6C] mb-2">Full Name</h3> */}
                <p className="text-[#3E3E3E] text-lg font-medium">{session.user.name}</p>
              </div>
            )}
            
            {profile?.bio && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-[#6C6C6C] mb-2">About</h3>
                <p className="text-[#3E3E3E]">{profile.bio}</p>
              </div>
            )}
          </div>
          <div>
            {(profile?.address || profile?.city || profile?.state || profile?.zipCode) && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-[#6C6C6C] mb-2">Address</h3>
                <p className="text-[#3E3E3E]">
                  {profile.address && <>{profile.address}<br /></>}
                  {profile.city && <>{profile.city}, </>}
                  {profile.state} {profile.zipCode}
                </p>
              </div>
            )}
            {profile?.country && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-[#6C6C6C] mb-2">Country</h3>
                <p className="text-[#3E3E3E]">{profile.country}</p>
              </div>
            )}
            {profile?.phoneNumber && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-[#6C6C6C] mb-2">Phone</h3>
                <p className="text-[#3E3E3E]">{profile.phoneNumber}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    

      {/* Artisan Profile Section */}
      <ArtisanProfileView 
        profile={artisanProfile}
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