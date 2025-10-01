/**
 * TypeScript type definitions for WanderGuide AI
 */

// Trip Planning Types
export interface TripData {
  destination: string
  origin: string
  duration: number
  budget: number
  travelers: number
  departureDate: string
  returnDate: string
  interests: string[]
  travelStyle: 'budget' | 'balanced' | 'comfort' | 'luxury'
}

// Flight Types
export interface Flight {
  id: string
  type: 'one_way' | 'round_trip'
  airline: string
  airline_code: string
  outbound: FlightLeg
  return?: FlightLeg
  price: {
    amount: number
    currency: string
    per_person: boolean
  }
  amenities: {
    wifi: boolean
    meals: boolean
    entertainment: boolean
    power_outlets: boolean
  }
  baggage: {
    carry_on: string
    checked: string
  }
  class: string
  rating: number
  reviews: number
}

export interface FlightLeg {
  departure: {
    airport: string
    time: string
    terminal: string
  }
  arrival: {
    airport: string
    time: string
    terminal: string
  }
  duration: string
  stops: number
  flight_number: string
}

// Hotel Types
export interface Hotel {
  id: string
  name: string
  type: string
  rating: number
  review_score: number
  review_count: number
  location: {
    address: string
    district: string
    distance_to_center: string
  }
  images: string[]
  price: {
    nightly_rate: number
    total: number
    currency: string
    taxes_included: boolean
    breakdown: {
      base_price: number
      taxes: number
    }
  }
  rooms_available: number
  amenities: string[]
  room_details: {
    type: string
    size: string
    bed_type: string
    max_guests: number
  }
  policies: {
    check_in: string
    check_out: string
    cancellation: string
    pets: boolean
  }
  highlights: string[]
}

// Itinerary Types
export interface Itinerary {
  itinerary: DayPlan[]
  overview: string
  total_estimated_cost: number
  packing_suggestions: string[]
  cultural_tips: string[]
}

export interface DayPlan {
  day: number
  title: string
  morning: string
  afternoon: string
  evening: string
  estimated_cost: number
  tips: string
}

// Activity Types
export interface Activity {
  id: string
  name: string
  type: string
  description: string
  duration: string
  price: number
  currency: string
  rating: number
  reviews: number
  includes: string[]
  availability: string
  group_size: string
  languages: string[]
}

// Cultural Insights Types
export interface CulturalInsights {
  customs: string[]
  etiquette: string[]
  basic_phrases: Record<string, string>
  tipping_guide: string
  safety_tips: string[]
  local_insights: string[]
}

// Weather Types
export interface WeatherForecast {
  date: string
  condition: string
  temperature: {
    high: number
    low: number
    unit: 'C' | 'F'
  }
  precipitation: number
  humidity: number
  wind_speed: number
  icon: string
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ItineraryResponse {
  success: boolean
  itinerary: Itinerary
  metadata: {
    generated_at: string
    destination: string
    duration: number
  }
}

export interface FlightSearchResponse {
  success: boolean
  count: number
  flights: Flight[]
  search_params: {
    origin: string
    destination: string
    departure_date: string
    return_date?: string
    passengers: number
  }
}

export interface HotelSearchResponse {
  success: boolean
  count: number
  hotels: Hotel[]
  search_params: {
    destination: string
    check_in: string
    check_out: string
    guests: number
    rooms: number
  }
}

export interface ActivitySearchResponse {
  success: boolean
  count: number
  activities: Activity[]
  destination: string
}

export interface WeatherResponse {
  success: boolean
  destination: string
  forecast: WeatherForecast[]
}

