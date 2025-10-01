'use client'

import { useState, useRef, useEffect } from 'react'
import Hero from '@/components/home/Hero'
import TripPlanner from '@/components/trip/TripPlanner'

/**
 * Home page component - Main landing page with trip planner
 */
export default function Home() {
  const [showPlanner, setShowPlanner] = useState(false)
  const plannerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to planner when it becomes visible
  useEffect(() => {
    if (showPlanner && plannerRef.current) {
      plannerRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      })
    }
  }, [showPlanner])

  return (
    <div>
      {/* Hero section with call-to-action */}
      <Hero onStartPlanning={() => setShowPlanner(true)} />
      
      {/* Trip planner - shown when user clicks "Start Planning" */}
      {showPlanner && (
        <section ref={plannerRef} className="container mx-auto px-4 py-12">
          <TripPlanner />
        </section>
      )}
    </div>
  )
}

