'use client';

import { useState, useEffect } from 'react';
import {
  UserCircleIcon,
  MapPinIcon,
  ShoppingBagIcon,
  LinkIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import {
  ArtisanProfileFormSchema,
  type ArtisanProfile,
  type ArtisanProfileFormValidationErrors,
} from '@/lib/definitions';

interface ArtisanProfileFormProps {
  profile?: ArtisanProfile;
  onSubmit: (formData: ArtisanProfileFormFields) => void;
  isEditing?: boolean;
}

type ArtisanProfileFormFields = {
  shopName: string;
  shopDescription: string;
  bio: string;
  location: string;
  website: string;
  policies: string;
  shippingInfo: string;
  returnPolicy: string;
};

export default function ArtisanProfileForm({
  profile,
  onSubmit,
  isEditing = false,
}: ArtisanProfileFormProps) {
  const [formState, setFormState] = useState<ArtisanProfileFormFields>({
    shopName: '',
    shopDescription: '',
    bio: '',
    location: '',
    website: '',
    policies: '',
    shippingInfo: '',
    returnPolicy: '',
  });

  const [errors, setErrors] = useState<ArtisanProfileFormValidationErrors>({});
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  useEffect(() => {
    if (profile) {
      setFormState({
        shopName: profile.shopName || '',
        shopDescription: profile.shopDescription || '',
        bio: profile.bio || '',
        location: profile.location || '',
        website: profile.website || '',
        policies: profile.policies || '',
        shippingInfo: profile.shippingInfo || '',
        returnPolicy: profile.returnPolicy || '',
      });
    }
  }, [profile]);

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => setStatusMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  const handleChange = (
    field: keyof ArtisanProfileFormFields
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validated = ArtisanProfileFormSchema.safeParse(formState);

    if (!validated.success) {
      setErrors(validated.error.flatten().fieldErrors);
      setStatusMessage({ type: 'error', text: 'Please fix the errors above.' });
      return;
    }

    setErrors({});
    onSubmit(formState);
    setStatusMessage({ type: 'success', text: 'Profile saved successfully!' });
  };

  const {
    shopName,
    shopDescription,
    bio,
    location,
    website,
    policies,
    shippingInfo,
    returnPolicy,
  } = formState;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* SHOP NAME */}
      <div>
        <label htmlFor="shopName" className="block font-semibold mb-2 text-[#3E3E3E]">
          Shop Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="shopName"
            type="text"
            value={shopName}
            onChange={handleChange('shopName')}
            required
            className={`w-full rounded-md border-2 py-2 pl-10 pr-3 shadow-sm bg-white text-[#3E3E3E] placeholder:text-[#9A9A9A]
              ${errors.shopName ? 'border-red-500 ring-red-200' : 'border-[#E6E1DC]'}
              focus:border-[#B55B3D] focus:ring-2 focus:ring-[#B55B3D]`}
            placeholder="Your unique shop name"
          />
          <ShoppingBagIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C6C6C]" />
        </div>
        {errors.shopName && <p className="text-sm text-red-500 mt-1">{errors.shopName[0]}</p>}
      </div>

      {/* SHOP DESCRIPTION */}
      <div>
        <label htmlFor="shopDescription" className="block font-semibold mb-2 text-[#3E3E3E]">
          Shop Description
        </label>
        <div className="relative">
          <textarea
            id="shopDescription"
            value={shopDescription}
            onChange={handleChange('shopDescription')}
            rows={4}
            className={`w-full rounded-md border-2 py-2 pl-10 pr-3 shadow-sm bg-white resize-y text-[#3E3E3E]
              ${errors.shopDescription ? 'border-red-500 ring-red-200' : 'border-[#E6E1DC]'}
              focus:border-[#B55B3D] focus:ring-2 focus:ring-[#B55B3D]`}
            placeholder="Tell us what makes your shop special"
          />
          <DocumentTextIcon className="absolute left-3 top-3 h-5 w-5 text-[#6C6C6C]" />
        </div>
        {errors.shopDescription && <p className="text-sm text-red-500 mt-1">{errors.shopDescription[0]}</p>}
      </div>

      {/* BIO */}
      <div>
        <label htmlFor="bio" className="block font-semibold mb-2 text-[#3E3E3E]">
          Artisan Bio
        </label>
        <div className="relative">
          <textarea
            id="bio"
            value={bio}
            onChange={handleChange('bio')}
            rows={4}
            className={`w-full rounded-md border-2 py-2 pl-10 pr-3 shadow-sm bg-white resize-y text-[#3E3E3E]
              ${errors.bio ? 'border-red-500 ring-red-200' : 'border-[#E6E1DC]'}
              focus:border-[#B55B3D] focus:ring-2 focus:ring-[#B55B3D]`}
            placeholder="Your story as an artisan"
          />
          <UserCircleIcon className="absolute left-3 top-3 h-5 w-5 text-[#6C6C6C]" />
        </div>
        {errors.bio && <p className="text-sm text-red-500 mt-1">{errors.bio[0]}</p>}
      </div>

      {/* LOCATION & WEBSITE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="location" className="block font-semibold mb-2 text-[#3E3E3E]">
            Location
          </label>
          <div className="relative">
            <input
              id="location"
              value={location}
              onChange={handleChange('location')}
              type="text"
              className={`w-full rounded-md border-2 py-2 pl-10 pr-3 shadow-sm bg-white text-[#3E3E3E]
                ${errors.location ? 'border-red-500 ring-red-200' : 'border-[#E6E1DC]'}
                focus:border-[#B55B3D] focus:ring-2 focus:ring-[#B55B3D]`}
              placeholder="e.g., Ottawa, Canada"
            />
            <MapPinIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C6C6C]" />
          </div>
        </div>

        <div>
          <label htmlFor="website" className="block font-semibold mb-2 text-[#3E3E3E]">
            Website URL
          </label>
          <div className="relative">
            <input
              id="website"
              type="url"
              value={website}
              onChange={handleChange('website')}
              className={`w-full rounded-md border-2 py-2 pl-10 pr-3 shadow-sm bg-white text-[#3E3E3E]
                ${errors.website ? 'border-red-500 ring-red-200' : 'border-[#E6E1DC]'}
                focus:border-[#B55B3D] focus:ring-2 focus:ring-[#B55B3D]`}
              placeholder="https://yourshop.com"
            />
            <LinkIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C6C6C]" />
          </div>
        </div>
      </div>

      {/* POLICIES */}
      <div className="space-y-6 mt-8 pt-6 border-t border-[#E6E1DC]">
        <h3 className="text-xl font-bold text-[#3E3E3E] mb-4">Shop Policies</h3>

        <div>
          <label htmlFor="policies" className="block font-semibold mb-2 text-[#3E3E3E]">General Policies</label>
          <textarea
            id="policies"
            value={policies}
            onChange={handleChange('policies')}
            rows={4}
            className="w-full border rounded-md p-2"
            placeholder="e.g., Custom order rules, turnaround times, etc."
          />
        </div>

        <div>
          <label htmlFor="shippingInfo" className="block font-semibold mb-2 text-[#3E3E3E]">Shipping Info</label>
          <textarea
            id="shippingInfo"
            value={shippingInfo}
            onChange={handleChange('shippingInfo')}
            rows={4}
            className="w-full border rounded-md p-2"
            placeholder="Shipping methods, times, etc."
          />
        </div>

        <div>
          <label htmlFor="returnPolicy" className="block font-semibold mb-2 text-[#3E3E3E]">Return Policy</label>
          <textarea
            id="returnPolicy"
            value={returnPolicy}
            onChange={handleChange('returnPolicy')}
            rows={4}
            className="w-full border rounded-md p-2"
            placeholder="Your return and exchange policies"
          />
        </div>
      </div>

      {/* STATUS & SUBMIT */}
      <div className="pt-4 flex justify-end">
        {statusMessage && (
          <div className={`p-4 mb-4 text-sm rounded-md ${
            statusMessage.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-300'
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}>
            {statusMessage.text}
          </div>
        )}
        <button
          type="submit"
          className="bg-[#B55B3D] text-white px-6 py-2 rounded-md hover:bg-[#a14c31] transition"
        >
          Save
        </button>
      </div>
    </form>
  );
}