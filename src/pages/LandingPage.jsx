import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion, useAnimation, useInView } from 'framer-motion'
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

// Custom hook for scroll animations
const useScrollAnimation = () => {
  const controls = useAnimation()
  const ref = React.useRef(null)
  const inView = useInView(ref, { threshold: 0.1, once: true })

  React.useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return [ref, controls]
}

const LandingPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [selectedRole, setSelectedRole] = useState('')

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
    }
  }

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
      <motion.header 
        className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left Side - Logo */}
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-green-600 font-bold text-lg">
                <div className="flex flex-col items-center">
                  <motion.div 
                    className="text-xs mb-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
                  >
                    <svg width="40" height="20" viewBox="0 0 40 20" className="text-green-600">
                      <rect x="2" y="12" width="4" height="8" fill="currentColor" opacity="0.6"/>
                      <rect x="8" y="8" width="4" height="12" fill="currentColor" opacity="0.7"/>
                      <rect x="14" y="4" width="4" height="16" fill="currentColor" opacity="0.8"/>
                      <rect x="20" y="6" width="4" height="14" fill="currentColor" opacity="0.7"/>
                      <rect x="26" y="10" width="4" height="10" fill="currentColor" opacity="0.6"/>
                      <rect x="32" y="14" width="4" height="6" fill="currentColor" opacity="0.5"/>
                    </svg>
                  </motion.div>
                  <motion.span 
                    className="text-sm font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    CYBERLINK
                  </motion.span>
                </div>
              </div>
            </motion.div>

            {/* Center Navigation */}
            <motion.nav 
              className="hidden sm:flex items-center space-x-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {['DISCOVER OUR CITY VISION', 'WHO WE ARE', 'BECOME RESIDENT PARTNER'].map((item, index) => (
                <motion.a 
                  key={item}
                  href="#" 
                  className={`font-medium ${index === 2 ? 'text-green-600 hover:text-green-700 font-bold' : 'text-gray-700 hover:text-gray-900'}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  {item}
                </motion.a>
              ))}
            </motion.nav>

            {/* Right Side */}
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div 
                className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
                whileHover={{ scale: 1.1 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" 
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.button 
                className="sm:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Menu size={24} className="text-gray-700" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.p 
                className="text-gray-500 text-sm uppercase tracking-wide font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Intelligent Economy, Connected City
              </motion.p>
              
              <motion.h1 
                className="text-5xl md:text-6xl font-michroma font-bold text-gray-900"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                CyberLink
              </motion.h1>
              
              <motion.p 
                className="text-lg text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                A Generative AI-powered smart economy platform that connects customers, SMEs (sellers & freelancers), and event organisers in Cyberjaya. It leverages open city data, event calendars, mobility info, and AI demand forecasting to create a sustainable and profitable ecosystem.
              </motion.p>
              
              <motion.button 
                onClick={scrollToRoleSelection}
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.95 }}
              >
                GET STARTED
              </motion.button>
            </motion.div>

            {/* Right Column - City Illustration */}
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.img 
                src={landingPageCityImage} 
                alt="Smart City Illustration"
                className="w-full max-w-lg h-auto"
                initial={{ scale: 0.8, rotate: -5 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stakeholder Selection */}
      <motion.section 
        id="role-selection" 
        className="py-20 bg-light-gray scroll-mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl font-michroma font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Choose Your Role
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Select your role to access personalized features and dashboards
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {stakeholders.map((stakeholder, index) => (
              <motion.div
                key={stakeholder.id}
                className="card cursor-pointer group"
                initial={{ opacity: 0, y: 100, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2 + index * 0.2,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
                viewport={{ once: true }}
                onClick={() => handleRoleSelection(stakeholder.id)}
              >
                <motion.div 
                  className={`w-16 h-16 bg-gradient-to-r ${stakeholder.color} rounded-xl flex items-center justify-center mb-6`}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.5 + index * 0.2,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 5,
                    transition: { duration: 0.2 }
                  }}
                  viewport={{ once: true }}
                >
                  <stakeholder.icon size={32} className="text-white" />
                </motion.div>
                
                <motion.h3 
                  className="text-2xl font-bold text-gray-900 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {stakeholder.title}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-600 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {stakeholder.description}
                </motion.p>
                
                <motion.ul 
                  className="space-y-3 mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {stakeholder.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={featureIndex} 
                      className="flex items-center space-x-3 text-sm text-gray-700"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 0.9 + index * 0.2 + featureIndex * 0.1 
                      }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle size={16} className="text-green-500" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>
                
                <motion.button 
                  className="w-full btn-primary group-hover:shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  viewport={{ once: true }}
                >
                  Get Started as {stakeholder.title}
                  <ArrowRight size={16} className="ml-2" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl font-michroma font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Powerful Features
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Advanced AI-driven tools to optimize your smart city experience
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="text-center group"
                initial={{ opacity: 0, y: 80, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.7, 
                  delay: 0.2 + index * 0.15,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0, rotate: -90 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.4 + index * 0.15,
                    type: "spring",
                    stiffness: 150
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 5,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                    transition: { duration: 0.2 }
                  }}
                  viewport={{ once: true }}
                >
                  <feature.icon size={32} className="text-white" />
                </motion.div>
                <motion.h3 
                  className="text-xl font-bold text-gray-900 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.15 }}
                  viewport={{ once: true }}
                >
                  {feature.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-600"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.15 }}
                  viewport={{ once: true }}
                >
                  {feature.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section 
        className="py-20 bg-light-gray"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl font-michroma font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              What Our Users Say
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Real feedback from our growing community
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index} 
                className="card"
                initial={{ opacity: 0, y: 100, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2 + index * 0.2,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  y: -5,
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.3 }
                }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="flex items-center space-x-1 mb-4"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 0.6 + index * 0.2 + i * 0.1,
                        type: "spring"
                      }}
                      viewport={{ once: true }}
                    >
                      <Star size={16} className="text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </motion.div>
                <motion.p 
                  className="text-gray-600 mb-6 italic"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.2 }}
                  viewport={{ once: true }}
                >
                  "{testimonial.content}"
                </motion.p>
                <motion.div 
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <motion.img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.9 + index * 0.2,
                      type: "spring"
                    }}
                    whileHover={{ scale: 1.1 }}
                    viewport={{ once: true }}
                  />
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="bg-dark-gray text-white py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.h3 
              className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              CyberLink
            </motion.h3>
            <motion.p 
              className="text-gray-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Empowering smart cities through AI-driven community connections
            </motion.p>
            <motion.div 
              className="flex justify-center space-x-8 text-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              {['Privacy Policy', 'Terms of Service', 'Support', 'Contact'].map((link, index) => (
                <motion.a 
                  key={link}
                  href="#" 
                  className="text-gray-400 hover:text-white"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    color: "#ffffff",
                    transition: { duration: 0.2 }
                  }}
                  viewport={{ once: true }}
                >
                  {link}
                </motion.a>
              ))}
            </motion.div>
            <motion.div 
              className="mt-8 text-gray-500 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              viewport={{ once: true }}
            >
              © 2025 CyberLink. All rights reserved.
            </motion.div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}

export default LandingPage