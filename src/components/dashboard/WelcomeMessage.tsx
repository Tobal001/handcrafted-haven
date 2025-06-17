'use client';

type UserRole = 'buyer' | 'artisan' | 'admin';

interface WelcomeMessageProps {
  name: string;
  role: UserRole;
  hasProfile?: boolean;
  firstLogin?: boolean;
}

export default function WelcomeMessage({ name, role, hasProfile = false, firstLogin = false }: WelcomeMessageProps) {
  let message: string;

  if (role === 'buyer') {
    if (firstLogin && !hasProfile) {
      message = "Welcome! This is your dashboard. Explore past purchases and please create your profile.";
    } else if (!hasProfile) {
      message = "Welcome back! Looks like you haven’t created a profile yet. Let’s get started.";
    } else {
      message = "Welcome back! Check your order history or update your profile.";
    }
  } else if (role === 'artisan') {
    if (firstLogin && !hasProfile) {
      message = "Welcome! Open your shop by creating a profile and start listing products.";
    } else if (!hasProfile) {
      message = "Welcome back! Set up your shop to start selling.";
    } else {
      message = "Welcome back! Manage your products and shop details below.";
    }
  } else if (role === 'admin') {
    message = "Welcome, Admin! Use the tools on the left to manage users and site content.";
  } else {
    message = "Welcome to your dashboard.";
  }

  return (
    <div className="bg-[#F9F4EF] p-6 rounded-lg border border-[#E6E1DC]">
      <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-2">
        Welcome, {name}!
      </h2>
      <p className="text-[#6C6C6C]">{message}</p>
    </div>
  );
}
