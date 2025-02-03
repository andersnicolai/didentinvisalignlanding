"use client"

import { Search, FileText, Presentation, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const steps = [
  {
    icon: Search,
    title: "Undersøkelse",
    description: "Vi starter med en grundig samtale om dine bekymringer og ønsker. Deretter tar vi bilder og undersøker tennene dine med vårt avanserte mikroskop, som lar deg se det samme som tannlegen ser. Ved behov tar vi også røntgenbilder for en komplett vurdering.",
  },
  {
    icon: FileText,
    title: "Funnene",
    description: "Dr. Alhousain går gjennom alle funn med deg etter den grundige undersøkelsen. Du får se bildene vi har tatt og får en detaljert forklaring på din tannhelse. Vi tar god tid til å besvare alle dine spørsmål og bekymringer.",
  },
  {
    icon: Presentation,
    title: "Anbefalinger",
    description: "Vi presenterer en skreddersydd behandlingsplan på vår TV-skjerm, som forklarer funnene, løsningene og forebyggende tiltak. Vi sørger for at du er trygg og godt informert før vi går videre med noen behandling.",
  },
];

export default function FirstVisit() {
  return (
    <section className="w-full py-16 bg-[#F4EBDA]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="flex justify-center mb-6">
            <Shield className="h-12 w-12 text-[#4A6741]" />
          </div>
          
          <h2 className="text-3xl font-bold mb-4 text-[#4A6741]">
            Vårt løfte til deg
          </h2>
          
          <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Hos DiDent Tannlegesenter skal du føle deg trygg, informert og ivaretatt 
            gjennom hele prosessen.
          </p>

          <Button 
            size="lg" 
            asChild
            className="bg-[#4A6741] text-white hover:bg-[#3A513A] transition-colors font-medium min-w-[200px]"
          >
            <Link href="#booking">
              Book din første time nå
              <span className="ml-2">→</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
} 