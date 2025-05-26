"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Mail } from 'lucide-react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://dident-landing-api.azurewebsites.net/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Noe gikk galt');
      }

      console.log('Newsletter subscription sent successfully:', result);
      setIsSuccess(true);
      setEmail('');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting newsletter:', error);
      setError(error instanceof Error ? error.message : 'Det oppstod en feil. Prøv igjen.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="space-y-2">
        <h3 className="text-white font-medium mb-2">Nyhetsbrev</h3>
        <div className="bg-green-600 text-white p-3 rounded-md flex items-center gap-2">
          <Check className="h-4 w-4" />
          <span className="text-sm">Takk! Du er nå påmeldt vårt nyhetsbrev.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="text-white font-medium mb-2">Nyhetsbrev</h3>
      <p className="text-sm mb-2">
        Få tannhelsetips og eksklusive tilbud
      </p>
      <form onSubmit={handleSubmit} className="flex">
        <div className="relative flex-grow">
          <Input
            type="email"
            placeholder="Din e-post"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-l focus:outline-none focus:ring-1 focus:ring-blue-500 text-white placeholder:text-gray-400"
            required
            disabled={isSubmitting}
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting || !email}
          className="bg-[#4A6741] text-white px-3 py-2 text-sm font-medium rounded-r hover:bg-[#3a5334] focus:outline-none focus:ring-2 focus:ring-[#4A6741] focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 border border-white border-t-transparent rounded-full animate-spin" />
              Sender...
            </span>
          ) : (
            'Meld på'
          )}
        </Button>
      </form>
      {error && (
        <p className="text-red-400 text-xs mt-1">{error}</p>
      )}
    </div>
  );
} 