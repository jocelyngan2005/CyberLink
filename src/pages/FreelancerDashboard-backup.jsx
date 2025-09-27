import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import { EventCard, JobCard } from '../components/Cards'
import { mockEvents, mockJobs } from '../data/mockData'
import { 
  Home, 
  Calendar, 
  Briefcase, 
  User, 
  Search, 
  Filter,
  MapPin,
  Star,
  Clock,
  TrendingUp,
  Ticket,
  CreditCard,
  CheckCircle,
  Bot,
  DollarSign,
  Target,
  BarChart3,
  Zap,
  AlertTriangle,
  Settings,
  Activity,
  MessageCircle,
  Bell,
  Send,
  Paperclip,
  X,
  Check,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const FreelancerOnboarding = ({ onComplete, existingPreferences }) => {
  const [step, setStep] = useState(1)
  const [preferences, setPreferences] = useState(
    existingPreferences || {
      expertise: [],
      location: '',
      priceRange: { min: 200, max: 800 },
      availability: [],
      workType: [],
      experience: ''
    }
  )

  const expertiseOptions = [
    { id: 'photography', label: '📸 Photography', desc: 'Event, portrait, product photography' },
    { id: 'videography', label: '🎥 Videography', desc: 'Corporate, wedding, promotional videos' },
    { id: 'design', label: '🎨 Graphic Design', desc: 'Logos, branding, marketing materials' },
    { id: 'writing', label: '✍️ Content Writing', desc: 'Articles, blogs, copywriting' },
    { id: 'web', label: '💻 Web Development', desc: 'Websites, apps, e-commerce' },
    { id: 'marketing', label: '📈 Digital Marketing', desc: 'SEO, social media, advertising' }
  ]

  const locationOptions = [
    'Kuala Lumpur', 'Selangor', 'Penang', 'Johor', 'Melaka', 'Sabah', 'Sarawak', 'Remote/Online'
  ]

  const availabilityOptions = [
    { id: 'weekdays', label: 'Weekdays' },
    { id: 'weekends', label: 'Weekends' },
    { id: 'evenings', label: 'Evenings' },
    { id: 'flexible', label: 'Flexible Schedule' }
  ]

  const workTypeOptions = [
    { id: 'corporate', label: '🏢 Corporate Events' },
    { id: 'wedding', label: '💒 Weddings' },
    { id: 'tech', label: '💻 Tech Events' },
    { id: 'social', label: '🎉 Social Events' },
    { id: 'startup', label: '🚀 Startup Events' }
  ]

  const handleExpertiseToggle = (expertiseId) => {
    setPreferences(prev => ({
      ...prev,
      expertise: prev.expertise.includes(expertiseId)
        ? prev.expertise.filter(id => id !== expertiseId)
        : [...prev.expertise, expertiseId]
    }))
  }

  const handleAvailabilityToggle = (availId) => {
    setPreferences(prev => ({
      ...prev,
      availability: prev.availability.includes(availId)
        ? prev.availability.filter(id => id !== availId)
        : [...prev.availability, availId]
    }))
  }

  const handleWorkTypeToggle = (typeId) => {
    setPreferences(prev => ({
      ...prev,
      workType: prev.workType.includes(typeId)
        ? prev.workType.filter(id => id !== typeId)
        : [...prev.workType, typeId]
    }))
  }

  const handleComplete = () => {
    onComplete(preferences)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {existingPreferences ? '⚙️ Update Your Preferences' : '🎯 Set Up Your Profile'}
          </h1>
          <p className="text-gray-600">
            {existingPreferences 
              ? 'Update your preferences to get better-matched opportunities' 
              : 'Let us personalize your freelance experience'
            }
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step {step} of 4</span>
            <span className="text-sm text-gray-500">{Math.round((step/4)*100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{width: `${(step/4)*100}%`}}></div>
          </div>
        </div>

        {/* Selected Items Display */}
        {step === 1 && preferences.expertise.length > 0 && (
          <div className="mb-6 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm font-medium text-blue-900 mb-2">Selected Services:</p>
            <div className="flex flex-wrap gap-2">
              {preferences.expertise.map(id => {
                const option = expertiseOptions.find(opt => opt.id === id)
                return (
                  <span key={id} className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                    {option?.label}
                  </span>
                )
              })}
            </div>
          </div>
        )}

        {step === 4 && preferences.experience && (
          <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm font-medium text-blue-900 mb-2">Selected Experience Level:</p>
            <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
              {preferences.experience === 'beginner' ? '🌱 Beginner' :
               preferences.experience === 'intermediate' ? '⭐ Intermediate' :
               preferences.experience === 'expert' ? '🚀 Expert' :
               preferences.experience === 'master' ? '👑 Master' : ''}
            </span>
          </div>
        )}

        {/* Step 1: Expertise */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">🎯 What's Your Expertise?</h2>
              <p className="text-gray-600">Select all services you provide (choose multiple)</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {expertiseOptions.map(option => (
                <button 
                  key={option.id}
                  onClick={() => handleExpertiseToggle(option.id)}
                  className={`w-full p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 text-left
                    ${preferences.expertise.includes(option.id) 
                      ? 'border-blue-500 bg-blue-50 shadow-lg' 
                      : 'border-transparent bg-transparent hover:border-blue-500 hover:shadow-xl hover:scale-105'
                    }`}
                >
                  <div className="font-semibold text-gray-900 mb-1">{option.label}</div>
                  <div className="text-sm text-gray-600">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Location & Price */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">📍 Location & Pricing</h2>
              <p className="text-gray-600">Help us find jobs that match your preferences</p>
            </div>
            
            {preferences.location && (
              <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-900 mb-2">Selected Location:</p>
                <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                  {preferences.location}
                </span>
              </div>
            )}
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Location</label>
                <select 
                  value={preferences.location}
                  onChange={(e) => setPreferences(prev => ({...prev, location: e.target.value}))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select location...</option>
                  {locationOptions.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Acceptable Price Range (RM/hr)</label>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-600">Minimum Rate</label>
                    <input 
                      type="range"
                      min="100"
                      max="1000"
                      step="50"
                      value={preferences.priceRange.min}
                      onChange={(e) => setPreferences(prev => ({
                        ...prev, 
                        priceRange: {...prev.priceRange, min: parseInt(e.target.value)}
                      }))}
                      className="w-full"
                    />
                    <div className="text-center font-semibold text-blue-600">RM {preferences.priceRange.min}/hr</div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Maximum Rate</label>
                    <input 
                      type="range"
                      min="200"
                      max="1000"
                      step="50"
                      value={preferences.priceRange.max}
                      onChange={(e) => setPreferences(prev => ({
                        ...prev, 
                        priceRange: {...prev.priceRange, max: parseInt(e.target.value)}
                      }))}
                      className="w-full"
                    />
                    <div className="text-center font-semibold text-blue-600">RM {preferences.priceRange.max}/hr</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Availability & Work Type */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">⏰ Availability & Preferences</h2>
              <p className="text-gray-600">When are you available and what type of work do you prefer?</p>
            </div>
            
            {/* Selected Items Display - Fixed Colors */}
            {(preferences.availability.length > 0 || preferences.workType.length > 0) && (
              <div className="mb-6 space-y-3">
                {preferences.availability.length > 0 && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-blue-900 mb-2">Selected Availability:</p>
                    <div className="flex flex-wrap gap-2">
                      {preferences.availability.map(id => {
                        const option = availabilityOptions.find(opt => opt.id === id)
                        return (
                          <span key={id} className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
                            {option?.label}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                )}
                {preferences.workType.length > 0 && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-blue-900 mb-2">Selected Work Types:</p>
                    <div className="flex flex-wrap gap-2">
                      {preferences.workType.map(id => {
                        const option = workTypeOptions.find(opt => opt.id === id)
                        return (
                          <span key={id} className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
                            {option?.label}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Availability (select all that apply)</label>
                <div className="space-y-3">
                  {availabilityOptions.map(option => (
                    <button 
                      key={option.id}
                      onClick={() => handleAvailabilityToggle(option.id)}
                      className={`w-full p-3 border-2 rounded-lg cursor-pointer transition-all duration-300 text-left
                        ${preferences.availability.includes(option.id)
                          ? 'border-green-500 bg-green-50 shadow-lg'
                          : 'border-transparent bg-transparent hover:border-green-500 hover:shadow-xl hover:scale-105'
                        }`}
                    >
                      <div className="font-medium text-gray-900">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Work Types</label>
                <div className="space-y-3">
                  {workTypeOptions.map(option => (
                    <button 
                      key={option.id}
                      onClick={() => handleWorkTypeToggle(option.id)}
                      className={`w-full p-3 border-2 rounded-lg cursor-pointer transition-all duration-300 text-left
                        ${preferences.workType.includes(option.id)
                          ? 'border-purple-500 bg-purple-50 shadow-lg'
                          : 'border-transparent bg-transparent hover:border-purple-500 hover:shadow-xl hover:scale-105'
                        }`}
                    >
                      <div className="font-medium text-gray-900">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Experience Level */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">🏆 Experience Level</h2>
              <p className="text-gray-600">Help us match you with appropriate opportunities</p>
            </div>
            
            <div className="space-y-4 max-w-2xl mx-auto">
              {[
                { id: 'beginner', label: '🌱 Beginner', desc: '0-2 years experience, learning the ropes' },
                { id: 'intermediate', label: '⭐ Intermediate', desc: '2-5 years experience, solid skills' },
                { id: 'expert', label: '🚀 Expert', desc: '5+ years experience, industry specialist' },
                { id: 'master', label: '👑 Master', desc: '10+ years, thought leader in your field' }
              ].map(option => (
                <button 
                  key={option.id}
                  onClick={() => setPreferences(prev => ({...prev, experience: option.id}))}
                  className={`w-full p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 text-left
                    ${preferences.experience === option.id
                      ? 'border-orange-500 bg-orange-50 shadow-lg'
                      : 'border-transparent bg-transparent hover:border-orange-500 hover:shadow-xl hover:scale-105'
                    }`}
                >
                  <div className="font-semibold text-gray-900 mb-1">{option.label}</div>
                  <div className="text-sm text-gray-600">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <button 
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="flex items-center px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          
          {step < 4 ? (
            <button 
              onClick={() => setStep(step + 1)}
              className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 hover:shadow-lg transition-all duration-200"
            >
              Next
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button 
              onClick={handleComplete}
              className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 hover:shadow-lg transition-all duration-200"
            >
              🚀 Start Finding Jobs!
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// NEW FEATURE 1: AVAILABILITY CALENDAR COMPONENT
const FreelancerCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [blockedDates, setBlockedDates] = useState([
    '2025-10-15', '2025-10-22', '2025-10-29'
  ])
  const [bookings, setBookings] = useState([
    { date: '2025-10-15', title: 'Tech Expo Photography', client: 'Tech Solutions', time: '2-6pm', status: 'confirmed' },
    { date: '2025-10-22', title: 'Wedding Photography', client: 'Sarah & Ahmad', time: '10am-6pm', status: 'confirmed' },
    { date: '2025-10-18', title: 'Product Launch', client: 'Startup Hub', time: '3-7pm', status: 'pending' }
  ])

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    return { daysInMonth, startingDayOfWeek, year, month }
  }

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate)
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December']

  const toggleBlockDate = (dateStr) => {
    setBlockedDates(prev => 
      prev.includes(dateStr) 
        ? prev.filter(d => d !== dateStr)
        : [...prev, dateStr]
    )
  }

  const getDateString = (day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  const getDateStatus = (dateStr) => {
    const booking = bookings.find(b => b.date === dateStr)
    if (booking) return { type: 'booking', data: booking }
    if (blockedDates.includes(dateStr)) return { type: 'blocked' }
    return { type: 'available' }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">📅 Availability Calendar</h1>
          <p className="text-gray-600">Manage your schedule and prevent double bookings</p>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="px-4 py-2 font-semibold">{monthNames[month]} {year}</span>
          <button 
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          {/* Calendar Header */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-semibold text-gray-600 py-3 bg-gray-50 rounded-lg">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Body */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before month starts */}
            {[...Array(startingDayOfWeek)].map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square p-2"></div>
            ))}
            
            {/* Calendar days */}
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1
              const dateStr = getDateString(day)
              const status = getDateStatus(dateStr)
              const isToday = new Date().getDate() === day && 
                             new Date().getMonth() === month && 
                             new Date().getFullYear() === year
              
              return (
                <button
                  key={day}
                  onClick={() => toggleBlockDate(dateStr)}
                  className={`aspect-square rounded-lg p-2 text-sm font-medium transition-all duration-200 relative border-2 flex flex-col items-center justify-center hover:shadow-md
                    ${status.type === 'booking' && status.data.status === 'confirmed' 
                      ? 'bg-green-50 border-green-400 text-green-800 hover:bg-green-100' 
                      : status.type === 'booking' && status.data.status === 'pending'
                      ? 'bg-yellow-50 border-yellow-400 text-yellow-800 hover:bg-yellow-100'
                      : status.type === 'blocked'
                      ? 'bg-red-50 border-red-400 text-red-800 hover:bg-red-100'
                      : isToday
                      ? 'bg-blue-100 border-blue-500 text-blue-800 font-bold'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                >
                  <div className="font-semibold">{day}</div>
                  {status.type === 'booking' && (
                    <div className="w-2 h-2 rounded-full bg-current mt-1 opacity-60"></div>
                  )}
                  {status.type === 'blocked' && (
                    <div className="w-2 h-2 rounded-full bg-current mt-1"></div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Calendar Legend */}
          <div className="flex items-center justify-center flex-wrap gap-6 mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-50 border-2 border-green-400 rounded-lg"></div>
              <span className="text-sm text-gray-600 font-medium">Confirmed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-50 border-2 border-yellow-400 rounded-lg"></div>
              <span className="text-sm text-gray-600 font-medium">Pending</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-50 border-2 border-red-400 rounded-lg"></div>
              <span className="text-sm text-gray-600 font-medium">Blocked</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-100 border-2 border-blue-500 rounded-lg"></div>
              <span className="text-sm text-gray-600 font-medium">Today</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-white border-2 border-gray-200 rounded-lg"></div>
              <span className="text-sm text-gray-600 font-medium">Available</span>
            </div>
          </div>
        </div>

        {/* Upcoming Bookings Sidebar */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Bookings</h3>
          <div className="space-y-3">
            {bookings
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((booking, index) => (
              <div key={index} className={`p-3 rounded-lg border-l-4 ${
                booking.status === 'confirmed' ? 'border-green-500 bg-green-50' : 'border-yellow-500 bg-yellow-50'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="font-semibold text-gray-900 text-sm">{booking.title}</div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    booking.status === 'confirmed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
                <div className="text-xs text-gray-600">{booking.client}</div>
                <div className="text-xs text-gray-500 mt-1">{new Date(booking.date).toLocaleDateString()} • {booking.time}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">Quick Actions</h4>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Block Multiple Dates
            </button>
          </div>

          <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h4 className="text-sm font-semibold text-purple-900 mb-2">AI Suggestion</h4>
            <p className="text-xs text-purple-700">
              Based on demand forecast, consider keeping Oct 15-17 open for high-paying tech events (RM 450/hr avg)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// NEW FEATURE 2: MESSAGING SYSTEM COMPONENT
const FreelancerMessages = () => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [messageInput, setMessageInput] = useState('')
  
  const conversations = [
    { 
      id: 1, 
      client: 'Tech Solutions Sdn Bhd', 
      lastMessage: 'Thanks! Looking forward to the event',
      time: '2 mins ago',
      unread: 0,
      avatar: '🏢',
      status: 'active'
    },
    { 
      id: 2, 
      client: 'Sarah & Ahmad', 
      lastMessage: 'Can we discuss the wedding package?',
      time: '1 hour ago',
      unread: 2,
      avatar: '💒',
      status: 'active'
    },
    { 
      id: 3, 
      client: 'Startup Hub KL', 
      lastMessage: 'What\'s your rate for product launch?',
      time: '3 hours ago',
      unread: 1,
      avatar: '🚀',
      status: 'active'
    }
  ]

  const messages = selectedChat ? [
    { id: 1, sender: 'client', text: 'Hi! We need a photographer for our tech event on Oct 15th', time: '10:30 AM' },
    { id: 2, sender: 'me', text: 'Hi! I would love to help. What are the event details?', time: '10:32 AM' },
    { id: 3, sender: 'client', text: 'It\'s a corporate tech expo from 2-6pm at Cyberjaya Convention Center', time: '10:35 AM' },
    { id: 4, sender: 'me', text: 'Perfect! My rate is RM450/hr for corporate events. Total would be RM1,800 for 4 hours', time: '10:37 AM' },
    { id: 5, sender: 'client', text: 'That works for us! Can you confirm your availability?', time: '10:40 AM' },
    { id: 6, sender: 'me', text: 'Yes, I\'m available on Oct 15th. I\'ll send over the contract shortly', time: '10:42 AM' },
    { id: 7, sender: 'client', text: 'Thanks! Looking forward to the event', time: '10:45 AM' }
  ] : []

  const aiTemplates = [
    { id: 1, text: 'Thanks for reaching out! I\'d love to work with you. Can you share more details about the event?', icon: '👋' },
    { id: 2, text: 'I\'m available on that date! My rate for this type of event is [RATE]. Does that work for you?', icon: '✅' },
    { id: 3, text: 'I appreciate the offer, but unfortunately I\'m not available on that date. Would [DATE] work instead?', icon: '📅' },
    { id: 4, text: 'I\'ll send over a detailed proposal with deliverables and timeline within 24 hours', icon: '📋' }
  ]

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // In real implementation, this would send to backend
      console.log('Sending message:', messageInput)
      setMessageInput('')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">💬 Messages</h1>
          <p className="text-gray-600">Communicate with clients and coordinate bookings</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
            3 unread
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
          <div className="mb-4">
            <input 
              type="text"
              placeholder="Search conversations..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div className="space-y-2">
            {conversations.map(conv => (
              <button
                key={conv.id}
                onClick={() => setSelectedChat(conv)}
                className={`w-full p-3 rounded-lg text-left transition-all ${
                  selectedChat?.id === conv.id 
                    ? 'bg-blue-50 border-2 border-blue-500' 
                    : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{conv.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-900 text-sm truncate">{conv.client}</span>
                      {conv.unread > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 truncate">{conv.lastMessage}</p>
                    <span className="text-xs text-gray-400">{conv.time}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="text-sm font-semibold text-green-900 mb-1">Quick Response Rate</h4>
            <div className="text-2xl font-bold text-green-600">15 min avg</div>
            <p className="text-xs text-green-700">Keep it under 30min for best results</p>
          </div>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col" style={{height: '600px'}}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{selectedChat.avatar}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedChat.client}</h3>
                    <span className="text-xs text-green-600">● Active now</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Paperclip size={18} />
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Calendar size={18} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] ${
                      msg.sender === 'me' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    } rounded-lg p-3`}>
                      <p className="text-sm">{msg.text}</p>
                      <span className={`text-xs ${msg.sender === 'me' ? 'text-blue-100' : 'text-gray-500'} mt-1 block`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Templates */}
              <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                  <span className="text-xs text-gray-600 whitespace-nowrap">Quick replies:</span>
                  {aiTemplates.map(template => (
                    <button
                      key={template.id}
                      onClick={() => setMessageInput(template.text)}
                      className="flex items-center space-x-1 px-3 py-1 bg-white border border-gray-300 rounded-full text-xs hover:bg-blue-50 hover:border-blue-300 whitespace-nowrap"
                    >
                      <span>{template.icon}</span>
                      <span className="max-w-[150px] truncate">{template.text.slice(0, 30)}...</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Paperclip size={20} />
                  </button>
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <MessageCircle size={64} className="mx-auto mb-4 opacity-50" />
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// NEW FEATURE 3: PAYMENT & INVOICING COMPONENT
const FreelancerPayments = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)

  const transactions = [
    { id: 1, client: 'Tech Solutions Sdn Bhd', amount: 1800, status: 'completed', date: '2025-09-25', method: 'FPX' },
    { id: 2, client: 'Startup Hub KL', amount: 2400, status: 'pending', date: '2025-09-24', method: 'Credit Card' },
    { id: 3, client: 'Sarah & Ahmad', amount: 3200, status: 'completed', date: '2025-09-20', method: 'E-Wallet' },
    { id: 4, client: 'Digital Marketing Co', amount: 1500, status: 'completed', date: '2025-09-18', method: 'Bank Transfer' }
  ]

  const invoices = [
    { id: 'INV-001', client: 'Tech Solutions Sdn Bhd', amount: 1800, status: 'paid', dueDate: '2025-09-25' },
    { id: 'INV-002', client: 'Startup Hub KL', amount: 2400, status: 'pending', dueDate: '2025-10-01' },
    { id: 'INV-003', client: 'Sarah & Ahmad', amount: 3200, status: 'paid', dueDate: '2025-09-20' }
  ]

  const paymentMethods = [
    { id: 'fpx', name: 'FPX (Online Banking)', icon: '🏦', fee: '0%' },
    { id: 'card', name: 'Credit/Debit Card', icon: '💳', fee: '2.5%' },
    { id: 'ewallet', name: 'E-Wallet (Touch n Go, GrabPay)', icon: '📱', fee: '1.5%' },
    { id: 'bank', name: 'Bank Transfer', icon: '🏧', fee: '0%' }
  ]

  const totalEarnings = transactions.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.amount, 0)
  const pendingPayments = transactions.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">💰 Payments & Invoicing</h1>
          <p className="text-gray-600">Manage your earnings, invoices, and payouts</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Request Payout
        </button>
      </div>

      {/* Financial Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-black">
          <div className="text-sm opacity-90 mb-1">Total Earnings</div>
          <div className="text-3xl font-bold">RM {totalEarnings.toLocaleString()}</div>
          <div className="text-sm opacity-75 mt-2">This month</div>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-6 text-black">
          <div className="text-sm opacity-90 mb-1">Pending Payments</div>
          <div className="text-3xl font-bold">RM {pendingPayments.toLocaleString()}</div>
          <div className="text-sm opacity-75 mt-2">In escrow</div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-6 text-black">
          <div className="text-sm opacity-90 mb-1">Available Balance</div>
          <div className="text-3xl font-bold">RM {(totalEarnings * 0.9).toLocaleString()}</div>
          <div className="text-sm opacity-75 mt-2">Ready to withdraw</div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-black">
          <div className="text-sm opacity-90 mb-1">Platform Fee</div>
          <div className="text-3xl font-bold">10%</div>
          <div className="text-sm opacity-75 mt-2">RM {(totalEarnings * 0.1).toLocaleString()} total</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            {transactions.map(txn => (
              <div key={txn.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{txn.client}</div>
                  <div className="text-sm text-gray-500">{txn.date} • {txn.method}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">RM {txn.amount.toLocaleString()}</div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    txn.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {txn.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
            View All Transactions
          </button>
        </div>

        {/* Invoices */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Invoices</h2>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
              Create New
            </button>
          </div>
          <div className="space-y-3">
            {invoices.map(invoice => (
              <div key={invoice.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">{invoice.id}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      invoice.status === 'paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{invoice.client}</div>
                  <div className="text-xs text-gray-500">Due: {invoice.dueDate}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">RM {invoice.amount.toLocaleString()}</div>
                  <button 
                    onClick={() => setSelectedInvoice(invoice)}
                    className="text-xs text-blue-600 hover:text-blue-700 mt-1"
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Accepted Payment Methods</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {paymentMethods.map(method => (
            <div key={method.id} className="border-2 border-gray-200 rounded-xl p-4 text-center hover:border-blue-500 transition-all cursor-pointer">
              <div className="text-3xl mb-2">{method.icon}</div>
              <div className="font-semibold text-gray-900 text-sm mb-1">{method.name}</div>
              <div className="text-xs text-gray-600">Fee: {method.fee}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <CreditCard size={20} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-blue-900 mb-1">Secure Escrow System</h4>
              <p className="text-sm text-blue-700">
                All payments are held in escrow until job completion. Funds are automatically released when both parties confirm delivery.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payout Settings */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Payout Settings</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payout Schedule</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>Weekly (Every Friday)</option>
              <option>Bi-weekly</option>
              <option>Monthly</option>
              <option>Manual (On Request)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bank Account</label>
            <div className="flex items-center space-x-2">
              <input 
                type="text"
                value="Maybank ****1234"
                disabled
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Edit
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-green-900">Next Payout</h4>
              <p className="text-sm text-green-700">Friday, Oct 4, 2025 • RM {(totalEarnings * 0.9).toLocaleString()}</p>
            </div>
            <Check size={24} className="text-green-600" />
          </div>
        </div>
      </div>
    </div>
  )
}

const FreelancerHome = () => {
  // Load preferences from localStorage on component mount
  const [userPreferences, setUserPreferences] = useState(() => {
    const savedPreferences = localStorage.getItem('freelancerPreferences')
    return savedPreferences ? JSON.parse(savedPreferences) : null
  })
  
  // Only show onboarding if no preferences are saved
  const [showOnboarding, setShowOnboarding] = useState(() => {
    const savedPreferences = localStorage.getItem('freelancerPreferences')
    return !savedPreferences
  })
  
  const [activeAgents, setActiveAgents] = useState({
    bookingAgent: true,
    pricingAgent: true,
    discoveryAgent: true
  })
  
  const [aiInsights, setAiInsights] = useState({
    monthlyRevenue: 5200,
    pendingBookings: 3,
    demandForecast: '+87%',
    avgRate: 350,
    opportunities: 8
  })

  // Mock AI agent activities (in real implementation, these would come from AI services)
  const agentActivities = [
    { id: 1, type: 'booking', action: 'Auto-responded to tech event inquiry', time: '2 mins ago', status: 'active' },
    { id: 2, type: 'pricing', action: 'Adjusted rate to RM375/hr for high demand', time: '15 mins ago', status: 'completed' },
    { id: 3, type: 'discovery', action: 'Added to 3 client recommendation lists', time: '1 hour ago', status: 'active' },
    { id: 4, type: 'booking', action: 'Processed payment for Digital Art Workshop', time: '2 hours ago', status: 'completed' }
  ]

  const demandPredictions = [
    { event: 'Tech Innovation Expo', date: 'Oct 15', demand: '87%', rate: 'RM450/hr', bookings: 5 },
    { event: 'Startup Pitch Night', date: 'Oct 18', demand: '64%', rate: 'RM320/hr', bookings: 2 },
    { event: 'Digital Art Festival', date: 'Oct 22', demand: '91%', rate: 'RM480/hr', bookings: 6 }
  ]

  const handleOnboardingComplete = (preferences) => {
    setUserPreferences(preferences)
    setShowOnboarding(false)
    // Save preferences to localStorage for persistence
    localStorage.setItem('freelancerPreferences', JSON.stringify(preferences))
    console.log('Preferences saved:', preferences)
  }

  const handleUpdatePreferences = () => {
    // Show onboarding to update preferences
    setShowOnboarding(true)
  }

  const handleClearPreferences = () => {
    // Clear preferences and show onboarding again
    localStorage.removeItem('freelancerPreferences')
    setUserPreferences(null)
    setShowOnboarding(true)
  }

  // Load preferences on component mount and validate data
  useEffect(() => {
    const savedPreferences = localStorage.getItem('freelancerPreferences')
    if (savedPreferences) {
      try {
        const parsedPreferences = JSON.parse(savedPreferences)
        // Validate that the preferences have required fields
        if (parsedPreferences && 
            parsedPreferences.expertise && 
            Array.isArray(parsedPreferences.expertise) &&
            parsedPreferences.location) {
          setUserPreferences(parsedPreferences)
          setShowOnboarding(false)
          console.log('Preferences loaded successfully:', parsedPreferences)
        } else {
          console.warn('Invalid preferences format, clearing localStorage')
          localStorage.removeItem('freelancerPreferences')
        }
      } catch (error) {
        console.error('Error parsing preferences:', error)
        localStorage.removeItem('freelancerPreferences')
      }
    } else {
      console.log('No saved preferences found, showing onboarding')
    }
  }, [])

  // Show onboarding if user hasn't completed it or wants to update preferences
  if (showOnboarding) {
    return <FreelancerOnboarding 
      onComplete={handleOnboardingComplete} 
      existingPreferences={userPreferences} 
    />
  }

  return (
    <div className="space-y-8">
      {/* Personalized Welcome Section */}
      {userPreferences && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-black">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-3">Welcome to Your Personalized Dashboard!</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-white/20 px-3 py-2 rounded-lg text-center">
                    <div className="text-xs opacity-80">Location</div>
                    <div className="font-semibold">{userPreferences.location}</div>
                  </div>
                  <div className="bg-white/20 px-3 py-2 rounded-lg text-center">
                    <div className="text-xs opacity-80">Rate Range</div>
                    <div className="font-semibold">RM {userPreferences.priceRange.min}-{userPreferences.priceRange.max}/hr</div>
                  </div>
                  <div className="bg-white/20 px-3 py-2 rounded-lg text-center">
                    <div className="text-xs opacity-80">Services</div>
                    <div className="font-semibold">{userPreferences.expertise.length} services</div>
                  </div>
                  <div className="bg-white/20 px-3 py-2 rounded-lg text-center">
                    <div className="text-xs opacity-80">Availability</div>
                    <div className="font-semibold">{userPreferences.availability.length} slots</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={handleUpdatePreferences}
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-white/20"
                >
                  Update Preferences
                </button>
                <button 
                  onClick={handleClearPreferences}
                  className="bg-red-500/20 hover:bg-red-500/30 px-3 py-2 rounded-lg text-sm font-medium transition-colors border border-red-300/20 text-red-100"
                  title="Clear all preferences"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Status Overview - Aligned Left Like Welcome Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-black">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-3">AI Assistant Status</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="bg-white/20 px-3 py-2 rounded-lg text-center">
                  <div className="text-xs opacity-80">Status</div>
                  <div className="font-semibold">All systems active</div>
                </div>
                <div className="bg-white/20 px-3 py-2 rounded-lg text-center">
                  <div className="text-xs opacity-80">Active Agents</div>
                  <div className="font-semibold">3 agents</div>
                </div>
                <div className="bg-white/20 px-3 py-2 rounded-lg text-center">
                  <div className="text-xs opacity-80">Today's Leads</div>
                  <div className="font-semibold">{aiInsights.opportunities} leads</div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">RM {(aiInsights.monthlyRevenue/1000).toFixed(1)}K</div>
              <div className="text-blue-100 text-sm">Projected this month</div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Overview - Unique to Dashboard */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Performance Overview</h2>
          <div className="text-sm text-gray-500">This month</div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="font-bold text-green-600 text-2xl mb-1">RM 5.2K</div>
            <div className="text-xs text-gray-600 font-medium">Revenue</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 text-center">
            <div className="font-bold text-blue-600 text-2xl mb-1">12</div>
            <div className="text-xs text-gray-600 font-medium">Jobs Completed</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-4 text-center">
            <div className="font-bold text-purple-600 text-2xl mb-1">4.9</div>
            <div className="text-xs text-gray-600 font-medium">Average Rating</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4 text-center">
            <div className="font-bold text-orange-600 text-2xl mb-1">96%</div>
            <div className="text-xs text-gray-600 font-medium">Client Satisfaction</div>
          </div>
        </div>
      </div>

      {/* Quick Actions - Navigate to Other Features */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <button 
            onClick={() => window.location.href = '/freelancer/gigs'}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl hover:shadow-md transition-all duration-200 text-left"
          >
            <div>
              <div className="font-semibold text-gray-900 mb-1">Smart Bookings</div>
              <div className="text-sm text-gray-600">AI-matched jobs</div>
            </div>
            <div className="text-blue-600">→</div>
          </button>
          
          <button 
            onClick={() => window.location.href = '/freelancer/calendar'}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl hover:shadow-md transition-all duration-200 text-left"
          >
            <div>
              <div className="font-semibold text-gray-900 mb-1">Calendar</div>
              <div className="text-sm text-gray-600">Manage availability</div>
            </div>
            <div className="text-green-600">→</div>
          </button>

          <button 
            onClick={() => window.location.href = '/freelancer/messages'}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-xl hover:shadow-md transition-all duration-200 text-left"
          >
            <div>
              <div className="font-semibold text-gray-900 mb-1">Messages</div>
              <div className="text-sm text-gray-600">3 unread</div>
            </div>
            <div className="text-purple-600">→</div>
          </button>
        </div>
        
        {/* Latest Alert */}
        <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
          <div className="flex items-start space-x-3">
            <div className="bg-amber-100 p-2 rounded-lg">
              <Bell size={18} className="text-amber-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-amber-800 mb-1">Latest Update</h4>
              <p className="text-sm text-amber-700">
                3 new high-value opportunities available in Smart Bookings - Tech events paying up to RM 450/hr
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const FreelancerGigs = () => {
  const [autoBookingEnabled, setAutoBookingEnabled] = useState(true)
  
  const aiBookings = [
    { 
      id: 1, 
      title: 'Corporate Event Photography', 
      client: 'Tech Solutions Sdn Bhd',
      rate: 450, 
      date: 'Oct 15, 2025', 
      status: 'auto-booked', 
      confidence: 95,
      duration: '6 hours'
    },
    { 
      id: 2, 
      title: 'Product Launch Videography', 
      client: 'Startup Hub KL',
      rate: 520, 
      date: 'Oct 18, 2025', 
      status: 'negotiating', 
      confidence: 87,
      duration: '8 hours'
    },
    { 
      id: 3, 
      title: 'Wedding Photography', 
      client: 'Sarah & Ahmad',
      rate: 380, 
      date: 'Oct 22, 2025', 
      status: 'pending-response', 
      confidence: 92,
      duration: '10 hours'
    }
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Smart Job Recommendations</h1>
          <p className="text-gray-600">AI analyzes price, time & location to find best value</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-green-600 font-medium">3 recommendations</span>
          <button className="btn-outline text-sm">Filters</button>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Target size={20} className="text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Available Jobs</h2>
          </div>
          <span className="text-sm text-gray-600">Ranked by AI value score</span>
        </div>
        
        <div className="space-y-6">
          {aiBookings.map((booking, index) => (
            <div key={booking.id} className="bg-white border-2 border-gray-400 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all">
              {/* Job Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 pr-6">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">{booking.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">{booking.client} • {booking.date}</p>
                  <div className="text-sm text-gray-700 mb-3">
                    <span className="font-semibold text-green-600">RM {booking.rate}/hr</span> • {booking.duration}
                  </div>
                </div>
                <div className="text-right min-w-[140px]">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    RM {booking.rate * parseInt(booking.duration)}
                  </div>
                  <div className="text-sm text-gray-500 mb-4">Total value</div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg w-full">
                    Apply Now
                  </button>
                </div>
              </div>
              
              {/* AI Value Score Section - Full Width */}
              <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-center space-x-2 mb-3">
                  <div className={`w-3 h-3 rounded-full ${
                    booking.confidence >= 90 ? 'bg-green-500' :
                    booking.confidence >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className={`text-lg font-bold ${
                    booking.confidence >= 90 ? 'text-green-600' :
                    booking.confidence >= 70 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {booking.confidence}% AI Value Score
                  </span>
                </div>
                
                {/* AI Analysis Breakdown */}
                <div className="grid grid-cols-3 gap-4 ml-5">
                  <div className="bg-white border border-green-200 p-3 rounded-lg text-center">
                    <div className="text-xs text-green-600 font-medium mb-1">Price Score</div>
                    <div className="text-lg font-bold text-green-700">
                      {booking.confidence >= 90 ? '95%' : booking.confidence >= 70 ? '78%' : '60%'}
                    </div>
                  </div>
                  <div className="bg-white border border-blue-200 p-3 rounded-lg text-center">
                    <div className="text-xs text-blue-600 font-medium mb-1">Location</div>
                    <div className="text-lg font-bold text-blue-700">
                      {booking.confidence >= 90 ? '92%' : booking.confidence >= 70 ? '85%' : '70%'}
                    </div>
                  </div>
                  <div className="bg-white border border-purple-200 p-3 rounded-lg text-center">
                    <div className="text-xs text-purple-600 font-medium mb-1">Time Fit</div>
                    <div className="text-lg font-bold text-purple-700">
                      {booking.confidence >= 90 ? '97%' : booking.confidence >= 70 ? '82%' : '65%'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg text-sm">
          <div className="flex items-center space-x-4">
            <div><span className="font-bold text-blue-600">AI Analysis</span> active</div>
            <div><span className="font-bold text-green-600">3</span> top matches</div>
            <div><span className="font-bold text-purple-600">94%</span> accuracy</div>
          </div>
          <div className="flex items-center space-x-1">
            <Target size={16} className="text-blue-600" />
            <span className="text-xs text-gray-600">Smart recommendations</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const FreelancerProfile = () => {
  const [dynamicPricing, setDynamicPricing] = useState(true)
  const [minRate, setMinRate] = useState(250)
  const [maxRate, setMaxRate] = useState(500)
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI-Enhanced Profile</h1>
          <p className="text-gray-600">Configure your AI agents and view revenue intelligence</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">4.9</div>
          <div className="text-sm text-gray-600">AI-optimized rating</div>
        </div>
      </div>
      
      {/* Dynamic Pricing Agent Settings */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
            <DollarSign size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Dynamic Pricing Agent</h2>
            <p className="text-sm text-gray-600">AI automatically adjusts your rates for maximum revenue</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">Enable Dynamic Pricing</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={dynamicPricing} 
                  onChange={(e) => setDynamicPricing(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rate (RM/hr)</label>
              <input 
                type="number" 
                value={minRate}
                onChange={(e) => setMinRate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Rate (RM/hr)</label>
              <input 
                type="number" 
                value={maxRate}
                onChange={(e) => setMaxRate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Current Pricing Strategy</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Base Rate:</span>
                <span className="font-medium">RM 350/hr</span>
              </div>
              <div className="flex justify-between">
                <span>Peak Surge (+25%):</span>
                <span className="font-medium text-green-600">RM 437/hr</span>
              </div>
              <div className="flex justify-between">
                <span>Weekend Bonus (+15%):</span>
                <span className="font-medium text-blue-600">RM 402/hr</span>
              </div>
              <div className="flex justify-between">
                <span>High Demand Alert:</span>
                <span className="font-medium text-orange-600">Active</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-white rounded border">
              <div className="text-xs text-gray-600 mb-1">Revenue Impact This Month</div>
              <div className="font-bold text-lg text-green-600">+32% (RM 1,680 extra)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Intelligence */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
            <BarChart3 size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Revenue Intelligence</h2>
            <p className="text-sm text-gray-600">AI insights to grow your freelance business</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Peak Earning Periods</h3>
            <div className="space-y-2 text-sm">
              <div>• <strong>Friday evenings:</strong> +40% earnings</div>
              <div>• <strong>Tech events:</strong> +55% premium</div>
              <div>• <strong>Quarter-end:</strong> +30% corporate demand</div>
            </div>
            <div className="mt-3 p-2 bg-white rounded">
              <div className="text-xs text-gray-600">Next high-demand period</div>
              <div className="font-bold text-blue-600">Oct 15-17 (Tech Week)</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Top Performing Services</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Corporate Events</span>
                <span className="font-bold text-green-600">RM 500</span>
              </div>
              <div className="flex justify-between">
                <span>Tech Photography</span>
                <span className="font-bold text-blue-600">RM 450</span>
              </div>
              <div className="flex justify-between">
                <span>Product Shoots</span>
                <span className="font-bold text-purple-600">RM 380</span>
              </div>
            </div>
            <div className="mt-3 p-2 bg-white rounded">
              <div className="text-xs text-gray-600">Recommendation</div>
              <div className="font-bold text-green-600">Focus on corporate events</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Growth Opportunities</h3>
            <div className="space-y-2 text-sm">
              <div>• <strong>Drone photography:</strong> +35% bookings</div>
              <div>• <strong>KL expansion:</strong> +50% revenue</div>
              <div>• <strong>Video services:</strong> +25% rate premium</div>
            </div>
            <div className="mt-3 p-2 bg-white rounded">
              <div className="text-xs text-gray-600">Priority action</div>
              <div className="font-bold text-orange-600">Add drone certification</div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Agent History */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">AI Agent Activity History</h2>
        <div className="space-y-4">
          {[
            { id: 1, action: 'Auto-booked Corporate Event Photography', revenue: 'RM 2,700', date: '2025-09-25', agent: 'Booking Agent' },
            { id: 2, action: 'Negotiated rate increase to RM 400/hr', revenue: 'RM +150', date: '2025-09-24', agent: 'Pricing Agent' },
            { id: 3, action: 'Featured in 5 client recommendation lists', revenue: 'Lead gen', date: '2025-09-23', agent: 'Discovery Agent' },
            { id: 4, action: 'Processed payment for Tech Summit', revenue: 'RM 1,800', date: '2025-09-22', agent: 'Booking Agent' }
          ].map(activity => (
            <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{activity.action}</h3>
                  <p className="text-sm text-gray-600">{activity.date} • {activity.agent}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`font-bold ${
                  activity.revenue.includes('RM') ? 'text-green-600' : 'text-blue-600'
                }`}>
                  {activity.revenue}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <button className="btn-outline">View All Agent Activities</button>
        </div>
      </div>
    </div>
  )
}

const FreelancerDashboard = () => {
  const location = useLocation()
  
  const sidebarItems = [
    { name: 'Dashboard', href: '/freelancer', icon: Home, active: location.pathname === '/freelancer' },
    { name: 'Smart Bookings', href: '/freelancer/gigs', icon: Bot, active: location.pathname === '/freelancer/gigs' },
    { name: 'Calendar', href: '/freelancer/calendar', icon: Calendar, active: location.pathname === '/freelancer/calendar' },
    { name: 'Messages', href: '/freelancer/messages', icon: MessageCircle, active: location.pathname === '/freelancer/messages' },
    { name: 'Payments', href: '/freelancer/payments', icon: CreditCard, active: location.pathname === '/freelancer/payments' },
    { name: 'AI Settings', href: '/freelancer/profile', icon: Settings, active: location.pathname === '/freelancer/profile' }
  ]

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Freelancer Dashboard">
      <Routes>
        <Route path="/" element={<FreelancerHome />} />
        <Route path="/gigs" element={<FreelancerGigs />} />
        <Route path="/calendar" element={<FreelancerCalendar />} />
        <Route path="/messages" element={<FreelancerMessages />} />
        <Route path="/payments" element={<FreelancerPayments />} />
        <Route path="/profile" element={<FreelancerProfile />} />
      </Routes>
    </DashboardLayout>
  )
}

export default FreelancerDashboard