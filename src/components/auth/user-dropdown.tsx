

// src/components/auth/user-dropdown.tsx

'use client';

import { signOut } from 'next-auth/react';
import { UserCircleIcon, ArrowRightOnRectangleIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';


export default function UserDropdown({ name }: { name: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  let hoverTimeout: NodeJS.Timeout;

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  const handleDropdownMouseEnter = () => {
    clearTimeout(hoverTimeout);
  };

  const handleDropdownMouseLeave = () => {
    hoverTimeout = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearTimeout(hoverTimeout);
    };
  }, []);

  return (
    <div 
      className="relative"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        className="flex items-center gap-2 hover:bg-[#9E4F37] p-2 rounded transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <UserCircleIcon className="h-6 w-6 text-white" />
        <span className="text-white">{name}</span>
      </button>
      
      {isOpen && (
        <div 
          className={`
            absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-[#E6E1DC]
            transform translate-x-1/2 sm:translate-x-0
          `}
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
        >
          {/* <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 text-sm text-[#3E3E3E] hover:bg-[#F9F4EF]"
            onClick={() => setIsOpen(false)}
          >
            <HomeIcon className="h-4 w-4" />
            Home
          </Link> */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-4 py-2 text-sm text-[#3E3E3E] hover:bg-[#F9F4EF]"
            onClick={() => setIsOpen(false)}
          >
            <Squares2X2Icon className="h-4 w-4" />
            View Dashboard
          </Link>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-[#3E3E3E] hover:bg-[#F9F4EF] text-left"
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}








// // src/components/auth/user-dropdown.tsx
// 'use client';

// import { signOut } from 'next-auth/react';
// import { UserCircleIcon, ArrowRightOnRectangleIcon, HomeIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
// import Link from 'next/link';
// import { useState, useRef, useEffect } from 'react';

// export default function UserDropdown({ name }: { name: string }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const handleMouseEnter = () => {
//     if (hoverTimeoutRef.current) {
//       clearTimeout(hoverTimeoutRef.current);
//     }
//     setIsOpen(true);
//   };

//   const handleMouseLeave = () => {
//     hoverTimeoutRef.current = setTimeout(() => {
//       setIsOpen(false);
//     }, 500);
//   };

//   const handleDropdownMouseEnter = () => {
//     if (hoverTimeoutRef.current) {
//       clearTimeout(hoverTimeoutRef.current);
//     }
//   };

//   const handleDropdownMouseLeave = () => {
//     hoverTimeoutRef.current = setTimeout(() => {
//       setIsOpen(false);
//     }, 300);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//       if (hoverTimeoutRef.current) {
//         clearTimeout(hoverTimeoutRef.current);
//       }
//     };
//   }, []);

//   return (
//     <div 
//       className="relative"
//       ref={dropdownRef}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <button 
//         className="flex items-center gap-2 hover:bg-[#9E4F37] p-2 rounded transition-colors"
//         onClick={() => setIsOpen(!isOpen)}
//         aria-expanded={isOpen}
//         aria-haspopup="true"
//       >
//         <UserCircleIcon className="h-6 w-6 text-white" />
//         <span className="text-white">{name}</span>
//       </button>
      
//       {isOpen && (
//         <div 
//           className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-[#E6E1DC]"
//           onMouseEnter={handleDropdownMouseEnter}
//           onMouseLeave={handleDropdownMouseLeave}
//         >
//           <Link
//             href="/"
//             className="flex items-center gap-2 px-4 py-2 text-sm text-[#3E3E3E] hover:bg-[#F9F4EF]"
//             onClick={() => setIsOpen(false)}
//           >
//             <HomeIcon className="h-4 w-4" />
//             Home
//           </Link>
//           <Link
//             href="/dashboard"
//             className="flex items-center gap-2 px-4 py-2 text-sm text-[#3E3E3E] hover:bg-[#F9F4EF]"
//             onClick={() => setIsOpen(false)}
//           >
//             <Squares2X2Icon className="h-4 w-4" />
//             View Dashboard
//           </Link>
//           <button
//             onClick={() => signOut()}
//             className="flex items-center gap-2 w-full px-4 py-2 text-sm text-[#3E3E3E] hover:bg-[#F9F4EF] text-left"
//           >
//             <ArrowRightOnRectangleIcon className="h-4 w-4" />
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }