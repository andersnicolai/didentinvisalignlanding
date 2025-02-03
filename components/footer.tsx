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
                <a href="tel:+4794095643" className="hover:text-[#F4EBDA] transition-colors">
                  +47 940 95 643
                </a>
              </div>
              <div className="flex items-center group">
                <Mail className="h-5 w-5 mr-3 group-hover:text-[#F4EBDA] transition-colors" />
                <a href="mailto:info@dident.no" className="hover:text-[#F4EBDA] transition-colors">
                  info@dident.no
                </a>
              </div>
              <div className="flex items-center group">
                <MapPin className="h-5 w-5 mr-3 group-hover:text-[#F4EBDA] transition-colors" />
                <a 
                  href="https://maps.google.com/?q=Stavangergata+44b,+0467+Oslo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#F4EBDA] transition-colors"
                >
                  Stavangergata 44b, 0467 Oslo
                </a>
              </div>
            </div>

            {/* Legg til lokasjonsbeskrivelse */}
            <div className="mt-6 text-sm text-white/90">
              <p>
                Lett tilgjengelig lokasjon på Bjølsen med gode parkeringsmuligheter.
              </p>
            </div>
          </div>

          {/* Høyre side */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Åpningstider</h3>
            <div className="space-y-2 text-white/90">
              <p>Mandag - Fredag: 08:00 - 16:00</p>
              <p>Lørdag - Søndag: Stengt</p>
            </div>
            
            {/* Oppdatert Om oss seksjon */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Om DiDent Tannlegesenter</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Vi er stolte av å ha vår klinikk på en praktisk og sentral plassering 
                i Bjølsen, slik at du enkelt kan komme til oss for behandling. DiDent 
                Tannlegesenter tilbyr moderne fasiliteter og et vennlig miljø, hvor vi 
                setter din komfort og helse i høysetet.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center text-sm text-white/70">
          <p>© {new Date().getFullYear()} DiDent Tannlegesenter. Alle rettigheter reservert.</p>
        </div>
      </div>
    </footer>
  )
}

