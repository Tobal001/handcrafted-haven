// src/components/ui/AccordionSection.tsx
'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function AccordionSection({
  title,
  children,
  defaultOpen = false,
}: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border bg-[#FDFBF8] border-[#E6E1DC] rounded-md shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full px-4 py-3 bg-[#FDFBF8] hover:bg-[#FAF6F1] focus:outline-none"
      >
        <span className="text-sm font-medium text-[#3E3E3E]">{title}</span>
        {isOpen ? (
          <ChevronDownIcon className="h-5 w-5 text-[#B55B3D]" />
        ) : (
          <ChevronRightIcon className="h-5 w-5 text-[#B55B3D]" />
        )}
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[2000px] p-6' : 'max-h-0 overflow-hidden'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
