import { Metadata } from "next";
import BookingForm from "@/components/booking-form";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer";
import { PhoneIcon, CalendarIcon, ClockIcon, MessageSquareIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Bestill Time | Dident Tannklinikk Oslo",
  description: "Bestill time hos Dident Tannklinikk. Vi tilbyr et bredt spekter av tannlegetjenester i Oslo med fleksible åpningstider og erfarne tannleger.",
  keywords: "tannlege bestill time, tannlegetimer, tannlege oslo, tannklinikk booking, tannlegeappointment",
};

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero section */}
        <section className="bg-blue-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Bestill time
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Book din neste tannlegetime hos Dident Tannklinikk. Vi tilbyr fleksible tider for å passe din timeplan.
              </p>
            </div>
          </div>
        </section>

        {/* Booking section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Fyll ut skjemaet under</h2>
                
                {/* Booking form */}
                <BookingForm />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Informasjon</h2>
                
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <PhoneIcon className="h-6 w-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900">Telefon</h3>
                        <p className="text-gray-600 mt-1">
                          <a href="tel:+4722230303" className="hover:text-blue-600">
                            22 23 03 03
                          </a>
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Ring oss direkte hvis du foretrekker å bestille time over telefon
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <ClockIcon className="h-6 w-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900">Åpningstider</h3>
                        <div className="text-gray-600 mt-1 space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="mr-4 w-28">Mandag</span>
                            <span>08:00 - 16:00</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="mr-4 w-28">Tirsdag</span>
                            <span>08:00 - 18:00</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="mr-4 w-28">Onsdag</span>
                            <span>08:00 - 16:00</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="mr-4 w-28">Torsdag</span>
                            <span>08:00 - 18:00</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="mr-4 w-28">Fredag</span>
                            <span>08:00 - 15:00</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="mr-4 w-28">Lør/Søn</span>
                            <span>Stengt</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <CalendarIcon className="h-6 w-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900">Forberedelse</h3>
                        <p className="text-gray-600 mt-1 text-sm">
                          Kom 10 minutter før avtalt tid for å fylle ut nødvendige skjemaer.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MessageSquareIcon className="h-6 w-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900">Avbestilling</h3>
                        <p className="text-gray-600 mt-1 text-sm">
                          Vennligst gi minst 24 timers varsel ved avbestilling for å unngå gebyr.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 bg-blue-50 rounded-lg p-6">
                  <h3 className="font-medium text-gray-900 mb-2">Akutt tannbehandling</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Har du akutte smerter eller et tannproblem som krever øyeblikkelig hjelp? 
                    Ring oss på <a href="tel:+4722230303" className="text-blue-600 hover:underline">22 23 03 03</a> 
                    for prioritert behandling.
                  </p>
                  <p className="text-gray-600 text-sm">
                    Vi setter av tid hver dag for akuttpasienter og vil gjøre vårt beste for å hjelpe deg så raskt som mulig.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 