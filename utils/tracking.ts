"use client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dident-landing-api.azurewebsites.net';

// Type definitions
interface TrackEventOptions {
  event_name: string;
  event_id?: string;
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  user_data?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    name?: string;
  };
  properties?: Record<string, any>;
}

interface UserSession {
  sessionId: string;
  startTime: number;
  referrer: string;
  userAgent: string;
  screenResolution: string;
  device: string;
  path: string;
}

interface ClarityWindow extends Window {
  clarity?: Function;
  [key: string]: any;
}

interface HTMLScriptElement extends HTMLElement {
  async?: boolean;
  src?: string;
}

declare const window: ClarityWindow;

/**
 * Generic event tracking that sends events to both Google Analytics and Facebook Pixel
 */
export function trackEvent(options: TrackEventOptions): void {
  if (typeof window === 'undefined') return;

  try {
    // Facebook Pixel tracking
    if ((window as any).fbq) {
      (window as any).fbq('track', options.event_name, {
        content_name: options.content_name,
        content_category: options.content_category,
        value: options.value,
        currency: options.currency,
        user_data: options.user_data ? {
          em: options.user_data.email,
          ph: options.user_data.phone,
          fn: options.user_data.firstName,
          ln: options.user_data.lastName,
        } : undefined,
        ...options.properties
      });
      console.log(`Facebook Pixel tracked: ${options.event_name}`);
    }

    // Google Analytics tracking
    if ((window as any).gtag) {
      (window as any).gtag('event', options.event_name, {
        event_id: options.event_id,
        value: options.value,
        currency: options.currency,
        content_name: options.content_name,
        content_category: options.content_category,
        user_data: options.user_data,
        ...options.properties
      });
      console.log(`Google Analytics tracked: ${options.event_name}`);
    }
  } catch (error) {
    console.error('Error tracking event:', error);
  }
}

/**
 * Track page views - call this on route changes
 */
export function trackPageView(path: string): void {
  if (typeof window === 'undefined') return;

  try {
    // Facebook Pixel page view
    if ((window as any).fbq) {
      (window as any).fbq('track', 'PageView', {
        page_path: path,
      });
      console.log(`Facebook Pixel PageView tracked: ${path}`);
    }

    // Google Analytics page view
    if ((window as any).gtag) {
      // Send page_view event
      (window as any).gtag('event', 'page_view', {
        page_path: path,
        page_title: document.title,
        page_location: window.location.href,
      });
      
      // Also update GA4 config for proper page tracking
      (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: path,
        page_title: document.title
      });
      
      console.log(`Google Analytics PageView tracked: ${path}`);
    }
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
}

/**
 * Track lead capture events specifically
 */
export function trackLead(leadData: {
  email: string;
  phone?: string;
  name?: string;
  service?: string;
  source?: string;
  value?: number;
}): void {
  const [firstName, ...lastNameParts] = (leadData.name || '').split(' ');
  const lastName = lastNameParts.join(' ');

  trackEvent({
    event_name: 'Lead',
    value: leadData.value || 1200, // Default value of a lead
    currency: 'NOK',
    content_name: leadData.service || 'General Inquiry',
    content_category: 'Lead Generation',
    user_data: {
      email: leadData.email,
      phone: leadData.phone,
      firstName,
      lastName,
      name: leadData.name,
    },
    properties: {
      lead_source: leadData.source || document.referrer || 'direct',
      lead_type: leadData.service ? 'service_specific' : 'general',
      landingPage: window.location.href,
      campaign: new URLSearchParams(window.location.search).get('utm_campaign') || 'organic'
    }
  });

  // Also record the lead in localStorage for retargeting purposes
  if (typeof localStorage !== 'undefined') {
    try {
      const leads = JSON.parse(localStorage.getItem('dident_leads') || '[]');
      leads.push({
        email: leadData.email,
        timestamp: Date.now(),
        service: leadData.service,
      });
      localStorage.setItem('dident_leads', JSON.stringify(leads));
    } catch (e) {
      console.error('Error saving lead to localStorage:', e);
    }
  }
}

/**
 * Track appointments that are actually booked
 */
export function trackAppointment(appointmentData: {
  email: string;
  phone?: string;
  name?: string;
  service: string;
  date: string;
  time: string;
  value?: number;
}): void {
  trackEvent({
    event_name: 'Schedule',
    value: appointmentData.value || 2500, // Higher value for a confirmed appointment
    currency: 'NOK',
    content_name: appointmentData.service,
    content_category: 'Appointment',
    user_data: {
      email: appointmentData.email,
      phone: appointmentData.phone,
      name: appointmentData.name,
    },
    properties: {
      appointment_date: appointmentData.date,
      appointment_time: appointmentData.time,
      service_type: appointmentData.service,
      landingPage: window.location.href,
    }
  });
}

/**
 * Initialize tracking tools
 */
export function initializeTracking(): void {
  if (typeof window === 'undefined') return;
  // We can add Clarity or other tools here later
}

/**
 * Helper functions
 */
const generateSessionId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

const getDeviceType = (): string => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return "mobile";
  }
  return "desktop";
};

/**
 * Helper function for direct GA4 page view tracking (simpler version)
 */
export const trackPageViewGA = (url: string) => {
  if (typeof window === 'undefined' || !(window as any).gtag) return;
  
  (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
    page_path: url,
    page_title: document.title
  });
}; 