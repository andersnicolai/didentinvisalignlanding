import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Script from 'next/script';
import ClientLayout from './client-layout';

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL('https://kampanje.dident.no'),
  title: "Dident Tannklinikk - Moderne tannbehandling i Oslo",
  description: "Dident Tannklinikk tilbyr høykvalitets tannlegetjenester i Oslo. Spesialister på Invisalign, implantat, tannbleking og generell tannpleie.",
  keywords: "tannlege, oslo, invisalign, tannbleking, tannlegevakt, implantat, tannregulering",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />

        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-52NCXZ7N');
              console.log('Google Tag Manager initialized with ID: GTM-52NCXZ7N');
            `,
          }}
        />

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
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-52NCXZ7N"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
