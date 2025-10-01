'use client'

import { useState, useRef, useEffect } from 'react'
import { FiSend, FiMessageCircle, FiLoader } from 'react-icons/fi'
import { MdFlight } from 'react-icons/md'
import axios from 'axios'
import { showError } from '@/utils/alerts'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  itineraryUpdate?: any
}

interface TripChatbotProps {
  tripContext: any
  currentItinerary: any
  onItineraryUpdate: (itinerary: any) => void
}

/**
 * AI-powered chatbot for trip assistance
 */
export default function TripChatbot({ tripContext, currentItinerary, onItineraryUpdate }: TripChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm your personal travel assistant. I'm here to help you with anything related to your trip to ${tripContext?.destination || 'your destination'}. You can ask me about:\n\n• Activities and attractions\n• Restaurant recommendations\n• Modifying your itinerary\n• Local transportation\n• Cultural tips and customs\n• Budget adjustments\n• Adding or removing activities\n\nHow can I help you today?`,
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      // Call the backend API for chat
      const response = await axios.post('http://localhost:5000/api/itinerary/chat', {
        message: inputMessage,
        trip_context: tripContext,
        current_itinerary: currentItinerary,
        conversation_history: messages.slice(-5) // Send last 5 messages for context
      }, {
        timeout: 30000
      })

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.response,
        timestamp: new Date(),
        itineraryUpdate: response.data.itinerary_update
      }

      setMessages(prev => [...prev, assistantMessage])

      // If there's an itinerary update, apply it
      if (response.data.itinerary_update) {
        onItineraryUpdate(response.data.itinerary_update)
      }
    } catch (error: any) {
      console.error('Chat error:', error)
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I'm having trouble connecting right now. Please make sure the backend server is running and try again.",
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const suggestedQuestions = [
    "What are the best restaurants in the area?",
    "Can you add a museum visit to day 2?",
    "What's the weather like?",
    "Suggest some local activities",
    "Remove the evening activity from day 3"
  ]

  const handleSuggestionClick = (question: string) => {
    setInputMessage(question)
    inputRef.current?.focus()
  }

  return (
    <div className="card flex flex-col h-full p-0 overflow-hidden max-h-[calc(100vh-160px)]">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-600 text-white p-4 flex items-center space-x-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <FiMessageCircle className="text-2xl" />
        </div>
        <div>
          <h2 className="text-lg font-bold">Trip Assistant</h2>
          <p className="text-sm text-primary-100">AI-powered travel companion</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 max-h-full">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-800 shadow-sm border border-gray-200'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              {message.itineraryUpdate && (
                <div className="mt-2 pt-2 border-t border-primary-200">
                  <p className="text-xs opacity-80 flex items-center">
                    <MdFlight className="mr-1" />
                    Itinerary updated
                  </p>
                </div>
              )}
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 rounded-lg p-3 shadow-sm border border-gray-200">
              <FiLoader className="animate-spin text-primary-500" />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length <= 1 && (
        <div className="px-4 py-3 bg-white border-t border-gray-200">
          <p className="text-xs font-medium text-gray-600 mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(question)}
                className="text-xs px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full hover:bg-primary-100 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your trip..."
            className="flex-1 input-field"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="btn-primary px-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  )
}

