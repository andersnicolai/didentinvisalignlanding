import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from 'next/script';
import ClientLayout from './client-layout';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kampanje.dident.no'),
  title: "Tannbleking Oslo | 50% Rabatt hos Dident Tannlegesenter på Bjølsen",
  description: "Få hvitere tenner med profesjonell tannbleking hos Dident på Bjølsen. Spar 50% - kun 1.995,- (ord. pris 4.940,-). Inkluderer gratis konsultasjon, AirFlow tannrens og erfarne tannleger. Bestill time i dag!",
  keywords: "tannbleking oslo, tannbleking bjølsen, tannbleking pris, tannbleking tilbud, profesjonell tannbleking, hvite tenner, tannlege oslo, tannlege bjølsen, dident tannlegesenter",
  authors: [{ name: "Dident Tannlegesenter" }],
  robots: "index, follow",
  icons: {
    icon: '/favicon.ico',
    apple: '/icon.png'
  },
  other: {
    "language": "Norwegian",
    "revisit-after": "7 days",
    "geo.region": "NO-03",
    "geo.placename": "Oslo",
    "geo.position": "59.937500;10.752778",
    "ICBM": "59.937500, 10.752778"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <head>
        {/* Hotjar Tracking Code - Contentsquare version */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function (c, s, q, u, a, r, e) {
                c.hj=c.hj||function(){(c.hj.q=c.hj.q||[]).push(arguments)};
                c._hjSettings = { hjid: a };
                r = s.getElementsByTagName('head')[0];
                e = s.createElement('script');
                e.async = true;
                e.src = q + c._hjSettings.hjid + u;
                r.appendChild(e);
            })(window, document, 'https://static.hj.contentsquare.net/c/csq-', '.js', 5290373);
          `
        }} />

        {/* Facebook Pixel - Oppdatert implementasjon */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '584429571008239');
            fbq('track', 'PageView');
            console.log('Facebook Pixel initialized'); // Debug melding
          `}
        </Script>
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=584429571008239&ev=PageView&noscript=1"
          />
        </noscript>

        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              console.log('GA4 Initialization with ID:', '${process.env.NEXT_PUBLIC_GA_ID}');
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                debug_mode: true,
                page_path: window.location.pathname,
                send_page_view: true,
                cookie_domain: 'dident.no',
                cookie_flags: 'SameSite=None;Secure'
              });
            `,
          }}
        />

        {/* MouseFlow - oppdatert med din ID */}
        <Script id="mouseflow" strategy="afterInteractive">
          {`
            window._mfq = window._mfq || [];
            (function() {
              var mf = document.createElement("script");
              mf.type = "text/javascript"; mf.defer = true;
              mf.src = "//cdn.mouseflow.com/projects/af34b384-518f-4f95-bd08-d0b6da6439ac.js";
              document.getElementsByTagName("head")[0].appendChild(mf);
            })();
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
