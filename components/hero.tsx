"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from "./ui/button"
import { Timer, Users, ArrowRight } from "lucide-react"

interface HeroProps {
  remainingSlots: number;
}

export default function Hero({ remainingSlots = 3 }: HeroProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    let timeoutId: NodeJS.Timeout;
    const debouncedCheckMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150);
    };

    checkMobile();
    window.addEventListener('resize', debouncedCheckMobile);
    
    return () => {
      window.removeEventListener('resize', debouncedCheckMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="relative min-h-[80vh] flex items-center bg-gradient-to-b from-[#F4EBDA] to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Venstre side - Tekst og CTA */}
          <div className="relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-[#4A6741]/10 text-[#4A6741] px-4 py-2 rounded-full mb-6"
            >
              <Timer className="w-4 h-4" />
              <span>Ny pasient? Vi gir 30% rabatt på første undersøkelse!</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Få et sunnere smil med{" "}
              <span className="text-[#4A6741]">profesjonell tannlegebehandling</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-8"
            >
              Moderne tannbehandling med fokus på kvalitet, komfort og bærekraftige løsninger.
              Inkluderer grundig undersøkelse og personlig behandlingsplan.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                className="text-lg min-h-[44px] bg-[#4A6741] text-white hover:bg-[#3A513A] transition-colors"
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Bestill time nå
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-5 h-5" />
                <span>30% rabatt for nye pasienter</span>
              </div>
            </div>
          </div>

          {/* Høyre side - Bilde */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative h-[500px] md:h-[600px] mt-8 md:mt-0"
          >
            <div className="absolute inset-0">
              <div className="relative w-full h-full">
                <Image
                  src="/images/dame.png"
                  alt="Smilende dame hos Dident Tannklinikk"
                  fill
                  priority
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                  style={{
                    filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))'
                  }}
                />
                {/* Dekorativ bakgrunnseffekt */}
                <div className="absolute -inset-4 bg-gradient-to-br from-[#f0f4f1] to-transparent rounded-full blur-3xl -z-10" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Dekorativ bakgrunnseffekt */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#f0f4f1] rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2 opacity-70" />

      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm5.656 0L19.515 8.485 20.93 9.9l8.485-8.485h-1.414zM3.515 0L0 3.515 1.414 4.93 4.93 1.414 3.515 0zm0 0L0 3.515 1.414 4.93 4.93 1.414 3.515 0zm0 0L0 3.515 1.414 4.93 4.93 1.414 3.515 0zm0 0L0 3.515 1.414 4.93 4.93 1.414 3.515 0zm0 0L0 3.515 1.414 4.93 4.93 1.414 3.515 0zM56.485 0L54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm5.656 0L19.515 8.485 20.93 9.9l8.485-8.485h-1.414zM3.515 0L0 3.515 1.414 4.93 4.93 1.414 3.515 0z' fill='currentColor' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }} />
      </div>
    </section>
  );
}

