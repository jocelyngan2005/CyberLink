// Campaign Studio for Event Organizer (mimics SME CampaignStudio)
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import PosterGeneration from './PosterGeneration';
import VendorMatchingDashboard from '../components/VendorMatchingDashboard';
import SmartCityDashboard from '../components/SmartCityDashboard';
import { RippleEffectChart, MetricCard, TrafficChart } from '../components/Charts';
import { SMECard } from '../components/Cards';
import { mockSMEs, mockRippleEffects, mockEvents } from '../data/mockData';
import { 
  Eye, Send, Image, Download, Copy, Zap, TrendingUp, Truck, Star, Clock, Megaphone, MapPin, Users,
  Home, Calendar, BarChart3, Car, Bus, Trash2, Building, Filter, Search, Plus, Shield
} from 'lucide-react';
import PosterDropzone from '../components/PosterDropzone';

const mockCampaigns = [
  {
    id: 1,
    title: 'Tech Expo Promo',
    content: 'Join us for exclusive tech deals and networking!',
    reach: '2,500+',
    engagement: '1,200',
    platform: 'Instagram'
  },
  // ...add more mock campaigns as needed
];

const EventOrganizerCampaignStudio = () => {
  const [selectedCampaign, setSelectedCampaign] = useState(mockCampaigns[0]);
  const [campaignText, setCampaignText] = useState(selectedCampaign.content);
  const [showPosterGenerator, setShowPosterGenerator] = useState(false);
  const [posterPrompt, setPosterPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [isGeneratingPoster, setIsGeneratingPoster] = useState(false);
  const [campaignVariations, setCampaignVariations] = useState([]);
  const [showVariations, setShowVariations] = useState(false);
  const [showMockPost, setShowMockPost] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Campaign form fields
  const [campaignForm, setCampaignForm] = useState({
    campaignType: 'Product Promotion',
    targetAudience: 'Tech Professionals',
    businessName: 'Tech Innovation Expo 2025',
    productService: 'Technology Conference',
    specialOffer: '30% for early bird tickets',
    tone: 'professional'
  });

  // Poster form fields
  const [posterForm, setPosterForm] = useState({
    style: 'Modern & Clean',
    colorScheme: 'vibrant'
  });

  const handleGenerateText = async () => {
    setIsGeneratingText(true);
    setTimeout(() => {
      setCampaignText(
        'Join us for the Tech Innovation Expo 2025! Discover the latest in technology, network with industry leaders, and take advantage of our special offer: 30% off early bird tickets. Don’t miss out on this exciting event!'
      );
      setIsGeneratingText(false);
    }, 1200);
  };

  const handleGenerateVariations = async () => {
    setShowVariations(true);
    setCampaignVariations([
      'Variation 1: Don’t miss out on our tech event!',
      'Variation 2: Special offers for attendees!',
    ]);
  };

  const handleGeneratePoster = async () => {
    setIsGeneratingPoster(true);
    setTimeout(() => {
      setGeneratedImage('https://via.placeholder.com/400x600?text=Event+Poster');
      setShowPosterGenerator(true);
      setIsGeneratingPoster(false);
    }, 1200);
  };

  const handleFormChange = (field, value) => {
    setCampaignForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePosterFormChange = (field, value) => {
    setPosterForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePublishCampaign = async () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      alert('Campaign published!');
    }, 1200);
  };

  const toggleMockPost = () => {
    setShowMockPost(prev => !prev);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Home size={28} className="text-primary-600 ml-[2px]" />
          <h1 className="text-2xl font-bold text-gray-900 ml-[100px]">Marketing Studio</h1>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={toggleMockPost}
            disabled={!campaignText.trim() && !generatedImage}
            className={`px-4 py-2 rounded-lg font-medium text-sm border inline-flex items-center ${
              !campaignText.trim() && !generatedImage 
                ? 'bg-gray-300 text-gray-500 border-gray-300 opacity-60 cursor-not-allowed'
                : 'btn-secondary'
            }`}
          >
            <Eye size={16} className="mr-2" />
            {!campaignText.trim() && !generatedImage 
              ? 'No Preview' 
              : showMockPost ? 'Hide Preview' : 'Preview Post'
            }
          </button>
          <button 
            onClick={handlePublishCampaign}
            disabled={isPublishing || (!campaignText.trim() && !generatedImage)}
            className={`btn-primary ${
              isPublishing || (!campaignText.trim() && !generatedImage) 
                ? 'opacity-50 cursor-not-allowed' 
                : ''
            }`}
          >
            <Send size={16} className="mr-2" />
            {isPublishing ? 'Publishing...' : 'Publish Campaign'}
          </button>
        </div>
      </div>

      {showMockPost && (campaignText.trim() || generatedImage) && (
        <div className="card">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Campaign Preview</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              {generatedImage ? (
                <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                  <img 
                    src={generatedImage} 
                    alt="Generated Campaign Poster" 
                    className="w-full h-auto object-contain max-h-96"
                  />
                </div>
              ) : (
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl h-64 flex items-center justify-center">
                  <div className="text-center">
                    <Image size={32} className="text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No poster generated yet</p>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">CL</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{campaignForm.businessName}</h3>
                    <p className="text-sm text-gray-600">Campaign Preview</p>
                  </div>
                </div>
                {campaignText && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Campaign Message</h4>
                    <p className="text-gray-700 leading-relaxed bg-white rounded-lg p-4 border">
                      {campaignText}
                    </p>
                    <div className="text-right mt-1">
                      <span className={`text-xs ${campaignText.length > 280 ? 'text-red-500' : 'text-gray-500'}`}>
                        {campaignText.length} characters
                      </span>
                    </div>
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="text-xs text-purple-600 font-medium mb-1">CAMPAIGN TYPE</div>
                    <div className="text-gray-900 font-semibold">{campaignForm.campaignType}</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="text-xs text-blue-600 font-medium mb-1">TARGET AUDIENCE</div>
                    <div className="text-gray-900 font-semibold">{campaignForm.targetAudience}</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="text-xs text-green-600 font-medium mb-1">Category</div>
                    <div className="text-gray-900 font-semibold">{campaignForm.productService}</div>
                  </div>
                  {campaignForm.specialOffer && (
                    <div className="bg-white rounded-lg p-3 border">
                      <div className="text-xs text-orange-600 font-medium mb-1">SPECIAL OFFER</div>
                      <div className="text-gray-900 font-semibold">{campaignForm.specialOffer}</div>
                    </div>
                  )}
                </div>
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-primary-600">2,500+</div>
                      <div className="text-xs text-gray-600">Est. Reach</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">94.2%</div>
                      <div className="text-xs text-gray-600">AI Confidence</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-600">{campaignForm.tone}</div>
                      <div className="text-xs text-gray-600">Tone</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
                <input
                  type="text"
                  value={campaignForm.businessName}
                  onChange={(e) => handleFormChange('businessName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Your business name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
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
            {imageError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-900">{imageError}</p>
              </div>
            )}
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
                        onClick={() => {}}
                        className="flex-1 btn-outline text-sm"
                      >
                        <Download size={16} className="mr-2" />
                        Download Image
                      </button>
                      <button 
                        onClick={() => {}}
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
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Events</h2>
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
  );
};

const EventOrganizerHome = () => {
  const upcomingEvents = mockEvents.slice(0, 3);
  const [showDemandPlanning, setShowDemandPlanning] = useState(false);

  
  if (showDemandPlanning) {
    return <EventDemandPlanning onBack={() => setShowDemandPlanning(false)} />;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-secondary-500 to-accent-500 rounded-2xl p-8 text-black">
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
          <button
            className="font-family: 'Inter', sans-serif; bg-gray-200 text-black text-lg inline-flex items-center px-6 py-3 rounded-xl font-semibold border border-gray-300 hover:bg-gray-300 transition shadow-md"
            onClick={() => setShowDemandPlanning(true)}
          >
            Manage
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
                
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vendor Matching */}
  <div className="card" >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">History Vendors</h2>
          <button className="btn-outline text-sm">View All</button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockSMEs.map(sme => (
            <div key={sme.id} className="border border-gray-200 rounded-lg flex flex-col bg-red-50" style={{ height: '200px !important', minHeight: '200px', maxHeight: '200px' }}>
              <div className="flex-1 p-6 overflow-hidden">
                <div className="flex items-start space-x-4 h-full">
                  <img 
                    src={sme.logo} 
                    alt={sme.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight">{sme.name}</h3>
                      <p className="text-xs text-gray-600 mt-1">{sme.category}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center space-x-1">
                          <Star size={12} className="text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600">{sme.rating}</span>
                        </div>
                        <span className="text-gray-400 text-xs">•</span>
                        <span className="text-xs text-gray-600">{sme.distance}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {sme.specialties.slice(0, 1).map((specialty, index) => (
                        <span key={index} className="text-xs bg-accent-100 text-accent-700 px-2 py-1 rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-4 border-t border-gray-100">
                <button className="btn-primary text-sm w-full py-2 flex items-center justify-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  Rate them
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
  const [parkingData, setParkingData] = useState([])
  const [shuttleData, setShuttleData] = useState([])
  const [crowdData, setCrowdData] = useState([])
  const [loading, setLoading] = useState(false)

  const cityLayers = [
    { id: 'all', name: 'All Layers', color: 'primary' },
    { id: 'parking', name: 'Parking', color: 'blue' },
    { id: 'transport', name: 'Public Transport', color: 'green' },
    { id: 'crowd', name: 'Crowd Management', color: 'orange' },
    { id: 'security', name: 'Security', color: 'red' }
  ]

  // Load city data when component mounts
  useEffect(() => {
    loadCityData()
  }, [])

  const loadCityData = async () => {
    setLoading(true)
    try {
      // Import cityAPI dynamically to avoid circular dependencies
      const { default: cityAPI } = await import('../utils/cityAPI')
      
      const [parking, shuttles, crowd] = await Promise.all([
        cityAPI.getParkingLots(),
        cityAPI.getShuttleRoutes(),
        cityAPI.getCrowdDensity()
      ])
      
      setParkingData(parking.lots || [])
      setShuttleData(shuttles.routes || [])
      setCrowdData(crowd.areas || [])
    } catch (error) {
      console.error('Error loading city data:', error)
    } finally {
      setLoading(false)
    }
  }

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
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading city data...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Parking Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Car size={18} className="text-blue-600" />
                    <span className="text-sm font-medium">Parking</span>
                  </div>
                  <span className={`text-sm font-medium ${
                    parkingData.length > 0 && parkingData.some(p => p.availableSlots > 50) ? 'text-green-600' :
                    parkingData.length > 0 && parkingData.some(p => p.availableSlots > 20) ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {parkingData.length > 0 ? 
                      `${parkingData.reduce((sum, p) => sum + p.availableSlots, 0)} slots available` : 
                      'Loading...'
                    }
                  </span>
                </div>
                
                {/* Shuttle Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bus size={18} className="text-green-600" />
                    <span className="text-sm font-medium">Shuttle Services</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">
                    {shuttleData.length > 0 ? 
                      `${shuttleData.length} routes active` : 
                      'Loading...'
                    }
                  </span>
                </div>
                
                {/* Crowd Management Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Users size={18} className="text-orange-600" />
                    <span className="text-sm font-medium">Crowd Management</span>
                  </div>
                  <span className={`text-sm font-medium ${
                    crowdData.length > 0 && crowdData.every(c => c.densityLevel < 70) ? 'text-green-600' :
                    crowdData.length > 0 && crowdData.some(c => c.densityLevel >= 70) ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {crowdData.length > 0 ? 
                      `${crowdData.filter(c => c.densityLevel > 70).length} areas congested` : 
                      'Loading...'
                    }
                  </span>
                </div>
              </div>
            )}
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

          {/* Quick Actions */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <Car className="w-6 h-6 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-blue-900">Book Parking</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <Bus className="w-6 h-6 text-green-600 mb-2" />
                <span className="text-sm font-medium text-green-900">Shuttle Info</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <Users className="w-6 h-6 text-orange-600 mb-2" />
                <span className="text-sm font-medium text-orange-900">Crowd Alert</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                <Shield className="w-6 h-6 text-red-600 mb-2" />
                <span className="text-sm font-medium text-red-900">Emergency</span>
              </button>
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
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center shadow-lg border border-blue-200">
            <BarChart3 className="w-7 h-7 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Ripple Effect Dashboard</h1>
        </div>
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

import { Brain, MessageSquare, AlertTriangle, DollarSign, ChevronDown, ChevronUp, X } from 'lucide-react';

const EventDemandPlanning = ({ onBack }) => {
  const [events, setEvents] = useState(mockEvents.filter(e => e.title !== 'Startup Pitch Competition'));
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    price: '',
    category: '',
    image: ''
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [aiResponse, setAiResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOptimization, setShowOptimization] = useState({});

  // AI-Enhanced Demand Prediction with multiple factors
  const getAIEnhancedPrediction = (event) => {
    const baseAttendees = event.attendees || event.price * 10 || 500;
    // Weather impact factor
    const weatherMultiplier = {
      'sunny': 1.2,
      'partly_cloudy': 1.0,
      'rainy': 0.8,
      'stormy': 0.6
    }[event.weather] || 1.0;
    // Day of week impact
    const dayMultiplier = {
      'Monday': 0.8, 'Tuesday': 0.9, 'Wednesday': 0.9,
      'Thursday': 0.95, 'Friday': 1.1, 'Saturday': 1.3, 'Sunday': 1.2
    }[event.dayOfWeek] || 1.0;
    // Category-specific behavior patterns
    const categoryFactors = {
      'Technology': { food: 0.7, hotel: 0.3, parking: 0.6, shuttle: 0.4 },
      'Food & Beverage': { food: 0.2, hotel: 0.1, parking: 0.8, shuttle: 0.6 },
      'Business': { food: 0.9, hotel: 0.4, parking: 0.5, shuttle: 0.3 }
    };
    const factors = categoryFactors[event.category] || categoryFactors['Business'];
    const adjustedAttendees = Math.round(baseAttendees * weatherMultiplier * dayMultiplier);
    // AI-calculated predictions with confidence intervals
    const foodStalls = Math.ceil(adjustedAttendees / (100 / factors.food));
    const hotelRooms = Math.ceil(adjustedAttendees * (event.category === 'Technology' ? 0.25 : 
                                  event.category === 'Food & Beverage' ? 0.08 : 0.15) * factors.hotel);
    const parkingSpots = Math.ceil(adjustedAttendees * 0.6 * factors.parking);
    const shuttles = Math.ceil(adjustedAttendees / (120 / factors.shuttle));
    // Risk assessment
    const riskLevel = weatherMultiplier < 0.9 ? 'high' : 
                     adjustedAttendees > baseAttendees * 1.2 ? 'medium' : 'low';
    // Confidence scores (simulated AI confidence)
    const confidence = {
      foodStalls: Math.min(95, 75 + (factors.food * 20)),
      hotelRooms: Math.min(95, 70 + (factors.hotel * 25)),
      parkingSpots: Math.min(95, 80 + (factors.parking * 15)),
      shuttles: Math.min(95, 65 + (factors.shuttle * 30))
    };
    return {
      adjustedAttendees,
      foodStalls,
      hotelRooms,
      parkingSpots,
      shuttles,
      riskLevel,
      confidence,
      weatherImpact: ((weatherMultiplier - 1) * 100).toFixed(1),
      dayImpact: ((dayMultiplier - 1) * 100).toFixed(1)
    };
  };

  // AI Agent for intelligent recommendations
  const getAIRecommendations = (event, prediction) => {
    const recommendations = [];
    if (prediction.riskLevel === 'high') {
      recommendations.push({
        type: 'warning',
        message: `High risk event due to weather conditions. Consider increasing shuttle frequency by 25%.`,
        action: 'Increase contingency planning'
      });
    }
    if (prediction.adjustedAttendees > (event.attendees || 500) * 1.1) {
      recommendations.push({
        type: 'info',
        message: `Expected 10%+ higher attendance. Recommend securing additional ${Math.ceil(prediction.foodStalls * 0.2)} food vendors.`,
        action: 'Scale up resources'
      });
    }
    if (event.category === 'Technology' && prediction.hotelRooms > 100) {
      recommendations.push({
        type: 'success',
        message: `Tech event with high hotel demand. Partner with nearby hotels for group discounts.`,
        action: 'Negotiate partnerships'
      });
    }
    return recommendations;
  };

  // Simulated AI Chat Agent
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const handleAIQuery = async (event) => {
    setIsProcessing(true);
    setAiResponse('');
    // Compose prompt for Gemini
    const prompt = `Given the following event details, predict market demand spikes in Food, Hotel, and Parking demand. Suggest how to attract SMEs and event vendors to set up stalls, and how to optimize parking using a platform system.\nEvent: ${event.title}\nCategory: ${event.category}\nDate: ${event.date} ${event.time}\nLocation: ${event.location}\nDescription: ${event.description}\nExpected Attendees: ${event.attendees || (event.price * 10) || 500}`;
    try {
      const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + GEMINI_API_KEY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });
      const data = await res.json();
      const response = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini AI.';
      setAiResponse(response);
    } catch (err) {
      setAiResponse('Error connecting to Gemini AI.');
    }
    setIsProcessing(false);
  };
  return (
    <div className="space-y-8 max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-2">
        <button
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium shadow mr-4"
          onClick={onBack}
        >
          ← Back
        </button>
        <div className="text-center w-full">
          <h1 className="text-4xl font-bold text-gray-900">AI-Enhanced Event Demand Planning</h1>
          <p className="text-gray-600 mb-6">Click an event to get AI-powered market demand predictions and recommendations.</p>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" style={{background: 'rgba(30,41,59,0.15)'}} onClick={() => setShowCreateModal(false)}>
            <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-6 md:p-12 relative animate-fadeIn border border-gray-200 max-h-screen overflow-y-auto" onClick={e => e.stopPropagation()}>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">Create New Event</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <input type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 text-lg font-semibold placeholder-gray-400" placeholder="Event Title" value={newEvent.title} onChange={e => setNewEvent(ev => ({...ev, title: e.target.value}))} />
                  <input type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 text-lg font-semibold placeholder-gray-400" placeholder="Location" value={newEvent.location} onChange={e => setNewEvent(ev => ({...ev, location: e.target.value}))} />
                  <input type="number" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 text-lg font-semibold placeholder-gray-400" placeholder="Price" value={newEvent.price} onChange={e => setNewEvent(ev => ({...ev, price: e.target.value}))} />
                  <input type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 text-lg font-semibold placeholder-gray-400" placeholder="Category" value={newEvent.category} onChange={e => setNewEvent(ev => ({...ev, category: e.target.value}))} />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Image</label>
                    <PosterDropzone 
                      image={newEvent.image}
                      setImage={(image) => setNewEvent(ev => ({...ev, image}))}
                    />
                  </div>
                </div>
                <div className="space-y-6 flex flex-col h-full">
                  <textarea className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 text-lg font-semibold placeholder-gray-400 resize-none flex-1" placeholder="Event Description" value={newEvent.description} onChange={e => setNewEvent(ev => ({...ev, description: e.target.value}))} rows={7} />
                  <div className="flex gap-4">
                    <input type="date" className="w-1/2 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 text-lg font-semibold placeholder-gray-400" value={newEvent.date} onChange={e => setNewEvent(ev => ({...ev, date: e.target.value}))} />
                    <input type="time" className="w-1/2 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 text-lg font-semibold placeholder-gray-400" value={newEvent.time} onChange={e => setNewEvent(ev => ({...ev, time: e.target.value}))} />
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-6 mt-2">
                <button className="px-6 py-3 rounded-xl font-semibold text-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition" onClick={() => setShowCreateModal(false)}>Cancel</button>
                <button className="px-8 py-3 rounded-xl font-bold text-lg bg-primary-600 text-white shadow-lg hover:bg-primary-700 transition" onClick={() => {
                  setEvents(evts => [
                    {
                      id: Date.now(),
                      ...newEvent,
                      date: newEvent.date,
                      time: newEvent.time,
                      price: newEvent.price || 0,
                      category: newEvent.category || 'General',
                      image: newEvent.image || 'https://via.placeholder.com/400x200?text=No+Image'
                    },
                    ...events
                  ]);
                  setShowCreateModal(false);
                  setNewEvent({title:'',description:'',date:'',time:'',location:'',price:'',category:'',image:''});
                }}>Create</button>
              </div>
            </div>
          </div>
        )}
        {events.map(event => (
          <div key={event.id} className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl hover:scale-105 transition-transform transition-shadow duration-200" onClick={() => { setSelectedEvent(event); handleAIQuery(event); }}>
            <div className="relative">
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-t-xl shadow-sm" onError={e => { e.target.onerror=null; e.target.src='https://via.placeholder.com/400x200?text=No+Image'; }} />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{event.title}</h2>
                  <div className="flex items-center text-sm text-gray-600 space-x-4">
                    <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" />{event.date} {event.time}</span>
                    <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{event.location}</span>
                    <span className="flex items-center"><DollarSign className="w-4 h-4 mr-1" />${event.price}</span>
                  </div>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">{event.category}</span>
              </div>
              <p className="text-gray-700 mb-6">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedEvent && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center" 
          style={{background: 'rgba(255,255,255,0.85)'}} 
          onClick={() => { setSelectedEvent(null); setAiResponse(''); }}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 relative animate-fadeIn" 
            onClick={e => e.stopPropagation()} 
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h2>
              <div className="flex items-center text-sm text-gray-600 space-x-4 mb-2">
                <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" />{selectedEvent.date} {selectedEvent.time}</span>
                <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{selectedEvent.location}</span>
                <span className="flex items-center"><DollarSign className="w-4 h-4 mr-1" />${selectedEvent.price}</span>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">{selectedEvent.category}</span>
              <p className="text-gray-700 mt-2">{selectedEvent.description}</p>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center"><Brain className="w-5 h-5 mr-2 text-blue-600" />AI Market Demand Prediction</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-gray-800 whitespace-pre-line">
                {selectedEvent.id === 1 && (
                  <>
                    <strong>Estimated Attendance:</strong> 400<br/>
                    <strong>Food Stalls Needed:</strong> 6<br/>
                  
                    <strong>Parking Spots Needed:</strong> 250<br/>
                    <strong>Shuttle Buses Needed:</strong> 5<br/>
                    <strong>Risk Level:</strong> Low (due to weather forecast)<br/>
                    <strong>Recommendations:</strong><br/>
                    - Increase shuttle frequency by 20%<br/>
                    - Secure 2 additional food vendors<br/>
                    
                    - Monitor parking occupancy in real-time<br/>
                  </>
                )}
                {selectedEvent.id === 2 && (
                  <>
                    <strong>Estimated Attendance:</strong> 500<br/>
                    <strong>Food Stalls Needed:</strong> 50<br/>
                    <strong>Hotel Rooms Needed:</strong> 15<br/>
                    <strong>Parking Spots Needed:</strong> 300<br/>
                    <strong>Shuttle Buses Needed:</strong> 10<br/>
                    <strong>Risk Level:</strong> Medium<br/>
                    <strong>Recommendations:</strong><br/>
                    - Add 5 more food stalls for peak hours<br/>
                    - Increase waste management staff<br/>
                    - Promote parking discounts for early arrivals<br/>
                    - Provide live updates on stall availability<br/>
                  </>
                )}
                {selectedEvent.id === 3 && (
                  <>
                    <strong>Estimated Attendance:</strong> 350<br/>
                    <strong>Food Stalls Needed:</strong> 5<br/>
                    <strong>Hotel Rooms Needed:</strong> 20<br/>
                    <strong>Parking Spots Needed:</strong> 80<br/>
                    <strong>Shuttle Buses Needed:</strong> 2<br/>
                    <strong>Risk Level:</strong> Low<br/>
                    <strong>Recommendations:</strong><br/>
                    - Partner with local art cafes for catering<br/>
                    - Offer shuttle service from train station<br/>
                    - Provide discounted parking for attendees<br/>
                    - Collaborate with hotels for artist packages<br/>
                  </>
                )}
                {/* Default fallback for other events */}
                {[1,2,3].indexOf(selectedEvent.id) === -1 && (
                  <>
                    <strong>Estimated Attendance:</strong> 500<br/>
                    <strong>Food Stalls Needed:</strong> 8<br/>
                    <strong>Hotel Rooms Needed:</strong> 40<br/>
                    <strong>Parking Spots Needed:</strong> 120<br/>
                    <strong>Shuttle Buses Needed:</strong> 3<br/>
                    <strong>Risk Level:</strong> Medium<br/>
                    <strong>Recommendations:</strong><br/>
                    - Review vendor contracts<br/>
                    - Monitor weather for last-minute changes<br/>
                    - Increase social media promotion<br/>
                  </>
                )}
              </div>
              <div className="flex justify-end mt-8">
                <button className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold shadow hover:bg-primary-700 transition" onClick={() => window.location.href='/event-organizer/vendors'}>
                  Choose Vendor
                </button>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}

const EventOrganizerDashboard = () => {
  const location = useLocation();

  const sidebarItems = [
    { name: 'Dashboard', href: '/event-organizer', icon: Home, active: location.pathname === '/event-organizer' },
    { name: 'Marketing Studio', href: '/event-organizer/campaign-studio', icon: Megaphone, active: location.pathname === '/event-organizer/campaign-studio' },
    { name: 'Smart City Integration', href: '/event-organizer/smart-city', icon: MapPin, active: location.pathname === '/event-organizer/smart-city' },
    { name: 'Ripple Effect Dashboard', href: '/event-organizer/ripple-effects', icon: BarChart3, active: location.pathname === '/event-organizer/ripple-effects' },
    
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Event Organizer Dashboard">
      <Routes>
        <Route path="/" element={<EventOrganizerHome />} />
        <Route path="/campaign-studio" element={<EventOrganizerCampaignStudio />} />
        <Route path="/smart-city" element={<SmartCityDashboard />} />
        <Route path="/ripple-effects" element={<RippleEffectDashboard />} />
        <Route path="/vendors" element={<VendorMatchingDashboard />} />
        
      </Routes>
    </DashboardLayout>
  );
}

export default EventOrganizerDashboard