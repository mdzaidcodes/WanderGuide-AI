'use client'

import { useState, useEffect } from 'react'
import { FiCalendar, FiClock, FiMapPin, FiDollarSign, FiSunrise, FiSun, FiMoon, FiTrash2, FiEdit2, FiCheckCircle } from 'react-icons/fi'
import { MdFlight } from 'react-icons/md'

interface OrganizedItineraryProps {
  itinerary: any
  tripContext: any
}

/**
 * Organized itinerary display with real-time updates
 */
export default function OrganizedItinerary({ itinerary, tripContext }: OrganizedItineraryProps) {
  const [selectedDay, setSelectedDay] = useState(1)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    // Show update animation when itinerary changes
    setIsUpdating(true)
    const timer = setTimeout(() => setIsUpdating(false), 500)
    return () => clearTimeout(timer)
  }, [itinerary])

  if (!itinerary) {
    return (
      <div className="card h-full flex items-center justify-center">
        <div className="text-center text-gray-500">
          <MdFlight className="text-6xl mx-auto mb-4 opacity-50" />
          <p className="text-lg">No itinerary loaded</p>
          <p className="text-sm">Start planning your trip to see your itinerary here</p>
        </div>
      </div>
    )
  }

  const days = itinerary.itinerary || []
  const currentDay = days.find((day: any) => day.day === selectedDay) || days[0]

  return (
    <div className={`card flex flex-col h-full p-0 overflow-hidden transition-all duration-300 ${isUpdating ? 'ring-2 ring-green-400' : ''}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary-500 to-accent-600 text-white p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold">Your Itinerary</h2>
          {isUpdating && (
            <span className="flex items-center text-sm bg-white/20 px-2 py-1 rounded-full">
              <FiCheckCircle className="mr-1" />
              Updated
            </span>
          )}
        </div>
        {tripContext && (
          <div className="text-sm text-secondary-100">
            <p className="font-medium">{tripContext.destination}</p>
            <p className="text-xs">
              {tripContext.departureDate} - {tripContext.returnDate}
            </p>
          </div>
        )}
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 border-b border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary-600">
            {days.length}
          </div>
          <div className="text-xs text-gray-600">Days</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary-600">
            ${itinerary.total_estimated_cost || 0}
          </div>
          <div className="text-xs text-gray-600">Total Cost</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary-600">
            {tripContext?.travelers || 1}
          </div>
          <div className="text-xs text-gray-600">Travelers</div>
        </div>
      </div>

      {/* Day Tabs */}
      <div className="px-4 py-3 bg-white border-b border-gray-200 overflow-x-auto">
        <div className="flex space-x-2">
          {days.map((day: any) => (
            <button
              key={day.day}
              onClick={() => setSelectedDay(day.day)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-200 ${
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

      {/* Day Details */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentDay ? (
          <>
            {/* Day Title */}
            <div>
              <h3 className="text-xl font-bold text-primary-800 mb-1">
                {currentDay.title}
              </h3>
              <div className="flex items-center text-sm text-gray-600 space-x-3">
                <span className="flex items-center">
                  <FiCalendar className="mr-1" />
                  Day {currentDay.day}
                </span>
                <span className="flex items-center">
                  <FiDollarSign className="mr-1" />
                  ${currentDay.estimated_cost}
                </span>
              </div>
            </div>

            {/* Timeline Activities */}
            <div className="space-y-4">
              {/* Morning */}
              <div className="relative pl-8 pb-6 border-l-2 border-yellow-300">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <FiSunrise className="text-white text-xs" />
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800 flex items-center">
                      <FiClock className="mr-2 text-yellow-600" />
                      Morning
                    </h4>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {currentDay.morning}
                  </p>
                </div>
              </div>

              {/* Afternoon */}
              <div className="relative pl-8 pb-6 border-l-2 border-blue-300">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                  <FiSun className="text-white text-xs" />
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800 flex items-center">
                      <FiClock className="mr-2 text-blue-600" />
                      Afternoon
                    </h4>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {currentDay.afternoon}
                  </p>
                </div>
              </div>

              {/* Evening */}
              <div className="relative pl-8">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <FiMoon className="text-white text-xs" />
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800 flex items-center">
                      <FiClock className="mr-2 text-purple-600" />
                      Evening
                    </h4>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {currentDay.evening}
                  </p>
                </div>
              </div>
            </div>

            {/* Pro Tips */}
            {currentDay.tips && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <div className="flex items-start">
                  <div className="text-xl mr-2">💡</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm mb-1">
                      Pro Tip
                    </h4>
                    <p className="text-sm text-gray-700">{currentDay.tips}</p>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-gray-500 py-12">
            <FiCalendar className="text-4xl mx-auto mb-2 opacity-50" />
            <p>No activities planned for this day</p>
          </div>
        )}
      </div>

      {/* Footer Summary */}
      {itinerary.packing_suggestions && itinerary.packing_suggestions.length > 0 && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <h4 className="text-xs font-semibold text-gray-700 mb-2">🎒 Don't Forget:</h4>
          <div className="flex flex-wrap gap-1">
            {itinerary.packing_suggestions.slice(0, 5).map((item: string, index: number) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-secondary-100 text-secondary-700 rounded"
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

