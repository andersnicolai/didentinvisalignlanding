import { detect } from 'detect-browser';

type TrackingEvent = {
  event_name: string;
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  user_data?: {
    email?: string;
    phone?: string;
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
  browser: string;
  device: string;
  path: string;
}

export const trackEvent = (event: TrackingEvent) => {
  if (typeof window === 'undefined') return;

  // Facebook Pixel
  if ((window as any).fbq) {
    (window as any).fbq('track', event.event_name, {
      value: event.value,
      currency: event.currency || 'NOK',
      content_name: event.content_name,
      content_category: event.content_category,
    });
  }

  // Google Analytics
  if ((window as any).gtag) {
    (window as any).gtag('event', event.event_name, {
      ...event.properties,
      value: event.value,
    });
  }

  // Hotjar
  if ((window as any).hj) {
    (window as any).hj('trigger', event.event_name);
  }

  // Server-side tracking
  const browser = detect();
  const session: UserSession = {
    sessionId: generateSessionId(),
    startTime: Date.now(),
    referrer: document.referrer,
    userAgent: navigator.userAgent,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    browser: browser?.name || 'unknown',
    device: getDeviceType(),
    path: window.location.pathname
  };

  fetch('/api/track/conversion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...event,
      session,
    }),
  });
};

// Session recording setup
export const initializeTracking = () => {
  // Microsoft Clarity
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", process.env.NEXT_PUBLIC_CLARITY_ID);

  // Hotjar - Korrekt implementering
  (function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:5290373,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
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