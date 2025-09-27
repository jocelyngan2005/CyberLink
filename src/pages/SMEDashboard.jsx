import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import { DemandChart, MetricCard } from '../components/Charts'
import { FreelancerCard, AlertCard } from '../components/Cards'
import { mockDemandData, mockAlerts, mockFreelancers, mockCampaigns, mockDeliveryRoutes, mockPostedJobs, mockAppliedFreelancers, mockRecommendedFreelancers, mockEventOpportunities } from '../data/mockData'
import { generateCampaignText, generatePosterImage, generateCampaignVariations } from '../utils/geminiAPI'
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
  Navigation,
  Download,
  Copy,
  Cloud,
  Calendar,
  CheckCircle,
  ExternalLink,
  DollarSign,
  Award,
  Timer,
  AlertCircle
} from 'lucide-react'

const SMEHome = () => {
  const [aiInsights, setAiInsights] = useState({
    predictedCustomers: 1247,
    weatherImpact: "+15%",
    eventBoost: "+35%",
    trafficLevel: "High"
  })

  const [selectedEventCategory, setSelectedEventCategory] = useState('All')

  const eventCategories = ['All', 'Technology', 'Food & Culture', 'Business & Entrepreneurship', 'Sustainability', 'Arts & Culture']

  const filteredEvents = selectedEventCategory === 'All' 
    ? mockEventOpportunities 
    : mockEventOpportunities.filter(event => event.category === selectedEventCategory)

  return (
    <div className="space-y-8">
      {/* AI-Powered Insights Banner */}
      <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-900">🤖 AI Insights Dashboard</h2>
            <p className="text-gray-700">Real-time predictions based on traffic, weather, events & footfall</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">{aiInsights.predictedCustomers}</div>
            <div className="text-gray-600">Predicted customers today</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-blue-200">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">{aiInsights.weatherImpact}</div>
            <div className="text-gray-600 text-sm">Weather Impact</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">{aiInsights.eventBoost}</div>
            <div className="text-gray-600 text-sm">Event Boost</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">{aiInsights.trafficLevel}</div>
            <div className="text-gray-600 text-sm">Traffic Level</div>
          </div>
        </div>
      </div>

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

      {/* Enhanced AI Demand Forecasting */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DemandChart data={mockDemandData} />
        </div>
        
        {/* AI Data Sources */}
        <div className="card">
          <h3 className="text-lg font-bold text-gray-900 mb-4">AI Data Sources</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <TrendingUp size={16} className="text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Traffic Data</div>
                  <div className="text-sm text-gray-600">Real-time traffic flow</div>
                </div>
              </div>
              <div className="text-blue-600 font-semibold">Active</div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Cloud size={16} className="text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Weather API</div>
                  <div className="text-sm text-gray-600">Weather predictions</div>
                </div>
              </div>
              <div className="text-green-600 font-semibold">Active</div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <Calendar size={16} className="text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Event Calendar</div>
                  <div className="text-sm text-gray-600">Upcoming events</div>
                </div>
              </div>
              <div className="text-purple-600 font-semibold">Active</div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Users size={16} className="text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Footfall Sensors</div>
                  <div className="text-sm text-gray-600">People counting</div>
                </div>
              </div>
              <div className="text-orange-600 font-semibold">Active</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Prediction Accuracy</h4>
            <div className="flex items-center justify-between text-sm">
              <span>Current Model</span>
              <span className="font-semibold text-green-600">94.2%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced AI Opportunity Alerts */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Zap size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">AI Opportunity Alerts</h2>
              <p className="text-sm text-gray-600">Powered by AI, GenAI & AgentAI</p>
            </div>
          </div>
          <span className="text-sm text-gray-500">Real-time insights</span>
        </div>
        
        <div className="space-y-4">
          {mockAlerts.map(alert => (
            <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
              alert.severity === 'high' ? 'border-red-500 bg-red-50' :
              alert.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
              'border-blue-500 bg-blue-50'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      alert.aiType === 'AgentAI' ? 'bg-purple-100 text-purple-800' :
                      alert.aiType === 'GenAI' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {alert.aiType}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{alert.description}</p>
                  
                  {/* Action-specific metrics */}
                  {alert.eventAttendees && (
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="bg-gray-100 px-2 py-1 rounded">👥 {alert.eventAttendees} attendees</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">📈 {alert.expectedDemand} demand</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">👤 {alert.suggestedStaff} staff needed</span>
                    </div>
                  )}
                  
                  {alert.locationRecommendation && (
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="bg-gray-100 px-2 py-1 rounded">📍 {alert.locationRecommendation}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">🚶 {alert.expectedFootfall} footfall</span>
                    </div>
                  )}
                  
                  {alert.campaignTheme && (
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="bg-gray-100 px-2 py-1 rounded">🎯 {alert.campaignTheme}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">👔 {alert.targetAudience}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <span className="text-xs text-gray-500">{alert.time}</span>
                  {alert.actionable && (
                    <button className="btn-primary text-xs px-3 py-1">
                      Take Action
                    </button>
                  )}
                </div>
              </div>
            </div>
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
  const [generatedImage, setGeneratedImage] = useState(null)
  const [imageError, setImageError] = useState(null)
  const [isGeneratingText, setIsGeneratingText] = useState(false)
  const [isGeneratingPoster, setIsGeneratingPoster] = useState(false)
  const [campaignVariations, setCampaignVariations] = useState([])
  const [showVariations, setShowVariations] = useState(false)
  
  // Campaign form fields
  const [campaignForm, setCampaignForm] = useState({
    campaignType: 'Product Promotion',
    targetAudience: 'Tech Professionals',
    businessName: 'CyberLink Café',
    productService: 'Premium Coffee Blend',
    specialOffer: '30% off this week',
    tone: 'professional'
  })
  
  // Poster form fields
  const [posterForm, setPosterForm] = useState({
    style: 'Modern & Clean',
    colorScheme: 'vibrant'
  })

  const handleGenerateText = async () => {
    setIsGeneratingText(true)
    try {
      const generatedText = await generateCampaignText({
        campaignType: campaignForm.campaignType.toLowerCase(),
        targetAudience: campaignForm.targetAudience.toLowerCase(),
        businessName: campaignForm.businessName,
        productService: campaignForm.productService,
        specialOffer: campaignForm.specialOffer,
        tone: campaignForm.tone
      })
      setCampaignText(generatedText)
      setShowVariations(false) // Hide variations when generating new text
      setCampaignVariations([]) // Clear previous variations
    } catch (error) {
      console.error('Error generating campaign text:', error)
      // Fallback to mock generation
      const fallbackContent = `Error generating campaign text. Please try again later.`
      setCampaignText(fallbackContent)
    }
    setIsGeneratingText(false)
  }

  const handleGenerateVariations = async () => {
    if (!campaignText.trim()) return
    
    setIsGeneratingText(true)
    try {
      const variations = await generateCampaignVariations(campaignText, 3)
      setCampaignVariations(variations)
      setShowVariations(true)
    } catch (error) {
      console.error('Error generating variations:', error)
    }
    setIsGeneratingText(false)
  }

  const handleGeneratePoster = async () => {
    if (!campaignText.trim()) return
    
    setIsGeneratingPoster(true)
    setImageError(null)
    
    try {
      const result = await generatePosterImage({
        campaignText,
        style: posterForm.style.toLowerCase().replace(' & ', ' '),
        businessType: 'food and beverage',
        colorScheme: posterForm.colorScheme
      })
      
      if (result.success) {
        setGeneratedImage(result.image)
        setShowPosterGenerator(true)
      } else {
        setImageError(result.error || 'Failed to generate image')
      }
    } catch (error) {
      console.error('Error generating poster image:', error)
      setImageError('Failed to generate poster image. Please try again.')
    } finally {
      setIsGeneratingPoster(false)
    }
  }

  const handleFormChange = (field, value) => {
    setCampaignForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePosterFormChange = (field, value) => {
    setPosterForm(prev => ({
      ...prev,
      [field]: value
    }))
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
        {/* GenAI Text Generator */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">AI Text Generator</h2>
            <div className="flex space-x-2">
              <button 
                onClick={handleGenerateText}
                disabled={isGeneratingText}
                className={`btn-primary text-sm ${isGeneratingText ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Zap size={16} className="mr-2" />
                {isGeneratingText ? 'Generating...' : 'Generate'}
              </button>
              {campaignText && !isGeneratingText && (
                <button 
                  onClick={handleGenerateVariations}
                  className="btn-outline text-sm"
                >
                  Create Variations
                </button>
              )}
            </div>
          </div>
          
          {/* GenAI Context Insights */}
          <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
            <h3 className="font-medium text-gray-900 mb-3">🧠 GenAI Context Analysis</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-purple-600 font-medium">Current Context:</span>
                <div className="text-gray-700">• Tech conference nearby</div>
                <div className="text-gray-700">• Rain expected</div>
                <div className="text-gray-700">• High office worker traffic</div>
              </div>
              <div>
                <span className="text-pink-600 font-medium">Recommended Tone:</span>
                <div className="text-gray-700">• Urgency & excitement</div>
                <div className="text-gray-700">• Weather-aware</div>
                <div className="text-gray-700">• Professional friendly</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Type</label>
                <select 
                  value={campaignForm.campaignType}
                  onChange={(e) => handleFormChange('campaignType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option>Product Promotion</option>
                  <option>Event Announcement</option>
                  <option>Special Offer</option>
                  <option>Brand Awareness</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                <select 
                  value={campaignForm.targetAudience}
                  onChange={(e) => handleFormChange('targetAudience', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option>Tech Professionals</option>
                  <option>Students</option>
                  <option>Event Attendees</option>
                  <option>Local Community</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                <input
                  type="text"
                  value={campaignForm.businessName}
                  onChange={(e) => handleFormChange('businessName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Your business name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product/Service</label>
                <input
                  type="text"
                  value={campaignForm.productService}
                  onChange={(e) => handleFormChange('productService', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="What are you promoting?"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Special Offer (Optional)</label>
              <input
                type="text"
                value={campaignForm.specialOffer}
                onChange={(e) => handleFormChange('specialOffer', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., 30% off this week, Buy 1 Get 1 Free"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
              <select 
                value={campaignForm.tone}
                onChange={(e) => handleFormChange('tone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual & Friendly</option>
                <option value="exciting">Exciting & Energetic</option>
                <option value="formal">Formal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Generated Content</label>
              <textarea
                value={campaignText}
                onChange={(e) => setCampaignText(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="AI-generated campaign content will appear here..."
              />
              <div className="text-right mt-1">
                <span className={`text-xs ${campaignText.length > 280 ? 'text-red-500' : 'text-gray-500'}`}>
                  {campaignText.length}/280 characters
                </span>
              </div>
            </div>

            {/* Campaign Variations */}
            {showVariations && campaignVariations.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">A/B Test Variations</h3>
                <div className="space-y-3">
                  {campaignVariations.map((variation, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-xs text-gray-500 mb-1">Variation {index + 1}</div>
                          <p className="text-sm text-gray-900">{variation}</p>
                        </div>
                        <button
                          onClick={() => setCampaignText(variation)}
                          className="ml-3 px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded hover:bg-primary-200"
                        >
                          Use This
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
              disabled={isGeneratingPoster || !campaignText.trim()}
              className={`btn-secondary text-sm ${
                isGeneratingPoster || !campaignText.trim() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Image size={16} className="mr-2" />
              {isGeneratingPoster ? 'Generating...' : 'Generate'}
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Design Style</label>
              <select 
                value={posterForm.style}
                onChange={(e) => handlePosterFormChange('style', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option>Modern & Clean</option>
                <option>Bold & Colorful</option>
                <option>Minimalist</option>
                <option>Tech-Inspired</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color Scheme</label>
              <select 
                value={posterForm.colorScheme}
                onChange={(e) => handlePosterFormChange('colorScheme', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="vibrant">Vibrant</option>
                <option value="monochrome">Monochrome</option>
                <option value="pastel">Pastel</option>
                <option value="corporate">Corporate</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Custom Description (Optional)</label>
              <textarea
                value={posterPrompt}
                onChange={(e) => setPosterPrompt(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Add specific elements you want in your poster..."
              />
            </div>

            {/* Error Display */}
            {imageError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-900">{imageError}</p>
              </div>
            )}

            {/* Generated Poster Display */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              {showPosterGenerator && generatedImage ? (
                <div className="space-y-4">
                  <img 
                    src={generatedImage}
                    alt="AI-Generated Poster"
                    className="w-full max-h-96 object-contain rounded-lg shadow-lg"
                  />
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-900">AI-Generated Poster</p>
                    <p className="text-xs text-gray-600">Right-click to save or copy the image</p>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = generatedImage;
                        link.download = 'campaign-poster.png';
                        link.click();
                      }}
                      className="flex-1 btn-outline text-sm"
                    >
                      <Download size={16} className="mr-2" />
                      Download Image
                    </button>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(generatedImage);
                      }}
                      className="flex-1 btn-primary text-sm"
                    >
                      <Copy size={16} className="mr-2" />
                      Copy Image URL
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mx-auto">
                    <Image size={24} className="text-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-500">AI-generated poster will appear here</p>
                    <p className="text-xs text-gray-400">
                      {!campaignText.trim() ? 'Generate campaign text first' : 'Click Generate to create poster image'}
                    </p>
                  </div>
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
        {/* AgentAI Map View */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">AgentAI Smart Location Finder</h2>
              <p className="text-sm text-gray-600">AI analyzes footfall, events, weather & competition</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">
                AgentAI Active
              </span>
            </div>
          </div>
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

          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
            <h3 className="font-medium text-gray-900 mb-3">🤖 AgentAI Route Optimization</h3>
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
              <div className="flex justify-between">
                <span>Revenue Potential</span>
                <span className="font-medium text-purple-600">+RM 180</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-purple-200">
              <h4 className="font-medium text-gray-900 mb-2">🎯 AgentAI Recommendations</h4>
              <div className="space-y-1 text-xs">
                <div className="text-purple-700">• Move to Shaftsbury at 2 PM (200% more footfall)</div>
                <div className="text-blue-700">• Avoid Federal Highway until 3 PM (traffic jam)</div>
                <div className="text-green-700">• Stock up on hot drinks (rain forecast)</div>
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
  const [selectedJob, setSelectedJob] = useState(null)
  const [showJobPostModal, setShowJobPostModal] = useState(false)
  const [activeTab, setActiveTab] = useState('applications') // applications or recommendations

  // Get applications and recommendations for selected job
  const getApplicationsForJob = (jobId) => {
    return mockAppliedFreelancers.filter(freelancer => freelancer.jobId === jobId)
  }

  const getRecommendationsForJob = (jobId) => {
    return mockRecommendedFreelancers.filter(freelancer => freelancer.jobId === jobId)
  }

  const handleJobSelect = (job) => {
    setSelectedJob(job)
    setActiveTab('applications')
  }

  const handleAcceptApplication = (freelancerId) => {
    // Handle accepting application
    console.log('Accepting application from freelancer:', freelancerId)
  }

  const handleHireRecommended = (freelancerId) => {
    // Handle hiring recommended freelancer
    console.log('Hiring recommended freelancer:', freelancerId)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Freelancer Marketplace</h1>
          <p className="text-gray-600 mt-1">Manage job postings, applications, and hire freelancers</p>
        </div>
        <button 
          onClick={() => setShowJobPostModal(true)}
          className="btn-primary"
        >
          <Users size={16} className="mr-2" />
          Post New Job
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Posted Jobs Sidebar */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Your Job Posts</h2>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                {mockPostedJobs.length} Active
              </span>
            </div>
            
            <div className="space-y-3">
              {mockPostedJobs.map((job) => (
                <div 
                  key={job.id}
                  onClick={() => handleJobSelect(job)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedJob?.id === job.id 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm">{job.title}</h3>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {job.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>📍 {job.location}</span>
                      <span>💰 RM {job.hourlyRate}/hr</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>📅 {job.date}</span>
                      <span>🕒 {job.duration}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="font-medium text-primary-600">{job.applicationsCount} Applications</span>
                      <span className="text-gray-500">{job.postedDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2">
          {selectedJob ? (
            <div className="space-y-6">
              {/* Job Details Header */}
              <div className="card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {selectedJob.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{selectedJob.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Location:</span>
                        <div className="font-medium">{selectedJob.location}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Rate:</span>
                        <div className="font-medium">RM {selectedJob.hourlyRate}/hr</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Duration:</span>
                        <div className="font-medium">{selectedJob.duration}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Date:</span>
                        <div className="font-medium">{selectedJob.date}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 pt-4 border-t">
                  <button
                    onClick={() => setActiveTab('applications')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'applications'
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Applications ({getApplicationsForJob(selectedJob.id).length})
                  </button>
                  <button
                    onClick={() => setActiveTab('recommendations')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'recommendations'
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    AI Recommendations ({getRecommendationsForJob(selectedJob.id).length})
                  </button>
                </div>
              </div>

              {/* Applications Tab */}
              {activeTab === 'applications' && (
                <div className="card">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Job Applications</h3>
                    <span className="text-sm text-gray-600">
                      {getApplicationsForJob(selectedJob.id).length} freelancers applied
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {getApplicationsForJob(selectedJob.id).length > 0 ? (
                      getApplicationsForJob(selectedJob.id).map((freelancer) => (
                        <div key={freelancer.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                                {freelancer.name.charAt(0)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h4 className="font-semibold text-gray-900">{freelancer.name}</h4>
                                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                    Applied {freelancer.applicationDate}
                                  </span>
                                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                    {freelancer.aiMatchScore}% AI Match
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{freelancer.skills.join(", ")}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                  <div className="flex text-yellow-400">
                                    {"★".repeat(Math.floor(freelancer.rating))}
                                  </div>
                                  <span>({freelancer.rating})</span>
                                  <span>• {freelancer.completedJobs} jobs</span>
                                  <span>• {freelancer.experience} experience</span>
                                </div>
                                <p className="text-sm text-gray-700 italic">"{freelancer.coverLetter}"</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-900">RM {freelancer.hourlyRate}/hr</div>
                              <span className="text-xs text-green-600 font-medium">{freelancer.availability}</span>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 rounded-lg p-3 mb-4">
                            <h5 className="font-medium text-gray-900 mb-2">💼 Portfolio</h5>
                            <div className="flex flex-wrap gap-2">
                              {freelancer.portfolio.map((item, index) => (
                                <span key={index} className="text-xs bg-white px-2 py-1 rounded border border-gray-200 text-gray-700">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex space-x-3">
                            <button 
                              onClick={() => handleAcceptApplication(freelancer.id)}
                              className="btn-primary text-sm flex-1"
                            >
                              Accept Application
                            </button>
                            <button className="btn-outline text-sm flex-1">
                              View Resume
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Users size={24} className="text-gray-400" />
                        </div>
                        <p className="text-gray-500">No applications yet for this position</p>
                        <p className="text-sm text-gray-400 mt-1">Applications will appear here as freelancers apply</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Recommendations Tab */}
              {activeTab === 'recommendations' && (
                <div className="card">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                        <Zap size={16} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">AI Recommendations</h3>
                        <p className="text-sm text-gray-600">Freelancers perfectly matched for your job</p>
                      </div>
                    </div>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium">
                      Powered by AI
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {getRecommendationsForJob(selectedJob.id).length > 0 ? (
                      getRecommendationsForJob(selectedJob.id).map((freelancer) => (
                        <div key={freelancer.id} className="border border-purple-200 rounded-lg p-6 bg-purple-50">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                {freelancer.name.charAt(0)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h4 className="font-semibold text-gray-900">{freelancer.name}</h4>
                                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium">
                                    {freelancer.aiMatchScore}% AI Match
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{freelancer.skills.join(", ")}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                  <div className="flex text-yellow-400">
                                    {"★".repeat(Math.floor(freelancer.rating))}
                                  </div>
                                  <span>({freelancer.rating})</span>
                                  <span>• {freelancer.completedJobs} jobs</span>
                                  <span>• {freelancer.experience} experience</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-900">RM {freelancer.hourlyRate}/hr</div>
                              <span className="text-xs text-green-600 font-medium">{freelancer.availability}</span>
                            </div>
                          </div>
                          
                          <div className="bg-white rounded-lg p-3 mb-4">
                            <h5 className="font-medium text-gray-900 mb-2">🎯 Why This Match?</h5>
                            <div className="space-y-1">
                              {freelancer.matchReasons.map((reason, index) => (
                                <div key={index} className="flex items-center space-x-2 text-sm">
                                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                                  <span className="text-gray-700">{reason}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-white rounded-lg p-3 mb-4">
                            <h5 className="font-medium text-gray-900 mb-2">💼 Relevant Portfolio</h5>
                            <div className="flex flex-wrap gap-2">
                              {freelancer.portfolio.map((item, index) => (
                                <span key={index} className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded border border-purple-200">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex space-x-3">
                            <button 
                              onClick={() => handleHireRecommended(freelancer.id)}
                              className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1"
                            >
                              Send Invite
                            </button>
                            <button className="btn-outline text-sm flex-1">
                              View Resume
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Zap size={24} className="text-purple-400" />
                        </div>
                        <p className="text-gray-500">AI is analyzing freelancers for this position</p>
                        <p className="text-sm text-gray-400 mt-1">Recommendations will appear here shortly</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            // No job selected state
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Job Position</h3>
              <p className="text-gray-600 mb-6">
                Choose a job from the sidebar to view applications and AI recommendations
              </p>
              
            </div>
          )}
        </div>
      </div>

      {/* Job Post Modal */}
      {showJobPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Post a New Job</h3>
            
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
                  <option>Customer Service</option>
                  <option>Delivery</option>
                  <option>Marketing</option>
                  <option>Photography</option>
                  <option>Labor</option>
                  <option>Technical</option>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input 
                    type="text" 
                    placeholder="8 hours"
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Needed</label>
                <input 
                  type="date" 
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

const EventOpportunities = () => {
  const [selectedEventCategory, setSelectedEventCategory] = useState('All')
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [sortBy, setSortBy] = useState('deadline') // deadline, match, revenue

  const eventCategories = ['All', 'Technology', 'Food & Culture', 'Business & Entrepreneurship', 'Sustainability', 'Arts & Culture']

  const filteredEvents = selectedEventCategory === 'All' 
    ? mockEventOpportunities 
    : mockEventOpportunities.filter(event => event.category === selectedEventCategory)

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    switch (sortBy) {
      case 'deadline':
        return new Date(a.applicationDeadline) - new Date(b.applicationDeadline)
      case 'match':
        return (b.matchScore || 0) - (a.matchScore || 0)
      case 'revenue':
        const aRevenue = parseInt(a.revenueEstimate.split(' - RM ')[1]?.replace(/,/g, '') || '0')
        const bRevenue = parseInt(b.revenueEstimate.split(' - RM ')[1]?.replace(/,/g, '') || '0')
        return bRevenue - aRevenue
      default:
        return 0
    }
  })

  const handleApply = (event) => {
    setSelectedEvent(event)
    setShowApplicationModal(true)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Event Opportunities</h1>
          <p className="text-gray-600 mt-1">Discover and apply for vendor spots at upcoming events</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="deadline">Sort by Deadline</option>
            <option value="match">Sort by AI Match</option>
            <option value="revenue">Sort by Revenue</option>
          </select>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Calendar size={20} className="text-primary-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {mockEventOpportunities.filter(e => e.status === 'Open').length}
              </div>
              <div className="text-sm text-gray-600">Open Applications</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
              <Zap size={20} className="text-secondary-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {mockEventOpportunities.filter(e => e.aiRecommended).length}
              </div>
              <div className="text-sm text-gray-600">AI Recommended</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle size={20} className="text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {mockEventOpportunities.filter(e => e.urgency === 'high').length}
              </div>
              <div className="text-sm text-gray-600">Urgent Applications</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
              <DollarSign size={20} className="text-success-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                RM {mockEventOpportunities.reduce((sum, e) => {
                  const max = parseInt(e.revenueEstimate.split(' - RM ')[1]?.replace(/,/g, '') || '0')
                  return sum + max
                }, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Revenue Potential</div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      {mockEventOpportunities.filter(e => e.aiRecommended).length > 0 && (
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-secondary-500 rounded-lg flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">🤖 AI Recommended for You</h2>
              <p className="text-sm text-gray-600">Events with highest match potential for your business</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockEventOpportunities.filter(e => e.aiRecommended).map(event => (
              <div key={event.id} className="border border-secondary-200 rounded-lg p-4 bg-secondary-50">
                <img 
                  src={event.eventImage}
                  alt={event.title}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm bg-secondary-100 text-secondary-800 px-2 py-1 rounded-full">
                    {event.matchScore}% Match
                  </span>
                  <span className="text-sm text-gray-600">{event.expectedAttendees.toLocaleString()} attendees</span>
                </div>
                <p className="text-xs text-gray-600 mb-3">{event.revenueEstimate}</p>
                <button
                  onClick={() => handleApply(event)}
                  className="w-full bg-green-700 text-white py-2 rounded-lg text-sm hover:bg-green-800 transition-colors font-poppins"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Filter by Category</h2>
          <span className="text-sm text-gray-600">{sortedEvents.length} events found</span>
        </div>
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {eventCategories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedEventCategory(category)}
              className={`px-4 py-2 text-sm rounded-full whitespace-nowrap transition-colors font-poppins ${
                selectedEventCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
              {category !== 'All' && (
                <span className="ml-2 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                  {mockEventOpportunities.filter(e => e.category === category).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Event Opportunities List */}
      <div className="space-y-6">
        {sortedEvents.map(event => (
          <div key={event.id} className={`card border-l-4 ${
            event.urgency === 'high' ? 'border-red-500' :
            event.urgency === 'medium' ? 'border-yellow-500' :
            'border-primary-500'
          }`} style={{ border: 'none'}}>
            <div className="flex items-start space-x-6">
              <img 
                src={event.eventImage}
                alt={event.title}
                className="w-32 h-32 rounded-lg object-cover flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{event.title}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <img 
                        src={event.organizerImage}
                        alt={event.organizer}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-600">by {event.organizer}</span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-600">{event.category}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                      event.status === 'Open' ? 'bg-primary-100 text-primary-800' :
                      event.status === 'Closing Soon' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {event.status}
                    </span>
                    {event.aiRecommended && (
                      <span className="px-2 py-1 text-xs bg-secondary-100 text-secondary-800 rounded-full">
                        {event.matchScore}% AI Match
                      </span>
                    )}
                    {event.urgency === 'high' && (
                      <div className="flex items-center space-x-1 text-red-600">
                        <AlertCircle size={12} />
                        <span className="text-xs font-medium">Urgent!</span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{event.description}</p>

                {/* Event Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar size={14} className="text-gray-500" />
                    <div>
                      <div className="text-gray-600">{event.date}</div>
                      <div className="text-xs text-gray-500">{event.duration}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin size={14} className="text-gray-500" />
                    <div>
                      <div className="text-gray-600 truncate">{event.location}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <Users size={14} className="text-gray-500" />
                    <div>
                      <div className="text-gray-600">{event.expectedAttendees.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">attendees</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <Timer size={14} className="text-gray-500" />
                    <div>
                      <div className="text-gray-600">Apply by</div>
                      <div className="text-xs text-gray-500">{event.applicationDeadline}</div>
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="text-xs text-gray-500 mb-1">Available Spots</div>
                    <div className="font-semibold text-gray-900 mb-2">
                      {event.spotsLeft} of {event.vendorSpots}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full"
                        style={{ width: `${((event.vendorSpots - event.spotsLeft) / event.vendorSpots) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="text-xs text-gray-500 mb-1">Revenue Estimate</div>
                    <div className="font-semibold text-success-600">{event.revenueEstimate}</div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="text-xs text-gray-500 mb-1">Total Investment</div>
                    <div className="font-semibold text-gray-900">
                      RM {(event.fees.applicationFee + event.fees.boothFee).toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">+ RM {event.fees.securityDeposit.toLocaleString()} deposit</div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-gray-600">
                    Deadline in {Math.ceil((new Date(event.applicationDeadline) - new Date()) / (1000 * 60 * 60 * 24))} days
                  </div>
                  <div className="flex justify-end">
                    <button 
                      onClick={() => handleApply(event)}
                      className="px-4 py-2 text-sm rounded-lg font-medium transition-colors font-poppins bg-green-700 text-white hover:bg-green-800"
                    >
                      <ExternalLink size={14} className="inline mr-1" />
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Application Modal */}
      {showApplicationModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Apply for {selectedEvent.title}</h3>
                <button 
                  onClick={() => setShowApplicationModal(false)}
                  className="text-gray-400 hover:text-gray-600 font-poppins"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Event Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-4 mb-3">
                    <img src={selectedEvent.eventImage} alt="" className="w-24 h-24 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{selectedEvent.title}</h4>
                      <p className="text-sm text-gray-600">{selectedEvent.location}</p>
                      <p className="text-sm text-gray-600">{selectedEvent.date} • {selectedEvent.duration}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Booth Fee:</span>
                      <div className="font-semibold">RM {selectedEvent.fees.boothFee.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Application Fee:</span>
                      <div className="font-semibold">RM {selectedEvent.fees.applicationFee}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Deposit:</span>
                      <div className="font-semibold">RM {selectedEvent.fees.securityDeposit.toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                {/* Application Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="CyberLink Café"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Category *</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                      <option>Food & Beverage</option>
                      <option>Technology</option>
                      <option>Retail</option>
                      <option>Services</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Products/Services Description *</label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Describe what you'll be offering at this event..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Previous Event Experience</label>
                    <textarea
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Brief description of your event experience..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Special Requirements</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">Electrical power required</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">Water connection needed</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">Additional storage space</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Information</label>
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="email" 
                        placeholder="Email address"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                      <input 
                        type="tel" 
                        placeholder="Phone number"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4 border-t">
                  <button 
                    onClick={() => setShowApplicationModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-poppins"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      setShowApplicationModal(false)
                      // Handle application submission
                    }}
                    className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-poppins"
                  >
                    Submit Application
                  </button>
                </div>
              </div>
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
    { name: 'Event Opportunities', href: '/sme/events', icon: Calendar, active: location.pathname === '/sme/events' },
    { name: 'Delivery & Logistics', href: '/sme/delivery', icon: Truck, active: location.pathname === '/sme/delivery' },
    { name: 'Freelancer Marketplace', href: '/sme/freelancers', icon: Users, active: location.pathname === '/sme/freelancers' }
  ]

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="SME Dashboard">
      <Routes>
        <Route path="/" element={<SMEHome />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/campaigns" element={<CampaignStudio />} />
        <Route path="/events" element={<EventOpportunities />} />
        <Route path="/delivery" element={<DeliveryLogistics />} />
        <Route path="/freelancers" element={<FreelancerMarketplace />} />
      </Routes>
    </DashboardLayout>
  )
}

export default SMEDashboard