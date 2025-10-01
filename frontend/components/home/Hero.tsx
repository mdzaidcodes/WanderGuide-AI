'use client'

import { FiArrowRight } from 'react-icons/fi'

interface HeroProps {
  onStartPlanning: () => void
}

/**
 * Hero section component for the home page
 */
export default function Hero({ onStartPlanning }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-secondary-500 to-accent-600 text-white">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Your AI-Powered Travel Companion
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-primary-50 max-w-2xl mx-auto">
            Experience intelligent travel planning with personalized itineraries, real-time bookings, and smart recommendations.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center items-center">
            <button
              onClick={onStartPlanning}
              className="group bg-white text-primary-600 hover:bg-primary-50 font-bold py-4 px-8 rounded-lg shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 flex items-center space-x-2"
            >
              <span>Start Planning Your Trip</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

