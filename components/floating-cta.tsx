"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FloatingCTAProps {
  targetId?: string
  buttonText?: string
  showAfterPx?: number
  hideNearBottom?: boolean
}

export default function FloatingCTA({
  targetId = "booking",
  buttonText = "Bestill konsultasjon",
  showAfterPx = 300,
  hideNearBottom = true
}: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled past show threshold
      const scrollY = window.scrollY
      const shouldShow = scrollY > showAfterPx
      
      // If hideNearBottom is true, hide when near target element or bottom of page
      const targetElement = document.getElementById(targetId)
      
      if (shouldShow && hideNearBottom && targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY
        const viewportHeight = window.innerHeight
        const isNearTarget = scrollY + viewportHeight > targetPosition - 100
        const isNearBottom = scrollY + viewportHeight >= document.body.offsetHeight - 100
        
        setIsVisible(shouldShow && !isNearTarget && !isNearBottom)
      } else {
        setIsVisible(shouldShow)
      }
    }
    
    // Add event listener
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Initial check
    handleScroll()
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [targetId, showAfterPx, hideNearBottom])

  const scrollToTarget = () => {
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <Button 
            onClick={scrollToTarget}
            size="lg"
            className="shadow-lg flex items-center gap-2 group"
          >
            {buttonText}
            <ArrowUp className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-transform group-hover:-translate-y-1" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 