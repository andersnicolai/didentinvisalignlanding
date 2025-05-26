"use client"

import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar as CalendarIcon, Clock, User, Mail, Phone, Shield, ArrowRight, Check, Star } from "lucide-react"
import { addDays, format, isSameDay, startOfToday } from "date-fns"
import { nb } from 'date-fns/locale'
import { trackEvent } from '@/utils/tracking'

const weekDays = [
  { short: "Søn", long: "Søndag" },
  { short: "Man", long: "Mandag" },
  { short: "Tir", long: "Tirsdag" },
  { short: "Ons", long: "Onsdag" },
  { short: "Tor", long: "Torsdag" },
  { short: "Fre", long: "Fredag" },
  { short: "Lør", long: "Lørdag" },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dident-landing-api.azurewebsites.net';

// Hjelpefunksjon for valutaformatering
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('no-NO', {
    style: 'currency',
    currency: 'NOK',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export default function BookingForm() {
  const today = startOfToday();
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Generate available dates (excluding weekends)
  useEffect(() => {
    const dates: Date[] = [];
    let currentDate = today;

    for (let i = 0; i < 14; i++) {
      currentDate = addDays(currentDate, 1);
      const day = currentDate.getDay();
      
      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (day !== 0 && day !== 6) {
        dates.push(currentDate);
      }
    }

    setAvailableDates(dates);
    
    // Default to the first available date
    if (dates.length > 0) {
      setSelectedDate(dates[0]);
    }

    // Log dates for debugging
    console.log("Available dates generated:", dates);
  }, []);

  // Available time slots
  const availableTimeSlots = useMemo(() => {
    return [
      "09:00", "10:00", "11:00", "12:00", "14:00", "15:00"
    ];
  }, []);

  // Format date for display
  const formattedDate = useMemo(() => {
    if (!selectedDate) return "";
    return format(selectedDate, 'EEEE d. MMMM', { locale: nb });
  }, [selectedDate]);

  // Legg til Facebook Advanced Matching når skjemaet lastes
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('init', '584429571008239', {
        external_id: undefined,
        em: undefined,
        fn: undefined,
        ln: undefined,
        ph: undefined,
      });
    }
  }, []);

  // Oppdater når bruker fyller ut skjema
  const handleInputChange = (field: string, value: string) => {
    switch(field) {
      case 'name':
        setName(value);
        const [firstName, ...lastNameParts] = value.split(' ');
        const lastName = lastNameParts.join(' ');
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('init', '584429571008239', {
            fn: firstName,
            ln: lastName
          });
        }
        break;
      case 'email':
        setEmail(value);
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('init', '584429571008239', {
            em: value.toLowerCase().trim()
          });
        }
        break;
      case 'phone':
        setPhone(value);
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('init', '584429571008239', {
            ph: value.replace(/[^0-9]/g, '')
          });
        }
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const eventId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const [firstName, ...lastNameParts] = name.split(' ');
      const lastName = lastNameParts.join(' ');
      
      // Track initial lead
      trackEvent({
        event_name: 'Lead',
        event_id: eventId,
        value: 1200.00,
        currency: 'NOK',
        content_name: 'Tannlegekonsultasjon',
        content_category: 'Dental Services',
        user_data: {
          email,
          phone,
          firstName,
          lastName,
          name,
        },
        properties: {
          service_type: 'Tannlegekonsultasjon',
          appointment_date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
          appointment_time: selectedTime,
          lead_source: document.referrer || 'direct',
          landingPage: window.location.href,
          campaign: new URLSearchParams(window.location.search).get('utm_campaign') || 'website'
        }
      });
      
      setIsSubmitting(true);
      
      // Send to Discord via API
      const response = await fetch('https://dident-landing-api.azurewebsites.net/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          selectedDate: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
          selectedTime,
          agreement
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Noe gikk galt');
      }

      console.log('Booking sent successfully:', result);
      setIsSubmitting(false);
      setIsSuccess(true);
      setStep(3);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      
      // Show error message to user
      alert('Det oppstod en feil ved sending av booking. Vennligst prøv igjen.');
    }
  };

  const trackStepCompletion = (step: number) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'CustomStep', {
        content_name: 'Booking Step ' + step,
        content_category: 'Form Progress',
        status: 'completed',
        step: step
      });

      // Track Lead når personinfo er fylt ut
      if (step === 1) {
        (window as any).fbq('track', 'Lead', {
          content_name: 'Tannlegekonsultasjon Interesse',
          content_category: 'Dental Services',
          status: 'interested'
        });
      }
    }
  };

  return (
    <section id="booking" className="w-full py-12 md:py-16 lg:py-20 bg-background">
      <div className="container px-6 md:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Content */}
          <div className="space-y-4 pl-2 md:pl-4 lg:pl-0">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Book din tannlegebehandling
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Ta det første steget mot en bedre tannhelse. Våre høyt kvalifiserte tannleger venter på å hjelpe deg med faglig ekspertise og omsorgsfull behandling.
              </p>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Moderne fasiliteter og teknologi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Fokus på komfort og avslappende miljø</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Erfarne tannleger med spesialistkompetanse</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Personlig tilpasset behandlingsplan</span>
                </div>
              </div>
            </div>
            
            {/* Trust Badges - Reviews */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="font-medium text-gray-900 mb-3">Nylige anmeldelser:</p>
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm mt-1">"Skriver aldri anmeldelser på noe, men dette er virkelig en tannlege og anbefale!"</p>
                  <p className="text-xs text-gray-500 mt-1">Siss H. - for én uke siden</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm mt-1">"Veldig fornøyd med behandlingen jeg fikk. Tannlegen var veldig dyktig."</p>
                  <p className="text-xs text-gray-500 mt-1">Bárbara R. - for én uke siden</p>
                </div>
              </div>
              
              <div className="mt-3 flex items-center">
                <img src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg" alt="Google" className="h-5" />
                <span className="ml-2 text-sm text-gray-600">50+ anmeldelser med 5 stjerner</span>
              </div>
            </div>
          </div>
          
          {/* Booking Form */}
          <div className="bg-[#4A6741] p-8 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">
              Book din tannlegekonsultasjon
            </h2>
            <p className="text-center text-white/90">
              Få en grundig undersøkelse og personlig behandlingsplan
            </p>
            
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              {step === 1 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <p className="font-medium">Velg dato:</p>
                    <div className="grid grid-cols-5 gap-2">
                      {availableDates.slice(0, 5).map((date) => (
                        <button
                          key={date.toString()}
                          type="button"
                          className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors
                            ${isSameDay(date, selectedDate || new Date()) 
                              ? 'bg-white text-[#4A6741]' 
                              : 'bg-white/10 hover:bg-white/20'}`}
                          onClick={() => {
                            console.log("Date selected:", date);
                            setSelectedDate(date);
                          }}
                        >
                          <span className="text-xs font-medium">
                            {weekDays[date.getDay()]?.short}
                          </span>
                          <span className="text-lg font-bold">{format(date, 'd')}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="font-medium">Velg tid:</p>
                    <div className="grid grid-cols-3 gap-2">
                      {availableTimeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          className={`flex items-center justify-center gap-1 p-2 rounded-md transition-colors
                            ${time === selectedTime 
                              ? 'bg-white text-[#4A6741]' 
                              : 'bg-white/10 hover:bg-white/20'}`}
                          onClick={() => setSelectedTime(time)}
                        >
                          <Clock className="h-4 w-4" />
                          <span>{time}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    type="button"
                    className="w-full bg-white text-[#4A6741] hover:bg-white/90"
                    onClick={() => setStep(2)}
                    disabled={!selectedDate || !selectedTime}
                  >
                    Neste trinn <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              )}
              
              {step === 2 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div className="p-3 bg-white/10 rounded-md">
                    <p className="text-sm">Din valgte tid:</p>
                    <p className="font-medium">{formattedDate}, kl. {selectedTime}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Navn</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                      <Input 
                        id="name"
                        placeholder="Ditt fulle navn"
                        className="pl-10 bg-white/10 border-white/20 placeholder:text-white/50 text-white"
                        value={name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">E-post</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                      <Input 
                        id="email"
                        type="email"
                        placeholder="din@epost.no"
                        className="pl-10 bg-white/10 border-white/20 placeholder:text-white/50 text-white"
                        value={email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                      <Input 
                        id="phone"
                        placeholder="+47 XXX XX XXX"
                        className="pl-10 bg-white/10 border-white/20 placeholder:text-white/50 text-white"
                        value={phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="agreement"
                      className="mt-1"
                      checked={agreement}
                      onChange={(e) => setAgreement(e.target.checked)}
                      required
                    />
                    <Label htmlFor="agreement" className="text-sm text-white/90">
                      Jeg samtykker til at Dident kan kontakte meg vedrørende min timebestilling og for å gi meg relevant informasjon om tannhelse og behandlinger.
                    </Label>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      type="button"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 hover:text-white"
                      onClick={() => setStep(1)}
                    >
                      Tilbake
                    </Button>
                    <Button 
                      type="submit"
                      className="w-full bg-white text-[#4A6741] hover:bg-white/90"
                      disabled={!name || !email || !phone || !agreement || isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 border-2 border-[#4A6741] border-t-transparent rounded-full animate-spin" />
                          Sender...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Book din time <ArrowRight className="h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </div>
                  
                  <p className="text-xs text-center text-white/70 flex items-center justify-center gap-1">
                    <Shield className="h-3 w-3" /> Dine personopplysninger er trygge hos oss
                  </p>
                </motion.div>
              )}
              
              {step === 3 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center space-y-4"
                >
                  <div className="mx-auto h-16 w-16 bg-white rounded-full flex items-center justify-center">
                    <Check className="h-8 w-8 text-[#4A6741]" />
                  </div>
                  <h3 className="text-2xl font-bold">Takk for din bestilling!</h3>
                  <p className="text-white/90">
                    Vi har sendt deg en bekreftelse på e-post og vil kontakte deg snart for å bekrefte din time.
                  </p>
                  <p className="text-white/90">
                    <strong>Din valgte tid:</strong> {formattedDate}, kl. {selectedTime}
                  </p>
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

