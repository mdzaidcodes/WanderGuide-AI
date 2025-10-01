/**
 * API utility functions for communicating with backend
 */

import axios, { AxiosInstance, AxiosError } from 'axios'

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000, // Increased to 120 seconds for LLM processing
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for adding auth tokens if needed
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data)
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request)
    } else {
      // Error in request setup
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
)

/**
 * API functions
 */

export const api = {
  // Health check
  healthCheck: async () => {
    const response = await apiClient.get('/health')
    return response.data
  },

  // Itinerary endpoints
  itinerary: {
    generate: async (tripData: any) => {
      const response = await apiClient.post('/itinerary/generate', tripData)
      return response.data
    },
    
    optimizeBudget: async (itinerary: any, targetBudget: number) => {
      const response = await apiClient.post('/itinerary/optimize-budget', {
        itinerary,
        target_budget: targetBudget,
      })
      return response.data
    },
    
    getCulturalInsights: async (destination: string) => {
      const response = await apiClient.get('/itinerary/cultural-insights', {
        params: { destination },
      })
      return response.data
    },
  },

  // Booking endpoints
  bookings: {
    searchFlights: async (params: {
      origin: string
      destination: string
      departure_date: string
      return_date?: string
      passengers?: number
    }) => {
      const response = await apiClient.get('/bookings/flights', { params })
      return response.data
    },
    
    searchHotels: async (params: {
      destination: string
      check_in: string
      check_out: string
      guests?: number
      rooms?: number
    }) => {
      const response = await apiClient.get('/bookings/hotels', { params })
      return response.data
    },
    
    searchActivities: async (destination: string) => {
      const response = await apiClient.get('/bookings/activities', {
        params: { destination },
      })
      return response.data
    },
  },

  // Recommendations endpoints
  recommendations: {
    getActivities: async (data: {
      location: string
      preferences: string[]
      weather?: string
    }) => {
      const response = await apiClient.post('/recommendations/activities', data)
      return response.data
    },
    
    getRestaurants: async (params: {
      location: string
      cuisine?: string
      budget?: string
    }) => {
      const response = await apiClient.get('/recommendations/restaurants', { params })
      return response.data
    },
  },

  // Weather endpoints
  weather: {
    getForecast: async (destination: string, days: number = 7) => {
      const response = await apiClient.get('/weather/forecast', {
        params: { destination, days },
      })
      return response.data
    },
  },
}

export default api

