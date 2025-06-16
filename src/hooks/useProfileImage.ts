// hooks/useProfileImage.ts
import { useEffect, useState } from 'react';
import { fetchProfileByUserId } from '@/lib/data/profile';

export function useProfileImage(userId: string | undefined) {
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  useEffect(() => {
    async function fetchImage() {
      if (!userId) return;

      setIsProfileLoading(true);
      try {
        const profile = await fetchProfileByUserId(userId);
        setProfileImageUrl(profile?.profileImageUrl || null);
      } catch {
        setProfileImageUrl(null);
      } finally {
        setIsProfileLoading(false);
      }
    }

    fetchImage();
  }, [userId]);

  return { profileImageUrl, isProfileLoading };
}
