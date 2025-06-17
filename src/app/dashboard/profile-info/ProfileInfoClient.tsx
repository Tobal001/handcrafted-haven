// app/dashboard/profile/info/ProfileInfoClient.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AccordionSection from '@/components/ui/AccordionSection';
import AccountInfoSection from '@/components/dashboard/forms/AccountInfoSection';
import ProfileInfoSection from '@/components/dashboard/forms/ProfileInfoSection';
import ArtisanProfileForm from '@/components/dashboard/forms/ArtisanProfileForm';
import { Session } from 'next-auth';
import { ArtisanProfile, Profile } from '@/lib/definitions';

interface Props {
  session: Session;
  profile: Profile | null;
  artisanProfile: ArtisanProfile | null;
}

export default function ProfileInfoClient({ session, profile, artisanProfile }: Props) {
  const [statusMessage, setStatusMessage] = useState<null | { type: 'success' | 'error'; text: string }>(null);
  const isArtisan = session.user.role === 'artisan';

  const generalFormRef = useRef<HTMLDivElement>(null);
  const artisanFormRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // General profile
      if (generalFormRef.current) {
        const form = generalFormRef.current.querySelector('form');
        if (form) {
          const formData = new FormData(form);
          await fetch('/api/profile', {
            method: profile ? 'PUT' : 'POST',
            body: formData,
          });
        }
      }

      // Artisan profile
      if (isArtisan && artisanFormRef.current) {
        const form = artisanFormRef.current.querySelector('form');
        if (form) {
          const formData = new FormData(form);
          await fetch('/api/artisan-profile', {
            method: artisanProfile ? 'PUT' : 'POST',
            body: formData,
          });
        }
      }

      setStatusMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      console.error(error);
      setStatusMessage({ type: 'error', text: 'Something went wrong.' });
    }
  };

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => setStatusMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  return (
    <div className="space-y-6 p-6 max-w-3xl mx-auto">
      <AccordionSection title="Account Info" defaultOpen>
        <AccountInfoSection name={session.user.name ?? ''} email={session.user.email ?? ''} />
      </AccordionSection>

      <AccordionSection title="Profile Info" defaultOpen>
        <div ref={generalFormRef}>
          <ProfileInfoSection 
          profile={profile}
           />
        </div>
      </AccordionSection>

      {isArtisan && (
        <AccordionSection title="Artisan Shop Info">
          <div ref={artisanFormRef}>
            <ArtisanProfileForm profile={artisanProfile} />
          </div>
        </AccordionSection>
      )}
    </div>
  );
}
