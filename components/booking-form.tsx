"use client"

import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar as CalendarIcon, Clock, User, Mail, Phone, Shield, ArrowRight, Check } from "lucide-react"
import { addDays, format, isSameDay, startOfToday } from "date-fns"
import { nb } from 'date-fns/locale'
import { trackEvent } from '@/utils/tracking'

const weekDays = [
  { short: "Man", long: "Mandag" },
  { short: "Tir", long: "Tirsdag" },
  { short: "Ons", long: "Onsdag" },
  { short: "Tor", long: "Torsdag" },
  { short: "Fre", long: "Fredag" }
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dident-landing-api.azurewebsites.net';

export default function BookingForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [time, setTime] = useState("")
  const [currentStep, setCurrentStep] = useState(1)

  // Oppdater availableDates til å bare returnere de neste 5 virkedagene
  const availableDates = useMemo(() => {
    const dates = [];
    let currentDate = startOfToday();
    while (dates.length < 5) {  // Endret fra 14 til 5 dager
      currentDate = addDays(currentDate, 1);
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        dates.push(currentDate);
      }
    }
    return dates;
  }, []);

  // Tilgjengelige tider
  const availableTimes = [
    { time: "09:00", label: "09:00 - Morgen" },
    { time: "10:30", label: "10:30 - Formiddag" },
    { time: "13:00", label: "13:00 - Tidlig ettermiddag" },
    { time: "14:30", label: "14:30 - Ettermiddag" },
    { time: "16:00", label: "16:00 - Sen ettermiddag" },
  ]

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
    
    // Track form submission
    trackEvent({
      event_name: 'Lead',
      value: 1995.00,
      currency: 'NOK',
      content_name: 'Tannbleking Kampanje',
      content_category: 'Booking',
      user_data: {
        email,
        phone
      },
      properties: {
        booking_date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
        booking_time: time,
        name: name
      }
    });
    
    try {
      // Web3Forms submission
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '3adad024-3026-4aa1-b043-f04fec2e7d6a',
          name,
          email,
          phone,
          date: selectedDate ? format(selectedDate, 'dd.MM.yyyy') : '',
          time,
          subject: 'Ny booking - Gratis Tannrens',
          message: `
            Ny booking fra kampanjesiden
            
            Kunde: ${name}
            E-post: ${email}
            Telefon: ${phone}
            Dato: ${selectedDate ? format(selectedDate, 'dd.MM.yyyy') : ''}
            Tid: ${time}
            
            Kunden ønsker gratis tannrens.
          `.trim(),
          from_name: "Dident Booking System",
          botcheck: false,
          replyto: email
        })
      });

      const result = await response.json();
      
      if (result.success) {
        const bookingData = {
          eventName: 'CompleteRegistration',
          userData: {
            email,
            phone,
            firstName: name.split(' ')[0],
            lastName: name.split(' ').slice(1).join(' ')
          },
          customData: {
            content_name: 'Tannrens Booking',
            content_category: 'Dental Services',
            content_ids: ['tannrens_gratis_kampanje'],
            content_type: 'product',
            delivery_category: 'in_person',
            status: 'confirmed',
            value: 1200,
            currency: 'NOK',
            booking_date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
            booking_time: time
          }
        };

        // Server-side tracking
        await fetch(`${API_URL}/api/track/conversion`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingData)
        });

        // Client-side tracking
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'CompleteRegistration', bookingData.customData);
        }

        setCurrentStep(4);
      } else {
        throw new Error('Sending failed');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Beklager, noe gikk galt. Ta kontakt med oss direkte på telefon.');
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
          content_name: 'Tannrens Interesse',
          content_category: 'Dental Services',
          status: 'interested'
        });
      }
    }
  };

  return (
    <section id="booking" className="w-full py-16 bg-[#F4EBDA]">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header med mørkere grønn gradient */}
          <div className="bg-[#4A6741] p-8 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">
              Book din gratis tannrens nå
            </h2>
            <p className="text-center text-white/90">
              Verdi 1200kr - Helt kostnadsfritt for nye pasienter
            </p>
          </div>

          {/* Progress Steps med mørkere grønn */}
          <div className="flex justify-center -mt-4 mb-8">
            <div className="bg-white rounded-full shadow-lg p-2 flex gap-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full ${currentStep >= step ? 'bg-[#4A6741]' : 'bg-gray-200'}`}
                />
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="relative">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      Ditt navn
                    </Label>
                    <Input 
                      id="name"
                      value={name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="pl-10 border-primary/20 focus:border-primary"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      E-post
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10 border-primary/20 focus:border-primary"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      Telefon
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="pl-10 border-primary/20 focus:border-primary"
                      required
                    />
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  {/* Kalender */}
                  <div className="bg-[#f0f4f1] p-4 md:p-6 rounded-lg">
                    <Label className="flex items-center gap-2 mb-4">
                      <CalendarIcon className="h-5 w-5 text-[#4A6741]" />
                      <span className="text-lg font-medium">Velg dato</span>
                    </Label>

                    <div className="grid grid-cols-5 gap-2">
                      {availableDates.map((date) => (
                        <button
                          key={date.toISOString()}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedDate(date);
                          }}
                          className={`p-3 rounded-lg text-center transition-colors ${
                            selectedDate && isSameDay(date, selectedDate)
                              ? 'bg-[#4A6741] text-white'
                              : 'bg-white hover:bg-[#4A6741]/10'
                          }`}
                        >
                          <div className="text-xs font-medium mb-1">
                            {weekDays[date.getDay() - 1].short}
                          </div>
                          <div className="text-lg font-bold">
                            {format(date, 'd')}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {format(date, 'MMM', { locale: nb })}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tidspunkter */}
                  {selectedDate && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <Label className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-[#4A6741]" />
                        <span className="text-lg font-medium">Velg tid</span>
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {availableTimes.map((slot) => (
                          <button
                            key={slot.time}
                            type="button"
                            onClick={() => setTime(slot.time)}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              time === slot.time
                                ? 'border-[#4A6741] bg-[#f0f4f1] text-[#4A6741]'
                                : 'border-gray-200 hover:border-[#4A6741]/50'
                            }`}
                          >
                            <p className="font-medium">{slot.label}</p>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-secondary/30 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4">Oppsummering av booking</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-muted-foreground">Navn:</span> {name}</p>
                      <p><span className="text-muted-foreground">E-post:</span> {email}</p>
                      <p><span className="text-muted-foreground">Telefon:</span> {phone}</p>
                      <p><span className="text-muted-foreground">Dato:</span> {selectedDate ? format(selectedDate, 'EEEE, d. MMMM yyyy') : ''}</p>
                      <p><span className="text-muted-foreground">Tid:</span> {time}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-[#4A6741]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Booking mottatt!</h3>
                  <p className="text-muted-foreground mb-6">
                    Vi sender deg en bekreftelse på e-post innen kort tid.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                  >
                    Book en ny time
                  </Button>
                </motion.div>
              )}

              {currentStep < 4 && (
                <div className="flex justify-between pt-6">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(currentStep - 1)}
                    >
                      Tilbake
                    </Button>
                  )}
                  <Button
                    type={currentStep === 3 ? "submit" : "button"}
                    className="bg-[#4A6741] hover:bg-[#3A513A] transition-colors ml-auto"
                    onClick={() => {
                      if (currentStep < 3) {
                        trackStepCompletion(currentStep);
                        setCurrentStep(currentStep + 1);
                      }
                    }}
                  >
                    {currentStep === 3 ? "Bekreft booking" : "Neste"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </form>

            {currentStep < 4 && (
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600">
                <Shield className="h-4 w-4 text-[#4A6741]" />
                <p>Sikker booking - Vi beskytter dine personopplysninger</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

