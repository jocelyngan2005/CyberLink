import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import { DemandChart, MetricCard } from '../components/Charts'
import { FreelancerCard, AlertCard } from '../components/Cards'
import { mockDemandData, mockAlerts, mockFreelancers, mockCampaigns, mockDeliveryRoutes } from '../data/mockData'
import { 
  Home, 
  TrendingUp, 
  Megaphone, 
  Truck, 
  Users, 
  BarChart3,
  AlertTriangle,
  Zap,
  MapPin,
  Clock,
  Edit3,
  Image,
  Send,
  Star,
  Navigation
} from 'lucide-react'

const SMEHome = () => {
  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Today's Revenue"
          value="RM 2,840"
          change="+23%"
          icon={TrendingUp}
          color="success"
        />
        <MetricCard
          title="Active Orders"
          value="47"
          change="+12%"
          icon={Truck}
          color="primary"
        />
        <MetricCard
          title="Customer Rating"
          value="4.8"
          change="+0.2"
          icon={Star}
          color="warning"
        />
        <MetricCard
          title="Delivery Time"
          value="18 min"
          change="-5%"
          icon={Clock}
          color="accent"
        />
      </div>

      {/* Demand Forecast Chart */}
      <DemandChart data={mockDemandData} />

      {/* Alerts Section */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
              <AlertTriangle size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Smart Alerts</h2>
          </div>
          <span className="text-sm text-gray-500">Real-time insights</span>
        </div>
        
        <div className="space-y-4">
          {mockAlerts.map(alert => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card hover:shadow-lg transition-shadow duration-200 cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
              <Megaphone size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Create Campaign</h3>
              <p className="text-sm text-gray-600">Generate AI-powered marketing content</p>
            </div>
          </div>
        </div>
        
        <div className="card hover:shadow-lg transition-shadow duration-200 cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-secondary-500 rounded-lg flex items-center justify-center">
              <MapPin size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Optimize Routes</h3>
              <p className="text-sm text-gray-600">Find the best delivery locations</p>
            </div>
          </div>
        </div>
        
        <div className="card hover:shadow-lg transition-shadow duration-200 cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-accent-500 rounded-lg flex items-center justify-center">
              <Users size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Hire Freelancers</h3>
              <p className="text-sm text-gray-600">Find qualified help for your business</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const CampaignStudio = () => {
  const [selectedCampaign, setSelectedCampaign] = useState(mockCampaigns[0])
  const [campaignText, setCampaignText] = useState(selectedCampaign.content)
  const [showPosterGenerator, setShowPosterGenerator] = useState(false)
  const [posterPrompt, setPosterPrompt] = useState("")

  const handleGenerateText = () => {
    // Mock AI text generation
    const newContent = "🚀 FLASH SALE ALERT! Get ready for our exclusive Tech Innovation Week deals! Premium coffee blends at 30% off, perfect fuel for coding marathons. Pre-order your favorites and skip the queue. Available until supplies last! #TechWeek #CoffeeLovers #CyberjayadDeals"
    setCampaignText(newContent)
  }

  const handleGeneratePoster = () => {
    // Mock poster generation
    setShowPosterGenerator(true)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Campaign Studio</h1>
        <div className="flex space-x-3">
          <button className="btn-outline">
            <Edit3 size={16} className="mr-2" />
            Templates
          </button>
          <button className="btn-primary">
            <Send size={16} className="mr-2" />
            Publish Campaign
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Text Generator */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">AI Text Generator</h2>
            <button 
              onClick={handleGenerateText}
              className="btn-primary text-sm"
            >
              <Zap size={16} className="mr-2" />
              Generate
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                <option>Product Promotion</option>
                <option>Event Announcement</option>
                <option>Special Offer</option>
                <option>Brand Awareness</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                <option>Tech Professionals</option>
                <option>Students</option>
                <option>Event Attendees</option>
                <option>Local Community</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Generated Content</label>
              <textarea
                value={campaignText}
                onChange={(e) => setCampaignText(e.target.value)}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="AI-generated campaign content will appear here..."
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Estimated Reach</div>
                <div className="text-sm text-gray-600">Based on your audience</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-600">2,500+</div>
                <div className="text-sm text-gray-600">people</div>
              </div>
            </div>
          </div>
        </div>

        {/* Poster Generator */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">AI Poster Generator</h2>
            <button 
              onClick={handleGeneratePoster}
              className="btn-secondary text-sm"
            >
              <Image size={16} className="mr-2" />
              Generate
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Design Style</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                <option>Modern & Clean</option>
                <option>Bold & Colorful</option>
                <option>Minimalist</option>
                <option>Tech-Inspired</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Poster Description</label>
              <textarea
                value={posterPrompt}
                onChange={(e) => setPosterPrompt(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Describe what you want in your poster..."
              />
            </div>

            {/* Mock Generated Poster */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              {showPosterGenerator ? (
                <div className="space-y-4">
                  <img 
                    src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=600&fit=crop" 
                    alt="Generated Poster"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <p className="text-sm text-gray-600">AI-Generated Tech Expo Poster</p>
                  <div className="flex space-x-2">
                    <button className="flex-1 btn-outline text-sm">Edit</button>
                    <button className="flex-1 btn-primary text-sm">Download</button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mx-auto">
                    <Image size={24} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500">Generated poster will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Performance */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Campaigns</h2>
        <div className="space-y-4">
          {mockCampaigns.map(campaign => (
            <div key={campaign.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{campaign.title}</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
              </div>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{campaign.content}</p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex space-x-4">
                  <span className="text-gray-600">
                    <span className="font-medium">{campaign.reach}</span> reached
                  </span>
                  <span className="text-gray-600">
                    <span className="font-medium">{campaign.engagement}</span> engagement
                  </span>
                </div>
                <span className="text-primary-600 font-medium">{campaign.platform}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const DeliveryLogistics = () => {
  const [selectedRoute, setSelectedRoute] = useState(0)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Delivery & Logistics</h1>
        <div className="flex space-x-3">
          <button className="btn-outline">
            <Navigation size={16} className="mr-2" />
            Optimize Routes
          </button>
          <button className="btn-primary">
            <MapPin size={16} className="mr-2" />
            Find Best Spot
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Map View */}
        <div className="lg:col-span-2 card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Live Map View</h2>
          <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=400&fit=crop" 
              alt="Cyberjaya Map"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary-500 bg-opacity-10 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mx-auto">
                  <MapPin size={24} className="text-primary-600" />
                </div>
                <div className="bg-white rounded-lg p-4 shadow-lg">
                  <h3 className="font-semibold text-gray-900">Recommended Spot</h3>
                  <p className="text-sm text-gray-600">Shaftsbury Square</p>
                  <p className="text-xs text-primary-600 mt-1">High demand area</p>
                </div>
              </div>
            </div>
            {/* Mock delivery markers */}
            <div className="absolute top-4 left-4 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div className="absolute top-16 right-8 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-8 left-8 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Delivery Routes */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Active Deliveries</h2>
          <div className="space-y-4">
            {mockDeliveryRoutes.map((route, index) => (
              <div 
                key={route.id} 
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedRoute === index ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedRoute(index)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{route.destination}</h3>
                  <span className={`w-2 h-2 rounded-full ${
                    route.priority === 'high' ? 'bg-red-500' : 
                    route.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{route.distance}</span>
                  <span>{route.estimatedTime}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Route Optimization</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Distance</span>
                <span className="font-medium">8.1 km</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Time</span>
                <span className="font-medium">26 mins</span>
              </div>
              <div className="flex justify-between">
                <span>Fuel Savings</span>
                <span className="font-medium text-green-600">15%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid md:grid-cols-3 gap-6">
        <MetricCard
          title="Average Delivery Time"
          value="18 min"
          change="-12%"
          icon={Clock}
          color="success"
        />
        <MetricCard
          title="Successful Deliveries"
          value="94.8%"
          change="+2.3%"
          icon={TrendingUp}
          color="primary"
        />
        <MetricCard
          title="Customer Satisfaction"
          value="4.7/5"
          change="+0.4"
          icon={Star}
          color="warning"
        />
      </div>
    </div>
  )
}

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d')
  const [selectedMetric, setSelectedMetric] = useState('revenue')

  const analyticsData = {
    revenue: {
      current: 'RM 19,240',
      previous: 'RM 15,680',
      change: '+22.7%',
      chartData: [
        { day: 'Mon', value: 2840 },
        { day: 'Tue', value: 3120 },
        { day: 'Wed', value: 2950 },
        { day: 'Thu', value: 3340 },
        { day: 'Fri', value: 3890 },
        { day: 'Sat', value: 1650 },
        { day: 'Sun', value: 1450 }
      ]
    },
    orders: {
      current: '287',
      previous: '234',
      change: '+22.6%',
      chartData: [
        { day: 'Mon', value: 47 },
        { day: 'Tue', value: 52 },
        { day: 'Wed', value: 45 },
        { day: 'Thu', value: 48 },
        { day: 'Fri', value: 53 },
        { day: 'Sat', value: 22 },
        { day: 'Sun', value: 20 }
      ]
    },
    customers: {
      current: '1,247',
      previous: '1,089',
      change: '+14.5%',
      chartData: [
        { day: 'Mon', value: 189 },
        { day: 'Tue', value: 205 },
        { day: 'Wed', value: 178 },
        { day: 'Thu', value: 198 },
        { day: 'Fri', value: 234 },
        { day: 'Sat', value: 123 },
        { day: 'Sun', value: 120 }
      ]
    }
  }

  const topProducts = [
    { name: 'Premium Coffee Blend', sales: 156, revenue: 'RM 4,680', growth: '+18%' },
    { name: 'Tech Expo Lunch Box', sales: 89, revenue: 'RM 2,670', growth: '+25%' },
    { name: 'Energy Drinks', sales: 234, revenue: 'RM 3,510', growth: '+12%' },
    { name: 'Healthy Snack Pack', sales: 67, revenue: 'RM 1,340', growth: '+8%' },
    { name: 'Fresh Sandwiches', sales: 123, revenue: 'RM 2,460', growth: '+22%' }
  ]

  const customerSegments = [
    { segment: 'Tech Professionals', count: 456, percentage: 36.6, color: 'bg-blue-500' },
    { segment: 'Students', count: 387, percentage: 31.0, color: 'bg-green-500' },
    { segment: 'Event Attendees', count: 234, percentage: 18.8, color: 'bg-purple-500' },
    { segment: 'Tourists', count: 170, percentage: 13.6, color: 'bg-orange-500' }
  ]

  const peakHours = [
    { hour: '8:00 AM', orders: 23, percentage: 65 },
    { hour: '12:00 PM', orders: 45, percentage: 90 },
    { hour: '3:00 PM', orders: 31, percentage: 70 },
    { hour: '6:00 PM', orders: 28, percentage: 60 },
    { hour: '9:00 PM', orders: 12, percentage: 30 }
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Business Analytics</h1>
        <div className="flex space-x-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 3 months</option>
            <option value="1y">Last year</option>
          </select>
          <button className="btn-primary">
            Export Report
          </button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={analyticsData.revenue.current}
          change={analyticsData.revenue.change}
          icon={TrendingUp}
          color="success"
        />
        <MetricCard
          title="Total Orders"
          value={analyticsData.orders.current}
          change={analyticsData.orders.change}
          icon={BarChart3}
          color="primary"
        />
        <MetricCard
          title="Customers"
          value={analyticsData.customers.current}
          change={analyticsData.customers.change}
          icon={Users}
          color="secondary"
        />
        <MetricCard
          title="Avg. Order Value"
          value="RM 67.08"
          change="+5.2%"
          icon={Star}
          color="accent"
        />
      </div>

      {/* Revenue Trend Chart */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Revenue Trends</h2>
          <div className="flex space-x-2">
            {['revenue', 'orders', 'customers'].map((metric) => (
              <button
                key={metric}
                onClick={() => setSelectedMetric(metric)}
                className={`px-3 py-1 text-sm rounded-lg capitalize ${
                  selectedMetric === metric 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {metric}
              </button>
            ))}
          </div>
        </div>
        
        <div className="h-64 bg-gray-50 rounded-lg p-4 flex items-end space-x-2">
          {analyticsData[selectedMetric].chartData.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-primary-500 rounded-t mb-2 min-h-[4px]"
                style={{ 
                  height: `${(item.value / Math.max(...analyticsData[selectedMetric].chartData.map(d => d.value))) * 200}px` 
                }}
              ></div>
              <span className="text-xs text-gray-600">{item.day}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Current Period</div>
              <div className="text-xl font-bold text-gray-900">{analyticsData[selectedMetric].current}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">vs Previous Period</div>
              <div className="text-lg font-semibold text-green-600">{analyticsData[selectedMetric].change}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Top Products */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Top Performing Products</h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-600">{product.sales} units sold</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{product.revenue}</div>
                  <div className="text-sm text-green-600">{product.growth}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Segments */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Customer Segments</h2>
          <div className="space-y-4">
            {customerSegments.map((segment, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{segment.segment}</span>
                  <span className="text-sm text-gray-600">{segment.count} customers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${segment.color}`}
                      style={{ width: `${segment.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12">{segment.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Insights</h3>
            <p className="text-sm text-blue-800">
              Tech professionals represent your largest customer base. Consider creating targeted campaigns 
              for productivity tools and premium coffee blends during peak working hours.
            </p>
          </div>
        </div>
      </div>

      {/* Peak Hours Analysis */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Peak Hours Analysis</h2>
        <div className="grid md:grid-cols-5 gap-4">
          {peakHours.map((hour, index) => (
            <div key={index} className="text-center">
              <div className="relative w-16 h-16 mx-auto mb-3">
                <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                <div 
                  className="absolute inset-0 bg-primary-500 rounded-full"
                  style={{ 
                    clipPath: `conic-gradient(from 0deg, transparent ${100 - hour.percentage}%, #000 ${100 - hour.percentage}%)`,
                    background: `conic-gradient(from 0deg, #3b82f6 ${hour.percentage}%, #e5e7eb ${hour.percentage}%)`
                  }}
                ></div>
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-gray-900">{hour.orders}</span>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-900">{hour.hour}</div>
              <div className="text-xs text-gray-600">{hour.percentage}% capacity</div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h3 className="font-semibold text-yellow-900 mb-2">Recommendation</h3>
          <p className="text-sm text-yellow-800">
            Consider increasing staff during lunch hours (12 PM) and offering early bird discounts 
            during off-peak hours to balance demand throughout the day.
          </p>
        </div>
      </div>

      {/* Business Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">
                Revenue increased by 22.7% compared to last period, driven by premium product sales.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">
                Customer acquisition improved by 14.5%, with strong growth in the tech professional segment.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">
                Peak demand occurs during lunch hours - consider dynamic pricing strategies.
              </p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Action Items</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-primary-600 rounded" />
              <span className="text-sm text-gray-700">Launch targeted campaign for students</span>
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-primary-600 rounded" />
              <span className="text-sm text-gray-700">Optimize inventory for peak hours</span>
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-primary-600 rounded" />
              <span className="text-sm text-gray-700">Develop loyalty program for tech professionals</span>
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-primary-600 rounded" />
              <span className="text-sm text-gray-700">Expand premium product offerings</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const FreelancerMarketplace = () => {
  const [selectedFreelancer, setSelectedFreelancer] = useState(null)
  const [showJobPostModal, setShowJobPostModal] = useState(false)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Freelancer Marketplace</h1>
        <button 
          onClick={() => setShowJobPostModal(true)}
          className="btn-primary"
        >
          <Users size={16} className="mr-2" />
          Post a Job
        </button>
      </div>

      {/* Available Freelancers */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Available Freelancers</h2>
        <div className="space-y-4">
          {mockFreelancers.map(freelancer => (
            <div key={freelancer.id} className="border border-gray-200 rounded-lg">
              <FreelancerCard freelancer={freelancer} />
              <div className="px-6 pb-4">
                <button className="btn-primary text-sm w-full">
                  Hire {freelancer.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Job Post Modal */}
      {showJobPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Post a Job</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Event Cashier Needed"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                  <option>Event Staff</option>
                  <option>Delivery</option>
                  <option>Marketing</option>
                  <option>Photography</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={4}
                  placeholder="Describe the job requirements..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate (RM)</label>
                  <input 
                    type="number" 
                    placeholder="25"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (hours)</label>
                  <input 
                    type="number" 
                    placeholder="8"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input 
                  type="text" 
                  placeholder="e.g. Cyberjaya Convention Center"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button 
                onClick={() => setShowJobPostModal(false)}
                className="flex-1 btn-outline"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowJobPostModal(false)
                  // Handle job posting
                }}
                className="flex-1 btn-primary"
              >
                Post Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const SMEDashboard = () => {
  const location = useLocation()
  
  const sidebarItems = [
    { name: 'Dashboard', href: '/sme', icon: Home, active: location.pathname === '/sme' },
    { name: 'Analytics', href: '/sme/analytics', icon: BarChart3, active: location.pathname === '/sme/analytics' },
    { name: 'Campaign Studio', href: '/sme/campaigns', icon: Megaphone, active: location.pathname === '/sme/campaigns' },
    { name: 'Delivery & Logistics', href: '/sme/delivery', icon: Truck, active: location.pathname === '/sme/delivery' },
    { name: 'Freelancer Marketplace', href: '/sme/freelancers', icon: Users, active: location.pathname === '/sme/freelancers' }
  ]

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="SME Dashboard">
      <Routes>
        <Route path="/" element={<SMEHome />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/campaigns" element={<CampaignStudio />} />
        <Route path="/delivery" element={<DeliveryLogistics />} />
        <Route path="/freelancers" element={<FreelancerMarketplace />} />
      </Routes>
    </DashboardLayout>
  )
}

export default SMEDashboard