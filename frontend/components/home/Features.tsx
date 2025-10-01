import { 
  FiMapPin, FiCalendar, FiDollarSign, FiCloud, 
  FiCompass, FiHeart, FiGlobe, FiLifeBuoy 
} from 'react-icons/fi'

/**
 * Features section showcasing key capabilities
 */
export default function Features() {
  const features = [
    {
      icon: FiMapPin,
      title: 'Personalized Itineraries',
      description: 'AI-generated day-by-day plans based on your interests, travel style, and preferences.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FiCalendar,
      title: 'Flight & Hotel Booking',
      description: 'Compare and book flights and accommodations with real-time pricing and availability.',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: FiCompass,
      title: 'Local Recommendations',
      description: 'Discover hidden gems, top restaurants, and must-see attractions curated for you.',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      icon: FiDollarSign,
      title: 'Budget Optimization',
      description: 'Smart budget tracking and optimization suggestions to maximize your travel value.',
      color: 'from-blue-600 to-blue-700'
    },
    {
      icon: FiCloud,
      title: 'Weather-Based Planning',
      description: 'Get activity suggestions that adapt to weather conditions and seasonal trends.',
      color: 'from-sky-500 to-sky-600'
    },
    {
      icon: FiHeart,
      title: 'Cultural Insights',
      description: 'Learn local customs, etiquette, and useful phrases to enhance your experience.',
      color: 'from-indigo-600 to-indigo-700'
    },
    {
      icon: FiGlobe,
      title: 'Multi-Destination Trips',
      description: 'Plan complex itineraries across multiple cities and countries seamlessly.',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: FiLifeBuoy,
      title: 'Travel Assistance',
      description: 'Access emergency contacts, embassy information, and real-time travel support.',
      color: 'from-cyan-600 to-blue-700'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-primary-800 mb-4">
            Everything You Need for the Perfect Trip
          </h2>
          <p className="text-xl text-gray-600">
            Powered by advanced AI to make your travel planning effortless and enjoyable
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="card group hover:scale-105 cursor-pointer"
              >
                <div className={`bg-gradient-to-br ${feature.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-primary-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* CTA section */}
        <div className="mt-16 text-center">
          <div className="inline-block card bg-gradient-to-r from-primary-50 to-secondary-50 border-2 border-primary-200">
            <p className="text-lg text-gray-700 mb-4">
              Ready to start your next adventure?
            </p>
            <button className="btn-primary">
              Plan Your Trip Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}


