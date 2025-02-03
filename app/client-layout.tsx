"use client"

import { useEffect } from 'react';
import { trackPageView } from '@/utils/tracking';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Test GA4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'test_event', {
        event_category: 'testing',
        event_label: 'GA4 Test',
        value: 1
      });
      console.log('Test event sent to GA4');
    }
    
    // Test Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'ViewContent', {
        content_name: 'Landing Page View',
        content_category: 'Landing Pages',
        value: 1200.00,
        currency: 'NOK'
      });
      console.log('Facebook Pixel test event sent');
    } else {
      console.error('Facebook Pixel not loaded');
    }
    
    // Track initial page view
    trackPageView(window.location.pathname);
  }, []);
  
  return <>{children}</>;
} 