'use client'

import { useState, useEffect } from 'react'
import { FiCompass, FiHome, FiCalendar, FiMap } from 'react-icons/fi'
import { MdFlight } from 'react-icons/md'

interface LoadingSpinnerProps {
  message?: string
}

/**
 * Loading spinner component with rotating messages
 */
export default function LoadingSpinner({ message }: LoadingSpinnerProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const loadingSteps = [
    { text: 'Searching for the best flights...', color: 'from-blue-500 to-cyan-500' },
    { text: 'Finding perfect accommodations...', color: 'from-purple-500 to-pink-500' },
    { text: 'Planning exciting activities...', color: 'from-green-500 to-teal-500' },
    { text: 'Crafting your personalized itinerary...', color: 'from-orange-500 to-red-500' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 4)
    }, 2500) // Change message every 2.5 seconds

    return () => clearInterval(interval)
  }, [])

  const renderIcon = () => {
    switch(currentStep) {
      case 0:
        return <MdFlight className="text-white text-2xl" />
      case 1:
        return <FiHome className="text-white text-2xl" />
      case 2:
        return <FiCalendar className="text-white text-2xl" />
      case 3:
        return <FiMap className="text-white text-2xl" />
      default:
        return <MdFlight className="text-white text-2xl" />
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
      {/* Animated compass icon */}
      <div className="relative">
        <div className="absolute inset-0 bg-primary-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
        <div className="relative bg-gradient-to-br from-primary-500 to-secondary-600 p-6 rounded-full animate-spin-slow">
          <FiCompass className="text-white text-6xl" />
        </div>
      </div>

      {/* Loading text with rotating messages */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className={`bg-gradient-to-r ${loadingSteps[currentStep].color} p-2 rounded-lg`}>
            {renderIcon()}
          </div>
          <h3 className="text-xl font-semibold text-primary-800">
            {loadingSteps[currentStep].text}
          </h3>
        </div>
        
        <div className="flex space-x-1 justify-center">
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  )
}

