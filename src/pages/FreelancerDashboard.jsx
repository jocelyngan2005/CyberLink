import React, { useState } from 'react'
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
  CheckCircle
} from 'lucide-react'

const FreelancerHome = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [bookingStep, setBookingStep] = useState(1)

  const categories = ['All', 'Technology', 'Food & Beverage', 'Arts & Culture', 'Business']
  
  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const trendingEvents = mockEvents.filter(event => event.trending)

  const handleBookEvent = (event) => {
    setSelectedEvent(event)
    setShowBookingModal(true)
    setBookingStep(1)
  }

  const handleBookingNext = () => {
    if (bookingStep < 3) {
      setBookingStep(bookingStep + 1)
    } else {
      // Complete booking
      setShowBookingModal(false)
      setBookingStep(1)
      setSelectedEvent(null)
    }
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
        <p className="text-primary-100 mb-6">Discover exciting events and opportunities in Cyberjaya</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Calendar size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-primary-100">Events This Week</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Briefcase size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-primary-100">Available Gigs</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Star size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold">4.9</div>
                <div className="text-sm text-primary-100">Your Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Recommendations */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
            <TrendingUp size={20} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Smart Recommendations</h2>
        </div>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">🎵 Tonight: Tech Fair + Food Trucks at Shaftsbury Cyberjaya</h3>
            <p className="text-sm text-gray-600 mb-3">
              Based on your interests in technology and food events, this combination offers great networking opportunities.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center space-x-1">
                  <MapPin size={14} />
                  <span>1.8 km away</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span>6:00 PM</span>
                </span>
              </div>
              <button className="btn-primary text-sm py-2 px-4">
                View Details
              </button>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">📸 Photography Gig: Digital Art Workshop</h3>
            <p className="text-sm text-gray-600 mb-3">
              Perfect match for your photography skills. Event needs documentation for 4 hours.
            </p>
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold text-green-600">RM 200</div>
              <button className="btn-secondary text-sm py-2 px-4">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Discover Events</h2>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              onBook={handleBookEvent}
            />
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Step 1: Event Details */}
            {bookingStep === 1 && (
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Ticket size={24} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Book Event</h3>
                  <p className="text-gray-600">Step 1 of 3: Event Details</p>
                </div>

                <img 
                  src={selectedEvent.image} 
                  alt={selectedEvent.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                
                <h4 className="text-xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h4>
                <p className="text-gray-600 mb-4">{selectedEvent.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin size={16} />
                    <span>{selectedEvent.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar size={16} />
                    <span>{selectedEvent.date} at {selectedEvent.time}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-900">Ticket Price</span>
                  <span className="text-2xl font-bold text-primary-600">RM {selectedEvent.price}</span>
                </div>

                <div className="flex space-x-3">
                  <button 
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1 btn-outline"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleBookingNext}
                    className="flex-1 btn-primary"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Add-ons */}
            {bookingStep === 2 && (
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard size={24} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Add-ons</h3>
                  <p className="text-gray-600">Step 2 of 3: Optional Services</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded border-gray-300 text-primary-600" />
                        <span className="font-medium">Food Pre-order</span>
                      </label>
                      <span className="font-bold text-green-600">+RM 25</span>
                    </div>
                    <p className="text-sm text-gray-600">Skip the queue with pre-ordered meals</p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded border-gray-300 text-primary-600" />
                        <span className="font-medium">Parking Pass</span>
                      </label>
                      <span className="font-bold text-green-600">+RM 10</span>
                    </div>
                    <p className="text-sm text-gray-600">Guaranteed parking spot at the venue</p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded border-gray-300 text-primary-600" />
                        <span className="font-medium">VIP Access</span>
                      </label>
                      <span className="font-bold text-green-600">+RM 50</span>
                    </div>
                    <p className="text-sm text-gray-600">Priority access and reserved seating</p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button 
                    onClick={() => setBookingStep(1)}
                    className="flex-1 btn-outline"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleBookingNext}
                    className="flex-1 btn-primary"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {bookingStep === 3 && (
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={24} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
                  <p className="text-gray-600">Order ID: #CL2025001234</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Booking Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Event Ticket</span>
                      <span>RM {selectedEvent.price}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Food Pre-order</span>
                      <span>RM 25</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Processing Fee</span>
                      <span>RM 5</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>RM {selectedEvent.price + 30}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6 text-sm text-gray-600">
                  <p>📧 Confirmation email sent to john@example.com</p>
                  <p>📱 QR code ticket will be available in your profile</p>
                  <p>🕐 Event reminder will be sent 2 hours before</p>
                </div>

                <button 
                  onClick={handleBookingNext}
                  className="w-full btn-primary"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const FreelancerGigs = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Event Staff', 'Delivery', 'Photography', 'Marketing']
  
  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Available Gigs</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search gigs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredJobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  )
}

const FreelancerProfile = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Profile & Preferences</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                value="John Doe" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                value="john@example.com" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input 
                type="text" 
                value="Cyberjaya, Selangor" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Preferences</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Favorite Categories</label>
              <div className="space-y-2">
                {['Technology', 'Food & Beverage', 'Arts & Culture', 'Business', 'Sports'].map(category => (
                  <label key={category} className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-600" />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Booking History</h2>
        <div className="space-y-4">
          {[
            { id: 1, event: 'Digital Art Workshop', date: '2025-09-15', status: 'Completed' },
            { id: 2, event: 'Tech Innovation Summit', date: '2025-09-10', status: 'Completed' },
            { id: 3, event: 'Startup Networking Night', date: '2025-09-05', status: 'Cancelled' }
          ].map(booking => (
            <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">{booking.event}</h3>
                <p className="text-sm text-gray-600">{booking.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                booking.status === 'Completed' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {booking.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const FreelancerDashboard = () => {
  const location = useLocation()
  
  const sidebarItems = [
    { name: 'Home', href: '/freelancer', icon: Home, active: location.pathname === '/freelancer' },
    { name: 'Gigs', href: '/freelancer/gigs', icon: Briefcase, active: location.pathname === '/freelancer/gigs' },
    { name: 'Profile', href: '/freelancer/profile', icon: User, active: location.pathname === '/freelancer/profile' }
  ]

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Freelancer Dashboard">
      <Routes>
        <Route path="/" element={<FreelancerHome />} />
        <Route path="/gigs" element={<FreelancerGigs />} />
        <Route path="/profile" element={<FreelancerProfile />} />
      </Routes>
    </DashboardLayout>
  )
}

export default FreelancerDashboard