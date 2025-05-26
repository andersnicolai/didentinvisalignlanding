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
            Book Tannlegetime
          </button>
        )}

        {/* Online booking info */}
        <div className="flex items-center justify-center gap-2 
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Kun online booking
        </div>

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
                  type="text"
                  placeholder="Navn"
                  className="w-full p-3 border rounded-lg min-h-[44px]"
                  autoComplete="name"
                />
                <button
                  type="submit"
                  className="w-full bg-primary text-white p-3 
                             rounded-lg min-h-[44px]"
                >
                  Send forespørsel
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}; 