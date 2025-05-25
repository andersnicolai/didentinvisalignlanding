import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import Logo from "@/components/logo";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 text-sm font-medium">
              Hjem
            </Link>
            <Link href="/behandlinger" className="text-gray-700 hover:text-blue-600 text-sm font-medium">
              Behandlinger
            </Link>
            <Link href="/priser" className="text-gray-700 hover:text-blue-600 text-sm font-medium">
              Priser
            </Link>
            <Link href="/om-oss" className="text-gray-700 hover:text-blue-600 text-sm font-medium">
              Om oss
            </Link>
            <Link href="/kontakt" className="text-gray-700 hover:text-blue-600 text-sm font-medium">
              Kontakt
            </Link>
          </nav>
          
          {/* Booking button */}
          <div className="hidden md:block">
            <Button asChild variant="primary">
              <Link href="/booking">
                Bestill time
              </Link>
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Lukk meny" : "Åpne meny"}
            >
              {isMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Hjem
            </Link>
            <Link 
              href="/behandlinger" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Behandlinger
            </Link>
            <Link 
              href="/priser" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Priser
            </Link>
            <Link 
              href="/om-oss" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Om oss
            </Link>
            <Link 
              href="/kontakt" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Kontakt
            </Link>
            <div className="px-3 py-2">
              <Button asChild variant="primary" fullWidth>
                <Link href="/booking">
                  Bestill time
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 