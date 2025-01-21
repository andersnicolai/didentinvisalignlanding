import axios from 'axios';
import { config } from '@/lib/config';

interface TrackingEvent {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: any;
}

declare global {
  interface Window {
    fbq?: any;
    gtag?: any;
  }
}

export function useEventTracking() {
  const trackEvent = (eventName: string, params: TrackingEvent = {}) => {
    // Facebook Pixel
    if (window.fbq) {
      window.fbq('trackCustom', eventName, params);
    }
    
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', eventName, params);
    }
    
    // Send til backend for logging
    axios.post('/api/track', {
      event: eventName,
      params,
      timestamp: new Date().toISOString(),
      url: window.location.href
    }).catch(console.error);
  };

  const trackPageView = (params = {}) => {
    trackEvent('page_view', params);
  };

  const trackLead = (params = {}) => {
    trackEvent('generate_lead', params);
  };

  const trackViewContent = (params = {}) => {
    trackEvent('view_content', params);
  };

  const trackInitiateCheckout = (params = {}) => {
    trackEvent('initiate_checkout', params);
  };

  return {
    trackEvent,
    trackPageView,
    trackLead,
    trackViewContent,
    trackInitiateCheckout
  };
} 