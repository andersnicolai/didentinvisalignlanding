"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "Hvor ofte bør jeg få utført tannrens?",
    answer:
      "Det anbefales å få utført profesjonell tannrens minst én gang i året. Noen kan trenge det oftere, avhengig av deres orale helse og risikofaktorer.",
  },
  {
    question: "Er tannrens smertefullt?",
    answer:
      "Nei, tannrens skal ikke være smertefullt. Du kan oppleve litt ubehag hvis du har sensitivt tannkjøtt, men våre tannleger er forsiktige og kan bruke lokalbedøvelse om nødvendig.",
  },
  {
    question: "Hvor lang tid tar en tannrens?",
    answer:
      "En standard tannrens tar vanligvis mellom 30 minutter til en time, avhengig av mengden av plakk og tannstein.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="w-full px-4 py-12 bg-background">
      <h2 className="text-2xl font-bold mb-6 text-center">Ofte stilte spørsmål</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg">
            <button
              className="flex justify-between items-center w-full p-4 text-left"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="font-semibold">{faq.question}</span>
              {openIndex === index ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            {openIndex === index && (
              <div className="p-4 pt-0">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

