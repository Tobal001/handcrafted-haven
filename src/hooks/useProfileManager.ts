// src/hooks/useProfileManager.ts

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  fetchProfileByUserId,
  createProfile,
  updateProfile,
  deleteProfile
} from '@/lib/data/profile';

export function useProfileManager() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const hasProfile = !!profile;

  useEffect(() => {
    async function loadProfile() {
      if (!session?.user?.id) return;

      try {
        const data = await fetchProfileByUserId(session.user.id);
        setProfile(data || null);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load profile:', err);
        setIsLoading(false);
      }
    }

    loadProfile();
  }, [session?.user?.id]);

  const handleCreate = async (formData: FormData) => {
    if (!session?.user?.id) return;
    try {
      await createProfile(session.user.id, formData);
      const newProfile = await fetchProfileByUserId(session.user.id);
      setProfile(newProfile);
      setIsCreating(false);
    } catch (err) {
      console.error('Failed to create profile:', err);
    }
  };

  const handleUpdate = async (formData: FormData) => {
    if (!session?.user?.id) return;
    try {
      await updateProfile(session.user.id, formData);
      const updated = await fetchProfileByUserId(session.user.id);
      setProfile(updated);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  const handleDelete = async () => {
    if (!session?.user?.id) return;
    try {
      await deleteProfile(session.user.id);
      setProfile(null);
    } catch (err) {
      console.error('Failed to delete profile:', err);
    }
  };

  return {
    profile,
    isEditing,
    isCreating,
    isLoading,
    hasProfile,
    setIsEditing,
    setIsCreating,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
}
