
// src/components/profile/ProfileForm.tsx

'use client';

import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { UserCircleIcon, HomeIcon, MapPinIcon, PhoneIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { Profile, ProfileFormSchema, ProfileFormValidationErrors } from '@/lib/definitions'; // Import types and schema
import { ZodError } from 'zod'; // Import ZodError
import { PhotoIcon } from '@heroicons/react/20/solid'; // NEW: Import PhotoIcon

export default function ProfileForm({
  profile,
  onSubmit,
  isEditing = false,
}: {
  profile?: Profile; // Use the imported Profile type
  onSubmit: (formData: FormData) => void;
  isEditing?: boolean;
}) {
  const [bio, setBio] = useState(profile?.bio || '');
  const [address, setAddress] = useState(profile?.address || '');
  const [city, setCity] = useState(profile?.city || '');
  const [state, setState] = useState(profile?.state || '');
  const [zipCode, setZipCode] = useState(profile?.zipCode || '');
  const [country, setCountry] = useState(profile?.country || '');
  const [phoneNumber, setPhoneNumber] = useState(profile?.phoneNumber || '');
  const [profileImageUrl, setProfileImageUrl] = useState(profile?.profileImageUrl || ''); // NEW: State for profile image URL

  const [errors, setErrors] = useState<ProfileFormValidationErrors>({});

  useEffect(() => {
    if (profile) {
      setBio(profile.bio || '');
      setAddress(profile.address || '');
      setCity(profile.city || '');
      setState(profile.state || '');
      setZipCode(profile.zipCode || '');
      setCountry(profile.country || '');
      setPhoneNumber(profile.phoneNumber || '');
      setProfileImageUrl(profile.profileImageUrl || ''); // NEW: Set profile image URL
    }
  }, [profile]);

  // Handle form submission with validation
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.currentTarget);
    const data = {
      bio: formData.get('bio'),
      profileImageUrl: formData.get('profileImageUrl'), // NEW: Include profileImageUrl in data for Zod
      address: formData.get('address'),
      city: formData.get('city'),
      state: formData.get('state'),
      zipCode: formData.get('zipCode'),
      country: formData.get('country'),
      phoneNumber: formData.get('phoneNumber'),
    };

    try {
      // Validate the form data using the Zod schema
      ProfileFormSchema.parse(data);
      setErrors({}); // Clear any previous errors

      // If validation passes, proceed with the original onSubmit
      onSubmit(formData);
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: ProfileFormValidationErrors = {};
        for (const issue of error.issues) {
          // Zod issues have a 'path' array, like ['bio']
          const fieldName = issue.path[0] as keyof ProfileFormValidationErrors;
          if (fieldName) {
            newErrors[fieldName] = newErrors[fieldName]
              ? [...newErrors[fieldName]!, issue.message]
              : [issue.message];
          }
        }
        setErrors(newErrors);
        console.error("Form validation errors:", newErrors);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Profile Image URL */}
      <div>
        <label htmlFor="profileImageUrl" className="block text-sm font-medium text-[#3E3E3E] mb-1">
          Profile Image URL
        </label>
        <div className="relative">
          <input
            id="profileImageUrl"
            name="profileImageUrl"
            type="url" // Use type="url" for better browser validation
            value={profileImageUrl}
            onChange={(e) => setProfileImageUrl(e.target.value)}
            className={`block w-full rounded-md border py-2 pl-10 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white
              ${errors.profileImageUrl ? 'border-red-500' : 'border-[#E6E1DC]'}`}
            placeholder="e.g., https://example.com/your-image.jpg"
          />
          <PhotoIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C6C6C]" />
        </div>
        {errors.profileImageUrl && <p className="mt-1 text-sm text-red-500">{errors.profileImageUrl[0]}</p>}
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
            className={`block w-full rounded-md border py-2 pl-10 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white
              ${errors.bio ? 'border-red-500' : 'border-[#E6E1DC]'}`}
            placeholder="Tell us about yourself..."
          />
          <UserCircleIcon className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-[#6C6C6C]" />
        </div>
        {errors.bio && <p className="mt-1 text-sm text-red-500">{errors.bio[0]}</p>}
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-[#3E3E3E] mb-1">
          Address
        </label>
        <div className="relative">
          <input
            id="address"
            name="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={`block w-full rounded-md border py-2 pl-10 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white
              ${errors.address ? 'border-red-500' : 'border-[#E6E1DC]'}`}
            placeholder="123 Main St"
          />
          <HomeIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C6C6C]" />
        </div>
        {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address[0]}</p>}
      </div>

      {/* City, State, Zip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-[#3E3E3E] mb-1">
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={`block w-full rounded-md border py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white
              ${errors.city ? 'border-red-500' : 'border-[#E6E1DC]'}`}
          />
          {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city[0]}</p>}
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-[#3E3E3E] mb-1">
            State/Province
          </label>
          <input
            id="state"
            name="state"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className={`block w-full rounded-md border py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white
              ${errors.state ? 'border-red-500' : 'border-[#E6E1DC]'}`}
          />
          {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state[0]}</p>}
        </div>
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-[#3E3E3E] mb-1">
            ZIP/Postal Code
          </label>
          <input
            id="zipCode"
            name="zipCode"
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className={`block w-full rounded-md border py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white
              ${errors.zipCode ? 'border-red-500' : 'border-[#E6E1DC]'}`}
          />
          {errors.zipCode && <p className="mt-1 text-sm text-red-500">{errors.zipCode[0]}</p>}
        </div>
      </div>

      {/* Country */}
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-[#3E3E3E] mb-1">
          Country
        </label>
        <div className="relative">
          <input
            id="country"
            name="country"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className={`block w-full rounded-md border py-2 pl-10 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white
              ${errors.country ? 'border-red-500' : 'border-[#E6E1DC]'}`}
          />
          <GlobeAltIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C6C6C]" />
        </div>
        {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country[0]}</p>}
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-[#3E3E3E] mb-1">
          Phone Number
        </label>
        <div className="relative">
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={`block w-full rounded-md border py-2 pl-10 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white
              ${errors.phoneNumber ? 'border-red-500' : 'border-[#E6E1DC]'}`}
          />
          <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C6C6C]" />
        </div>
        {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber[0]}</p>}
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="bg-[#B55B3D] hover:bg-[#9E4F37]">
          {isEditing ? 'Update Profile' : 'Create Profile'}
        </Button>
      </div>
    </form>
  );
}