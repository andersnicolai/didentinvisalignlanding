import Header from "@/components/header"
import Hero from "@/components/hero"
import Benefits from "@/components/benefits"
import SocialProof from "@/components/social-proof"
import Offer from "@/components/offer"
import BookingForm from "@/components/booking-form"
import Footer from "@/components/footer"
import DentalMicroscope from '@/components/dental-microscope'
import FirstVisit from '@/components/first-visit'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F4EBDA]">
      <Header />
      <Hero remainingSlots={3} />
      <Benefits />
      <DentalMicroscope />
      <FirstVisit />
      <SocialProof />
      <Offer />
      <BookingForm />
      <Footer />
    </main>
  )
}

