"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { trackLead } from '@/utils/tracking'

interface ExitIntentPopupProps {
  title?: string
  subtitle?: string
  offerText?: string
  delay?: number // Delay in milliseconds before showing popup again
  treatment?: string
}

export default function ExitIntentPopup({
  title = "Vent! Få 30% rabatt før du går",
  subtitle = "Bli med de 500+ fornøyde pasientene som har valgt Dident",
  offerText = "Normal pris: 1.200 kr - Din pris: 840 kr",
  delay = 86400000, // Default: 24 hours
  treatment
}: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const [error, setError] = useState("")
  
  useEffect(() => {
    // Check if the popup has been shown recently
    const lastShown = localStorage.getItem('exitIntentShown')
    const canShow = !lastShown || (Date.now() - parseInt(lastShown)) > delay
    
    if (!canShow) return
    
    // Only add the listener if we haven't shown the popup recently
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves to the top of the page
      if (e.clientY <= 0 && !localStorage.getItem('leadCaptured')) {
        setIsVisible(true)
        // Mark that we've shown the popup
        localStorage.setItem('exitIntentShown', Date.now().toString())
      }
    }
    
    // Wait a bit before adding the listener to avoid triggering immediately
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
    }, 3000)
    
    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [delay])
  
  const closePopup = () => {
    setIsVisible(false)
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    
    try {
      // Track the lead client-side
      trackLead({
        email,
        name,
        service: treatment,
        source: 'exit_intent_popup'
      })
      
      // Get Facebook click ID and browser ID for conversion tracking
      const fbc = (document.cookie.match('(^|;)\\s*_fbc\\s*=\\s*([^;]+)') || [])[2] || ''
      const fbp = (document.cookie.match('(^|;)\\s*_fbp\\s*=\\s*([^;]+)') || [])[2] || ''
      
      // Send to our leads API
      const response = await fetch('https://dident-landing-api.azurewebsites.net/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          treatment,
          source: 'exit_intent_popup',
          landingPage: window.location.href,
          fbc,
          fbp
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }
      
      // Mark that we've captured a lead so we don't show the popup again
      localStorage.setItem('leadCaptured', 'true')
      
      setIsSuccess(true)
      
      // Close after success display
      setTimeout(() => {
        setIsVisible(false)
      }, 5000)
    } catch (err: any) {
      console.error('Error submitting form:', err)
      setError(err.message || 'Det oppstod en feil. Vennligst prøv igjen.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative bg-white rounded-xl shadow-2xl max-w-md w-full"
          >
            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="p-6">
              {isSuccess ? (
                <div className="text-center py-6">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Takk for din henvendelse!</h3>
                  <p className="text-gray-600">
                    Vi kontakter deg snart for å avtale din konsultasjon med 30% rabatt.
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-600 mb-3">{subtitle}</p>
                    {offerText && (
                      <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-lg mt-2 text-sm font-medium">
                        {offerText}
                      </div>
                    )}
                    <div className="flex items-center justify-center mt-3 text-xs text-gray-500">
                      <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      4.9/5 stjerner • "Fantastisk service og resultater" - Maria K.
                    </div>
                  </div>
                  
                  {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
                      {error}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="exit-name">Navn</Label>
                      <Input
                        id="exit-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ditt navn"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="exit-email">E-post</Label>
                      <Input
                        id="exit-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="din@epost.no"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    

                    
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sender...' : 'Ja, jeg vil ha 30% rabatt!'}
                    </Button>
                  </form>
                  
                  <p className="text-xs text-gray-500 text-center mt-4">
                    Ved å sende inn dette skjemaet samtykker du til at vi kontakter deg om tannbehandling.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
} 