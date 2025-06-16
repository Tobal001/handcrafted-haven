'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import Image from 'next/image';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useProfileManager } from '@/hooks/useProfileManager';

export default function Profile({ 
  name, 
  email, 
  role, 
  profileImageUrl,
  hasProfile,
  firstLogin,
  setActiveSection,
}: ProfileProps) {
  const roleDisplay =
    role === 'artisan' ? 'Artisan' :
    role === 'admin' ? 'Administrator' : 'Buyer';

  const {
    profile,
    hasProfile,
    isEditing,
    isCreating,
    isLoading,
    setIsEditing,
    setIsCreating,
    handleCreate,
    handleUpdate,
    handleDelete,
  } = useProfileManager();

  function setActiveSection(arg0: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <aside className="w-full lg:w-[280px]">
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC]">
        <div className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row lg:flex-col sm:items-center lg:items-center gap-4 sm:gap-6 mb-6">
            {profileImageUrl ? (
              <div className="rounded-full overflow-hidden border-2 border-[#B55B3D] w-16 h-16">
                <Image
                  src={profileImageUrl}
                  alt={`${name}'s profile`}
                  width={64}
                  height={64}
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="bg-[#F9F4EF] p-3 rounded-full">
                <UserCircleIcon className="h-10 w-10 text-[#B55B3D]" />
              </div>
            )}
            <div className="min-w-0">
              <h2 className="text-lg font-serif font-bold text-[#3E3E3E] truncate">{name}</h2>
              <p className="text-[#6C6C6C] break-all text-sm">{email}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="px-4 py-2 bg-[#F9F4EF] rounded-full text-sm font-medium text-[#3E3E3E] whitespace-nowrap mb-2">
              {roleDisplay}
            </div>

            {role === 'buyer' && (
              <>
                <Link href="/dashboard/profile">
                  <Button className="w-full bg-[#B55B3D] hover:bg-[#9E4F37] text-white">
                    View My Profile
                  </Button>
                </Link>
                <Link href="/orders">
                  <Button className="w-full bg-[#B55B3D] hover:bg-[#9E4F37] text-white">
                    Order History
                  </Button>
                </Link>
              </>
            )}

            {role === 'artisan' && (
              <>
                {hasProfile ? (
                  <>
                    <Link href="/dashboard/profile/info">
                      <Button className="w-full bg-[#B55B3D] hover:bg-[#9E4F37] text-white">
                        Edit Profile Info
                      </Button>
                    </Link>
                    
                      <Button className="w-full bg-[#B55B3D] hover:bg-[#9E4F37] text-white"
                      onClick={() => setActiveSection?.('products')}
                        >
                        Manage Products
                      </Button>
  
                  </>
                ) : (
                  <Link href="/dashboard/profile/info">
                    <Button className="w-full bg-[#B55B3D] hover:bg-[#9E4F37] text-white">
                      Create Your Profile
                    </Button>
                  </Link>
                )}
              </>
            )}

            {role === 'admin' && (
              <>
                <Link href="/dashboard/profile">
                  <Button className="w-full bg-[#B55B3D] hover:bg-[#9E4F37] text-white">
                    View My Profile
                  </Button>
                </Link>
                <Link href="/admin/users">
                  <Button className="w-full bg-[#B55B3D] hover:bg-[#9E4F37] text-white">
                    Manage Users
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
