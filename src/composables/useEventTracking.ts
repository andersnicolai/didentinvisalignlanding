import axios from 'axios';
import { config } from '../lib/config';

interface TrackingEvent {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: any;
}

declare global {
  interface Window {
    fbq?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
    gtag?: (...args: any[]) => void;
  }
}

export function useEventTracking() {
  const trackEvent = async (eventName: string, params: TrackingEvent = {}) => {
    // Facebook Pixel
    if (window.fbq) {
      window.fbq('trackCustom', eventName, {
        ...params,
        event_source_url: config.baseUrl
      });
    }
    
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', eventName, params);
    }
    
    try {
      // Send til backend for logging
      await axios.post(`${config.apiUrl}/api/track`, {
        event: eventName,
        params,
        timestamp: new Date().toISOString(),
        url: window.location.href
      });
    } catch (error) {
      console.error('Tracking error:', error);
    }
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