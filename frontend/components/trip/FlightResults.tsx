'use client'

import { useState } from 'react'
import { FiWifi, FiCoffee, FiMonitor, FiCheck } from 'react-icons/fi'
import { MdFlight } from 'react-icons/md'

interface FlightResultsProps {
  flights: any[]
}

/**
 * Flight results display component with comparison features
 */
export default function FlightResults({ flights }: FlightResultsProps) {
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'rating'>('price')

  if (!flights || flights.length === 0) {
    return null
  }

  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === 'price') return a.price.amount - b.price.amount
    if (sortBy === 'rating') return b.rating - a.rating
    return 0
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="section-title flex items-center">
          <MdFlight className="mr-3" />
          Available Flights
        </h2>
        
        {/* Sort options */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="input-field w-auto"
        >
          <option value="price">Lowest Price</option>
          <option value="duration">Shortest Duration</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Flight cards */}
      <div className="space-y-4">
        {sortedFlights.map((flight) => (
          <div
            key={flight.id}
            className={`card cursor-pointer transition-all duration-200 ${
              selectedFlight === flight.id
                ? 'ring-2 ring-primary-500 shadow-blue-xl'
                : 'hover:shadow-blue-lg'
            }`}
            onClick={() => setSelectedFlight(flight.id)}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Flight info */}
              <div className="flex-1 space-y-4">
                {/* Airline header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-primary-800">
                      {flight.airline}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {flight.airline_code} • {flight.class}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary-600">
                      ${flight.price.amount}
                    </div>
                    <p className="text-sm text-gray-500">per person</p>
                  </div>
                </div>

                {/* Outbound flight */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-xs font-semibold text-gray-500 mb-2">
                    OUTBOUND
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">
                        {new Date(flight.outbound.departure.time).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      <div className="text-sm text-gray-600">
                        {flight.outbound.departure.airport}
                      </div>
                      <div className="text-xs text-gray-500">
                        {flight.outbound.departure.terminal}
                      </div>
                    </div>

                    <div className="flex-1 mx-4">
                      <div className="relative">
                        <div className="border-t-2 border-gray-300 border-dashed"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                          <MdFlight className="text-primary-500" />
                        </div>
                      </div>
                      <div className="text-center text-xs text-gray-500 mt-1">
                        {flight.outbound.duration}
                        {flight.outbound.stops > 0 && ` • ${flight.outbound.stops} stop(s)`}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">
                        {new Date(flight.outbound.arrival.time).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      <div className="text-sm text-gray-600">
                        {flight.outbound.arrival.airport}
                      </div>
                      <div className="text-xs text-gray-500">
                        {flight.outbound.arrival.terminal}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Return flight (if exists) */}
                {flight.return && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-xs font-semibold text-gray-500 mb-2">
                      RETURN
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">
                          {new Date(flight.return.departure.time).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                        <div className="text-sm text-gray-600">
                          {flight.return.departure.airport}
                        </div>
                      </div>

                      <div className="flex-1 mx-4">
                        <div className="relative">
                        <div className="border-t-2 border-gray-300 border-dashed"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                          <MdFlight className="text-primary-500 transform rotate-180" />
                        </div>
                        </div>
                        <div className="text-center text-xs text-gray-500 mt-1">
                          {flight.return.duration}
                          {flight.return.stops > 0 && ` • ${flight.return.stops} stop(s)`}
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">
                          {new Date(flight.return.arrival.time).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                        <div className="text-sm text-gray-600">
                          {flight.return.arrival.airport}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Amenities */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  {flight.amenities.wifi && (
                    <div className="flex items-center">
                      <FiWifi className="mr-1 text-primary-500" />
                      WiFi
                    </div>
                  )}
                  {flight.amenities.meals && (
                    <div className="flex items-center">
                      <FiCoffee className="mr-1 text-primary-500" />
                      Meals
                    </div>
                  )}
                  {flight.amenities.entertainment && (
                    <div className="flex items-center">
                      <FiMonitor className="mr-1 text-primary-500" />
                      Entertainment
                    </div>
                  )}
                  <div className="flex items-center">
                    ⭐ {flight.rating} ({flight.reviews.toLocaleString()} reviews)
                  </div>
                </div>

                {/* Baggage info */}
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Baggage:</span> {flight.baggage.carry_on} • {flight.baggage.checked}
                </div>
              </div>

              {/* Select button */}
              {selectedFlight === flight.id ? (
                <button className="btn-primary whitespace-nowrap">
                  <FiCheck className="inline mr-2" />
                  Selected
                </button>
              ) : (
                <button className="btn-outline whitespace-nowrap">
                  Select Flight
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Best deal indicator */}
      {sortedFlights.length > 0 && (
        <div className="card bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-green-800 mb-1">Best Value</h3>
              <p className="text-sm text-green-700">
                We recommend the first option based on price and amenities
              </p>
            </div>
            <div className="text-4xl">✨</div>
          </div>
        </div>
      )}
    </div>
  )
}

