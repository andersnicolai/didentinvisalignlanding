import Hero from "@/components/hero"
import Benefits from "@/components/benefits"
import SocialProof from "@/components/social-proof"
import Offer from "@/components/offer"
import BookingForm from "@/components/booking-form"
import DentalMicroscope from '@/components/dental-microscope'
import FirstVisit from '@/components/first-visit'
import Testimonials from '@/components/ui/testimonials'
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F4EBDA]">
      <Hero remainingSlots={3} />
      <Benefits />
      <DentalMicroscope />
      <FirstVisit />
      <SocialProof />
      <Testimonials />
      <Offer />
      <BookingForm />
    </main>
  )
}

// Sample data
const treatments = [
  {
    id: 1,
    title: "Invisalign",
    slug: "invisalign",
    description: "Usynlig tannregulering som gir deg et perfekt smil uten tradisjonelle bøyler.",
    price: 45000,
    image: "/images/treatments/invisalign.jpg"
  },
  {
    id: 2,
    title: "Tannbleking",
    slug: "tannbleking",
    description: "Profesjonell tannbleking som gir deg et hvitere og friskere smil.",
    price: 3500,
    image: "/images/treatments/whitening.jpg"
  },
  {
    id: 3,
    title: "Tannimplantat",
    slug: "tannimplantat",
    description: "Erstatt manglende tenner med implantater som både ser ut og føles som ekte tenner.",
    price: 25000,
    image: "/images/treatments/implant.jpg"
  }
];

const features = [
  {
    id: 1,
    title: "Moderne teknologi",
    description: "Vi bruker kun den nyeste og beste teknologien for å gi deg den mest effektive behandlingen.",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
  },
  {
    id: 2,
    title: "Erfarne tannleger",
    description: "Vårt team av høyt kvalifiserte tannleger har mange års erfaring i å levere førsteklasses tannpleie.",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
  },
  {
    id: 3,
    title: "Smertefri behandling",
    description: "Vi prioriterer din komfort og bruker teknikker som minimerer ubehag under behandlingen.",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
  },
  {
    id: 4,
    title: "Transparente priser",
    description: "Ingen overraskelser - vi gir alltid klare kostnadsoverslag før behandlingen starter.",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
  },
  {
    id: 5,
    title: "Fleksible åpningstider",
    description: "Vi tilbyr både tidlige og sene timer for å passe inn i din travle timeplan.",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
  },
  {
    id: 6,
    title: "Moderne fasiliteter",
    description: "Vår klinikk er designet for å gi deg en avslappende og behagelig opplevelse.",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
  }
];

