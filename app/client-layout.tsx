"use client"

import React, { useEffect } from 'react';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/footer/footer';
import { trackPageView } from '@/utils/tracking';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  useEffect(() => {
    // Track initial page view only
    trackPageView(window.location.pathname);
  }, []);

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
} 