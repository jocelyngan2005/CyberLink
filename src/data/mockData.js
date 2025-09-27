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

export const mockPostedJobs = [
  {
    id: 1,
    title: "Event Photographer",
    category: "Photography",
    description: "Professional photographer needed for Tech Innovation Expo. Must have experience with event photography and own equipment.",
    location: "Cyberjaya Convention Center",
    date: "2025-10-15",
    duration: "8 hours",
    hourlyRate: 150,
    status: "Active",
    postedDate: "5 days ago",
    applicationsCount: 8,
    requirements: ["Professional camera equipment", "Event photography experience", "Portfolio required"]
  },
  {
    id: 2,
    title: "Event Cashier",
    category: "Customer Service",
    description: "Experienced cashier needed to handle transactions during busy food festival period.",
    location: "Shaftsbury Square",
    date: "2025-10-20",
    duration: "6 hours", 
    hourlyRate: 25,
    status: "Active",
    postedDate: "3 days ago",
    applicationsCount: 12,
    requirements: ["Cash handling experience", "POS system knowledge", "Customer service skills"]
  },
  {
    id: 3,
    title: "Food Delivery Rider",
    category: "Delivery",
    description: "Reliable delivery rider needed for peak hours during street food festival.",
    location: "Cyberjaya Area",
    date: "2025-10-20",
    duration: "4 hours",
    hourlyRate: 22,
    status: "Active", 
    postedDate: "2 days ago",
    applicationsCount: 6,
    requirements: ["Own motorcycle", "Valid license", "GPS navigation skills"]
  },
  {
    id: 4,
    title: "Social Media Manager",
    category: "Marketing",
    description: "Part-time social media manager to create content and manage online presence during events.",
    location: "Remote/On-site",
    date: "2025-10-25",
    duration: "Flexible",
    hourlyRate: 35,
    status: "Active",
    postedDate: "1 day ago",
    applicationsCount: 4,
    requirements: ["Social media experience", "Content creation skills", "GenAI tool proficiency"]
  },
  {
    id: 5,
    title: "Event Setup Crew",
    category: "Labor",
    description: "Physical labor needed for setting up event booths and equipment.",
    location: "Various venues",
    date: "2025-10-15",
    duration: "6 hours",
    hourlyRate: 20,
    status: "Active",
    postedDate: "4 days ago", 
    applicationsCount: 15,
    requirements: ["Physical fitness", "Teamwork", "Punctuality"]
  }
]

export const mockAppliedFreelancers = [
  // Applications for Event Photographer (Job ID: 1)
  {
    id: 101,
    name: "David Tan",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    rating: 4.6,
    skills: ["Event Photography", "Content Creation", "Photo Editing"],
    hourlyRate: 130,
    availability: "Available",
    completedJobs: 85,
    jobAppliedFor: "Event Photographer",
    jobId: 1,
    applicationDate: "2 days ago",
    applicationStatus: "pending",
    portfolio: ["Wedding Photography", "Corporate Events", "Product Shoots", "Tech Conferences"],
    experience: "3 years",
    aiMatchScore: 95,
    coverLetter: "Experienced in tech event photography with professional equipment and editing skills."
  },
  {
    id: 102,
    name: "Jenny Liu",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5c0?w=150",
    rating: 4.8,
    skills: ["Photography", "Videography", "Drone Operation"],
    hourlyRate: 180,
    availability: "Available",
    completedJobs: 127,
    jobAppliedFor: "Event Photographer", 
    jobId: 1,
    applicationDate: "1 day ago",
    applicationStatus: "pending",
    portfolio: ["Event Photography", "Corporate Videos", "Aerial Photography", "Live Streaming"],
    experience: "5 years",
    aiMatchScore: 98,
    coverLetter: "Professional photographer with drone capabilities and live streaming experience."
  },
  // Applications for Event Cashier (Job ID: 2)
  {
    id: 103,
    name: "Maria Santos",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    rating: 4.9,
    skills: ["Cashier", "Customer Service", "POS Systems"],
    hourlyRate: 25,
    availability: "Available",
    completedJobs: 156,
    jobAppliedFor: "Event Cashier",
    jobId: 2,
    applicationDate: "1 day ago",
    applicationStatus: "pending",
    portfolio: ["Retail Experience", "Event Management", "Cash Handling", "Multilingual Support"],
    experience: "5 years",
    aiMatchScore: 92,
    coverLetter: "Experienced cashier with multilingual capabilities and event experience."
  },
  {
    id: 104,
    name: "Rahman Ali",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    rating: 4.7,
    skills: ["Customer Service", "Cash Management", "Problem Solving"],
    hourlyRate: 23,
    availability: "Available",
    completedJobs: 89,
    jobAppliedFor: "Event Cashier",
    jobId: 2,
    applicationDate: "4 hours ago",
    applicationStatus: "pending",
    portfolio: ["Fast Food Service", "Event Cashier", "Customer Relations"],
    experience: "2 years",
    aiMatchScore: 88,
    coverLetter: "Quick learner with excellent customer service skills and cash handling experience."
  },
  // Applications for Food Delivery Rider (Job ID: 3) 
  {
    id: 105,
    name: "Kevin Lim",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    rating: 4.7,
    skills: ["Delivery", "Customer Relations", "Route Optimization"],
    hourlyRate: 22,
    availability: "Available",
    completedJobs: 234,
    jobAppliedFor: "Food Delivery Rider",
    jobId: 3,
    applicationDate: "3 hours ago",
    applicationStatus: "pending", 
    portfolio: ["Food Delivery", "Package Delivery", "Express Services"],
    experience: "4 years",
    aiMatchScore: 91,
    coverLetter: "Experienced delivery rider with excellent knowledge of Cyberjaya area."
  },
  // Applications for Social Media Manager (Job ID: 4)
  {
    id: 106,
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    rating: 4.8,
    skills: ["Social Media Marketing", "Content Creation", "GenAI Tools"],
    hourlyRate: 40,
    availability: "Available",
    completedJobs: 67,
    jobAppliedFor: "Social Media Manager",
    jobId: 4,
    applicationDate: "6 hours ago",
    applicationStatus: "pending",
    portfolio: ["Brand Management", "Content Strategy", "AI-Generated Content", "Analytics"],
    experience: "3 years",
    aiMatchScore: 96,
    coverLetter: "Specialized in GenAI content creation and social media strategy for tech companies."
  },
  // Applications for Event Setup Crew (Job ID: 5)
  {
    id: 107,
    name: "Ahmad Hassan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    rating: 4.5,
    skills: ["Manual Labor", "Equipment Setup", "Team Coordination"],
    hourlyRate: 18,
    availability: "Available",
    completedJobs: 145,
    jobAppliedFor: "Event Setup Crew",
    jobId: 5,
    applicationDate: "1 day ago",
    applicationStatus: "pending",
    portfolio: ["Event Setup", "Construction", "Equipment Installation"],
    experience: "6 years",
    aiMatchScore: 87,
    coverLetter: "Experienced in event setup with strong physical capabilities and teamwork skills."
  }
]

export const mockRecommendedFreelancers = [
  // Recommendations for Event Photographer (Job ID: 1)
  {
    id: 201,
    name: "Alex Wong",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", 
    rating: 4.9,
    skills: ["Photography", "Video Production", "Live Streaming"],
    hourlyRate: 160,
    availability: "Available",
    completedJobs: 198,
    recommendedFor: "Event Photographer",
    jobId: 1,
    aiMatchScore: 97,
    matchReasons: ["Specialized in tech events", "Professional equipment", "Available on required date"],
    portfolio: ["Tech Conferences", "Product Launches", "Corporate Events"],
    experience: "7 years"
  },
  // Recommendations for Event Cashier (Job ID: 2)
  {
    id: 202,
    name: "Lisa Tan",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5c0?w=150",
    rating: 4.6,
    skills: ["Customer Service", "POS Systems", "Cash Handling"],
    hourlyRate: 26,
    availability: "Available",
    completedJobs: 112,
    recommendedFor: "Event Cashier",
    jobId: 2,
    aiMatchScore: 94,
    matchReasons: ["Perfect location match", "Available exact dates", "High customer satisfaction"],
    portfolio: ["Event Cashier", "Retail Management", "Customer Support"],
    experience: "4 years"
  },
  // Recommendations for Food Delivery Rider (Job ID: 3)
  {
    id: 203,
    name: "Danny Ng",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    rating: 4.8,
    skills: ["Delivery Services", "Navigation", "Customer Service"],
    hourlyRate: 24,
    availability: "Available", 
    completedJobs: 289,
    recommendedFor: "Food Delivery Rider",
    jobId: 3,
    aiMatchScore: 93,
    matchReasons: ["Local area expert", "High delivery success rate", "Peak hours available"],
    portfolio: ["Food Delivery", "Same-day Delivery", "Event Services"],
    experience: "5 years"
  },
  // Recommendations for Social Media Manager (Job ID: 4)
  {
    id: 204,
    name: "Michelle Lee",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    rating: 4.7,
    skills: ["Digital Marketing", "GenAI Content", "Analytics"],
    hourlyRate: 42,
    availability: "Available",
    completedJobs: 78,
    recommendedFor: "Social Media Manager", 
    jobId: 4,
    aiMatchScore: 95,
    matchReasons: ["GenAI expertise", "Tech industry experience", "Analytics proficiency"],
    portfolio: ["Social Media Strategy", "AI Content Creation", "Brand Management"],
    experience: "3 years"
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

export const mockEventOpportunities = [
  {
    id: 1,
    title: "Cyberjaya Tech Summit 2025",
    organizer: "Malaysia Digital Economy Corporation",
    organizerImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100",
    eventImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
    location: "Cyberjaya Convention Center",
    date: "2025-11-15",
    endDate: "2025-11-17",
    expectedAttendees: 8500,
    duration: "3 days",
    vendorSpots: 45,
    spotsLeft: 12,
    applicationDeadline: "2025-10-30",
    category: "Technology",
    description: "The largest tech conference in Southeast Asia featuring AI, blockchain, and IoT innovations. Perfect opportunity for F&B vendors to serve tech professionals.",
    requirements: [
      "Food safety certification required",
      "Minimum 2 years catering experience", 
      "Ability to serve 500+ customers daily",
      "Professional setup and branding"
    ],
    benefits: [
      "High foot traffic (8,500+ attendees)",
      "Premium location placement",
      "Marketing support and promotion",
      "Networking with industry leaders"
    ],
    fees: {
      applicationFee: 200,
      boothFee: 2500,
      securityDeposit: 1000
    },
    tags: ["High Traffic", "Premium Event", "Tech Professionals"],
    status: "Open",
    urgency: "high",
    aiRecommended: true,
    matchScore: 94,
    revenueEstimate: "RM 18,000 - RM 25,000"
  },
  {
    id: 2,
    title: "Malaysian Street Food Festival",
    organizer: "Cyberjaya Municipality",
    organizerImage: "https://images.unsplash.com/photo-1573164574511-73c773193279?w=100",
    eventImage: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
    location: "Shaftsbury Square",
    date: "2025-10-28",
    endDate: "2025-11-01",
    expectedAttendees: 12000,
    duration: "5 days",
    vendorSpots: 80,
    spotsLeft: 28,
    applicationDeadline: "2025-10-15",
    category: "Food & Culture",
    description: "Celebrate Malaysia's diverse culinary heritage with local and international food vendors. Family-friendly event with cultural performances.",
    requirements: [
      "Halal certification preferred",
      "Traditional or fusion cuisine",
      "Outdoor setup capability",
      "Weekend availability essential"
    ],
    benefits: [
      "Massive foot traffic (12,000+ visitors)",
      "Cultural appreciation focus",
      "Media coverage and publicity",
      "Family audience demographic"
    ],
    fees: {
      applicationFee: 150,
      boothFee: 1800,
      securityDeposit: 800
    },
    tags: ["Cultural", "Family Event", "High Volume"],
    status: "Open",
    urgency: "medium",
    aiRecommended: true,
    matchScore: 89,
    revenueEstimate: "RM 12,000 - RM 20,000"
  },
  {
    id: 3,
    title: "Startup Weekend Cyberjaya",
    organizer: "Tech Entrepreneurs Network",
    organizerImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100",
    eventImage: "https://images.unsplash.com/photo-1559223607-b4d0555ae8dd?w=400",
    location: "MSC Malaysia Innovation Hub",
    date: "2025-11-08",
    endDate: "2025-11-10",
    expectedAttendees: 2500,
    duration: "3 days",
    vendorSpots: 15,
    spotsLeft: 4,
    applicationDeadline: "2025-10-25",
    category: "Business & Entrepreneurship",
    description: "Intensive startup accelerator weekend with mentoring sessions, pitching competitions, and networking events for emerging entrepreneurs.",
    requirements: [
      "24/7 availability for weekend",
      "Quick service capability",
      "Healthy food options preferred",
      "Flexible menu for different budgets"
    ],
    benefits: [
      "Access to startup ecosystem",
      "Future business opportunities",
      "Direct customer feedback",
      "Potential partnership opportunities"
    ],
    fees: {
      applicationFee: 100,
      boothFee: 1200,
      securityDeposit: 500
    },
    tags: ["Startup Community", "Networking", "Innovation"],
    status: "Open",
    urgency: "high",
    aiRecommended: false,
    matchScore: 76,
    revenueEstimate: "RM 6,000 - RM 10,000"
  },
  {
    id: 4,
    title: "Green Technology Expo",
    organizer: "Sustainable Future Malaysia",
    organizerImage: "https://images.unsplash.com/photo-1581092918484-8313fb2f5d84?w=100",
    eventImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    location: "Putrajaya International Convention Centre",
    date: "2025-12-03",
    endDate: "2025-12-05",
    expectedAttendees: 6000,
    duration: "3 days",
    vendorSpots: 30,
    spotsLeft: 18,
    applicationDeadline: "2025-11-15",
    category: "Sustainability",
    description: "Showcasing green technology solutions and sustainable practices. Focus on eco-friendly vendors and sustainable food options.",
    requirements: [
      "Eco-friendly packaging mandatory",
      "Sustainable sourcing practices",
      "Zero-waste approach preferred",
      "Organic/local ingredients focus"
    ],
    benefits: [
      "Sustainability-focused audience",
      "Government official attendance",
      "International media coverage",
      "CSR partnership opportunities"
    ],
    fees: {
      applicationFee: 180,
      boothFee: 2200,
      securityDeposit: 900
    },
    tags: ["Eco-Friendly", "Government Event", "Sustainability"],
    status: "Open",
    urgency: "low",
    aiRecommended: false,
    matchScore: 68,
    revenueEstimate: "RM 10,000 - RM 16,000"
  },
  {
    id: 5,
    title: "Digital Art & Creative Festival",
    organizer: "Creative Industries Development Agency",
    organizerImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=100",
    eventImage: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400",
    location: "Cyberjaya Creative Hub",
    date: "2025-11-22",
    endDate: "2025-11-24",
    expectedAttendees: 4500,
    duration: "3 days",
    vendorSpots: 25,
    spotsLeft: 8,
    applicationDeadline: "2025-11-05",
    category: "Arts & Culture",
    description: "Celebrating digital creativity with interactive installations, workshops, and performances. Artistic and creative food presentations welcomed.",
    requirements: [
      "Creative food presentation",
      "Instagram-worthy setup",
      "Artistic menu design",
      "Flexible serving times"
    ],
    benefits: [
      "Creative community exposure",
      "Social media visibility",
      "Artistic collaboration opportunities",
      "Young demographic audience"
    ],
    fees: {
      applicationFee: 120,
      boothFee: 1500,
      securityDeposit: 600
    },
    tags: ["Creative", "Instagram-worthy", "Young Audience"],
    status: "Closing Soon",
    urgency: "high",
    aiRecommended: true,
    matchScore: 82,
    revenueEstimate: "RM 8,000 - RM 14,000"
  }
]