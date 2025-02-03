const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dident-landing-api.azurewebsites.net';

type TrackingEvent = {
  event_name: string;
  event_id?: string;
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  user_data?: {
    email?: string;
    phone?: string;
    name?: string;
    firstName?: string;
    lastName?: string;
  };
  properties?: Record<string, any>;
};

// Utvide med brukerdata
interface UserSession {
  sessionId: string;
  startTime: number;
  referrer: string;
  userAgent: string;
  screenResolution: string;
  device: string;
  path: string;
}

// Oppdaterte type-definisjoner for Clarity
interface ClarityWindow extends Window {
  clarity?: Function;
  [key: string]: any;
}

interface HTMLScriptElement extends HTMLElement {
  async?: boolean;
  src?: string;
}

declare const window: ClarityWindow;

export const trackEvent = (event: TrackingEvent) => {
  if (typeof window === 'undefined') return;

  // Facebook Pixel - Forbedret med flere parametere
  if ((window as any).fbq) {
    console.log('Sending event to Facebook:', event.event_name, {
      value: event.value,
      currency: event.currency || 'NOK',
      content_name: event.content_name,
      content_category: event.content_category,
      content_type: 'service',
      content_ids: ['tannrens_gratis'],
      delivery_category: 'in_person',
      status: event.properties?.status || 'initiated',
      service_type: event.properties?.service_type || 'tannrens',
      is_free_service: event.properties?.is_free_service || true,
      booking_date: event.properties?.booking_date,
      booking_time: event.properties?.booking_time,
      campaign_name: 'gratis_tannrens',
      campaign_source: document.referrer || 'direct',
      landing_page: window.location.href,
      user_data: {
        email: event.user_data?.email,
        phone: event.user_data?.phone,
        external_id: event.properties?.sessionId
      }
    });
    
    (window as any).fbq('track', event.event_name, {
      value: event.value,
      currency: event.currency || 'NOK',
      content_name: event.content_name,
      content_category: event.content_category,
      content_type: 'service',
      content_ids: ['tannrens_gratis'],
      delivery_category: 'in_person',
      status: event.properties?.status || 'initiated',
      service_type: event.properties?.service_type || 'tannrens',
      is_free_service: event.properties?.is_free_service || true,
      booking_date: event.properties?.booking_date,
      booking_time: event.properties?.booking_time,
      campaign_name: 'gratis_tannrens',
      campaign_source: document.referrer || 'direct',
      landing_page: window.location.href,
      user_data: {
        email: event.user_data?.email,
        phone: event.user_data?.phone,
        external_id: event.properties?.sessionId
      }
    });
  }

  // Google Analytics
  if ((window as any).gtag) {
    (window as any).gtag('event', event.event_name, {
      event_category: event.content_category,
      event_label: event.content_name,
      value: event.value,
      currency: event.currency,
      user_id: event.user_data?.email, // Anonymisert bruker-ID
      booking_date: event.properties?.booking_date,
      booking_time: event.properties?.booking_time,
      service_type: event.properties?.service_type,
      campaign: event.properties?.campaign,
      source: event.properties?.source,
      status: event.properties?.status,
      send_to: process.env.NEXT_PUBLIC_GA_ID,
      non_interaction: false
    });
  }

  // Hotjar
  if ((window as any).hj) {
    (window as any).hj('trigger', event.event_name);
    (window as any).hj('identify', null, {
      'booking_date': event.properties?.booking_date,
      'service_type': 'tannrens',
      'is_free_service': true
    });
  }

  // Server-side tracking med forbedret data og riktig API URL
  const session: UserSession = {
    sessionId: generateSessionId(),
    startTime: Date.now(),
    referrer: document.referrer,
    userAgent: navigator.userAgent,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    device: getDeviceType(),
    path: window.location.pathname
  };

  fetch(`${API_URL}/api/track/conversion`, {  // Bruker API_URL konstant
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...event,
      session,
      fbp: (document.cookie.match('_fbp=([^;]*)') || [])[1],
      fbc: (document.cookie.match('_fbc=([^;]*)') || [])[1]
    }),
  }).catch(error => {
    console.error('Failed to send server-side tracking:', error);
  });
};

// Session recording setup
export const initializeTracking = () => {
  if (typeof window === 'undefined') return;
  // Vi kan legge til Clarity her senere
};

// Helpers
const generateSessionId = () => Math.random().toString(36).substring(2, 15);

const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return "mobile";
  }
  return "desktop";
};

export const trackPageView = (url: string) => {
  if (typeof window === 'undefined' || !(window as any).gtag) return;
  
  (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
    page_path: url,
    page_title: document.title
  });
}; 