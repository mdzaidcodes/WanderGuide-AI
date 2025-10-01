'use client'

import { useState } from 'react'
import { FiHome, FiMapPin, FiStar, FiCheck, FiWifi, FiCoffee, FiTv } from 'react-icons/fi'

interface HotelResultsProps {
  hotels: any[]
}

/**
 * Hotel results display component with filtering and comparison
 */
export default function HotelResults({ hotels }: HotelResultsProps) {
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null)
  const [filterStars, setFilterStars] = useState<number>(0)

  if (!hotels || hotels.length === 0) {
    return null
  }

  const filteredHotels = filterStars > 0
    ? hotels.filter(h => h.rating === filterStars)
    : hotels

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="section-title flex items-center">
          <FiHome className="mr-3" />
          Accommodation Options
        </h2>
        
        {/* Filter by stars */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-600">Filter:</span>
          {[0, 3, 4, 5].map((stars) => (
            <button
              key={stars}
              onClick={() => setFilterStars(stars)}
              className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
                filterStars === stars
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {stars === 0 ? 'All' : `${stars}⭐`}
            </button>
          ))}
        </div>
      </div>

      {/* Hotel cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredHotels.map((hotel) => (
          <div
            key={hotel.id}
            className={`card cursor-pointer transition-all duration-200 ${
              selectedHotel === hotel.id
                ? 'ring-2 ring-primary-500 shadow-blue-xl'
                : 'hover:shadow-blue-lg'
            }`}
            onClick={() => setSelectedHotel(hotel.id)}
          >
            {/* Hotel image placeholder */}
            <div className="relative h-48 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-lg mb-4 overflow-hidden">
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full font-bold text-primary-600">
                ${hotel.price.nightly_rate}/night
              </div>
              <div className="absolute bottom-4 left-4 flex items-center space-x-1">
                {[...Array(hotel.rating)].map((_, i) => (
                  <FiStar key={i} className="text-yellow-400 fill-current" size={20} />
                ))}
              </div>
            </div>

            {/* Hotel info */}
            <div className="space-y-4">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-primary-800">
                      {hotel.name}
                    </h3>
                    <p className="text-sm text-gray-500">{hotel.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-primary-600 font-semibold">
                      <span className="text-lg">{hotel.review_score}</span>
                      <span className="text-sm">/10</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {hotel.review_count.toLocaleString()} reviews
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <FiMapPin className="mr-1 text-primary-500" />
                  {hotel.location.district} • {hotel.location.distance_to_center}
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.highlights.map((highlight: string, index: number) => (
                    <span key={index} className="badge-blue text-xs">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              {/* Room details */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm font-semibold text-gray-700 mb-2">
                  {hotel.room_details.type}
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>📐 {hotel.room_details.size}</div>
                  <div>🛏️ {hotel.room_details.bed_type}</div>
                  <div>👥 Max {hotel.room_details.max_guests} guests</div>
                </div>
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                {hotel.amenities.slice(0, 4).map((amenity: string, index: number) => (
                  <div key={index} className="flex items-center">
                    <FiCheck className="text-green-500 mr-1" size={14} />
                    {amenity}
                  </div>
                ))}
                {hotel.amenities.length > 4 && (
                  <span className="text-primary-600 font-medium">
                    +{hotel.amenities.length - 4} more
                  </span>
                )}
              </div>

              {/* Pricing breakdown */}
              <div className="border-t pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Base price</span>
                  <span className="font-medium">
                    ${hotel.price.breakdown.base_price.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Taxes & fees</span>
                  <span className="font-medium">
                    ${hotel.price.breakdown.taxes.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold text-primary-800 pt-2 border-t">
                  <span>Total</span>
                  <span>${hotel.price.total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {hotel.policies.cancellation}
                </p>
              </div>

              {/* Select button */}
              {selectedHotel === hotel.id ? (
                <button className="btn-primary w-full">
                  <FiCheck className="inline mr-2" />
                  Selected
                </button>
              ) : (
                <button className="btn-outline w-full">
                  Select Hotel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* No results message */}
      {filteredHotels.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-gray-600">
            No hotels found with the selected filters. Try adjusting your criteria.
          </p>
        </div>
      )}
    </div>
  )
}

