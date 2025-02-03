"use client"

import { useState, useEffect } from "react"
import { Clock, AlertTriangle } from "lucide-react"
import BookingForm from "./booking-form"

export default function Booking() {
  const [remainingSlots, setRemainingSlots] = useState(3)
  const [timeLeft, setTimeLeft] = useState(3600) // 1 hour in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1
        } else {
          clearInterval(timer)
          return 0
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const slotTimer = setInterval(() => {
      setRemainingSlots((prevSlots) => {
        if (prevSlots > 1) {
          return prevSlots - 1
        } else {
          clearInterval(slotTimer)
          return 1
        }
      })
    }, 300000) // Decrease every 5 minutes

    return () => clearInterval(slotTimer)
  }, [])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <section id="booking" className="w-full px-4 py-12 bg-primary/10">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 border-2 border-red-500">
        <h2 className="text-2xl font-bold mb-6 text-center">Bestill din gratis tannrens nå</h2>
        <div className="flex items-center justify-center mb-4 text-red-500">
          <AlertTriangle className="h-5 w-5 mr-2" />
          <p className="font-semibold">Kun {remainingSlots} gratis tannrens igjen!</p>
        </div>
        <div className="flex justify-center items-center space-x-2 mb-6">
          <Clock className="h-5 w-5 text-primary" />
          <p>
            Tilbudet utløper om: <span className="font-bold text-red-500">{formatTime(timeLeft)}</span>
          </p>
        </div>
        <BookingForm />
        <p className="text-xs text-center text-gray-500 mt-4">* Begrenset tilbud. Bestill nå for å unngå skuffelse.</p>
      </div>
    </section>
  )
}

