'use client';

import { useState, useEffect } from 'react';
import {
  UserCircleIcon,
  HomeIcon,
  PhoneIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import { PhotoIcon } from '@heroicons/react/20/solid';
import {
  ProfileFormSchema,
  type Profile,
  type ProfileFormValidationErrors,
} from '@/lib/definitions';
import { ZodError } from 'zod';

interface ProfileFormProps {
  profile?: Profile;
  onSubmit: (formData: FormData) => void;
  isEditing?: boolean;
}

export default function ProfileForm({
  profile,
  onSubmit,
  isEditing = false,
}: ProfileFormProps) {
  const [formState, setFormState] = useState({
    bio: '',
    profileImageUrl: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState<ProfileFormValidationErrors>({});
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  useEffect(() => {
    if (profile) {
      setFormState({
        bio: profile.bio || '',
        profileImageUrl: profile.profileImageUrl || '',
        address: profile.address || '',
        city: profile.city || '',
        state: profile.state || '',
        zipCode: profile.zipCode || '',
        country: profile.country || '',
        phoneNumber: profile.phoneNumber || '',
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
    field: keyof typeof formState
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const plainData = {
      bio: formData.get('bio'),
      profileImageUrl: formData.get('profileImageUrl'),
      address: formData.get('address'),
      city: formData.get('city'),
      state: formData.get('state'),
      zipCode: formData.get('zipCode'),
      country: formData.get('country'),
      phoneNumber: formData.get('phoneNumber'),
    };

    try {
      ProfileFormSchema.parse(plainData);
      setErrors({});
      onSubmit(formData);
      setStatusMessage({ type: 'success', text: 'Profile saved successfully!' });
    } catch (err) {
      if (err instanceof ZodError) {
        const newErrors: ProfileFormValidationErrors = {};
        for (const issue of err.issues) {
          const field = issue.path[0] as keyof ProfileFormValidationErrors;
          if (!newErrors[field]) {
            newErrors[field] = [];
          }
          newErrors[field]?.push(issue.message);
        }
        setErrors(newErrors);
        setStatusMessage({ type: 'error', text: 'Please fix the errors above.' });
      } else {
        console.error('Unexpected error:', err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Image */}
      <Field
        id="profileImageUrl"
        label="Profile Image URL"
        icon={<PhotoIcon className="h-5 w-5 text-[#6C6C6C]" />}
        value={formState.profileImageUrl}
        error={errors.profileImageUrl}
        placeholder="https://example.com/image.jpg"
        onChange={handleChange('profileImageUrl')}
        type="url"
      />

      {/* Bio */}
      <Field
        id="bio"
        label="About You"
        icon={<UserCircleIcon className="h-5 w-5 text-[#6C6C6C]" />}
        value={formState.bio}
        error={errors.bio}
        placeholder="Tell us about yourself..."
        onChange={handleChange('bio')}
        isTextArea
      />

      {/* Address */}
      <Field
        id="address"
        label="Address"
        icon={<HomeIcon className="h-5 w-5 text-[#6C6C6C]" />}
        value={formState.address}
        error={errors.address}
        placeholder="123 Main St"
        onChange={handleChange('address')}
      />

      {/* City, State, Zip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SimpleField
          id="city"
          label="City"
          value={formState.city}
          error={errors.city}
          onChange={handleChange('city')}
        />
        <SimpleField
          id="state"
          label="State/Province"
          value={formState.state}
          error={errors.state}
          onChange={handleChange('state')}
        />
        <SimpleField
          id="zipCode"
          label="ZIP/Postal Code"
          value={formState.zipCode}
          error={errors.zipCode}
          onChange={handleChange('zipCode')}
        />
      </div>

      {/* Country */}
      <Field
        id="country"
        label="Country"
        icon={<GlobeAltIcon className="h-5 w-5 text-[#6C6C6C]" />}
        value={formState.country}
        error={errors.country}
        placeholder="Canada"
        onChange={handleChange('country')}
      />

      {/* Phone */}
      <Field
        id="phoneNumber"
        label="Phone Number"
        icon={<PhoneIcon className="h-5 w-5 text-[#6C6C6C]" />}
        value={formState.phoneNumber}
        error={errors.phoneNumber}
        placeholder="+1 (555) 123-4567"
        onChange={handleChange('phoneNumber')}
        type="tel"
      />

      {/* Status message */}
      {statusMessage && (
        <div className={`p-4 text-sm rounded-md ${
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
    </form>
  );
}

// --- REUSABLE COMPONENTS ---
function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  icon,
  error,
  type = 'text',
  isTextArea = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  icon: React.ReactNode;
  error?: string[];
  type?: string;
  isTextArea?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#3E3E3E] mb-1">
        {label}
      </label>
      <div className="relative">
        {isTextArea ? (
          <textarea
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            rows={4}
            className={`block w-full rounded-md border py-2 pl-10 shadow-sm bg-white resize-y
              ${error ? 'border-red-500' : 'border-[#E6E1DC]'}
              focus:border-[#B55B3D] focus:ring-[#B55B3D]`}
            placeholder={placeholder}
          />
        ) : (
          <input
            id={id}
            name={id}
            type={type}
            value={value}
            onChange={onChange}
            className={`block w-full rounded-md border py-2 pl-10 shadow-sm bg-white
              ${error ? 'border-red-500' : 'border-[#E6E1DC]'}
              focus:border-[#B55B3D] focus:ring-[#B55B3D]`}
            placeholder={placeholder}
          />
        )}
        <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error[0]}</p>}
    </div>
  );
}

function SimpleField({
  id,
  label,
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string[];
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#3E3E3E] mb-1">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type="text"
        value={value}
        onChange={onChange}
        className={`block w-full rounded-md border py-2 px-3 shadow-sm bg-white
          ${error ? 'border-red-500' : 'border-[#E6E1DC]'}
          focus:border-[#B55B3D] focus:ring-[#B55B3D]`}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error[0]}</p>}
    </div>
  );
}
