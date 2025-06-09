// src/components/layout/ClientFooter.tsx
'use client'; // This directive makes it a Client Component

import React, { useState, useEffect } from 'react';

export default function ClientFooter() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Function to update time
    const updateTime = () => {
      const now = new Date();
      // Format time to show hours, minutes, and AM/PM
      const timeString = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      // Get location (timezone short name if available, or just city/region)
      const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const locationParts = timezoneName.split('/');
      const location = locationParts[locationParts.length - 1].replace(/_/g, ' '); // Get last part and replace underscores

      setCurrentTime(`${timeString} ${location}`);
    };

    // Update time immediately on mount
    updateTime();

    // Update time every minute
    const intervalId = setInterval(updateTime, 60 * 1000); // Update every 60 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this runs once on mount

  return (
    // Added mt-8 for margin-top
    <footer className="mt-8 px-6 py-8 bg-[#F0ECE8] text-center text-sm text-[#6C6C6C]">
      <p className="mb-2">
        &copy; {currentYear} Handcrafted Haven Marketplace. All Rights Reserved.
      </p>
      <p className="text-xs md:text-sm">
        {currentTime && `Current Time: ${currentTime}`}
      </p>
      <p className="text-xs md:text-sm mt-1">
        WWD430 Team 12
      </p>
    </footer>
  );
}