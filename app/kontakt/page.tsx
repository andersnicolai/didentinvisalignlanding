import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontakt Oss | Dident Tannklinikk Oslo",
  description: "Ta kontakt med Dident Tannklinikk for å avtale en time eller få svar på dine spørsmål. Vi er her for å hjelpe med alle dine tannhelsebehov.",
  keywords: "tannlege kontakt, bestill time tannlege, tannlege oslo, tannklinikk kontakt, akutt tannbehandling",
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero section */}
        <section className="bg-blue-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Kontakt oss
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Vi er her for å hjelpe deg med alle dine tannhelsebehov. Kontakt oss for å avtale en time eller få svar på dine spørsmål.
              </p>
            </div>
          </div>
        </section>

        {/* Contact information and form */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Kontaktinformasjon</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPinIcon className="h-6 w-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">Adresse</h3>
                      <p className="text-gray-600 mt-1">Sandakerveien 59, 0477 Oslo</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <PhoneIcon className="h-6 w-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">Telefon</h3>
                      <p className="text-gray-600 mt-1">
                        <a href="tel:+4722230303" className="hover:text-blue-600">
                          22 23 03 03
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MailIcon className="h-6 w-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">E-post</h3>
                      <p className="text-gray-600 mt-1">
                        <a href="mailto:post@dident.no" className="hover:text-blue-600">
                          post@dident.no
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <ClockIcon className="h-6 w-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">Åpningstider</h3>
                      <div className="text-gray-600 mt-1 space-y-1">
                        {openingHours.map((day) => (
                          <div key={day.day} className="flex justify-between">
                            <span className="mr-4 w-28">{day.day}</span>
                            <span>{day.hours}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium text-gray-900 mb-4">Akutt tannbehandling</h3>
                  <p className="text-gray-600 mb-4">
                    Har du akutte smerter eller et tannproblem som krever øyeblikkelig hjelp? 
                    Ring oss på <a href="tel:+4722230303" className="text-blue-600 hover:underline">22 23 03 03</a> 
                    for prioritert behandling.
                  </p>
                  <p className="text-gray-600">
                    Vi setter av tid hver dag for akuttpasienter og vil gjøre vårt beste for å hjelpe deg så raskt som mulig.
                  </p>
                </div>
              </div>
              
              {/* Contact form */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send oss en melding</h2>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Navn
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Ditt navn"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        E-post
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="din@epost.no"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="12345678"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Emne
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="Hva gjelder henvendelsen?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Melding
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Skriv din melding her..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="pt-2">
                    <Button type="submit" className="w-full">
                      Send melding
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map section */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-100 rounded-lg overflow-hidden h-96">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000.5332735268072!2d10.7502893!3d59.934761399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46416e7be22c2035%3A0xf51095a0f15a1c84!2sSandakerveien%2059%2C%200477%20Oslo!5e0!3m2!1sen!2sno!4v1651821213424!5m2!1sen!2sno" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Dident Tannklinikk lokasjon"
              />
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="bg-blue-600 py-12 md:py-16 mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Klar til å bestille time?
            </h2>
            <p className="text-blue-100 mb-8 max-w-3xl mx-auto">
              Bruk vårt enkle online bookingsystem for å finne en tid som passer for deg.
            </p>
            <Button asChild variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              <Link href="/booking">
                Bestill time nå
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

const openingHours = [
  { day: "Mandag", hours: "08:00 - 16:00" },
  { day: "Tirsdag", hours: "08:00 - 18:00" },
  { day: "Onsdag", hours: "08:00 - 16:00" },
  { day: "Torsdag", hours: "08:00 - 18:00" },
  { day: "Fredag", hours: "08:00 - 15:00" },
  { day: "Lørdag - Søndag", hours: "Stengt" },
]; 