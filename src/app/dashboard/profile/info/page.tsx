'use client';

import { useProfileManager } from '@/hooks/useProfileManager';
import { useArtisanProfileManager } from '@/hooks/useArtisanProfileManager';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import AccountInfoSection from '@/components/profile/AccountInfoSection';
import ProfileForm from '@/components/profile/ProfileForm';
import ArtisanProfileForm from '@/components/dashboard/artisan/ArtisanProfileForm';
import AccordionSection from '@/components/ui/AccordionSection';

export default function ProfileInfoPage() {
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  const {
    profile,
    isLoading,
    handleCreate: handleGeneralCreate,
    handleUpdate: handleGeneralUpdate,
  } = useProfileManager();

  const {
    artisanProfile,
    handleCreate: handleArtisanCreate,
    handleUpdate: handleArtisanUpdate,
  } = useArtisanProfileManager();

  const isArtisan = session?.user?.role === 'artisan';

  const generalFormRef = useRef<HTMLDivElement>(null);
  const artisanFormRef = useRef<HTMLDivElement>(null);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // Gather general form data
    if (generalFormRef.current) {
      const form = generalFormRef.current.querySelector('form');
      if (form) {
        const formData = new FormData(form);
        if (profile) {
          await handleGeneralUpdate(formData);
        } else {
          await handleGeneralCreate(formData);
        }
      }
    }

    // Gather artisan form data
    if (isArtisan && artisanFormRef.current) {
      const form = artisanFormRef.current.querySelector('form');
      if (form) {
        const formData = new FormData(form);
        if (artisanProfile) {
          await handleArtisanUpdate(formData);
        } else {
          await handleArtisanCreate(formData);
        }
      }
    }

    setStatusMessage({ type: 'success', text: 'Profile saved successfully!' });
  } catch (error) {
    console.error(error);
    setStatusMessage({ type: 'error', text: 'Failed to save profile. Please try again.' });
  }
};


  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => setStatusMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6 p-6 max-w-3xl mx-auto">

      <AccordionSection title="Account Info" defaultOpen={true}>
        <AccountInfoSection
          name={session?.user?.name ?? ''}
          email={session?.user?.email ?? ''}
        />
      </AccordionSection>

      <AccordionSection title="Profile Info" defaultOpen={true}>
        <div ref={generalFormRef}>
          <ProfileForm profile={profile} onSubmit={() => {}} />
        </div>
      </AccordionSection>

      {isArtisan && (
        <AccordionSection title="Artisan Shop Info" defaultOpen={false}>
          <div ref={artisanFormRef}>
            <ArtisanProfileForm profile={artisanProfile} onSubmit={() => {}} />
          </div>
        </AccordionSection>
      )}
    
    </div>
  );
}
