// src/hooks/useArtisanProfileManager.ts

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  fetchArtisanProfileByUserId,
  createArtisanProfile,
  updateArtisanProfile,
  deleteArtisanProfile
} from '@/lib/data/artisans';

export function useArtisanProfileManager() {
  const { data: session } = useSession();
  const [artisanProfile, setArtisanProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadArtisanProfile() {
      if (!session?.user?.id) return;

      try {
        const data = await fetchArtisanProfileByUserId(session.user.id);
        setArtisanProfile(data || null);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load artisan profile:', err);
        setIsLoading(false);
      }
    }

    loadArtisanProfile();
  }, [session?.user?.id]);

  const handleCreate = async (formData: FormData) => {
    if (!session?.user?.id) return;
    try {
      await createArtisanProfile(session.user.id, formData);
      const newProfile = await fetchArtisanProfileByUserId(session.user.id);
      setArtisanProfile(newProfile);
      setIsCreating(false);
    } catch (err) {
      console.error('Failed to create artisan profile:', err);
    }
  };

  const handleUpdate = async (formData: FormData) => {
    if (!session?.user?.id) return;
    try {
      await updateArtisanProfile(session.user.id, formData);
      const updated = await fetchArtisanProfileByUserId(session.user.id);
      setArtisanProfile(updated);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update artisan profile:', err);
    }
  };

  const handleDelete = async () => {
    if (!session?.user?.id) return;
    try {
      await deleteArtisanProfile(session.user.id);
      setArtisanProfile(null);
    } catch (err) {
      console.error('Failed to delete artisan profile:', err);
    }
  };

  return {
    artisanProfile,
    isEditing,
    isCreating,
    isLoading,
    setIsEditing,
    setIsCreating,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
}
