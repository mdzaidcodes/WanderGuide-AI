'use client'

import { useState } from 'react'
import { FiMapPin, FiCalendar, FiUsers, FiDollarSign, FiHeart, FiArrowRight } from 'react-icons/fi'
import api from '@/utils/api'
import { showError, showWarning, showToast } from '@/utils/alerts'
import FlightResults from './FlightResults'
import HotelResults from './HotelResults'
import ItineraryDisplay from './ItineraryDisplay'
import LoadingSpinner from '../ui/LoadingSpinner'

/**
 * Main trip planner component with multi-step form
 */
export default function TripPlanner() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [tripData, setTripData] = useState({
    destination: '',
    origin: '',
    duration: 5,
    budget: 2000,
    travelers: 2,
    departureDate: '',
    returnDate: '',
    interests: [] as string[],
    travelStyle: 'balanced'
  })
  const [results, setResults] = useState<any>(null)

  const interestOptions = [
    'Culture & History',
    'Food & Dining',
    'Adventure',
    'Nature & Wildlife',
    'Beach & Relaxation',
    'Shopping',
    'Nightlife',
    'Photography'
  ]

  const travelStyles = [
    { value: 'budget', label: 'Budget Traveler', icon: '💰' },
    { value: 'balanced', label: 'Balanced', icon: '⚖️' },
    { value: 'comfort', label: 'Comfort', icon: '✨' },
    { value: 'luxury', label: 'Luxury', icon: '👑' }
  ]

  const toggleInterest = (interest: string) => {
    setTripData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // Step 1: Generate itinerary
      const itineraryResponse = await api.itinerary.generate(tripData)
      
      // Step 2: Search flights
      const flightsResponse = await api.bookings.searchFlights({
        origin: tripData.origin,
        destination: tripData.destination,
        departure_date: tripData.departureDate,
        return_date: tripData.returnDate,
        passengers: tripData.travelers
      })
      
      // Step 3: Search hotels
      const hotelsResponse = await api.bookings.searchHotels({
        destination: tripData.destination,
        check_in: tripData.departureDate,
        check_out: tripData.returnDate,
        guests: tripData.travelers
      })
      
      // Step 4: Get cultural insights
      const culturalResponse = await api.itinerary.getCulturalInsights(tripData.destination)
      
      setResults({
        itinerary: itineraryResponse.itinerary,
        flights: flightsResponse.flights,
        hotels: hotelsResponse.hotels,
        cultural: culturalResponse.insights
      })
      
      setStep(4)
      
      // Show success message
      showToast('Your trip plan is ready!', 'success')
    } catch (error: any) {
      console.error('Error planning trip:', error)
      
      if (error.code === 'ECONNABORTED') {
        showError(
          'Request Timeout',
          'The request took too long. Please check if the backend is running and try again.'
        )
      } else if (error.response?.status === 500) {
        showError(
          'Server Error',
          'Something went wrong on the server. Please try again later.'
        )
      } else if (error.message === 'Network Error') {
        showError(
          'Connection Error',
          'Unable to connect to the server. Please make sure the backend is running on http://localhost:5000'
        )
      } else {
        showError(
          'Failed to Plan Trip',
          error.response?.data?.error || 'An unexpected error occurred. Please try again.'
        )
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner message="Planning your perfect trip..." />
  }

  if (step === 4 && results) {
    return (
      <div className="space-y-8">
        <ItineraryDisplay itinerary={results.itinerary} cultural={results.cultural} />
        <FlightResults flights={results.flights} />
        <HotelResults hotels={results.hotels} />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-200 ${
                  s <= step
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`flex-1 h-1 mx-2 transition-all duration-200 ${
                    s < step ? 'bg-primary-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm font-medium text-gray-600">
          <span>Destination</span>
          <span>Preferences</span>
          <span>Review</span>
        </div>
      </div>

      <div className="card">
        {/* Step 1: Destination & Dates */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary-800 mb-6">
              Where would you like to go?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiMapPin className="inline mr-2" />
                  From
                </label>
                <input
                  type="text"
                  placeholder="e.g., New York"
                  className="input-field"
                  value={tripData.origin}
                  onChange={(e) => setTripData({ ...tripData, origin: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiMapPin className="inline mr-2" />
                  To
                </label>
                <input
                  type="text"
                  placeholder="e.g., Paris, France"
                  className="input-field"
                  value={tripData.destination}
                  onChange={(e) => setTripData({ ...tripData, destination: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiCalendar className="inline mr-2" />
                  Departure Date
                </label>
                <input
                  type="date"
                  className="input-field"
                  value={tripData.departureDate}
                  onChange={(e) => setTripData({ ...tripData, departureDate: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiCalendar className="inline mr-2" />
                  Return Date
                </label>
                <input
                  type="date"
                  className="input-field"
                  value={tripData.returnDate}
                  onChange={(e) => setTripData({ ...tripData, returnDate: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiUsers className="inline mr-2" />
                  Number of Travelers
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  className="input-field"
                  value={tripData.travelers}
                  onChange={(e) => setTripData({ ...tripData, travelers: parseInt(e.target.value) })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiDollarSign className="inline mr-2" />
                  Budget (USD)
                </label>
                <input
                  type="number"
                  step="100"
                  className="input-field"
                  value={tripData.budget}
                  onChange={(e) => setTripData({ ...tripData, budget: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <button
              onClick={() => {
                if (!tripData.destination || !tripData.departureDate || !tripData.returnDate) {
                  showWarning('Missing Information', 'Please fill in all required fields')
                  return
                }
                setStep(2)
              }}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              <span>Continue</span>
              <FiArrowRight />
            </button>
          </div>
        )}

        {/* Step 2: Preferences */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary-800 mb-6">
              What are your interests?
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <FiHeart className="inline mr-2" />
                Select your interests (optional)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {interestOptions.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      tripData.interests.includes(interest)
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Travel Style
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {travelStyles.map((style) => (
                  <button
                    key={style.value}
                    onClick={() => setTripData({ ...tripData, travelStyle: style.value })}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      tripData.travelStyle === style.value
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{style.icon}</div>
                    <div className="font-medium text-sm">{style.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setStep(1)}
                className="btn-outline flex-1"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="btn-primary flex-1 flex items-center justify-center space-x-2"
              >
                <span>Continue</span>
                <FiArrowRight />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Submit */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary-800 mb-6">
              Review Your Trip Details
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-primary-50 rounded-lg">
                <h3 className="font-semibold text-primary-800 mb-2">Destination</h3>
                <p className="text-gray-700">{tripData.origin} → {tripData.destination}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Dates</h3>
                  <p className="text-gray-700 text-sm">{tripData.departureDate} to {tripData.returnDate}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Travelers</h3>
                  <p className="text-gray-700 text-sm">{tripData.travelers} person(s)</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Budget</h3>
                  <p className="text-gray-700 text-sm">${tripData.budget}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Style</h3>
                  <p className="text-gray-700 text-sm capitalize">{tripData.travelStyle}</p>
                </div>
              </div>

              {tripData.interests.length > 0 && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {tripData.interests.map((interest) => (
                      <span key={interest} className="badge-blue">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setStep(2)}
                className="btn-outline flex-1"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="btn-primary flex-1 flex items-center justify-center space-x-2"
              >
                <span>Generate Trip Plan</span>
                <FiArrowRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

