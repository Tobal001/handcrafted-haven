
// src/components/artisans/ArtisanProfileView.tsx:

'use client';

import { Button } from '../ui/button';
import Link from 'next/link';
import {
  UserCircleIcon,
  ShoppingBagIcon,
  MapPinIcon,
  LinkIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ArtisanProfileViewProps {
  profile: any;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ArtisanProfileView({
  profile,
  onEdit,
  onDelete
}: ArtisanProfileViewProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC]">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-serif font-bold text-[#3E3E3E]">Artisan Profile</h2>
          <div className="flex gap-2">
            <Button
              onClick={onEdit}
              variant="outline"
              className="border-[#B55B3D] text-[#B55B3D] hover:bg-[#F9F4EF]"
            >
              Edit
            </Button>
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
        {profile.avatarUrl && (
          <div className="mb-6 flex justify-center">
            <Image
              src={profile.avatarUrl}
              alt="Profile Image"
              width={128}
              height={128}
              className="rounded-full object-cover border-2 border-[#B55B3D]"
            />
          </div>
        )}

        {/* Shop Name */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-[#6C6C6C] mb-2 flex items-center">
            <ShoppingBagIcon className="h-5 w-5 text-[#B55B3D] mr-2" />
            Shop Name
          </h3>
          <p className="text-[#3E3E3E] text-lg font-medium">{profile.shopName}</p>
        </div>

        {/* Shop Description */}
        {profile.shopDescription && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-[#6C6C6C] mb-2 flex items-center">
              <DocumentTextIcon className="h-5 w-5 text-[#B55B3D] mr-2" />
              Shop Description
            </h3>
            <p className="text-[#3E3E3E]">{profile.shopDescription}</p>
          </div>
        )}

        {/* Bio */}
        {profile.bio && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-[#6C6C6C] mb-2 flex items-center">
              <UserCircleIcon className="h-5 w-5 text-[#B55B3D] mr-2" />
              About
            </h3>
            <p className="text-[#3E3E3E]">{profile.bio}</p>
          </div>
        )}

        {/* Location */}
        {profile.location && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-[#6C6C6C] mb-2 flex items-center">
              <MapPinIcon className="h-5 w-5 text-[#B55B3D] mr-2" />
              Location
            </h3>
            <p className="text-[#3E3E3E]">{profile.location}</p>
          </div>
        )}

        {/* Website */}
        {profile.website && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-[#6C6C6C] mb-2 flex items-center">
              <LinkIcon className="h-5 w-5 text-[#B55B3D] mr-2" />
              Website
            </h3>
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B55B3D] hover:underline"
            >
              {profile.website}
            </a>
          </div>
        )}

        {/* Policies */}
        {profile.policies && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-[#6C6C6C] mb-2 flex items-center">
              <DocumentTextIcon className="h-5 w-5 text-[#B55B3D] mr-2" />
              Shop Policies
            </h3>
            <p className="text-[#3E3E3E] whitespace-pre-line">{profile.policies}</p>
          </div>
        )}

        {/* Shipping Info */}
        {profile.shippingInfo && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-[#6C6C6C] mb-2 flex items-center">
              <DocumentTextIcon className="h-5 w-5 text-[#B55B3D] mr-2" />
              Shipping Information
            </h3>
            <p className="text-[#3E3E3E] whitespace-pre-line">{profile.shippingInfo}</p>
          </div>
        )}

        {/* Return Policy */}
        {profile.returnPolicy && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-[#6C6C6C] mb-2 flex items-center">
              <DocumentTextIcon className="h-5 w-5 text-[#B55B3D] mr-2" />
              Return Policy
            </h3>
            <p className="text-[#3E3E3E] whitespace-pre-line">{profile.returnPolicy}</p>
          </div>
        )}
      </div>
    </div>
  );
}