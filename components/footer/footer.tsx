import Link from "next/link";
import Image from "next/image";
import { ClockIcon, FacebookIcon, InstagramIcon, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { NewsletterForm } from "@/components/newsletter-form";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* New patient promotion banner */}
      <div className="bg-[#4A6741] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Ny pasient? Vi gir 30% rabatt til nye pasienter</h3>
              <p className="mt-1">Dident gir 30% rabatt på undersøkelse for nye pasienter.</p>
            </div>
            <Link href="/booking">
              <Button className="bg-white text-[#4A6741] hover:bg-gray-100 flex items-center">
                Bestill time <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Clinic info */}
          <div>
            <div className="mb-4">
              <div className="bg-white p-2 rounded-md inline-block">
                <Logo />
              </div>
            </div>
            <p className="text-sm mb-6">
              Vi gir deg et sunt smil med skånsom behandling og topp moderne utstyr i hjertet av Oslo. God tannhelse kan bidra til å forebygge hjerteproblemer, diabetes, betennelser og andre sykdommer.
            </p>
            <div className="mt-6">
              <Link href="/booking">
                <Button className="bg-[#4A6741] text-white hover:bg-[#3a5334] w-full">
                  Bestill time nå
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-medium mb-4">Behandlinger</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/behandlinger/invisalign" className="text-sm hover:text-white">
                  Invisalign
                </Link>
              </li>
              <li>
                <Link href="/behandlinger/tannbleking" className="text-sm hover:text-white">
                  Tannbleking
                </Link>
              </li>
              <li>
                <Link href="/behandlinger/tannrens" className="text-sm hover:text-white">
                  Tannrens
                </Link>
              </li>
              <li>
                <Link href="/behandlinger/tannimplantat" className="text-sm hover:text-white">
                  Tannimplantat
                </Link>
              </li>
              <li>
                <Link href="/behandlinger/rotfylling" className="text-sm hover:text-white">
                  Rotfylling
                </Link>
              </li>
              <li>
                <Link href="/akutt" className="text-sm hover:text-white">
                  Akutt tannbehandling
                </Link>
              </li>
              <li>
                <Link href="/priser" className="text-sm hover:text-white flex items-center">
                  <span>Se alle behandlinger</span>
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening hours */}
          <div>
            <h3 className="text-white font-medium mb-4">Åpningstider</h3>
            <div className="space-y-2">
              {openingHours.map((day) => (
                <div key={day.day} className="flex justify-between text-sm">
                  <span>{day.day}</span>
                  <span>{day.hours}</span>
                </div>
              ))}
              <div className="flex items-start mt-4 pt-2 border-t border-gray-700">
                <ClockIcon className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  Ledige timer tilgjengelig hver dag. Bestill online for rask respons.
                </p>
              </div>
            </div>
          </div>

          {/* Social and newsletter */}
          <div>
            <h3 className="text-white font-medium mb-4">Om Dident</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <Link href="/om-oss" className="text-sm hover:text-white">
                  Om oss
                </Link>
              </li>
              <li>
                <Link href="/priser" className="text-sm hover:text-white">
                  Priser
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-sm hover:text-white">
                  Kontakt oss
                </Link>
              </li>
              <li>
                <Link href="/tannlegeskrekk" className="text-sm hover:text-white">
                  Tannlegeskrekk
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-sm hover:text-white">
                  Bestill time
                </Link>
              </li>
            </ul>
            
            <h3 className="text-white font-medium mb-3">Følg oss</h3>
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://facebook.com/didenttannklinikk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com/didenttannklinikk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-full hover:from-purple-600 hover:to-pink-600"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
            
            <NewsletterForm />
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-green-600 text-white p-1 rounded-full mr-2">
                <CheckCircle className="h-4 w-4" />
              </div>
              <p className="text-sm">Sertifisert som miljøbevisst klinikk</p>
            </div>
            <p className="text-sm order-3 md:order-2 mt-4 md:mt-0">
              &copy; {currentYear} Dident Tannklinikk. Alle rettigheter forbeholdt.
            </p>
            <div className="flex space-x-4 order-2 md:order-3 mt-2 md:mt-0">
              <Link href="/personvern" className="text-sm hover:text-white">
                Personvern
              </Link>
              <Link href="/cookies" className="text-sm hover:text-white">
                Cookies
              </Link>
              <Link href="/vilkar" className="text-sm hover:text-white">
                Vilkår
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const openingHours = [
  { day: "Mandag", hours: "08:00 - 20:00" },
  { day: "Tirsdag", hours: "08:00 - 20:00" },
  { day: "Onsdag", hours: "08:00 - 20:00" },
  { day: "Torsdag", hours: "08:00 - 20:00" },
  { day: "Fredag", hours: "08:00 - 20:00" },
  { day: "Lørdag", hours: "10:00 - 16:00" },
  { day: "Søndag", hours: "10:00 - 16:00" },
]; 