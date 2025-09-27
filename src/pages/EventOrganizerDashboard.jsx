import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import { RippleEffectChart, MetricCard, TrafficChart } from '../components/Charts'
import { SMECard } from '../components/Cards'
import { mockSMEs, mockRippleEffects, mockEvents } from '../data/mockData'
import { 
  Home, 
  Calendar, 
  Users, 
  MapPin, 
  BarChart3,
  Zap,
  Car,
  Bus,
  Trash2,
  Building,
  TrendingUp,
  Star,
  Clock,
  Filter,
  Search,
  Plus
} from 'lucide-react'

const EventOrganizerHome = () => {
  const upcomingEvents = mockEvents.slice(0, 3)
  
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-secondary-500 to-accent-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Event Dashboard 🎉</h1>
        <p className="text-secondary-100 mb-6">Manage your events and optimize city resources efficiently</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Calendar size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-secondary-100">Active Events</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Users size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold">1.2K</div>
                <div className="text-sm text-secondary-100">Total Attendees</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Building size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold">45</div>
                <div className="text-sm text-secondary-100">Partner Vendors</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Star size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold">4.7</div>
                <div className="text-sm text-secondary-100">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
          <button className="btn-primary">
            <Plus size={16} className="mr-2" />
            Create Event
          </button>
        </div>
        
        <div className="space-y-4">
          {upcomingEvents.map(event => (
            <div key={event.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex space-x-4">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <span className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{event.date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{event.time}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin size={14} />
                        <span>{event.location}</span>
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{event.description}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="btn-outline text-sm">Edit</button>
                  <button className="btn-primary text-sm">Manage</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vendor Matching */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Suggested Vendors</h2>
          <button className="btn-outline text-sm">View All</button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockSMEs.map(sme => (
            <div key={sme.id} className="border border-gray-200 rounded-lg">
              <SMECard sme={sme} />
              <div className="px-6 pb-4">
                <button className="btn-primary text-sm w-full">
                  Send Invitation
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const SmartCityIntegration = () => {
  const [selectedLayer, setSelectedLayer] = useState('all')
  const [timeFilter, setTimeFilter] = useState('current')

  const cityLayers = [
    { id: 'all', name: 'All Layers', color: 'primary' },
    { id: 'parking', name: 'Parking', color: 'blue' },
    { id: 'transport', name: 'Public Transport', color: 'green' },
    { id: 'sanitation', name: 'Sanitation', color: 'orange' },
    { id: 'security', name: 'Security', color: 'red' }
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Smart City Integration</h1>
        <div className="flex space-x-3">
          <button className="btn-outline">
            <Filter size={16} className="mr-2" />
            Filters
          </button>
          <button className="btn-primary">
            <MapPin size={16} className="mr-2" />
            Live View
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="card">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">City Layer:</label>
            <select 
              value={selectedLayer}
              onChange={(e) => setSelectedLayer(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              {cityLayers.map(layer => (
                <option key={layer.id} value={layer.id}>{layer.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Time Period:</label>
            <select 
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="current">Current</option>
              <option value="peak">Peak Hours</option>
              <option value="off-peak">Off-Peak</option>
              <option value="weekend">Weekend</option>
            </select>
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">City Infrastructure Map</h2>
          <div className="bg-gray-100 rounded-lg h-96 relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=800&h=400&fit=crop" 
              alt="Smart City Map"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
              {/* Parking indicators */}
              <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-lg border-2 border-white cursor-pointer" title="Parking Zone A - 85% occupied"></div>
              <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg border-2 border-white cursor-pointer" title="Parking Zone B - 45% occupied"></div>
              
              {/* Transport routes */}
              <svg className="absolute inset-0 w-full h-full">
                <path d="M50 200 Q200 150 350 180 T650 200" stroke="#10B981" strokeWidth="3" fill="none" strokeDasharray="10,5" opacity="0.8" />
                <path d="M100 100 Q300 80 500 120 T750 100" stroke="#3B82F6" strokeWidth="3" fill="none" strokeDasharray="8,4" opacity="0.8" />
              </svg>
              
              {/* Event venue marker */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-3 border-white animate-pulse">
                  <Calendar size={16} className="text-white" />
                </div>
              </div>
              
              {/* Info overlay */}
              <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg">
                <h3 className="font-semibold text-gray-900 text-sm">Live Status</h3>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Traffic: Light</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Parking: Moderate</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Transit: Normal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Infrastructure Status */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Infrastructure Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Car size={18} className="text-blue-600" />
                  <span className="text-sm font-medium">Parking</span>
                </div>
                <span className="text-sm text-yellow-600 font-medium">65% Occupied</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bus size={18} className="text-green-600" />
                  <span className="text-sm font-medium">Public Transport</span>
                </div>
                <span className="text-sm text-green-600 font-medium">On Schedule</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Trash2 size={18} className="text-orange-600" />
                  <span className="text-sm font-medium">Sanitation</span>
                </div>
                <span className="text-sm text-green-600 font-medium">All Clear</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Resource Allocation</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Security Personnel</span>
                  <span>8/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '80%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Cleaning Crew</span>
                  <span>6/8</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{width: '75%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Traffic Control</span>
                  <span>12/12</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Smart Recommendations</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="font-medium text-blue-900">Parking Alert</p>
                <p className="text-blue-700">Consider opening Zone C parking by 6 PM</p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="font-medium text-green-900">Transit Optimization</p>
                <p className="text-green-700">Add shuttle service at 8 PM for peak departure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const RippleEffectDashboard = () => {
  const [selectedSector, setSelectedSector] = useState('all')
  const [timeRange, setTimeRange] = useState('24h')
  
  const trafficData = [
    { name: 'Food & Beverage', value: 35 },
    { name: 'Transportation', value: 25 },
    { name: 'Accommodation', value: 20 },
    { name: 'Retail', value: 15 },
    { name: 'Entertainment', value: 5 }
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Ripple Effect Dashboard</h1>
        <div className="flex space-x-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Economic Impact"
          value="RM 45.2K"
          change="+18%"
          icon={TrendingUp}
          color="success"
        />
        <MetricCard
          title="Traffic Increase"
          value="15%"
          change="+3%"
          icon={Car}
          color="warning"
        />
        <MetricCard
          title="Resource Utilization"
          value="87%"
          change="+12%"
          icon={BarChart3}
          color="primary"
        />
        <MetricCard
          title="Carbon Footprint"
          value="-8%"
          change="-2%"
          icon={Zap}
          color="accent"
        />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        <RippleEffectChart data={mockRippleEffects} />
        <TrafficChart data={trafficData} />
      </div>

      {/* Sector Analysis */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Sector Impact Analysis</h2>
          <div className="flex space-x-2">
            <button className="btn-outline text-sm">Export Data</button>
            <button className="btn-primary text-sm">Generate Report</button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRippleEffects.map(sector => (
            <div key={sector.sector} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{sector.sector}</h3>
                <span className={`text-sm font-medium ${
                  sector.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {sector.change}
                </span>
              </div>
              
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ width: `${sector.impact}%`, backgroundColor: sector.color }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-700">{sector.impact}%</span>
              </div>
              
              <p className="text-xs text-gray-600">
                {sector.sector === 'Food & Beverage' && 'High demand during event hours with 25% increase in delivery requests'}
                {sector.sector === 'Transportation' && 'Increased ridership on public transport and ride-sharing services'}
                {sector.sector === 'Accommodation' && 'Slight uptick in hotel bookings for out-of-town attendees'}
                {sector.sector === 'Retail' && 'Shopping centers see increased foot traffic before and after events'}
                {sector.sector === 'Entertainment' && 'Peak impact with highest attendance and engagement rates'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Predictive Insights */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Predictive Insights</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Expected Impacts (Next Event)</h3>
            <div className="space-y-3">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-green-900">Food Delivery Surge</span>
                  <span className="text-sm text-green-700">+180%</span>
                </div>
                <p className="text-sm text-green-700 mt-1">Peak expected between 7-9 PM</p>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-yellow-900">Parking Demand</span>
                  <span className="text-sm text-yellow-700">+120%</span>
                </div>
                <p className="text-sm text-yellow-700 mt-1">Zone A will reach capacity by 6:30 PM</p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-blue-900">Public Transport</span>
                  <span className="text-sm text-blue-700">+85%</span>
                </div>
                <p className="text-sm text-blue-700 mt-1">Additional buses recommended for Route 401</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Optimization Recommendations</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                <p>Deploy 3 additional food trucks near main entrance by 5 PM</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-secondary-500 rounded-full mt-2"></div>
                <p>Open overflow parking at Mall B parking deck</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent-500 rounded-full mt-2"></div>
                <p>Coordinate with Grab/MyCar for surge pricing management</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <p>Alert waste management for 2x collection schedule</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const EventOrganizerDashboard = () => {
  const location = useLocation()
  
  const sidebarItems = [
    { name: 'Dashboard', href: '/event-organizer', icon: Home, active: location.pathname === '/event-organizer' },
    { name: 'Events', href: '/event-organizer/events', icon: Calendar, active: location.pathname === '/event-organizer/events' },
    { name: 'Vendor Matching', href: '/event-organizer/vendors', icon: Users, active: location.pathname === '/event-organizer/vendors' },
    { name: 'Smart City Integration', href: '/event-organizer/smart-city', icon: MapPin, active: location.pathname === '/event-organizer/smart-city' },
    { name: 'Ripple Effect Dashboard', href: '/event-organizer/ripple-effects', icon: BarChart3, active: location.pathname === '/event-organizer/ripple-effects' }
  ]

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Event Organizer Dashboard">
      <Routes>
        <Route path="/" element={<EventOrganizerHome />} />
        <Route path="/smart-city" element={<SmartCityIntegration />} />
        <Route path="/ripple-effects" element={<RippleEffectDashboard />} />
      </Routes>
    </DashboardLayout>
  )
}

export default EventOrganizerDashboard