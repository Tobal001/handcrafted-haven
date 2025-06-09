
// src/components/products/ClientPagination.tsx

'use client'; 

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import React, { useCallback } from 'react';

interface ClientPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function ClientPagination({ currentPage, totalPages }: ClientPaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handlePageChange = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.replace(`${pathname}?${params.toString()}`);
  }, [searchParams, router, pathname]); // Ensure all used hooks are in dependencies

  return (
    <div className="mt-8 flex justify-center">
      <nav className="flex items-center gap-2">
        <button
          className="px-3 py-1 rounded border border-[#E6E1DC] bg-white text-[#3E3E3E] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded border ${
              page === currentPage ? 'border-[#B55B3D] bg-[#B55B3D] text-white' : 'border-[#E6E1DC] bg-white text-[#3E3E3E]'
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="px-3 py-1 rounded border border-[#E6E1DC] bg-white text-[#3E3E3E] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </nav>
    </div>
  );
}