"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Star, Quote } from "lucide-react"

// Define the testimonial interface
interface Testimonial {
  id: string
  name: string
  rating: number
  date: string
  text: string
  source: string
}

// Sample testimonials data from Google reviews
const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Siss Harrong",
    rating: 5,
    date: "for én uke siden",
    text: "Skriver aldri anmeldelser på noe, men dette er virkelig en tannlege og anbefale. Utrolig dyktig, høflig og flink tannlege! Har vært her ved flere anledninger og de følger godt opp i ettertid. Anbefales!",
    source: "Google"
  },
  {
    id: "2",
    name: "Bárbara Reite",
    rating: 5,
    date: "for én uke siden",
    text: "Veldig fornøyd med behandlingen jeg fikk hos Dident. Tannlegen var veldig dyktig og forklarte godt hva han gjorde. Jeg følte meg behagelig under behandlingen.",
    source: "Google"
  },
  {
    id: "3",
    name: "Hege Fredriksen",
    rating: 5,
    date: "for én måned siden",
    text: "Jeg har swappet tannlege i mange år og havnet helt tilfeldig hos Dident gjennom en Let's Deal kupong. Har nå vært gjennom en tannsjekk & rens, samt behandling og er kjempefornøyd.",
    source: "Google"
  },
  {
    id: "4",
    name: "Morten Larsen",
    rating: 5,
    date: "for 2 måneder siden",
    text: "Meget fornøyd etter mitt besøk hos tannlege Alex i dag. Han tar seg god tid og forklarer alt han gjør. Dette er en tannlege med mye kunnskap og setter pasienten i fokus.",
    source: "Google"
  },
  {
    id: "5",
    name: "Hamlet Sarkisian",
    rating: 5,
    date: "for 2 måneder siden",
    text: "Veldig bra sted. Var hos Alexios, og han starter med å ta bilder av tenna, også forklarer grundig og godt. Så får man se hva tannlegen driver med på et kamera, så man ikke bare ligger og ikke vet hva som skjer. Skal definitivt komme hit fremover.",
    source: "Google"
  },
  {
    id: "6",
    name: "Artour Sarkisian",
    rating: 5,
    date: "for 2 måneder siden",
    text: "Jeg har aldri vært hos en tannlege som viser meg alt han gjør i munnen min på en skjerm. Tannlege Alexios gjør en grundig jobb, forklarer godt, rimelige priser, fine lokaler.",
    source: "Google"
  },
  {
    id: "7",
    name: "Bettina Völgyi",
    rating: 5,
    date: "for én måned siden",
    text: "Hyggelig service, presis og grundig arbeid fra tannlege Alexios. God kommunikasjon og høy faglig kunnskap. Anbefales på det sterkeste.😊",
    source: "Google"
  },
  {
    id: "8",
    name: "SallskapetDSV",
    rating: 5,
    date: "for én måned siden",
    text: "Var her på tannrens + kontroll og har aldri hatt en så positiv opplevelse hos en tannlege.",
    source: "Google"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Calculate which testimonials to show
  const visibleCount = typeof window !== 'undefined' && window.innerWidth > 768 ? 3 : 1;
  const totalTestimonials = testimonials.length;
  
  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalTestimonials - visibleCount : prevIndex - 1
    );
  };
  
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % (totalTestimonials - visibleCount + 1)
    );
  };

  // Render star ratings
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <section className="bg-gray-50 py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Hva sier våre pasienter
          </h2>
          <p className="mt-4 text-gray-500 md:text-xl max-w-3xl mx-auto">
            Vi er stolte av å ha over 50 anmeldelser med 5 stjerner på Google. Her er noen av våre nyeste tilbakemeldinger.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex items-stretch">
              <AnimatePresence initial={false} custom={direction}>
                {testimonials.slice(currentIndex, currentIndex + visibleCount).map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    custom={direction}
                    initial={{ opacity: 0, x: direction > 0 ? 200 : -200 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -200 : 200 }}
                    transition={{ duration: 0.3 }}
                    className="w-full md:w-1/3 px-4 flex-shrink-0"
                  >
                    <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col relative">
                      <Quote className="absolute text-gray-200 h-24 w-24 -top-2 -left-2 opacity-20" />
                      <div className="flex items-center mb-4">
                        <div className="flex">
                          {renderStars(testimonial.rating)}
                        </div>
                        <span className="ml-2 text-sm text-gray-500">
                          {testimonial.source}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-4 flex-grow">{testimonial.text}</p>
                      <div className="mt-auto">
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.date}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100"
            aria-label="Forrige"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100"
            aria-label="Neste"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex justify-center mt-8 gap-1">
          {Array(totalTestimonials - visibleCount + 1).fill(0).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full ${currentIndex === index ? 'bg-[#4A6741]' : 'bg-gray-300'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 