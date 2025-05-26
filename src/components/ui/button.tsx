
// src/components/ui/button.tsx
'use client';

import { clsx } from 'clsx';
import { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

export function Button({ 
  children, 
  variant = 'primary', 
  className,
  ...rest 
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';
  
  const variantClasses = {
    primary: 'bg-[#B55B3D] text-white hover:bg-[#9E4F37] focus-visible:outline-[#B55B3D]',
    secondary: 'bg-[#F9F4EF] text-[#3E3E3E] hover:bg-[#E6E1DC] focus-visible:outline-[#F9F4EF]',
    outline: 'border border-[#E6E1DC] text-[#3E3E3E] hover:bg-[#F9F4EF] focus-visible:outline-[#E6E1DC]',
  };

  return (
    <button
      className={clsx(baseClasses, variantClasses[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
}