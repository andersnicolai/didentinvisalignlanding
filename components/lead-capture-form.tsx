"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, ArrowRight } from "lucide-react"
import { trackLead } from "@/utils/tracking"

interface LeadCaptureFormProps {
  treatment?: string
  source?: string
  className?: string
  title?: string
  subtitle?: string
}

export default function LeadCaptureForm({
  treatment,
  source = "treatment_page",
  className = "",
  title = "Få gratis konsultasjon",
  subtitle = "Fyll ut skjemaet, så kontakter vi deg for å avtale tid"
}: LeadCaptureFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    
    try {
      // Track the lead client-side
      trackLead({
        email,
        phone,
        name,
        service: treatment,
        source
      })
      
      // Get Facebook click ID and browser ID for conversion tracking
      const fbc = (document.cookie.match('(^|;)\\s*_fbc\\s*=\\s*([^;]+)') || [])[2] || ''
      const fbp = (document.cookie.match('(^|;)\\s*_fbp\\s*=\\s*([^;]+)') || [])[2] || ''
      
      // Get UTM parameters
      const urlParams = new URLSearchParams(window.location.search)
      const utm = {
        source: urlParams.get('utm_source'),
        medium: urlParams.get('utm_medium'),
        campaign: urlParams.get('utm_campaign'),
        content: urlParams.get('utm_content'),
        term: urlParams.get('utm_term')
      }
      
      // Send to our leads API
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          treatment,
          source,
          landingPage: window.location.href,
          utm: JSON.stringify(utm),
          fbc,
          fbp
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }
      
      setIsSuccess(true)
    } catch (err: any) {
      console.error('Error submitting form:', err)
      setError(err.message || 'Det oppstod en feil. Vennligst prøv igjen.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white p-8 rounded-lg shadow-md ${className}`}
      >
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Takk for din henvendelse!</h3>
        <p className="text-gray-600 mb-6 text-center">
          Vi har mottatt din forespørsel og vil kontakte deg snart for å avtale en tid for konsultasjon.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white p-8 rounded-lg shadow-md ${className}`}
    >
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{subtitle}</p>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Navn</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ditt navn"
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <Label htmlFor="email">E-post</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="din@epost.no"
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <Label htmlFor="phone">Telefon</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="12345678"
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <Label htmlFor="message">Melding (valgfritt)</Label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Fortell oss kort om dine ønsker eller spørsmål"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            disabled={isSubmitting}
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full flex items-center justify-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sender...' : 'Send forespørsel'}
          {!isSubmitting && <ArrowRight className="h-4 w-4" />}
        </Button>
        
        <p className="text-xs text-gray-500 text-center mt-4">
          Ved å sende inn dette skjemaet samtykker du til at vi kontakter deg om tannbehandling. 
          Vi deler aldri dine opplysninger med tredjeparter.
        </p>
      </form>
    </motion.div>
  )
} 