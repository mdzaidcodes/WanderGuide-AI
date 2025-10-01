'use client'

import { useState } from 'react'
import { FiCalendar, FiSun, FiSunrise, FiMoon, FiDollarSign, FiGlobe, FiBook } from 'react-icons/fi'

interface ItineraryDisplayProps {
  itinerary: any
  cultural?: any
}

/**
 * Itinerary display component showing day-by-day plans
 */
export default function ItineraryDisplay({ itinerary, cultural }: ItineraryDisplayProps) {
  const [selectedDay, setSelectedDay] = useState(1)

  if (!itinerary) {
    return null
  }

  const currentDay = itinerary.itinerary?.find((day: any) => day.day === selectedDay)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-gradient-to-r from-primary-500 to-secondary-600 text-white">
        <h2 className="text-3xl font-bold mb-2">Your Personalized Itinerary</h2>
        <p className="text-primary-50">{itinerary.overview}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <FiCalendar className="text-2xl mb-2" />
            <div className="text-sm text-primary-100">Duration</div>
            <div className="text-xl font-bold">
              {itinerary.itinerary?.length || 0} Days
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <FiDollarSign className="text-2xl mb-2" />
            <div className="text-sm text-primary-100">Estimated Cost</div>
            <div className="text-xl font-bold">
              ${itinerary.total_estimated_cost?.toLocaleString() || 0}
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <FiGlobe className="text-2xl mb-2" />
            <div className="text-sm text-primary-100">Travel Style</div>
            <div className="text-xl font-bold capitalize">Balanced</div>
          </div>
        </div>
      </div>

      {/* Day selector */}
      <div className="card">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {itinerary.itinerary?.map((day: any) => (
            <button
              key={day.day}
              onClick={() => setSelectedDay(day.day)}
              className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedDay === day.day
                  ? 'bg-primary-500 text-white shadow-blue-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Day {day.day}
            </button>
          ))}
        </div>
      </div>

      {/* Day details */}
      {currentDay && (
        <div className="card">
          <h3 className="text-2xl font-bold text-primary-800 mb-6">
            {currentDay.title}
          </h3>

          <div className="space-y-6">
            {/* Morning */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <FiSunrise className="text-white text-xl" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Morning
                </h4>
                <p className="text-gray-700">{currentDay.morning}</p>
              </div>
            </div>

            {/* Afternoon */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                  <FiSun className="text-white text-xl" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Afternoon
                </h4>
                <p className="text-gray-700">{currentDay.afternoon}</p>
              </div>
            </div>

            {/* Evening */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <FiMoon className="text-white text-xl" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Evening
                </h4>
                <p className="text-gray-700">{currentDay.evening}</p>
              </div>
            </div>

            {/* Day cost */}
            <div className="bg-primary-50 p-4 rounded-lg flex items-center justify-between">
              <span className="font-semibold text-gray-800">
                Estimated cost for this day:
              </span>
              <span className="text-2xl font-bold text-primary-600">
                ${currentDay.estimated_cost}
              </span>
            </div>

            {/* Tips */}
            {currentDay.tips && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex items-start">
                  <div className="text-2xl mr-3">💡</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Pro Tip
                    </h4>
                    <p className="text-gray-700 text-sm">{currentDay.tips}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cultural Insights */}
      {cultural && (
        <div className="card bg-gradient-to-br from-accent-50 to-primary-50">
          <h3 className="text-2xl font-bold text-primary-800 mb-4 flex items-center">
            <FiBook className="mr-3" />
            Cultural Insights & Tips
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customs */}
            {cultural.customs && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Local Customs
                </h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  {cultural.customs.map((custom: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{custom}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Etiquette */}
            {cultural.etiquette && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Etiquette
                </h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  {cultural.etiquette.map((tip: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Basic phrases */}
            {cultural.basic_phrases && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Useful Phrases
                </h4>
                <div className="space-y-1 text-sm text-gray-700">
                  {Object.entries(cultural.basic_phrases).map(([key, value]: [string, any]) => (
                    <div key={key} className="flex justify-between">
                      <span className="capitalize">{key.replace('_', ' ')}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Safety tips */}
            {cultural.safety_tips && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Safety Tips
                </h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  {cultural.safety_tips.map((tip: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">🔒</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Packing suggestions */}
      {itinerary.packing_suggestions && (
        <div className="card bg-gradient-to-br from-secondary-50 to-accent-50">
          <h3 className="text-xl font-bold text-primary-800 mb-4">
            🎒 Packing Suggestions
          </h3>
          <div className="flex flex-wrap gap-2">
            {itinerary.packing_suggestions.map((item: string, index: number) => (
              <span
                key={index}
                className="badge bg-secondary-100 text-secondary-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


