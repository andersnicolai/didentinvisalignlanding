import { Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full px-4 py-12 bg-[#4A6741] text-white">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Venstre side */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Kontakt Dident</h2>
            <div className="space-y-4">
              <div className="flex items-center group">
                <Phone className="h-5 w-5 mr-3 group-hover:text-[#F4EBDA] transition-colors" />
                <a href="tel:+4712345678" className="hover:text-[#F4EBDA] transition-colors">
                  +47 123 45 678
                </a>
              </div>
              <div className="flex items-center group">
                <Mail className="h-5 w-5 mr-3 group-hover:text-[#F4EBDA] transition-colors" />
                <a href="mailto:kontakt@dident.no" className="hover:text-[#F4EBDA] transition-colors">
                  kontakt@dident.no
                </a>
              </div>
              <div className="flex items-center group">
                <MapPin className="h-5 w-5 mr-3 group-hover:text-[#F4EBDA] transition-colors" />
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#F4EBDA] transition-colors"
                >
                  Tannlegegata 1, 0123 Oslo
                </a>
              </div>
            </div>
          </div>

          {/* Høyre side */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Åpningstider</h3>
            <div className="space-y-2 text-white/90">
              <p>Mandag - Fredag: 08:00 - 16:00</p>
              <p>Lørdag - Søndag: Stengt</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center text-sm text-white/70">
          <p>© {new Date().getFullYear()} Dident Tannlegesenter. Alle rettigheter reservert.</p>
        </div>
      </div>
    </footer>
  )
}

