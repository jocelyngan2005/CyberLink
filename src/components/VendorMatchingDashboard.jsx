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
  ArrowLeft,
  Target,
  TrendingUp,
  Award,
  Check,
  MessageCircle
} from 'lucide-react';

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

const VendorMatchingDashboard = ({ isOpen, onClose, eventData }) => {
  const [selectedEvent, setSelectedEvent] = useState(eventData || null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [vendors, setVendors] = useState(mockVendors);
  const [showConfirmationPage, setShowConfirmationPage] = useState(false);
  const [confirmedVendor, setConfirmedVendor] = useState(null);

  // Check if this is being used as a modal (isOpen prop provided) vs standalone page
  const isModalMode = isOpen !== undefined;

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

  const handleVendorSelection = (vendor) => {
    setConfirmedVendor(vendor);
    setShowConfirmationPage(true);
    updateVendorStatus(vendor.id, 'selected');
  };

  const handleBackToSelection = () => {
    setShowConfirmationPage(false);
    setConfirmedVendor(null);
  };

  // If this is being used as a modal and it's not open, return null
  if (isModalMode && isOpen === false) return null;

  // Show vendor selection page initially
  if (!selectedEvent && !showConfirmationPage) {
    // Determine wrapper classes based on modal vs standalone mode
    const wrapperClass = isModalMode 
      ? "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      : "";
    
    const contentClass = isModalMode 
      ? "bg-white rounded-lg w-[95%] max-w-7xl h-[90%] flex flex-col overflow-hidden shadow-2xl"
      : "min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50";

    return (
      <div className={wrapperClass}>
        <div className={contentClass}>
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-8 py-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {isModalMode && onClose && (
                  <button 
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                )}
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">Choose Your Vendor</h1>
                  <p className="text-xl text-gray-600 mt-2 max-w-2xl">Select a vendor to start generating AI-powered marketing materials and managing vendor partnerships</p>
                </div>
              </div>
              
            </div>
          </div>

          {/* Vendor Selection */}
          <div className={isModalMode ? "flex-1 overflow-y-auto" : ""}>
            <div className="max-w-7xl mx-auto px-8 py-12">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mockVendors.map(vendor => (
                  <div 
                    key={vendor.id}
                    className="group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  >
                    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col" style={{ height: '500px' }}>
                      <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
                        <img 
                          src={vendor.image}
                          alt={vendor.name}
                          className="object-cover w-full h-full"
                          onError={e => { e.target.onerror=null; e.target.src='https://via.placeholder.com/400x192?text=No+Image'; }}
                        />
                        <span className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-semibold">{vendor.category}</span>
                      </div>
                      <div className="p-6 flex flex-col flex-1 justify-between">
                        <div className="flex-1">
                          <h2 className="font-bold text-xl mb-2 leading-tight">{vendor.name}</h2>
                          <p className="text-gray-700 mb-3 text-sm leading-relaxed line-clamp-3" style={{ minHeight: '60px' }}>{vendor.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {vendor.specialties.slice(0, 3).map((tag, idx) => (
                              <span key={idx} className="font-medium text-xs text-gray-900 bg-blue-50 px-2 py-1 rounded-full border border-blue-200">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center text-gray-600 mb-4 text-sm">
                            <MapPin className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" />
                            <span className="truncate">{vendor.location} • {vendor.distance}</span>
                          </div>
                        </div>
                        <button 
                          className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center transition-colors duration-200 cursor-pointer"
                          onClick={() => handleVendorSelection(vendor)}
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
        </div>
      </div>
    );
  }

  // Show confirmation page after vendor selection
  if (showConfirmationPage && confirmedVendor) {
    const wrapperClass = isModalMode 
      ? "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      : "";
      
    const contentClass = isModalMode 
      ? "bg-white rounded-lg w-[95%] max-w-7xl h-[90%] flex flex-col overflow-hidden shadow-2xl"
      : "min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50";

    return (
      <div className={wrapperClass}>
        <div className={contentClass}>
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-8 py-6 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleBackToSelection}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                {isModalMode && onClose && (
                  <button 
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                )}
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Contact Vendorted Successfully! 🎉</h1>
                  <p className="text-gray-600">Your vendor has been confirmed for the event</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">Event Organizer</p>
              </div>
            </div>
          </div>

          <div className={isModalMode ? "flex-1 overflow-y-auto" : ""}>
            <div className="max-w-7xl mx-auto px-8 py-12">
              {/* Success Message */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Vendor Successfully Selected!</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  You have successfully selected <strong>{confirmedVendor.name}</strong> for your event. 
                  Here are the next steps to complete your booking.
                </p>
              </div>

              {/* Vendor Summary Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8 max-w-4xl mx-auto">
                <div className="p-8">
                  <div className="flex items-start space-x-6">
                    <img 
                      src={confirmedVendor.image} 
                      alt={confirmedVendor.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{confirmedVendor.name}</h3>
                      <p className="text-gray-600 mb-3">{confirmedVendor.description}</p>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{confirmedVendor.rating}</span>
                          <span className="text-gray-500">({confirmedVendor.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{confirmedVendor.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <span>{confirmedVendor.price}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <Check className="w-4 h-4 mr-1" />
                        Selected
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-4xl mx-auto mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Next Steps</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Contract & Agreement</h4>
                      <p className="text-gray-600">Review and sign the vendor contract with terms and conditions.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Payment Setup</h4>
                      <p className="text-gray-600">Setup payment terms and deposit requirements.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Final Coordination</h4>
                      <p className="text-gray-600">Coordinate logistics, timing, and special requirements.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleBackToSelection}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Select Another Vendor
                </button>
                <button
                  onClick={() => {
                    alert('Proceeding to contract and payment setup...');
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Proceed with Booking
                </button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // This shouldn't be reached in the current flow, but keeping it for completeness
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-8 py-8">
        <h1>Event Management Dashboard</h1>
        <p>Selected Event: {selectedEvent?.name || selectedEvent?.title || "No event selected"}</p>
      </div>
    </div>
  );
};

export default VendorMatchingDashboard;
