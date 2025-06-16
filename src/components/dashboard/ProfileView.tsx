
// src/components/profile/ProfileView.tsx

'use client';

import { UserCircleIcon, HomeIcon, MapPinIcon, PhoneIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Profile } from '@/lib/definitions'; // Make sure this import is correct and Profile is defined

export default function ProfileView({
  profile,
  onEdit,
  onDelete
}: {
  profile: Profile; // Use the imported Profile type
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC]">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          {/* <h2 className="text-xl font-serif font-bold text-[#3E3E3E]">Your Profile</h2> */}
          <div className="flex gap-2">
            {/* <Button
              onClick={onEdit}
              variant="outline"
              className="border-[#B55B3D] text-[#B55B3D] hover:bg-[#F9F4EF]"
            >
              Edit
            </Button> */}
            <Button
              onClick={onDelete}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-50"
            >
              Delete
            </Button>
          </div>
        </div>

        {/* Profile Image Display */}
        {profile.profileImageUrl && (
          <div className="mb-6 flex justify-center">
            <Image
              src={profile.profileImageUrl}
              alt="Profile Image"
              width={128} // Adjust as needed
              height={128} // Adjust as needed
              className="rounded-full object-cover border-2 border-[#B55B3D]"
            />
          </div>
        )}

        {profile.bio && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-[#6C6C6C] mb-2">About</h3>
            <p className="text-[#3E3E3E]">{profile.bio}</p>
          </div>
        )}

        <div className="space-y-4">
          {(profile.address || profile.city || profile.state || profile.zipCode) && (
            <div className="flex items-start">
              <HomeIcon className="h-5 w-5 text-[#B55B3D] mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-[#6C6C6C] mb-1">Address</h3>
                <p className="text-[#3E3E3E]">
                  {profile.address && <>{profile.address}<br /></>}
                  {profile.city && <>{profile.city}, </>}
                  {profile.state} {profile.zipCode}
                </p>
              </div>
            </div>
          )}

          {profile.country && (
            <div className="flex items-start">
              <GlobeAltIcon className="h-5 w-5 text-[#B55B3D] mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-[#6C6C6C] mb-1">Country</h3>
                <p className="text-[#3E3E3E]">{profile.country}</p>
              </div>
            </div>
          )}

          {profile.phoneNumber && (
            <div className="flex items-start">
              <PhoneIcon className="h-5 w-5 text-[#B55B3D] mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-[#6C6C6C] mb-1">Phone</h3>
                <p className="text-[#3E3E3E]">{profile.phoneNumber}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}