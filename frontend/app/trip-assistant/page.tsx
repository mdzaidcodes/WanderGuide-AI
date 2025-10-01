'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import TripChatbot from '@/components/trip/TripChatbot'
import OrganizedItinerary from '@/components/trip/OrganizedItinerary'
import { FiArrowLeft } from 'react-icons/fi'

/**
 * Trip Assistant page with chatbot and itinerary side-by-side
 */
export default function TripAssistantPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [itineraryData, setItineraryData] = useState<any>(null)
  const [tripContext, setTripContext] = useState<any>(null)

  useEffect(() => {
    // Get data from localStorage or URL params
    const storedItinerary = localStorage.getItem('currentItinerary')
    const storedTripData = localStorage.getItem('currentTripData')
    
    if (storedItinerary) {
      setItineraryData(JSON.parse(storedItinerary))
    }
    
    if (storedTripData) {
      setTripContext(JSON.parse(storedTripData))
    }
  }, [])

  const handleItineraryUpdate = (updatedItinerary: any) => {
    setItineraryData(updatedItinerary)
    localStorage.setItem('currentItinerary', JSON.stringify(updatedItinerary))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/')}
                className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
              >
                <FiArrowLeft className="mr-2" />
                Back to Home
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-primary-800">
                Your Trip Assistant
              </h1>
            </div>
            {tripContext && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">{tripContext.origin}</span>
                {' → '}
                <span className="font-medium">{tripContext.destination}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-160px)]">
          {/* Left Side - Chatbot */}
          <div className="flex flex-col h-full">
            <TripChatbot
              tripContext={tripContext}
              currentItinerary={itineraryData}
              onItineraryUpdate={handleItineraryUpdate}
            />
          </div>

          {/* Right Side - Organized Itinerary */}
          <div className="flex flex-col h-full overflow-hidden">
            <OrganizedItinerary
              itinerary={itineraryData}
              tripContext={tripContext}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

