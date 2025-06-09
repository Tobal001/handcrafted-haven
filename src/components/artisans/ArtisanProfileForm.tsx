
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
    // Applied modern container styles: max-width, padding, background, rounded corners, subtle shadow, and a top heading
    <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-[#FDFBF8] rounded-xl shadow-lg border border-[#E6E1DC] max-w-3xl mx-auto">
      {/* Added a prominent title for the form */}
      <h2 className="text-3xl font-bold text-[#3E3E3E] text-center mb-8 pb-4 border-b-2 border-[#E6E1DC]">
        {isEditing ? 'Edit Your Artisan Profile' : 'Create Your Artisan Profile'}
      </h2>

      {/* Shop Name */}
      <div>
        {/* Updated label styling for better visual hierarchy */}
        <label htmlFor="shopName" className="block text-sm font-semibold text-[#3E3E3E] mb-2">
          Shop Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="shopName"
            name="shopName"
            type="text"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            required
            // Enhanced input field styles: thicker border, better focus, transitions, consistent placeholder color
            className={`
              block w-full rounded-md border-2 py-2 pl-10 pr-3 shadow-sm text-[#3E3E3E]
              focus:outline-none focus:border-[#B55B3D] focus:ring-2 focus:ring-[#B55B3D] focus:ring-opacity-50
              bg-white placeholder:text-[#9A9A9A] transition-all duration-200 ease-in-out
              ${errors.shopName ? 'border-red-500 ring-red-200' : 'border-[#E6E1DC] hover:border-[#D0C9C2]'}
            `}
            placeholder="Your unique shop name"
          />
          <ShoppingBagIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C6C6C]" />
        </div>
        {/* Error message styling remains the same, ensuring clarity */}
        {errors.shopName && <p className="mt-1 text-sm text-red-500">{errors.shopName[0]}</p>}
      </div>

      {/* Shop Description */}
      <div>
        <label htmlFor="shopDescription" className="block text-sm font-semibold text-[#3E3E3E] mb-2">
          Shop Description <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <textarea
            id="shopDescription"
            name="shopDescription"
            rows={4}
            value={shopDescription}
            onChange={(e) => setShopDescription(e.target.value)}
            // Enhanced textarea styles: same as input, plus resize-y
            className={`
              block w-full rounded-md border-2 py-2 pl-10 pr-3 shadow-sm text-[#3E3E3E]
              focus:outline-none focus:border-[#B55B3D] focus:ring-2 focus:ring-[#B55B3D] focus:ring-opacity-50
              bg-white placeholder:text-[#9A9A9A] transition-all duration-200 ease-in-out resize-y
              ${errors.shopDescription ? 'border-red-500 ring-red-200' : 'border-[#E6E1DC] hover:border-[#D0C9C2]'}
            `}
            placeholder="Tell us what makes your shop special: your craft, mission, and unique offerings."
          />
          {/* Icon positioned for textarea */}
          <DocumentTextIcon className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-[#6C6C6C]" />
        </div>
        {errors.shopDescription && (
          <p className="mt-1 text-sm text-red-500">{errors.shopDescription[0]}</p>
        )}
      </div>

      {/* Bio */}
      <div>
        <label htmlFor="bio" className="block text-sm font-semibold text-[#3E3E3E] mb-2">
          About You / Artisan Bio <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <textarea
            id="bio"
            name="bio"
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            // Enhanced textarea styles
            className={`
              block w-full rounded-md border-2 py-2 pl-10 pr-3 shadow-sm text-[#3E3E3E]
              focus:outline-none focus:border-[#B55B3D] focus:ring-2 focus:ring-[#B55B3D] focus:ring-opacity-50
              bg-white placeholder:text-[#9A9A9A] transition-all duration-200 ease-in-out resize-y
              ${errors.bio ? 'border-red-500 ring-red-200' : 'border-[#E6E1DC] hover:border-[#D0C9C2]'}
            `}
            placeholder="Share your story as an artisan: your passion, inspiration, and crafting journey."
          />
          {/* Icon positioned for textarea */}
          <UserCircleIcon className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-[#6C6C6C]" />
        </div>
        {errors.bio && <p className="mt-1 text-sm text-red-500">{errors.bio[0]}</p>}
      </div>

      {/* Location and Website - Grouped in a responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-6 border-t border-[#E6E1DC]"> {/* Added top border for clear section separation */}
        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-semibold text-[#3E3E3E] mb-2">
            Location (City, Country)
          </label>
          <div className="relative">
            <input
              id="location"
              name="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              // Enhanced input styles
              className={`
                block w-full rounded-md border-2 py-2 pl-10 pr-3 shadow-sm text-[#3E3E3E]
                focus:outline-none focus:border-[#B55B3D] focus:ring-2 focus:ring-[#B55B3D] focus:ring-opacity-50
                bg-white placeholder:text-[#9A9A9A] transition-all duration-200 ease-in-out
                ${errors.location ? 'border-red-500 ring-red-200' : 'border-[#E6E1DC] hover:border-[#D0C9C2]'}
              `}
              placeholder="e.g., Lagos, Nigeria"
            />
            <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C6C6C]" />
          </div>
          {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location[0]}</p>}
        </div>

        {/* Website */}
        <div>
          <label htmlFor="website" className="block text-sm font-semibold text-[#3E3E3E] mb-2">
            Website URL
          </label>
          <div className="relative">
            <input
              id="website"
              name="website"
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              // Enhanced input styles
              className={`
                block w-full rounded-md border-2 py-2 pl-10 pr-3 shadow-sm text-[#3E3E3E]
                focus:outline-none focus:border-[#B55B3D] focus:ring-2 focus:ring-[#B55B3D] focus:ring-opacity-50
                bg-white placeholder:text-[#9A9A9A] transition-all duration-200 ease-in-out
                ${errors.website ? 'border-red-500 ring-red-200' : 'border-[#E6E1DC] hover:border-[#D0C9C2]'}
              `}
              placeholder="https://yourwebsite.com"
            />
            {/* Using LinkIcon for website as it's more common, but GlobeAltIcon from original is also fine */}
            <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C6C6C]" />
          </div>
          {errors.website && <p className="mt-1 text-sm text-red-500">{errors.website[0]}</p>}
        </div>
      </div>

      {/* Policies Section */}
      <div className="space-y-6 mt-8 pt-6 border-t border-[#E6E1DC]"> {/* Added top border for clear section separation */}
        <h3 className="text-2xl font-bold text-[#3E3E3E] mb-6">Shop Policies & Information</h3>

        {/* Policies */}
        <div>
          <label htmlFor="policies" className="block text-sm font-semibold text-[#3E3E3E] mb-2">
            General Shop Policies
          </label>
          <div className="relative">
            <textarea
              id="policies"
              name="policies"
              rows={4}
              value={policies}
              onChange={(e) => setPolicies(e.target.value)}
              // Enhanced textarea styles
              className={`
                block w-full rounded-md border-2 py-2 pl-10 pr-3 shadow-sm text-[#3E3E3E]
                focus:outline-none focus:border-[#B55B3D] focus:ring-2 focus:ring-[#B55B3D] focus:ring-opacity-50
                bg-white placeholder:text-[#9A9A9A] transition-all duration-200 ease-in-out resize-y
                ${errors.policies ? 'border-red-500 ring-red-200' : 'border-[#E6E1DC] hover:border-[#D0C9C2]'}
              `}
              placeholder="Outline general policies, e.g., communication, custom orders, order processing times."
            />
            {/* Icon positioned for textarea */}
            <DocumentTextIcon className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-[#6C6C6C]" />
          </div>
          {errors.policies && <p className="mt-1 text-sm text-red-500">{errors.policies[0]}</p>}
        </div>

        {/* Shipping Info */}
        <div>
          <label htmlFor="shippingInfo" className="block text-sm font-semibold text-[#3E3E3E] mb-2">
            Shipping Information
          </label>
          <div className="relative">
            <textarea
              id="shippingInfo"
              name="shippingInfo"
              rows={4}
              value={shippingInfo}
              onChange={(e) => setShippingInfo(e.target.value)}
              // Enhanced textarea styles
              className={`
                block w-full rounded-md border-2 py-2 pl-10 pr-3 shadow-sm text-[#3E3E3E]
                focus:outline-none focus:border-[#B55B3D] focus:ring-2 focus:ring-[#B55B3D] focus:ring-opacity-50
                bg-white placeholder:text-[#9A9A9A] transition-all duration-200 ease-in-out resize-y
                ${errors.shippingInfo ? 'border-red-500 ring-red-200' : 'border-[#E6E1DC] hover:border-[#D0C9C2]'}
              `}
              placeholder="Provide clear details on shipping methods, estimated delivery times, and costs."
            />
            {/* Icon positioned for textarea */}
            <DocumentTextIcon className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-[#6C6C6C]" />
          </div>
          {errors.shippingInfo && (
            <p className="mt-1 text-sm text-red-500">{errors.shippingInfo[0]}</p>
          )}
        </div>

        {/* Return Policy */}
        <div>
          <label htmlFor="returnPolicy" className="block text-sm font-semibold text-[#3E3E3E] mb-2">
            Return Policy
          </label>
          <div className="relative">
            <textarea
              id="returnPolicy"
              name="returnPolicy"
              rows={4}
              value={returnPolicy}
              onChange={(e) => setReturnPolicy(e.target.value)}
              // Enhanced textarea styles
              className={`
                block w-full rounded-md border-2 py-2 pl-10 pr-3 shadow-sm text-[#3E3E3E]
                focus:outline-none focus:border-[#B55B3D] focus:ring-2 focus:ring-[#B55B3D] focus:ring-opacity-50
                bg-white placeholder:text-[#9A9A9A] transition-all duration-200 ease-in-out resize-y
                ${errors.returnPolicy ? 'border-red-500 ring-red-200' : 'border-[#E6E1DC] hover:border-[#D0C9C2]'}
              `}
              placeholder="Clearly state your return, exchange, and refund policy."
            />
            {/* Icon positioned for textarea */}
            <DocumentTextIcon className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-[#6C6C6C]" />
          </div>
          {errors.returnPolicy && (
            <p className="mt-1 text-sm text-red-500">{errors.returnPolicy[0]}</p>
          )}
        </div>
      </div>

      {/* Button container - Increased padding-top for better spacing */}
      <div className="flex justify-end pt-8">
        <ArtisanProfileFormButton isEditing={isEditing} />
      </div>
    </form>
  );
}

// Button component - only updated its className for better modern aesthetics and interactive states
function ArtisanProfileFormButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="
        bg-[#B55B3D] hover:bg-[#9E4F37] text-white font-semibold py-3 px-8 rounded-lg shadow-md
        transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-[#B55B3D] focus:ring-offset-2 focus:ring-offset-[#FDFBF8]
        disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100
      "
      disabled={pending}
    >
      {pending
        ? 'Saving...'
        : isEditing
        ? 'Update Profile'
        : 'Create Profile'}
    </Button>
  );
}