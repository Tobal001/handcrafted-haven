
// src/components/dashboard/WelcomeMessage.tsx

'use client';

import { Button } from '../ui/button';
import Link from 'next/link';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface WelcomeMessageProps {
  name: string;
  email: string;
  role: string;
  profileImageUrl: string | null; // Add profileImageUrl
}

export default function WelcomeMessage({ name, email, role, profileImageUrl }: WelcomeMessageProps) {
  const roleDisplay = role === 'artisan' ? 'Artisan' :
    role === 'admin' ? 'Administrator' : 'Buyer';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* User Card - Increased width and improved responsive layout */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] mb-8">
        <div className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">
            {profileImageUrl ? (
              <div className="rounded-full overflow-hidden self-start sm:self-center border-2 border-[#B55B3D]">
                <Image
                  src={profileImageUrl}
                  alt={`${name}'s profile picture`}
                  width={64} // Adjust as needed
                  height={64} // Adjust as needed
                  className="rounded-full object-cover"
                />
              </div>
            ) : (
              <div className="bg-[#F9F4EF] p-3 rounded-full self-start sm:self-center">
                <UserCircleIcon className="h-10 w-10 text-[#B55B3D]" />
              </div>
            )}
            <div className="min-w-0"> {/* Added min-w-0 to prevent text overflow */}
              <h2 className="text-xl font-serif font-bold text-[#3E3E3E] truncate">{name}</h2>
              <p className="text-[#6C6C6C] break-all sm:break-normal sm:truncate"> {/* Improved email handling */}
                {email}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Role Badge */}
            <div className="px-4 py-2 bg-[#F9F4EF] rounded-full text-sm font-medium text-[#3E3E3E] whitespace-nowrap">
              {roleDisplay}
            </div>

            {/* Role-Based Buttons */}
            {role === 'buyer' && (
              <>
                <Link href="/dashboard/profile" passHref>
                  <Button className="bg-[#B55B3D] hover:bg-[#9E4F37] text-white whitespace-nowrap">
                    View My Profile
                  </Button>
                </Link>
                <Link href="/orders" passHref>
                  <Button className="bg-[#B55B3D] hover:bg-[#9E4F37] text-white whitespace-nowrap">
                    View Order History
                  </Button>
                </Link>
              </>
            )}

            {role === 'artisan' && (
              <>
                <Link href="/artisans" passHref>
                  <Button className="bg-[#B55B3D] hover:bg-[#9E4F37] text-white whitespace-nowrap">
                    Artisan Profile
                  </Button>
                </Link>
                <Link href="/artisans/products" passHref>
                  <Button className="bg-[#B55B3D] hover:bg-[#9E4F37] text-white whitespace-nowrap">
                    Manage Products
                  </Button>
                </Link>
              </>
            )}

            {role === 'admin' && (
              <>
                <Link href="/dashboard/profile" passHref>
                  <Button className="bg-[#B55B3D] hover:bg-[#9E4F37] text-white whitespace-nowrap">
                    View My Profile
                  </Button>
                </Link>
                <Link href="/admin/users" passHref>
                  <Button className="bg-[#B55B3D] hover:bg-[#9E4F37] text-white whitespace-nowrap">
                    Manage Users
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="bg-[#F9F4EF] p-6 rounded-lg border border-[#E6E1DC]">
        <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-2">
          Welcome back, {name}!
        </h2>
        <p className="text-[#6C6C6C]">
          You&apos;re logged in as a {roleDisplay.toLowerCase()}. {role === 'buyer'
            ? 'Browse our latest handcrafted products.'
            : role === 'artisan'
              ? 'Manage your products and view orders.'
              : 'Manage the marketplace and users.'}
        </p>
      </div>
    </div>
  );
}