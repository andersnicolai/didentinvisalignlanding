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
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 border-2 border-primary">
        <h2 className="text-2xl font-bold mb-6 text-center">Bestill din tannlegetime</h2>
        <div className="flex items-center justify-center mb-4 text-primary">
          <p className="font-medium">Vi tilbyr 30% rabatt for nye pasienter</p>
        </div>
        <BookingForm />
        <p className="text-xs text-center text-gray-500 mt-4">* Vi ser frem til å gi deg en god tannlegeopplevelse.</p>
      </div>
    </section>
  )
}

