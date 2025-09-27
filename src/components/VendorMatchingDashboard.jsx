import React, { useState } from 'react';
import { 
  Sparkles, 
  Eye, 
  Share2, 
  Star, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  X, 
  Filter,
  Search,
  MapPin,
  Users,
  Calendar,
  Download,
  Edit,
  Send,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  ArrowRight,
  Target,
  TrendingUp,
  Award
} from 'lucide-react';

// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: "Tech Innovation Summit 2025",
    date: "2025-10-15",
    location: "Convention Center, Downtown",
    expectedAttendees: 2500,
    category: "Technology",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
    description: "Leading tech conference featuring AI, blockchain, and emerging technologies",
    duration: "3 days",
    budget: "$50,000"
  },
  {
    id: 2,
    title: "Gourmet Food Festival",
    date: "2025-10-22", 
    location: "City Park",
    expectedAttendees: 5000,
    category: "Food & Beverage",
    image: "https://images.unsplash.com/photo-1567320276875-ccef2a6f54d5?w=400&h=100&fit=crop",
    description: "A celebration of local and international cuisine with top chefs",
    duration: "2 days", 
    budget: "$75,000"
  },
  {
    id: 3,
    title: "Business Leadership Conference",
    date: "2025-11-05",
    location: "Grand Hotel Ballroom", 
    expectedAttendees: 800,
    category: "Business",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=250&fit=crop",
    description: "Executive leadership strategies and networking opportunities",
    duration: "1 day",
    budget: "$25,000"
  }
];

// Mock vendor data
const mockVendors = [
  {
    id: 1,
    name: "Gourmet Street Eats",
    category: "Food & Beverage",
    subcategory: "Street Food",
    rating: 4.8,
    price: "$$",
    location: "Downtown",
    distance: "2.3 km",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=150&fit=crop",
    specialties: ["Tacos", "Burgers", "Vegan Options"],
    minSpend: 500,
    setupFee: 200,
    reviews: 324,
    status: "pending",
    description: "Fresh, creative street food with a focus on organic ingredients and local flavors. Try our famous vegan tacos and gourmet burgers!",
    availability: "Available",
    responseTime: "2 hours"
  },
  {
    id: 2,
    name: "Tech Gear Pro",
    category: "Technology",
    subcategory: "Electronics", 
    rating: 4.6,
    price: "$$$",
    location: "Tech District",
    distance: "1.8 km",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=150&fit=crop",
    specialties: ["Gadgets", "Accessories", "Smart Devices"],
    minSpend: 1000,
    setupFee: 300,
    reviews: 156,
    status: "approved",
    description: "Your one-stop shop for the latest tech gadgets, smart devices, and accessories. We offer expert advice and top-rated products for every enthusiast.",
    availability: "Available",
    responseTime: "4 hours"
  },
  {
    id: 3,
    name: "Coffee Culture Co.",
    category: "Food & Beverage",
    subcategory: "Beverages",
    rating: 4.9,
    price: "$$",
    location: "Arts Quarter",
    distance: "3.1 km",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=150&fit=crop",
    specialties: ["Artisan Coffee", "Tea", "Pastries"],
    minSpend: 300,
    setupFee: 150,
    reviews: 482,
    status: "approved",
    description: "Premium coffee and artisan beverages",
    availability: "Available",
    responseTime: "1 hour"
  },
  {
    id: 4,
    name: "Healthy Bites",
    category: "Food & Beverage", 
    subcategory: "Health Food",
    rating: 4.7,
    price: "$$",
    location: "Health District",
    distance: "4.2 km",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=150&fit=crop",
    specialties: ["Salads", "Smoothies", "Organic"],
    minSpend: 400,
    setupFee: 180,
    reviews: 298,
    status: "rejected",
    description: "Fresh, healthy, and organic food options",
    availability: "Available",
    responseTime: "3 hours"
  }
];

const VendorMatchingDashboard = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [vendors, setVendors] = useState(mockVendors);


  const filteredVendors = vendors.filter(vendor => {
    const matchesCategory = selectedCategory === 'all' || vendor.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || vendor.status === selectedStatus;
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const updateVendorStatus = (vendorId, newStatus) => {
    setVendors(prevVendors =>
      prevVendors.map(vendor =>
        vendor.id === vendorId ? { ...vendor, status: newStatus } : vendor
      )
    );
  };

  const getCategoryGradient = (category) => {
    switch(category) {
      case 'Technology': return 'from-blue-500 to-purple-600';
      case 'Food & Beverage': return 'from-orange-500 to-red-500';
      case 'Business': return 'from-gray-600 to-gray-800';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  if (!selectedEvent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        {/* Header */}
        {/* Top header replaced with Choose Your Vendor */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-8 py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Choose Your Vendor</h1>
              <p className="text-xl text-gray-600 mt-2 max-w-2xl">Select a vendor to start generating AI-powered marketing materials and managing vendor partnerships</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">Event Organizer</p>
            </div>
          </div>
        </div>

        {/* Vendor Selection */}
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vendors.map(vendor => (
              <div 
                key={vendor.id}
                onClick={() => setSelectedEvent(vendor)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col h-full">
                  <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
                    <img 
                      src={vendor.image}
                      alt={vendor.name}
                      className="object-cover w-full h-full"
                      onError={e => { e.target.onerror=null; e.target.src='https://via.placeholder.com/400x192?text=No+Image'; }}
                    />
                    <span className={`absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-semibold`}>{vendor.category}</span>
                  </div>
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <h2 className="font-bold text-2xl mb-2">{vendor.name}</h2>
                      <p className="text-gray-700 mb-3 line-clamp-2">{vendor.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {vendor.specialties.map((tag, idx) => (
                          <span key={idx} className="font-semibold text-sm text-gray-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center text-gray-600 mb-4">
                        <MapPin className="w-4 h-4 mr-2 text-red-500" />
                        {vendor.location} • {vendor.distance}
                      </div>
                    </div>
                    <button 
                      className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center transition-colors duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(vendor);
                      }}
                    >
                      Select Vendor <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-8 py-6 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSelectedEvent(null)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowRight className="w-5 h-5 rotate-180 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{selectedEvent.title}</h1>
              <p className="text-gray-600">Vendor Management Dashboard</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">John Doe</p>
            <p className="text-xs text-gray-500">Event Organizer</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        
        {/* Event Overview Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="relative h-32 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">{selectedEvent.title}</h2>
              <p className="opacity-90">{selectedEvent.description}</p>
            </div>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-semibold text-gray-900">{selectedEvent.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Expected Attendees</p>
                  <p className="font-semibold text-gray-900">{selectedEvent.expectedAttendees.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-semibold text-gray-900">{selectedEvent.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Budget</p>
                  <p className="font-semibold text-gray-900">{selectedEvent.budget}</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Vendor Applications */}
        {isPosterPosted && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <Award className="w-6 h-6 mr-3" />
                    Vendor Applications
                  </h2>
                  <p className="text-blue-100 mt-2">Review and manage vendor partnerships</p>
                </div>
                <div className="text-right text-white">
                  <div className="text-3xl font-bold">{filteredVendors.length}</div>
                  <div className="text-blue-100 text-sm">Total Applications</div>
                </div>
              </div>
            </div>

            {/* Status Summary */}
            <div className="grid md:grid-cols-3 gap-6 p-6 bg-gray-50 border-b border-gray-200">
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="text-2xl font-bold text-amber-600 mb-1">
                  {filteredVendors.filter(v => v.status === 'pending').length}
                </div>
                <div className="text-gray-600 text-sm">Pending Review</div>
              </div>
              
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="text-2xl font-bold text-emerald-600 mb-1">
                  {filteredVendors.filter(v => v.status === 'approved').length}
                </div>
                <div className="text-gray-600 text-sm">Approved</div>
              </div>
              
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {filteredVendors.filter(v => v.status === 'rejected').length}
                </div>
                <div className="text-gray-600 text-sm">Rejected</div>
              </div>
            </div>

            {/* Filters */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-80">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search vendors by name or specialty..."
                      className="pl-12 pr-4 py-3 w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <select 
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="Food & Beverage">Food & Beverage</option>
                  <option value="Technology">Technology</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
                
                <select 
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Vendor List */}
            <div className="divide-y divide-gray-100">
              {filteredVendors.map(vendor => (
                <div key={vendor.id} className="p-6 hover:bg-gray-50 transition-all duration-200">
                  <div className="flex items-start space-x-6">
                    <img 
                      src={vendor.image} 
                      alt={vendor.name}
                      className="object-cover w-32 h-32 rounded-xl shadow-md"
                      onError={e => { e.target.onerror=null; e.target.src='https://via.placeholder.com/400x180?text=No+Image'; }}
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-2xl mb-2 text-gray-900">{vendor.name}</h3>
                        <p className="text-gray-700 mb-3 line-clamp-2">{vendor.description}</p>
                        <div className="flex flex-wrap gap-4 mb-4">
                          {vendor.specialties.map((tag, idx) => (
                            <span key={idx} className="font-semibold text-base text-gray-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                          <MapPin className="w-4 h-4 mr-2 text-red-500" />
                          {vendor.location} • {vendor.distance}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 mt-2">
                        {vendor.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => updateVendorStatus(vendor.id, 'approved')}
                              className="flex items-center px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all font-medium shadow-sm hover:shadow-md"
                            >
                              <ThumbsUp className="w-4 h-4 mr-2" />
                              Approve
                            </button>
                            <button 
                              onClick={() => updateVendorStatus(vendor.id, 'rejected')}
                              className="flex items-center px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium shadow-sm hover:shadow-md"
                            >
                              <ThumbsDown className="w-4 h-4 mr-2" />
                              Reject
                            </button>
                          </>
                        )}
                        <button 
                          className="flex items-center px-6 py-2.5 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-all font-medium"
                          onClick={() => { setSelectedVendor(vendor); setShowVendorModal(true); }}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </button>
                        <button 
                          className="flex items-center px-6 py-2.5 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-all font-medium"
                          onClick={() => { setSelectedVendor(vendor); setShowMessageModal(true); setMessageText(""); setMessageSent(false); }}
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


export default VendorMatchingDashboard;
