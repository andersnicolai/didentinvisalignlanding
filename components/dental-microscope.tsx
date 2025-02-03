"use client"

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Microscope, ZoomIn, Camera, CheckCircle } from 'lucide-react';

export default function DentalMicroscope() {
  const benefits = [
    "Økt presisjon og kvalitet i behandlingen",
    "Tidlig oppdagelse av potensielle problemer",
    "Bedre innsikt i din tannhelse",
    "Redusert risiko for komplikasjoner"
  ];

  return (
    <section className="w-full py-16 bg-gradient-to-b from-secondary/50 to-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Venstre side - Tekst */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 text-primary mb-6">
              <Microscope className="h-8 w-8" />
              <h2 className="text-3xl font-bold">Avansert Dental Mikroskop</h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              Hos DiDent Tannlegesenter benytter vi avanserte tannmikroskoper med kamera 
              for å øke presisjonen og kvaliteten på tannbehandlingen. Dette gir deg som 
              pasient en unik innsikt i din tannhelse.
            </p>

            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Høyre side - Visuell */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/micro.webp"
                alt="Avansert dental mikroskop hos DiDent"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Ikoner */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-around">
                <div className="flex flex-col items-center text-white">
                  <ZoomIn className="h-8 w-8 mb-2" />
                  <span className="text-sm">30x Forstørrelse</span>
                </div>
                <div className="flex flex-col items-center text-white">
                  <Camera className="h-8 w-8 mb-2" />
                  <span className="text-sm">HD Kamera</span>
                </div>
              </div>
            </div>

            {/* Dekorativ effekt */}
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
} 