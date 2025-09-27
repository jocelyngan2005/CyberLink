import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  Briefcase, 
  Store, 
  Calendar, 
  Zap, 
  TrendingUp, 
  Users, 
  MapPin,
  ArrowRight,
  CheckCircle,
  Star,
  Menu
} from 'lucide-react'
import landingPageCityImage from '../assets/LandingPageCity.png'

const LandingPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [selectedRole, setSelectedRole] = useState('')
  const [isRoleSectionVisible, setIsRoleSectionVisible] = useState(false)

  const handleRoleSelection = (role) => {
    setSelectedRole(role)
    // Mock login
    login({ name: 'John Doe', email: 'john@example.com' }, role)
    
    // Navigate to respective dashboard
    switch (role) {
      case 'freelancer':
        navigate('/freelancer')
        break
      case 'sme':
        navigate('/sme')
        break
      case 'event-organizer':
        navigate('/event-organizer')
        break
      default:
        break
    }
  }

  const scrollToRoleSelection = () => {
    const roleSection = document.getElementById('role-selection')
    if (roleSection) {
      roleSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
      // Trigger animation after a short delay to ensure scrolling starts
      setTimeout(() => {
        setIsRoleSectionVisible(true)
      }, 300)
    }
  }

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === 'role-selection' && entry.isIntersecting) {
            setIsRoleSectionVisible(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    const roleSection = document.getElementById('role-selection')
    if (roleSection) {
      observer.observe(roleSection)
    }

    return () => {
      if (roleSection) {
        observer.unobserve(roleSection)
      }
    }
  }, [])

  const stakeholders = [
    {
      id: 'freelancer',
      title: 'Freelancer',
      description: 'Discover events, book tickets, and find gig opportunities in your area',
      icon: Briefcase,
      features: ['Event Discovery', 'Smart Recommendations', 'Easy Booking', 'Gig Marketplace'],
      color: 'from-primary-500 to-primary-600'
    },
    {
      id: 'sme',
      title: 'SME & Side Hustlers',
      description: 'Forecast demand, create campaigns, and optimize your business operations',
      icon: Store,
      features: ['Demand Forecasting', 'AI Campaign Studio', 'Delivery Optimization', 'Analytics'],
      color: 'from-secondary-500 to-secondary-600'
    },
    {
      id: 'event-organizer',
      title: 'Event Organizer',
      description: 'Match with vendors, integrate with city systems, and analyze event impact',
      icon: Calendar,
      features: ['Vendor Matching', 'Smart City Integration', 'Impact Analysis', 'Resource Planning'],
      color: 'from-accent-500 to-accent-600'
    }
  ]

  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Insights',
      description: 'Advanced AI algorithms provide real-time demand forecasting and smart recommendations'
    },
    {
      icon: TrendingUp,
      title: 'Demand Forecasting',
      description: 'Predict customer demand patterns based on events, weather, and traffic data'
    },
    {
      icon: Users,
      title: 'Community Ecosystem',
      description: 'Connect freelancers, SMEs, and event organizers in one unified platform'
    },
    {
      icon: MapPin,
      title: 'Smart City Integration',
      description: 'Seamlessly integrate with city infrastructure for optimal resource allocation'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Freelance Photographer',
      content: 'CyberLink helped me find 3x more event photography gigs. The AI recommendations are spot on!',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c0?w=150',
      rating: 5
    },
    {
      name: 'Ahmad Rahman',
      role: 'Food Truck Owner',
      content: 'The demand forecasting feature increased my revenue by 40%. I now know exactly where to position my truck.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      rating: 5
    },
    {
      name: 'Lisa Wong',
      role: 'Event Manager',
      content: 'Managing vendors and analyzing event impact has never been easier. CyberLink is a game-changer.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Top Navigation Bar */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left Side - Logo */}
            <div className="flex items-center space-x-2">
              <div className="text-green-600 font-bold text-lg">
                <div className="flex flex-col items-center">
                  <div className="text-xs mb-1">
                    <svg width="40" height="20" viewBox="0 0 40 20" className="text-green-600">
                      <rect x="2" y="12" width="4" height="8" fill="currentColor" opacity="0.6"/>
                      <rect x="8" y="8" width="4" height="12" fill="currentColor" opacity="0.7"/>
                      <rect x="14" y="4" width="4" height="16" fill="currentColor" opacity="0.8"/>
                      <rect x="20" y="6" width="4" height="14" fill="currentColor" opacity="0.7"/>
                      <rect x="26" y="10" width="4" height="10" fill="currentColor" opacity="0.6"/>
                      <rect x="32" y="14" width="4" height="6" fill="currentColor" opacity="0.5"/>
                    </svg>
                  </div>
                  <span className="text-sm font-bold">GREEN CITY</span>
                </div>
              </div>
            </div>

            {/* Center Navigation */}
            <nav className="hidden sm:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                DISCOVER OUR CITY VISION
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                WHO WE ARE
              </a>
              <a href="#" className="text-green-600 hover:text-green-700 font-bold">
                BECOME RESIDENT PARTNER
              </a>
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" 
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="sm:hidden">
                <Menu size={24} className="text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <p className="text-gray-500 text-sm uppercase tracking-wide font-medium">
                YOUR NEW HOME IN THE GREEN
              </p>
              
              <h1 className="text-5xl md:text-6xl font-michroma font-bold text-gray-900">
                CyberLink
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Just remembering this principle of faith in oneself is enough to help us build a sustainable future for our communities. Through innovative technology and green initiatives, we create spaces where people can thrive in harmony with nature.
              </p>
              
              <button 
                onClick={scrollToRoleSelection}
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                GET STARTED
              </button>
            </div>

            {/* Right Column - City Illustration */}
            <div className="flex justify-center">
              <img 
                src={landingPageCityImage} 
                alt="Smart City Illustration"
                className="w-full max-w-lg h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stakeholder Selection */}
      <section id="role-selection" className="py-20 bg-light-gray scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 transform ${
            isRoleSectionVisible 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-10 opacity-0 scale-95'
          }`}>
            <h2 className="text-4xl font-michroma font-bold text-gray-900 mb-4 transition-all duration-1200 delay-200">
              Choose Your Role
            </h2>
            <p className="text-xl text-gray-600 transition-all duration-1200 delay-400">
              Select your role to access personalized features and dashboards
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {stakeholders.map((stakeholder, index) => (
              <div
                key={stakeholder.id}
                className={`card hover:shadow-xl transition-all duration-700 cursor-pointer transform hover:-translate-y-2 group ${
                  isRoleSectionVisible 
                    ? 'translate-y-0 opacity-100 scale-100' 
                    : 'translate-y-16 opacity-0 scale-90'
                }`}
                style={{
                  transitionDelay: isRoleSectionVisible ? `${600 + index * 200}ms` : '0ms'
                }}
                onClick={() => handleRoleSelection(stakeholder.id)}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${stakeholder.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 ${
                  isRoleSectionVisible ? 'animate-bounce-once' : ''
                }`}
                style={{
                  animationDelay: isRoleSectionVisible ? `${800 + index * 200}ms` : '0ms'
                }}>
                  <stakeholder.icon size={32} className="text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {stakeholder.title}
                </h3>
                
                <p className="text-gray-600 mb-6">
                  {stakeholder.description}
                </p>
                
                <ul className="space-y-3 mb-6">
                  {stakeholder.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3 text-sm text-gray-700">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className="w-full btn-primary group-hover:shadow-lg">
                  Get Started as {stakeholder.title}
                  <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-michroma font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600">
              Advanced AI-driven tools to optimize your smart city experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-michroma font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Real feedback from our growing community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-gray text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent mb-4">
              CyberLink
            </h3>
            <p className="text-gray-400 mb-8">
              Empowering smart cities through AI-driven community connections
            </p>
            <div className="flex justify-center space-x-8 text-sm">
              <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white">Support</a>
              <a href="#" className="text-gray-400 hover:text-white">Contact</a>
            </div>
            <div className="mt-8 text-gray-500 text-sm">
              © 2025 CyberLink. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage