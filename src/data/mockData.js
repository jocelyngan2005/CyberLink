// Mock data for CyberLink app

export const mockEvents = [
  {
    id: 1,
    title: "Tech Innovation Expo 2025",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
    location: "Cyberjaya Convention Center",
    distance: "2.3 km",
    date: "2025-10-15",
    time: "10:00 AM",
    price: 50,
    category: "Technology",
    trending: true,
    description: "Latest innovations in AI, IoT, and Smart City technologies"
  },
  {
    id: 2,
    title: "Street Food Festival",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
    location: "Shaftsbury Square",
    distance: "1.8 km",
    date: "2025-10-20",
    time: "6:00 PM",
    price: 25,
    category: "Food & Beverage",
    trending: true,
    description: "Authentic local street food from over 50 vendors"
  },
  {
    id: 3,
    title: "Digital Art Workshop",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400",
    location: "Creative Hub Cyberjaya",
    distance: "3.1 km",
    date: "2025-10-25",
    time: "2:00 PM",
    price: 75,
    category: "Arts & Culture",
    trending: false,
    description: "Learn digital art techniques from industry professionals"
  },
  {
    id: 4,
    title: "Startup Pitch Competition",
    image: "https://images.unsplash.com/photo-1559223607-b4d0555ae8dd?w=400",
    location: "MSC Malaysia",
    distance: "4.2 km",
    date: "2025-11-05",
    time: "9:00 AM",
    price: 30,
    category: "Business",
    trending: false,
    description: "Watch emerging startups pitch their innovative ideas"
  }
]

export const mockFreelancers = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5c0?w=150",
    rating: 4.8,
    skills: ["Event Photography", "Videography"],
    hourlyRate: 150,
    availability: "Available",
    completedJobs: 127
  },
  {
    id: 2,
    name: "Ahmad Rahman",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    rating: 4.9,
    skills: ["Food Service", "Event Setup"],
    hourlyRate: 80,
    availability: "Available",
    completedJobs: 203
  },
  {
    id: 3,
    name: "Lisa Wong",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    rating: 4.7,
    skills: ["Marketing", "Social Media"],
    hourlyRate: 120,
    availability: "Busy",
    completedJobs: 89
  }
]

export const mockSMEs = [
  {
    id: 1,
    name: "TechCafe Solutions",
    category: "Food & Beverage",
    rating: 4.6,
    logo: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=150",
    specialties: ["Coffee", "Light Meals", "Catering"],
    priceRange: "$$",
    distance: "1.2 km"
  },
  {
    id: 2,
    name: "Digital Prints Pro",
    category: "Printing & Design",
    rating: 4.8,
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=150",
    specialties: ["Banners", "Posters", "Digital Signage"],
    priceRange: "$$$",
    distance: "2.1 km"
  },
  {
    id: 3,
    name: "EventTech Rentals",
    category: "Equipment Rental",
    rating: 4.9,
    logo: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=150",
    specialties: ["Sound Systems", "Lighting", "Staging"],
    priceRange: "$$$$",
    distance: "3.5 km"
  }
]

export const mockDemandData = [
  { time: '00:00', food: 20, transport: 15, accommodation: 10, parking: 5 },
  { time: '06:00', food: 45, transport: 35, accommodation: 12, parking: 20 },
  { time: '12:00', food: 80, transport: 60, accommodation: 25, parking: 45 },
  { time: '18:00', food: 120, transport: 85, accommodation: 40, parking: 70 },
  { time: '20:00', food: 200, transport: 150, accommodation: 80, parking: 120 },
  { time: '22:00', food: 180, transport: 120, accommodation: 90, parking: 100 },
]

export const mockAlerts = [
  {
    id: 1,
    type: "event-opportunity",
    title: "🎵 Tech Concert with 5,000 attendees tomorrow!",
    description: "Major tech conference at Cyberjaya Convention Center. Hire 3-5 extra part-timers for cashier/delivery roles via marketplace.",
    time: "2 hours ago",
    severity: "high",
    actionable: true,
    aiType: "AgentAI",
    expectedDemand: "+350%",
    suggestedStaff: 5,
    eventAttendees: 5000
  },
  {
    id: 2,
    type: "weather-impact",
    title: "☔ Rain forecast - Indoor demand surge expected",
    description: "Heavy rain 6-8 PM will boost indoor dining by 40%. Stock up beverages and hot food items.",
    time: "1 hour ago",
    severity: "medium",
    actionable: true,
    aiType: "AI",
    demandIncrease: "+40%"
  },
  {
    id: 3,
    type: "traffic-optimization",
    title: "🚗 Traffic congestion detected - Route optimization active",
    description: "Alternative routes suggested by AI. Switch to Persiaran APEC for 15% faster deliveries.",
    time: "30 minutes ago",
    severity: "low",
    actionable: true,
    aiType: "AI",
    timeSavings: "15%"
  },
  {
    id: 4,
    type: "footfall-prediction",
    title: "📈 High footfall predicted at Shaftsbury Square",
    description: "AgentAI analysis shows 200% higher foot traffic 2-4 PM. Move food truck there for optimal sales.",
    time: "45 minutes ago",
    severity: "high",
    actionable: true,
    aiType: "AgentAI",
    locationRecommendation: "Shaftsbury Square",
    expectedFootfall: "+200%"
  },
  {
    id: 5,
    type: "demand-forecast",
    title: "🤖 GenAI Marketing Opportunity",
    description: "Create targeted social media campaign for office workers. GenAI suggests 'Healthy Lunch Combos' theme.",
    time: "1 hour ago",
    severity: "medium",
    actionable: true,
    aiType: "GenAI",
    campaignTheme: "Healthy Lunch Combos",
    targetAudience: "Office Workers"
  }
]

export const mockJobs = [
  {
    id: 1,
    title: "Event Cashier Needed",
    employer: "TechCafe Solutions",
    location: "Cyberjaya Convention Center",
    hourlyRate: 25,
    duration: "8 hours",
    date: "2025-10-15",
    description: "Handle cashier duties during Tech Innovation Expo",
    requirements: ["Cash handling experience", "Customer service skills"],
    applicants: 12
  },
  {
    id: 2,
    title: "Food Delivery Rider",
    employer: "QuickBites Delivery",
    location: "Shaftsbury Square",
    hourlyRate: 20,
    duration: "6 hours",
    date: "2025-10-20",
    description: "Deliver food orders during Street Food Festival",
    requirements: ["Own motorcycle", "Valid license"],
    applicants: 8
  },
  {
    id: 3,
    title: "Event Promoter",
    employer: "Creative Hub Cyberjaya",
    location: "Various locations",
    hourlyRate: 30,
    duration: "4 hours",
    date: "2025-10-25",
    description: "Promote digital art workshop to potential attendees",
    requirements: ["Outgoing personality", "Marketing experience"],
    applicants: 5
  }
]

export const mockDeliveryRoutes = [
  {
    id: 1,
    destination: "Block A, Cyberjaya",
    distance: "2.1 km",
    estimatedTime: "8 mins",
    priority: "high"
  },
  {
    id: 2,
    destination: "Shaftsbury Square",
    distance: "1.8 km",
    estimatedTime: "6 mins",
    priority: "medium"
  },
  {
    id: 3,
    destination: "MSC Malaysia",
    distance: "4.2 km",
    estimatedTime: "12 mins",
    priority: "low"
  }
]

export const mockCampaigns = [
  {
    id: 1,
    title: "Tech Expo Special Menu!",
    content: "🚀 Get ready for the Tech Innovation Expo! Our special tech-themed menu features the 'Code Breaker Burger', 'Binary Smoothie', and 'Algorithm Appetizers'. Perfect fuel for innovators! Pre-order now and get 15% off. #TechExpo2025 #Innovation",
    platform: "Social Media",
    reach: "2,500+ people",
    engagement: "8.5%"
  },
  {
    id: 2,
    title: "Street Food Festival Promo",
    content: "🍜 Experience authentic Malaysian flavors at the Street Food Festival! Our heritage recipes passed down through generations are waiting for you. From char kway teow to cendol - taste the tradition! #StreetFood #Malaysian #Heritage",
    platform: "Email",
    reach: "1,800+ subscribers",
    engagement: "12.3%"
  }
]

export const mockRippleEffects = [
  {
    sector: "Food & Beverage",
    impact: 85,
    change: "+15%",
    color: "#10B981"
  },
  {
    sector: "Transportation",
    impact: 72,
    change: "+8%",
    color: "#3B82F6"
  },
  {
    sector: "Accommodation",
    impact: 45,
    change: "+3%",
    color: "#8B5CF6"
  },
  {
    sector: "Retail",
    impact: 68,
    change: "+12%",
    color: "#F59E0B"
  },
  {
    sector: "Entertainment",
    impact: 92,
    change: "+25%",
    color: "#EF4444"
  }
]