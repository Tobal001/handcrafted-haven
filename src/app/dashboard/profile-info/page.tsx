// app/dashboard/profile/info/page.tsx

import { auth } from '@/auth';
import { fetchProfileByUserId } from '@/lib/data/profile';
import { fetchArtisanProfileAndUserDetails } from '@/lib/data/artisans';
import ProfileInfoClient from './ProfileInfoClient';

export default async function ProfileInfoPage() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return <p>You must be logged in</p>;
  }

  const profile = await fetchProfileByUserId(user.id) ?? null;;
  const artisanProfile = user.role === 'artisan'
    ? (await fetchArtisanProfileAndUserDetails(user.id)) ?? null
    : null;

  return (
    <ProfileInfoClient
      session={session}
      profile={profile}
      artisanProfile={artisanProfile}
    />
  );
}
