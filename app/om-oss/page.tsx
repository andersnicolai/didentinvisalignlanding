import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Om Oss | Dident Tannklinikk Oslo",
  description: "Møt vårt dedikerte team av tannleger og spesialister. Vi kombinerer ekspertise med omsorg for å gi deg den beste tannbehandlingen i Oslo.",
  keywords: "tannlege oslo, tannlegesenter, tannklinikk, dident, tannlege team, tannlegespesialist",
};

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero section */}
        <section className="bg-blue-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Om Dident Tannklinikk
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Vi bygger langsiktige relasjoner med våre pasienter basert på tillit, ekspertise og omsorg.
              </p>
            </div>
          </div>
        </section>

        {/* Our story */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Vår historie</h2>
                <p className="text-gray-600 mb-4">
                  Dident Tannklinikk ble etablert i 2010 med en visjon om å tilby tannbehandling i verdensklasse i hjertet av Oslo. 
                  Vi begynte som et lite tannlegekontor med fokus på generell tannpleie, men har siden utvidet til å bli en av Oslos ledende 
                  tannklinikker med et bredt spekter av spesialiserte tjenester.
                </p>
                <p className="text-gray-600 mb-4">
                  Vår filosofi har alltid vært å kombinere den nyeste teknologien med et dypt engasjement for pasientenes velvære. 
                  Vi tror på å skape et miljø der pasientene føler seg trygge, informerte og komfortable gjennom hele behandlingsprosessen.
                </p>
                <p className="text-gray-600">
                  I dag er vi stolte av å betjene tusenvis av fornøyde pasienter og å være en del av Oslo-samfunnet, 
                  hvor vi bidrar til bedre tannhelse og flottere smil hos våre medborgere.
                </p>
              </div>
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src="/images/clinic/reception.jpg"
                  alt="Dident Tannklinikk resepsjon"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our team */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Møt vårt team</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Vårt dedikerte team av tannleger og spesialister har en lidenskap for tannhelse og for å skape vakre smil.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member) => (
                <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-80">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-blue-600 mb-3">{member.role}</p>
                    <p className="text-gray-600 mb-4">{member.bio}</p>
                    <div className="flex space-x-4">
                      {member.specialties.map((specialty, index) => (
                        <span 
                          key={index} 
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our clinic */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Moderne fasiliteter</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Vår klinikk er utstyrt med den nyeste teknologien for å gi deg den mest effektive og komfortable behandlingen.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilities.map((facility) => (
                <div key={facility.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={facility.image}
                      alt={facility.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{facility.title}</h3>
                    <p className="text-gray-600">{facility.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="bg-blue-600 py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Klar til å oppleve forskjellen?
            </h2>
            <p className="text-blue-100 mb-8 max-w-3xl mx-auto">
              Bestill en konsultasjon hos Dident Tannklinikk i dag og ta det første steget mot et sunnere, vakrere smil.
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

const team = [
  {
    id: 1,
    name: "Dr. Maria Hansen",
    role: "Tannlege og klinikksjef",
    bio: "Dr. Hansen har over 15 års erfaring og spesialiserer seg på kosmetisk tannpleie og Invisalign-behandling.",
    image: "/images/team/dentist1.jpg",
    specialties: ["Invisalign", "Kosmetisk"]
  },
  {
    id: 2,
    name: "Dr. Anders Johansen",
    role: "Spesialist i endodonti",
    bio: "Dr. Johansen er vår rotfyllingsekspert med over 10 års erfaring i å behandle komplekse tannrotproblemer.",
    image: "/images/team/dentist2.jpg",
    specialties: ["Rotfylling", "Smertebehandling"]
  },
  {
    id: 3,
    name: "Dr. Sophie Berg",
    role: "Tannlege",
    bio: "Dr. Berg fokuserer på forebyggende tannpleie og er kjent for sin forsiktige tilnærming med engstelige pasienter.",
    image: "/images/team/dentist3.jpg",
    specialties: ["Generell tannpleie", "Barnetannpleie"]
  },
  {
    id: 4,
    name: "Dr. Thomas Olsen",
    role: "Implantatspesialist",
    bio: "Dr. Olsen har spesialisert seg på tannimplantater og utfører avanserte implantatprosedyrer med høy suksessrate.",
    image: "/images/team/dentist4.jpg",
    specialties: ["Implantater", "Kirurgi"]
  },
  {
    id: 5,
    name: "Lise Andersen",
    role: "Tannpleier",
    bio: "Lise er ekspert på tannhygiene og forebyggende pleie, og hjelper pasientene med å opprettholde optimal tannhelse.",
    image: "/images/team/hygienist1.jpg",
    specialties: ["Tannrens", "Forebygging"]
  },
  {
    id: 6,
    name: "Ingrid Solberg",
    role: "Resepsjonist",
    bio: "Ingrid koordinerer alle avtaler og sørger for at pasientbesøkene går smidig fra start til slutt.",
    image: "/images/team/receptionist.jpg",
    specialties: ["Kundeservice", "Administrasjon"]
  }
];

const facilities = [
  {
    id: 1,
    title: "Digital røntgen",
    description: "Vårt digitale røntgenutstyr gir presise bilder med minimal stråling for nøyaktig diagnostisering.",
    image: "/images/facilities/xray.jpg"
  },
  {
    id: 2,
    title: "Moderne behandlingsrom",
    description: "Komfortable behandlingsrom utstyrt med de nyeste tannlegeverktøyene og skjermer for pasientutdanning.",
    image: "/images/facilities/treatment-room.jpg"
  },
  {
    id: 3,
    title: "3D-skanning",
    description: "Vår 3D-skanningsteknologi muliggjør presise avtrykk uten ubehagelige tradisjonelle metoder.",
    image: "/images/facilities/scanner.jpg"
  },
  {
    id: 4,
    title: "Steriliseringssentral",
    description: "Avansert steriliseringsutstyr sikrer at alle verktøy og instrumenter oppfyller de strengeste hygienestandarden.",
    image: "/images/facilities/sterilization.jpg"
  },
  {
    id: 5,
    title: "Venterom",
    description: "Et avslappende venterom med komfortable sitteplasser, forfriskninger og underholdning for en behagelig opplevelse.",
    image: "/images/facilities/waiting-room.jpg"
  },
  {
    id: 6,
    title: "Teknologi for Invisalign",
    description: "Spesialisert utstyr for planlegging og tilpasning av Invisalign-behandling for perfekte resultater.",
    image: "/images/facilities/invisalign-tech.jpg"
  }
]; 