import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer";
import { formatPrice } from "@/lib/utils";
import TreatmentComparison from "@/components/treatment-comparison";

export const metadata: Metadata = {
  title: "Tannbehandlinger | Dident Tannklinikk Oslo",
  description: "Utforsk våre behandlinger for et friskere, penere smil. Vi tilbyr Invisalign, tannbleking, tannimplantater og mye mer hos Dident Tannklinikk i Oslo.",
  keywords: "tannbehandling, tannlege, oslo, invisalign, tannbleking, tannimplantater, estetisk tannbehandling",
};

export default function BehandlingerPage() {
  // Treatment features for comparison
  const features = [
    {
      id: "aesthetics",
      name: "Estetisk resultat",
      description: "Hvor naturlig og pent resultatet blir"
    },
    {
      id: "longevity",
      name: "Holdbarhet",
      description: "Forventet levetid for behandlingen"
    },
    {
      id: "comfort",
      name: "Komfort",
      description: "Opplevelse under behandling og etterpå"
    },
    {
      id: "maintenance",
      name: "Vedlikehold",
      description: "Behov for oppfølging og vedlikehold"
    },
    {
      id: "treatment_time",
      name: "Behandlingstid",
      description: "Total lengde på behandlingen"
    },
    {
      id: "pain_level",
      name: "Ubehag/Smerte",
      description: "Nivå av ubehag under og etter behandling"
    }
  ];

  // Treatment options
  const treatments = [
    {
      id: "invisalign",
      name: "Invisalign",
      description: "Usynlig tannregulering",
      price: 45000,
      priceNote: "Fra 45.000 kr, avhengig av kompleksitet",
      path: "/behandlinger/invisalign",
      color: "blue",
      popular: true,
      features: {
        aesthetics: "Utmerket",
        longevity: "Permanent*",
        comfort: "Høy",
        maintenance: "Lavt",
        treatment_time: "6-18 måneder",
        pain_level: "Minimalt"
      }
    },
    {
      id: "tannbleking",
      name: "Tannbleking",
      description: "Profesjonell hvitere tenner",
      price: 3500,
      path: "/behandlinger/tannbleking",
      color: "yellow",
      features: {
        aesthetics: "Meget god",
        longevity: "1-3 år",
        comfort: "Høy",
        maintenance: "Moderat",
        treatment_time: "1-2 timer",
        pain_level: "Svært lavt"
      }
    },
    {
      id: "tannimplantat",
      name: "Tannimplantat",
      description: "Permanente tannerstatninger",
      price: 25000,
      priceNote: "Per tann, inkludert krone",
      path: "/behandlinger/tannimplantat",
      color: "green",
      popular: true,
      features: {
        aesthetics: "Utmerket",
        longevity: "Livsvarig",
        comfort: "God",
        maintenance: "Lavt",
        treatment_time: "3-6 måneder",
        pain_level: "Moderat"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Våre tannbehandlinger
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
                Hos Dident Tannklinikk tilbyr vi et bredt spekter av behandlinger for å gi deg et sunnere og vakrere smil.
                Vårt team av eksperter bruker den nyeste teknologien for best mulig resultat.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild variant="primary" size="lg">
                  <Link href="#sammenlign">
                    Sammenlign behandlinger
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/kontakt">
                    Kontakt oss
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Treatments */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
              Våre mest populære behandlinger
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Invisalign Card */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src="/images/treatments/invisalign-hero.jpg"
                    alt="Invisalign behandling"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Invisalign</h3>
                  <p className="text-gray-600 mb-4">
                    Usynlig tannregulering som retter opp skjeve tenner uten tradisjonelle metallbraketter.
                    Komfortabelt, effektivt og nesten usynlig.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-blue-600">Fra 45.000 kr</span>
                    <span className="text-sm text-gray-500">6-18 måneder</span>
                  </div>
                  <Button asChild variant="primary" className="w-full">
                    <Link href="/behandlinger/invisalign">
                      Les mer om Invisalign
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Tannbleking Card */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src="/images/treatments/whitening-hero.jpg"
                    alt="Tannbleking behandling"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Tannbleking</h3>
                  <p className="text-gray-600 mb-4">
                    Profesjonell tannbleking som gir deg et lysere og hvitere smil. 
                    Sikker, effektiv og skånsom mot emaljen.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-yellow-600">3.500 kr</span>
                    <span className="text-sm text-gray-500">1-2 timer</span>
                  </div>
                  <Button asChild variant="outline" className="w-full border-yellow-600 text-yellow-600 hover:bg-yellow-50">
                    <Link href="/behandlinger/tannbleking">
                      Les mer om Tannbleking
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Tannimplantat Card */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src="/images/treatments/implant-hero.jpg"
                    alt="Tannimplantat behandling"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Tannimplantat</h3>
                  <p className="text-gray-600 mb-4">
                    Permanente tannerstatninger som både ser ut og føles som naturlige tenner.
                    Gir deg tilbake et komplett smil og full funksjonalitet.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-green-600">Fra 25.000 kr</span>
                    <span className="text-sm text-gray-500">3-6 måneder</span>
                  </div>
                  <Button asChild variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                    <Link href="/behandlinger/tannimplantat">
                      Les mer om Tannimplantater
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Comparison Table */}
        <section id="sammenlign" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TreatmentComparison 
              title="Sammenlign våre behandlinger"
              subtitle="Finn den behandlingen som passer best for dine behov"
              features={features}
              treatments={treatments}
            />
            
            <div className="mt-10 text-center">
              <p className="text-gray-600 mb-6">
                Usikker på hvilken behandling som passer for deg? Vi tilbyr gratis konsultasjon
                der vi kan diskutere dine behov og anbefale den beste løsningen.
              </p>
              <Button asChild size="lg">
                <Link href="/kontakt">
                  Bestill gratis konsultasjon
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Hvorfor velge Dident for din tannbehandling?
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Vi kombinerer ekspertise, moderne teknologi og personlig omsorg for å gi deg den beste opplevelsen.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ekspertise</h3>
                <p className="text-gray-600">
                  Våre tannleger har spesialutdannelse og lang erfaring med avanserte behandlinger.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Moderne teknologi</h3>
                <p className="text-gray-600">
                  Vi bruker den nyeste teknologien for presis diagnostikk og effektiv behandling.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Effektiv behandling</h3>
                <p className="text-gray-600">
                  Vi setter av god tid til hver pasient og sørger for en effektiv behandlingsplan.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Personlig omsorg</h3>
                <p className="text-gray-600">
                  Vi prioriterer din komfort og trygghet gjennom hele behandlingen.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="bg-blue-600 py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Klar for et friskere, penere smil?
            </h2>
            <p className="text-blue-100 mb-8 max-w-3xl mx-auto">
              Ta det første steget mot et sunnere smil i dag. Bestill en konsultasjon hos våre eksperter,
              så hjelper vi deg med å finne den beste behandlingen for dine behov.
            </p>
            <Button asChild variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              <Link href="/kontakt">
                Bestill time nå
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

const treatments = [
  {
    id: 1,
    title: "Invisalign",
    slug: "invisalign",
    description: "Usynlig tannregulering som gir deg et perfekt smil uten tradisjonelle bøyler.",
    price: 45000,
    priceFrom: true,
    image: "/images/treatments/invisalign.jpg"
  },
  {
    id: 2,
    title: "Tannbleking",
    slug: "tannbleking",
    description: "Profesjonell tannbleking som gir deg et hvitere og friskere smil.",
    price: 3500,
    priceFrom: false,
    image: "/images/treatments/whitening.jpg"
  },
  {
    id: 3,
    title: "Tannimplantat",
    slug: "tannimplantat",
    description: "Erstatt manglende tenner med implantater som både ser ut og føles som ekte tenner.",
    price: 25000,
    priceFrom: true,
    image: "/images/treatments/implant.jpg"
  },
  {
    id: 4,
    title: "Tannrens",
    slug: "tannrens",
    description: "Grundig rengjøring som fjerner plakk og tannstein for å forebygge hull og tannkjøttsykdommer.",
    price: 1200,
    priceFrom: false,
    image: "/images/treatments/cleaning.jpg"
  },
  {
    id: 5,
    title: "Rotfylling",
    slug: "rotfylling",
    description: "Redder tennene dine ved å behandle infeksjon i tannroten og lindrer smerte.",
    price: 7500,
    priceFrom: true,
    image: "/images/treatments/root-canal.jpg"
  },
  {
    id: 6,
    title: "Tannkroner",
    slug: "tannkroner",
    description: "Kosmetisk og funksjonell restaurering av skadede tenner med naturlig utseende tannkroner.",
    price: 9500,
    priceFrom: true,
    image: "/images/treatments/crowns.jpg"
  }
]; 