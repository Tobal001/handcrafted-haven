'use client';

interface WelcomeMessageProps {
  name: string;
  email: string;
  role: string;
  profileImageUrl: string | null;
}

export default function WelcomeMessage({ name, role }: WelcomeMessageProps) {
  const roleDisplay = role === 'artisan' ? 'Artisan' :
    role === 'admin' ? 'Administrator' : 'Buyer';

  return (
    <div className="bg-[#F9F4EF] p-6 rounded-lg border border-[#E6E1DC] h-full">
      <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-2">
        Welcome back, {name}!
      </h2>
      <p className="text-[#6C6C6C]">
        You're logged in as a {roleDisplay.toLowerCase()}.{' '}
        {role === 'buyer'
          ? 'Browse our latest handcrafted products.'
          : role === 'artisan'
          ? 'Manage your products and view orders.'
          : 'Manage the marketplace and users.'}
      </p>
    </div>
  );
}
