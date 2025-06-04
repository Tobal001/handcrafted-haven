
// src/components/artisans/ArtisanProfileForm.tsx:

'use client';

import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import {
  UserCircleIcon,
  HomeIcon,
  MapPinIcon,
  PhoneIcon,
  GlobeAltIcon,
  PhotoIcon,
  ShoppingBagIcon,
  LinkIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { useFormStatus } from 'react-dom';
import { ArtisanProfileFormSchema, type ArtisanProfileFormValidationErrors } from '@/lib/definitions';

interface ArtisanProfileFormProps {
  profile?: any;
  onSubmit: (formData: FormData) => void;
  isEditing?: boolean;
}

export default function ArtisanProfileForm({
  profile,
  onSubmit,
  isEditing = false
}: ArtisanProfileFormProps) {
  const [shopName, setShopName] = useState(profile?.shopName || '');
  const [shopDescription, setShopDescription] = useState(profile?.shopDescription || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [location, setLocation] = useState(profile?.location || '');
  const [website, setWebsite] = useState(profile?.website || '');
  const [policies, setPolicies] = useState(profile?.policies || '');
  const [shippingInfo, setShippingInfo] = useState(profile?.shippingInfo || '');
  const [returnPolicy, setReturnPolicy] = useState(profile?.returnPolicy || '');

  const [errors, setErrors] = useState<ArtisanProfileFormValidationErrors>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Validate form data
    const validatedFields = ArtisanProfileFormSchema.safeParse({
      shopName,
      shopDescription,
      bio,
      location,
      website,
      policies,
      shippingInfo,
      returnPolicy,
    });

    if (!validatedFields.success) {
      setErrors(validatedFields.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Shop Name */}
      <div>
        <label htmlFor="shopName" className="block text-sm font-medium text-[#3E3E3E] mb-1">
          Shop Name
        </label>
        <div className="relative">
          <input
            id="shopName"
            name="shopName"
            type="text"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            required
            className={`block w-full rounded-md border py-2 pl-10 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white ${
              errors.shopName ? 'border-red-500' : 'border-[#E6E1DC]'
            }`}
            placeholder="Your shop name"
          />
          <ShoppingBagIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C6C6C]" />
        </div>
        {errors.shopName && <p className="mt-1 text-sm text-red-500">{errors.shopName[0]}</p>}
      </div>

      {/* Shop Description */}
      <div>
        <label htmlFor="shopDescription" className="block text-sm font-medium text-[#3E3E3E] mb-1">
          Shop Description
        </label>
        <div className="relative">
          <textarea
            id="shopDescription"
            name="shopDescription"
            rows={4}
            value={shopDescription}
            onChange={(e) => setShopDescription(e.target.value)}
            className={`block w-full rounded-md border py-2 pl-10 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white ${
              errors.shopDescription ? 'border-red-500' : 'border-[#E6E1DC]'
            }`}
            placeholder="Tell us about your shop..."
          />
          <DocumentTextIcon className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-[#6C6C6C]" />
        </div>
        {errors.shopDescription && (
          <p className="mt-1 text-sm text-red-500">{errors.shopDescription[0]}</p>
        )}
      </div>

      {/* Bio */}
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-[#3E3E3E] mb-1">
          About You
        </label>
        <div className="relative">
          <textarea
            id="bio"
            name="bio"
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className={`block w-full rounded-md border py-2 pl-10 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white ${
              errors.bio ? 'border-red-500' : 'border-[#E6E1DC]'
            }`}
            placeholder="Tell us about yourself..."
          />
          <UserCircleIcon className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-[#6C6C6C]" />
        </div>
        {errors.bio && <p className="mt-1 text-sm text-red-500">{errors.bio[0]}</p>}
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-[#3E3E3E] mb-1">
          Location
        </label>
        <div className="relative">
          <input
            id="location"
            name="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={`block w-full rounded-md border py-2 pl-10 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white ${
              errors.location ? 'border-red-500' : 'border-[#E6E1DC]'
            }`}
            placeholder="City, Country"
          />
          <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C6C6C]" />
        </div>
        {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location[0]}</p>}
      </div>

      {/* Website */}
      <div>
        <label htmlFor="website" className="block text-sm font-medium text-[#3E3E3E] mb-1">
          Website
        </label>
        <div className="relative">
          <input
            id="website"
            name="website"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className={`block w-full rounded-md border py-2 pl-10 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white ${
              errors.website ? 'border-red-500' : 'border-[#E6E1DC]'
            }`}
            placeholder="https://yourwebsite.com"
          />
          <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C6C6C]" />
        </div>
        {errors.website && <p className="mt-1 text-sm text-red-500">{errors.website[0]}</p>}
      </div>

      {/* Policies */}
      <div>
        <label htmlFor="policies" className="block text-sm font-medium text-[#3E3E3E] mb-1">
          Shop Policies
        </label>
        <div className="relative">
          <textarea
            id="policies"
            name="policies"
            rows={4}
            value={policies}
            onChange={(e) => setPolicies(e.target.value)}
            className={`block w-full rounded-md border py-2 pl-10 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white ${
              errors.policies ? 'border-red-500' : 'border-[#E6E1DC]'
            }`}
            placeholder="Your shop policies..."
          />
          <DocumentTextIcon className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-[#6C6C6C]" />
        </div>
        {errors.policies && <p className="mt-1 text-sm text-red-500">{errors.policies[0]}</p>}
      </div>

      {/* Shipping Info */}
      <div>
        <label htmlFor="shippingInfo" className="block text-sm font-medium text-[#3E3E3E] mb-1">
          Shipping Information
        </label>
        <div className="relative">
          <textarea
            id="shippingInfo"
            name="shippingInfo"
            rows={4}
            value={shippingInfo}
            onChange={(e) => setShippingInfo(e.target.value)}
            className={`block w-full rounded-md border py-2 pl-10 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white ${
              errors.shippingInfo ? 'border-red-500' : 'border-[#E6E1DC]'
            }`}
            placeholder="Your shipping policies..."
          />
          <DocumentTextIcon className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-[#6C6C6C]" />
        </div>
        {errors.shippingInfo && (
          <p className="mt-1 text-sm text-red-500">{errors.shippingInfo[0]}</p>
        )}
      </div>

      {/* Return Policy */}
      <div>
        <label htmlFor="returnPolicy" className="block text-sm font-medium text-[#3E3E3E] mb-1">
          Return Policy
        </label>
        <div className="relative">
          <textarea
            id="returnPolicy"
            name="returnPolicy"
            rows={4}
            value={returnPolicy}
            onChange={(e) => setReturnPolicy(e.target.value)}
            className={`block w-full rounded-md border py-2 pl-10 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white ${
              errors.returnPolicy ? 'border-red-500' : 'border-[#E6E1DC]'
            }`}
            placeholder="Your return policy..."
          />
          <DocumentTextIcon className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-[#6C6C6C]" />
        </div>
        {errors.returnPolicy && (
          <p className="mt-1 text-sm text-red-500">{errors.returnPolicy[0]}</p>
        )}
      </div>

      <div className="flex justify-end">
        <ArtisanProfileFormButton isEditing={isEditing} />
      </div>
    </form>
  );
}

function ArtisanProfileFormButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="bg-[#B55B3D] hover:bg-[#9E4F37]" disabled={pending}>
      {pending
        ? 'Processing...'
        : isEditing
        ? 'Update Profile'
        : 'Create Profile'}
    </Button>
  );
}