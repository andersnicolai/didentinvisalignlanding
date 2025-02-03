import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const BookingSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className="fixed bottom-0 left-0 right-0 bg-white shadow-lg-up">
      {/* Sticky booking-knapp */}
      <div className="container mx-auto px-4 py-3">
        {!isFormOpen && (
          <button
            onClick={() => setIsFormOpen(true)}
            className="w-full min-h-[44px] bg-primary text-white 
                       rounded-lg font-semibold text-lg
                       active:scale-95 transition-transform"
          >
            Book Gratis Tannrens
          </button>
        )}

        {/* Click-to-call knapp */}
        <a
          href="tel:+4712345678"
          className="flex items-center justify-center gap-2 
                     min-h-[44px] mt-2 border-2 border-primary 
                     rounded-lg text-primary font-medium"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Ring oss nå
        </a>

        {/* Forenklet booking-skjema */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="overflow-hidden"
            >
              <form className="py-4 space-y-4">
                <input
                  type="tel"
                  placeholder="Telefonnummer"
                  className="w-full p-3 border rounded-lg min-h-[44px]"
                  pattern="[0-9]{8}"
                  autoComplete="tel"
                />
                <button
                  type="submit"
                  className="w-full bg-primary text-white p-3 
                             rounded-lg min-h-[44px]"
                >
                  Send meg SMS med ledige timer
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}; 