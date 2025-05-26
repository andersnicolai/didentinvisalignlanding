import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CalendarIcon, CheckCircleIcon } from "lucide-react";
import Link from "next/link";

export function BookingForm() {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    treatment: "",
    date: "",
    time: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStep(2);
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    setFormStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Here we'd normally send the form data to an API
      // For now we'll just simulate a loading state and success
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Track conversion
      if (typeof window !== 'undefined') {
        // Google Analytics conversion tracking
        if ((window as any).gtag) {
          (window as any).gtag('event', 'generate_lead', {
            event_category: 'booking',
            event_label: formData.treatment,
          });
        }
        
        // Facebook Pixel conversion tracking
        if ((window as any).fbq) {
          (window as any).fbq('track', 'Lead', {
            content_name: 'booking',
            content_category: 'appointment',
          });
        }
      }
      
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Takk for din henvendelse!</h3>
        <p className="text-gray-600 mb-6">
          Vi har mottatt din timebestilling og vil kontakte deg snart for å bekrefte avtalen.
        </p>
        <Button 
          onClick={() => setIsSubmitted(false)} 
          variant="outline" 
          className="mx-auto"
        >
          Bestill en ny time
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Bestill time</h2>
      
      <form onSubmit={formStep === 1 ? handleNext : handleSubmit}>
        {formStep === 1 ? (
          // Step 1: Personal information
          <>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Navn</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ditt fulle navn"
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="email">E-post</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="din@epost.no"
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Telefonnummer</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="12345678"
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="treatment">Ønsket behandling</Label>
                <Select value={formData.treatment} onValueChange={handleSelectChange("treatment")}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Velg behandling" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="invisalign">Invisalign</SelectItem>
                    <SelectItem value="tannbleking">Tannbleking</SelectItem>
                    <SelectItem value="tannimplantat">Tannimplantat</SelectItem>
                    <SelectItem value="tannrens">Tannrens</SelectItem>
                    <SelectItem value="konsultasjon">Generell konsultasjon</SelectItem>
                    <SelectItem value="akutt">Akutt tannbehandling</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-6">
              <Button type="submit" className="w-full">Neste steg</Button>
            </div>
          </>
        ) : (
          // Step 2: Appointment details
          <>
            <div className="space-y-4">
              <div>
                <Label htmlFor="date">Ønsket dato</Label>
                <div className="relative">
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="mt-1 pr-10"
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="time">Ønsket tidspunkt</Label>
                <Select value={formData.time} onValueChange={handleSelectChange("time")}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Velg tidspunkt" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="08:00">08:00</SelectItem>
                    <SelectItem value="09:00">09:00</SelectItem>
                    <SelectItem value="10:00">10:00</SelectItem>
                    <SelectItem value="11:00">11:00</SelectItem>
                    <SelectItem value="12:00">12:00</SelectItem>
                    <SelectItem value="13:00">13:00</SelectItem>
                    <SelectItem value="14:00">14:00</SelectItem>
                    <SelectItem value="15:00">15:00</SelectItem>
                    <SelectItem value="16:00">16:00</SelectItem>
                    <SelectItem value="17:00">17:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="message">Beskjed (valgfritt)</Label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Fortell oss om spesielle behov eller bekymringer"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 mt-1"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="mt-6 flex gap-4">
              <Button
                type="button"
                onClick={handlePrevious}
                variant="outline"
                className="w-1/2"
              >
                Tilbake
              </Button>
              <Button
                type="submit"
                className="w-1/2"
                disabled={isLoading}
              >
                {isLoading ? "Sender..." : "Bestill time"}
              </Button>
            </div>
          </>
        )}
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          For akutt tannbehandling, vennligst{" "}
          <Link href="/booking" className="text-blue-600 hover:underline">
            bestill akutt time her
          </Link>
        </p>
      </div>
    </div>
  );
} 