'use client';

import { useState, useEffect } from 'react';
import { UserIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

interface AccountInfoSectionProps {
  name: string;
  email: string;
  onSubmit?: (name: string) => void; // optional
}

export default function AccountInfoSection({ name, email, onSubmit }: AccountInfoSectionProps) {
  const [fullName, setFullName] = useState(name);
  const [status, setStatus] = useState<null | { type: 'success' | 'error'; text: string }>(null);

  useEffect(() => {
    setFullName(name);
  }, [name]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(fullName);
      setStatus({ type: 'success', text: 'Name updated successfully.' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-[#3E3E3E] mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="name"
            name="name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="block w-full rounded-md border-2 py-2 pl-10 pr-3 shadow-sm text-[#3E3E3E]
              focus:outline-none focus:border-[#B55B3D] focus:ring-2 focus:ring-[#B55B3D]
              bg-white placeholder:text-[#9A9A9A] border-[#E6E1DC] hover:border-[#D0C9C2]"
            placeholder="Your full name"
          />
          <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C6C6C]" />
        </div>
      </div>

      {/* Email (read-only) */}
      <div>
        <label className="block text-sm font-semibold text-[#3E3E3E] mb-2">Email Address</label>
        <div className="flex items-center px-3 py-2 bg-[#F3F3F3] rounded-md text-[#6C6C6C] border border-[#E6E1DC]">
          <EnvelopeIcon className="h-5 w-5 mr-2 text-[#6C6C6C]" />
          <span>{email}</span>
        </div>
      </div>

      
      {onSubmit && (
        <div className="pt-2">
          <button
            type="submit"
            className="bg-[#B55B3D] text-white px-6 py-2 rounded-md hover:bg-[#a14c31] transition"
          >
            Save
          </button>
        </div>
      )}

      {/* Status Message */}
      {status && (
        <div
          className={`p-4 text-sm rounded-md ${
            status.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-300'
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}
        >
          {status.text}
        </div>
      )}
    </form>
  );
}