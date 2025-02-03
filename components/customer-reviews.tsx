"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const reviews = [
  {
    name: "Brigitta Tummon",
    text: "A great dentist. Dr. Alhusain takes the time to establish a diagnosis. And time to explain what needs to be done. And now in a fine and welcoming practice.",
  },
  {
    name: "Marzio H",
    text: "Very professional and friendly service by Mohamad! I felt comfortable and would definitely recommend going here. One of the best dentists I have been to. :)",
  },
  {
    name: "Karoline Guldbæk",
    text: "Jeg skriver aldri anmeldelser, men denne gangen må jeg! Jeg har veldig tannlegeskrekk og har derfor holdt meg unna i lang tid. Mohamed har nå mest sannsynlig kurert tannlegeskrekken min.",
  },
  {
    name: "Amalie W Jørpeland",
    text: "Beste tannlegen jeg har vært hos! Tidligere var redd for å dra til tannlegen og syns det gjorde vondt. Nå gruer jeg meg ikke lengre og er skikkelig fornøyd med resultatet!",
  },
]

export default function CustomerReviews() {
  const [currentReview, setCurrentReview] = useState(0)

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <section className="w-full px-4 py-12 bg-primary/5">
      <h2 className="text-2xl font-bold mb-6 text-center">Hva våre kunder sier</h2>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
            ))}
          </div>
          <p className="text-center mb-4 italic">&quot;{reviews[currentReview].text}&quot;</p>
          <p className="text-center font-semibold">{reviews[currentReview].name}</p>
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          <Button variant="outline" size="icon" onClick={prevReview}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextReview}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

