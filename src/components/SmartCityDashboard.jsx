import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Car, 
  Bus, 
  Users, 
  Clock, 
  Star, 
  Filter,
  Search,
  Calendar,
  Navigation,
  AlertTriangle,
  CheckCircle,
  X,
  Plus,
  Eye,
  BookOpen,
  TrendingUp,
  TrendingDown,
  Activity,
  Trash2,
  BarChart3,
  Zap,
  Settings,
  RefreshCw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar, RadialBarChart, RadialBar } from 'recharts';

// Mock API
const cityAPI = {
  getParkingLots: () => Promise.resolve({
    lots: [
      {
        id: 1,
        name: "Cyberjaya Central Mall",
        distance: "0.2 km away",
        availableSlots: 85,
        totalSlots: 120,
        hourlyRate: 3,
        dailyRate: 15,
        features: ["Covered", "EV Charging", "24/7 Security"]
      },
      {
        id: 2,
        name: "Shaftsbury Square",
        distance: "0.5 km away",
        availableSlots: 23,
        totalSlots: 80,
        hourlyRate: 2.5,
        dailyRate: 12,
        features: ["Covered", "CCTV", "Near LRT"]
      },
      {
        id: 3,
        name: "MMU Campus Parking",
        distance: "0.8 km away",
        availableSlots: 156,
        totalSlots: 200,
        hourlyRate: 1.5,
        dailyRate: 8,
        features: ["Open Air", "Shuttle Service"]
      }
    ]
  }),
  getShuttleRoutes: () => Promise.resolve({
    routes: [
      {
        id: 1,
        name: "Campus Shuttle A",
        description: "Main campus circuit",
        fare: 2,
        frequency: "Every 15 minutes",
        operatingHours: "6:00 AM - 10:00 PM",
        capacity: 40,
        stops: [
          { id: 1, name: "MMU Main Gate", time: "2 min" },
          { id: 2, name: "Faculty Block", time: "5 min" },
          { id: 3, name: "Student Center", time: "8 min" },
          { id: 4, name: "Hostel Complex", time: "12 min" }
        ]
      },
      {
        id: 2,
        name: "City Connector",
        description: "Cyberjaya to KL Sentral",
        fare: 8,
        frequency: "Every 30 minutes",
        operatingHours: "5:30 AM - 11:30 PM",
        capacity: 50,
        stops: [
          { id: 1, name: "Cyberjaya Central", time: "0 min" },
          { id: 2, name: "Putrajaya Sentral", time: "15 min" },
          { id: 3, name: "Bandar Tasik Selatan", time: "35 min" },
          { id: 4, name: "KL Sentral", time: "50 min" }
        ]
      }
    ]
  }),
  getCrowdDensity: () => Promise.resolve({
    areas: [
      {
        id: 1,
        name: "Main Auditorium",
        capacity: 500,
        currentCount: 420,
        densityLevel: 84,
        currentDensity: "High",
        trend: "increasing"
      },
      {
        id: 2,
        name: "Food Court",
        capacity: 200,
        currentCount: 65,
        densityLevel: 32,
        currentDensity: "Low",
        trend: "stable"
      },
      {
        id: 3,
        name: "Parking Zone A",
        capacity: 150,
        currentCount: 98,
        densityLevel: 65,
        currentDensity: "Moderate",
        trend: "decreasing"
      }
    ]
  })
};

// Mock data for charts
const rippleEffectsData = [
  { sector: 'Food & Beverage', impact: 85, change: '+25%', color: '#10B981', value: 35 },
  { sector: 'Transportation', impact: 72, change: '+18%', color: '#3B82F6', value: 25 },
  { sector: 'Accommodation', impact: 45, change: '+8%', color: '#F59E0B', value: 20 },
  { sector: 'Retail', impact: 58, change: '+12%', color: '#8B5CF6', value: 15 },
  { sector: 'Entertainment', impact: 95, change: '+35%', color: '#EF4444', value: 5 }
];

const timeSeriesData = [
  { time: '06:00', parking: 20, transport: 15, crowd: 10 },
  { time: '08:00', parking: 65, transport: 80, crowd: 45 },
  { time: '10:00', parking: 85, transport: 60, crowd: 75 },
  { time: '12:00', parking: 95, transport: 70, crowd: 90 },
  { time: '14:00', parking: 80, transport: 55, crowd: 85 },
  { time: '16:00', parking: 90, transport: 85, crowd: 95 },
  { time: '18:00', parking: 98, transport: 95, crowd: 100 },
  { time: '20:00', parking: 75, transport: 70, crowd: 80 },
  { time: '22:00', parking: 45, transport: 40, crowd: 35 }
];

const economicImpactData = [
  { name: 'Jan', value: 25000, growth: 15 },
  { name: 'Feb', value: 28000, growth: 18 },
  { name: 'Mar', value: 35000, growth: 25 },
  { name: 'Apr', value: 42000, growth: 32 },
  { name: 'May', value: 38000, growth: 28 },
  { name: 'Jun', value: 45000, growth: 35 }
];

// Enhanced MetricCard component with Glassmorphism
const MetricCard = ({ title, value, change, icon: Icon, color, detail }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 transition-all duration-300 hover:shadow-2xl hover:scale-110 hover:bg-white/90 group">
    <div className="flex items-center justify-between mb-6">
      <div className={`p-4 rounded-2xl shadow-lg transition-all duration-300 group-hover:scale-110 ${
        color === 'success' ? 'bg-gradient-to-br from-green-100 to-emerald-100' :
        color === 'warning' ? 'bg-gradient-to-br from-yellow-100 to-orange-100' :
        color === 'primary' ? 'bg-gradient-to-br from-blue-100 to-blue-200' :
        color === 'accent' ? 'bg-gradient-to-br from-purple-100 to-purple-200' : 
        'bg-gradient-to-br from-gray-100 to-gray-200'
      }`}>
        <Icon className={`w-7 h-7 ${
          color === 'success' ? 'text-green-600' :
          color === 'warning' ? 'text-yellow-600' :
          color === 'primary' ? 'text-blue-600' :
          color === 'accent' ? 'text-purple-600' : 
          'text-gray-600'
        }`} />
      </div>
      <span className={`text-sm font-bold px-3 py-2 rounded-full shadow-md ${
        change.startsWith('+') ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200' : 
        change.startsWith('-') ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200' : 
        'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200'
      }`}>
        {change}
      </span>
    </div>
    <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-4xl font-black bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-2">{value}</p>
    {detail && <p className="text-sm text-gray-500 font-medium">{detail}</p>}
  </div>
);

// Enhanced Chart Components with Glassmorphism
const RippleEffectChart = ({ data }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 transition-all duration-300 hover:shadow-2xl">
    <div className="flex items-center space-x-3 mb-8">
      <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center shadow-lg border border-purple-200">
        <BarChart3 className="w-6 h-6 text-purple-600" />
      </div>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">Sector Impact Analysis</h3>
    </div>
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
      >
        <XAxis type="number" domain={[0, 100]} hide />
        <YAxis type="category" dataKey="sector" tick={{ fontWeight: 'bold', fontSize: 14 }} width={120} />
        <Tooltip formatter={(value, name, props) => [`${value}%`, 'Impact']} labelFormatter={label => `Sector: ${label}`} />
        <Bar dataKey="impact" radius={8} barSize={18}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
    <div className="grid grid-cols-2 gap-3 mt-6">
      {data.map((item, index) => (
        <div key={index} className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl border border-white/30">
          <div 
            className="w-4 h-4 rounded-full shadow-md"
            style={{ backgroundColor: item.color }}
          ></div>
          <span className="text-sm font-medium text-gray-700">{item.sector}</span>
        </div>
      ))}
    </div>
  </div>
);

const TrafficChart = ({ data }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 transition-all duration-300 hover:shadow-2xl">
    <div className="flex items-center space-x-3 mb-8">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center shadow-lg border border-blue-200">
        <Car className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">Traffic Distribution</h3>
    </div>
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={120}
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: 'none',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

const TimeSeriesChart = ({ data }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 transition-all duration-300 hover:shadow-2xl">
    <div className="flex items-center space-x-3 mb-8">
      <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center shadow-lg border border-green-200">
        <TrendingUp className="w-6 h-6 text-green-600" />
      </div>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">Real-time Utilization Trends</h3>
    </div>
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
        <XAxis dataKey="time" stroke="#6b7280" />
        <YAxis stroke="#6b7280" />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: 'none',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
          }}
        />
        <Legend />
        <Area type="monotone" dataKey="parking" stackId="1" stroke="#3B82F6" fill="url(#parkingGradient)" fillOpacity={0.8} />
        <Area type="monotone" dataKey="transport" stackId="1" stroke="#10B981" fill="url(#transportGradient)" fillOpacity={0.8} />
        <Area type="monotone" dataKey="crowd" stackId="1" stroke="#F59E0B" fill="url(#crowdGradient)" fillOpacity={0.8} />
        <defs>
          <linearGradient id="parkingGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
          </linearGradient>
          <linearGradient id="transportGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
          </linearGradient>
          <linearGradient id="crowdGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

const EconomicImpactChart = ({ data }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 transition-all duration-300 hover:shadow-2xl">
    <div className="flex items-center space-x-3 mb-8">
      <div className="w-10 h-10 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl flex items-center justify-center shadow-lg border border-yellow-200">
        <TrendingUp className="w-6 h-6 text-yellow-600" />
      </div>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">Economic Impact Over Time</h3>
    </div>
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
        <XAxis dataKey="name" stroke="#6b7280" />
        <YAxis stroke="#6b7280" />
        <Tooltip 
          formatter={(value, name) => [
            name === 'value' ? `RM ${(value/1000).toFixed(0)}K` : `${value}%`,
            name === 'value' ? 'Revenue' : 'Growth'
          ]}
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: 'none',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
          }}
        />
        <Legend />
        <Bar dataKey="value" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
        <Line type="monotone" dataKey="growth" stroke="#10B981" strokeWidth={4} dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }} />
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.4}/>
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// Google Maps City Map Component
const GoogleCityMap = ({ selectedLayer, timeFilter }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState(null);
  const markersRef = useRef({
    parking: [],
    event: null,
    shuttle: null
  });
  const infoWindowRef = useRef(null);

  // Load Google Maps script
  useEffect(() => {
    const loadGoogleMaps = () => {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      
      if (!apiKey) {
        console.error('❌ VITE_GOOGLE_MAPS_API_KEY is not set in environment variables');
        setError('Google Maps API key not configured');
        return;
      }

      if (window.google && window.google.maps) {
        initializeMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      window.initMap = initializeMap;
      
      script.onerror = () => {
        console.error('Failed to load Google Maps script');
        setError('Failed to load Google Maps');
      };

      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapContainer.current || map.current) return;

      try {
        // Initialize map
        map.current = new window.google.maps.Map(mapContainer.current, {
          center: { lat: 2.9213, lng: 101.6369 }, // Cyberjaya coordinates
          zoom: 13,
          styles: [
            {
              featureType: 'all',
              elementType: 'geometry.fill',
              stylers: [{ saturation: -20 }]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#c6e2ff' }]
            }
          ],
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false
        });

        // Initialize InfoWindow
        infoWindowRef.current = new window.google.maps.InfoWindow();

        // Create parking markers
        const parkingData = [
          { lat: 2.9213, lng: 101.6369, title: 'Cyberjaya Central Mall', occupancy: '85%', available: 85 },
          { lat: 2.9233, lng: 101.6389, title: 'Shaftsbury Square', occupancy: '45%', available: 23 },
          { lat: 2.9193, lng: 101.6349, title: 'MMU Campus', occupancy: '35%', available: 156 },
          { lat: 2.9275, lng: 101.6422, title: 'DPULZE Shopping Centre', occupancy: '60%', available: 60 },
          { lat: 2.9180, lng: 101.6290, title: 'Cyberjaya Lake Gardens', occupancy: '20%', available: 200 },
          { lat: 2.9250, lng: 101.6400, title: 'Tamarind Square', occupancy: '75%', available: 40 },
          { lat: 2.9220, lng: 101.6320, title: 'Cyberview Resort & Spa', occupancy: '50%', available: 80 },
          { lat: 2.9280, lng: 101.6380, title: 'MCMC Tower', occupancy: '90%', available: 10 },
          { lat: 2.9300, lng: 101.6440, title: 'Cyberjaya Mosque', occupancy: '30%', available: 120 },
          { lat: 2.9170, lng: 101.6310, title: 'University of Cyberjaya', occupancy: '40%', available: 90 },
          { lat: 2.9245, lng: 101.6355, title: 'Cyberjaya Fire Station', occupancy: '10%', available: 300 },
          { lat: 2.9290, lng: 101.6410, title: 'Cyberjaya Police Station', occupancy: '55%', available: 60 },
          { lat: 2.9265, lng: 101.6375, title: 'Cyberjaya Hospital', occupancy: '80%', available: 30 },
          { lat: 2.9205, lng: 101.6395, title: 'Cyberjaya Bus Terminal', occupancy: '65%', available: 50 },
          { lat: 2.9270, lng: 101.6340, title: 'Cyberjaya Innovation Hub', occupancy: '25%', available: 110 }
        ];

        markersRef.current.parking = parkingData.map(data => {
          const marker = new window.google.maps.Marker({
            position: { lat: data.lat, lng: data.lng },
            map: map.current,
            title: data.title,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: data.available > 100 ? '#10B981' : data.available > 50 ? '#F59E0B' : '#EF4444',
              fillOpacity: 0.8,
              strokeColor: '#ffffff',
              strokeWeight: 3,
              scale: 15
            }
          });

          marker.addListener('click', () => {
            infoWindowRef.current.setContent(`
              <div class="p-3 bg-white rounded-lg">
                <h3 class="font-bold text-gray-900 mb-2">${data.title}</h3>
                <p class="text-sm text-gray-600 mb-1">Occupancy: <span class="font-semibold">${data.occupancy}</span></p>
                <p class="text-sm text-gray-600 mb-3">Available: <span class="font-semibold">${data.available} slots</span></p>
                <button class="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700">
                  Book Now
                </button>
              </div>
            `);
            infoWindowRef.current.open(map.current, marker);
          });

          return { marker, type: 'parking', data };
        });

        // Create event venue marker
        const eventMarker = new window.google.maps.Marker({
          position: { lat: 2.9223, lng: 101.6379 },
          map: map.current,
          title: 'Main Event Venue',
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: '#EF4444',
            fillOpacity: 0.9,
            strokeColor: '#ffffff',
            strokeWeight: 4,
            scale: 20
          }
        });

        eventMarker.addListener('click', () => {
          infoWindowRef.current.setContent(`
            <div class="p-3 bg-white rounded-lg">
              <h3 class="font-bold text-gray-900 mb-2">Main Event Venue</h3>
              <p class="text-sm text-gray-600 mb-1">Capacity: <span class="font-semibold">420/500</span></p>
              <p class="text-sm text-red-600 font-medium">High density area</p>
            </div>
          `);
          infoWindowRef.current.open(map.current, eventMarker);
        });

        markersRef.current.event = { marker: eventMarker, type: 'event' };

        // Create shuttle route polyline
        const shuttleRoute = new window.google.maps.Polyline({
          path: [
            { lat: 2.9200, lng: 101.6350 },
            { lat: 2.9220, lng: 101.6370 },
            { lat: 2.9240, lng: 101.6390 },
            { lat: 2.9260, lng: 101.6410 }
          ],
          geodesic: true,
          strokeColor: '#10B981',
          strokeOpacity: 0.8,
          strokeWeight: 6,
          map: map.current
        });

        markersRef.current.shuttle = { polyline: shuttleRoute, type: 'shuttle' };

        console.log('Google Maps loaded successfully');
        setMapLoaded(true);

      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Failed to initialize map');
      }
    };

    loadGoogleMaps();

    return () => {
      // Cleanup
      if (window.initMap) {
        delete window.initMap;
      }
    };
  }, []);

  // Handle layer visibility
  useEffect(() => {
    if (!mapLoaded || !map.current) return;

    // Toggle parking markers
    markersRef.current.parking.forEach(({ marker }) => {
      if (selectedLayer === 'all' || selectedLayer === 'parking') {
        marker.setMap(map.current);
      } else {
        marker.setMap(null);
      }
    });

    // Toggle event marker
    if (markersRef.current.event) {
      const { marker } = markersRef.current.event;
      if (selectedLayer === 'all' || selectedLayer === 'event') {
        marker.setMap(map.current);
      } else {
        marker.setMap(null);
      }
    }

    // Toggle shuttle route
    if (markersRef.current.shuttle) {
      const { polyline } = markersRef.current.shuttle;
      if (selectedLayer === 'all' || selectedLayer === 'transport') {
        polyline.setMap(map.current);
      } else {
        polyline.setMap(null);
      }
    }
  }, [selectedLayer, mapLoaded]);

  return (
    <div className="relative">
      <div 
        ref={mapContainer} 
        className="w-full h-96 rounded-lg overflow-hidden border-2 border-gray-200"
        style={{ minHeight: '400px' }}
      />
      
      {/* Loading indicator */}
      {!mapLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600 text-sm">Loading map...</p>
          </div>
        </div>
      )}

      {/* Error indicator */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 rounded-lg border-2 border-red-200">
          <div className="text-center">
            <div className="text-red-500 text-4xl mb-2">⚠️</div>
            <p className="text-red-600 text-sm font-medium">{error}</p>
            <p className="text-red-500 text-xs mt-1">Please configure VITE_GOOGLE_MAPS_API_KEY in .env file</p>
          </div>
        </div>
      )}
      
      {/* Live status overlay */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-gray-200">
        <h3 className="font-semibold text-gray-900 text-sm mb-3">Live City Status</h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>Traffic</span>
            </div>
            <span className="font-medium">Light</span>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <span>Parking</span>
            </div>
            <span className="font-medium">Moderate</span>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Transit</span>
            </div>
            <span className="font-medium">Normal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SmartCityDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [parkingLots, setParkingLots] = useState([]);
  const [shuttleRoutes, setShuttleRoutes] = useState([]);
  const [crowdData, setCrowdData] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState('all');
  const [timeFilter, setTimeFilter] = useState('current');
  const [timeRange, setTimeRange] = useState('24h');
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);

  useEffect(() => {
    loadCityData();
  }, []);

  const loadCityData = async () => {
    setLoading(true);
    try {
      const [parkingData, shuttleData, crowdDataResult] = await Promise.all([
        cityAPI.getParkingLots(),
        cityAPI.getShuttleRoutes(),
        cityAPI.getCrowdDensity()
      ]);
      
      setParkingLots(parkingData.lots || []);
      setShuttleRoutes(shuttleData.routes || []);
      setCrowdData(crowdDataResult.areas || []);
    } catch (error) {
      console.error('Error loading city data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDensityColor = (level) => {
    if (level < 30) return 'text-green-600 bg-green-100';
    if (level < 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getDensityIcon = (trend) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'decreasing': return <TrendingDown className="w-4 h-4 text-green-500" />;
      default: return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  const cityLayers = [
    { id: 'all', name: 'All Layers', color: 'primary' },
    { id: 'parking', name: 'Parking', color: 'blue' },
    { id: 'transport', name: 'Public Transport', color: 'green' },
    { id: 'sanitation', name: 'Sanitation', color: 'orange' },
    { id: 'security', name: 'Security', color: 'red' }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'parking', name: 'Parking', icon: Car },
    { id: 'shuttles', name: 'Shuttles', icon: Bus },
    { id: 'crowd', name: 'Crowd Management', icon: Users },
    { id: 'ripple', name: 'Ripple Effects', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Header with Glassmorphism */}
      <div className="bg-white/90 backdrop-blur-md px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center shadow-lg border border-blue-200">
                  <BarChart3 className="w-7 h-7 text-blue-600" />
                </div>
                <p className="text-2xl text-gray-600 font-bold">Real-time city services and infrastructure management</p>
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Smart City Hub
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg"></div>
                  <p className="text-sm font-semibold text-gray-900">Cyberjaya Smart City</p>
                </div>
                <p className="text-xs text-gray-500 font-medium">Live Data Stream</p>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={loadCityData}
                  className="p-3 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-600 rounded-xl hover:from-blue-200 hover:to-blue-300 transition-all transform hover:scale-105 shadow-lg border border-blue-200"
                >
                  <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
                <button className="p-3 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-600 rounded-xl hover:from-purple-200 hover:to-purple-300 transition-all transform hover:scale-105 shadow-lg border border-purple-200">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Enhanced Tab Navigation with Glassmorphism */}
        <div className="flex space-x-2 bg-white/60 backdrop-blur-sm p-2 rounded-2xl mb-8 shadow-lg border border-white/20">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white text-gray-900 shadow-lg border-2 border-black transform scale-105'
                    : 'text-gray-600 hover:scale-105 hover:text-gray-900 hover:bg-white/50 hover:shadow-md'
                }`}
              >
                <Icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-gray-900' : 'text-gray-500'}`} />
                <span className="text-sm">{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Economic Impact"
                value="RM 45.2K"
                change="+18%"
                icon={TrendingUp}
                color="success"
                detail="This month"
              />
              <MetricCard
                title="Traffic Efficiency"
                value="87%"
                change="+5%"
                icon={Car}
                color="primary"
                detail="Avg utilization"
              />
              <MetricCard
                title="Resource Usage"
                value="92%"
                change="+12%"
                icon={BarChart3}
                color="warning"
                detail="Infrastructure"
              />
              <MetricCard
                title="Carbon Reduction"
                value="-8%"
                change="-2%"
                icon={Zap}
                color="accent"
                detail="This quarter"
              />
            </div>

            {/* Controls */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">City Layer:</label>
                  <select 
                    value={selectedLayer}
                    onChange={(e) => setSelectedLayer(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Cyberjaya Infrastructure Map</h2>
                <GoogleCityMap selectedLayer={selectedLayer} timeFilter={timeFilter} />
              </div>

              {/* Infrastructure Status */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
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

                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Resource Allocation</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Security Personnel</span>
                        <span>8/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{width: '80%'}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Cleaning Crew</span>
                        <span>6/8</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full transition-all duration-500" style={{width: '75%'}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Traffic Control</span>
                        <span>12/12</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{width: '100%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Smart Recommendations</h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 transition-all hover:shadow-md">
                      <p className="font-bold text-blue-900">Parking Alert</p>
                      <p className="text-blue-700">Consider opening Zone C parking by 6 PM</p>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 transition-all hover:shadow-md">
                      <p className="font-bold text-green-900">Transit Optimization</p>
                      <p className="text-green-700">Add shuttle service at 8 PM for peak departure</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Charts */}
            <div className="grid lg:grid-cols-2 gap-8">
              <TimeSeriesChart data={timeSeriesData} />
              <EconomicImpactChart data={economicImpactData} />
            </div>
          </div>
        )}

        {/* Booking Success Animation */}
        {showBookingSuccess && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-white rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center animate-fade-in border-2 border-green-200">
              <div className="w-16 h-16 mb-4 animate-bounce-in">
                <svg className="w-full h-full text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#D1FAE5" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 12l2 2 4-4" stroke="#10B981" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">Booking Confirmed!</h3>
              <p className="text-gray-700 text-base">Your booking was successful.</p>
            </div>
          </div>
        )}

        <style>{`
          @keyframes fade-in { 
            from { opacity: 0; transform: scale(0.95); } 
            to { opacity: 1; transform: scale(1); } 
          }
          .animate-fade-in { 
            animation: fade-in 0.5s cubic-bezier(.4,0,.2,1) forwards; 
          }
          @keyframes bounce-in { 
            0% { transform: scale(0.5); } 
            60% { transform: scale(1.2); } 
            100% { transform: scale(1); } 
          }
          .animate-bounce-in { 
            animation: bounce-in 0.6s cubic-bezier(.4,0,.2,1) forwards; 
          }
        `}</style>

        {/* Booking Success Animation - Moved outside modal */}
        {showBookingSuccess && (
          <div className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none">
            <div className="bg-white rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center animate-fade-in">
              <svg className="w-16 h-16 text-green-500 mb-4 animate-bounce-in" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#D1FAE5" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12l2 2 4-4" />
              </svg>
              <h3 className="text-2xl font-bold text-green-600 mb-2">Booking Confirmed!</h3>
              <p className="text-gray-700 text-base">Your booking was successful.</p>
            </div>
            <style>{`
              @keyframes fade-in { from { opacity: 0; transform: scale(0.95);} to { opacity: 1; transform: scale(1);} }
              .animate-fade-in { animation: fade-in 0.5s cubic-bezier(.4,0,.2,1) forwards; }
              @keyframes bounce-in { 0% { transform: scale(0.5);} 60% { transform: scale(1.2);} 100% { transform: scale(1);} }
              .animate-bounce-in { animation: bounce-in 0.6s cubic-bezier(.4,0,.2,1) forwards; }
            `}</style>
          </div>
        )}

        {/* Parking Tab */}
        {activeTab === 'parking' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Parking Availability</h2>
              <div className="flex space-x-3">
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <MapPin className="w-4 h-4 mr-2" />
                  View on Map
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {parkingLots.map(lot => (
                <div key={lot.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-white/90 group h-full flex flex-col">
                  <div className="p-8 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-6">
                      <div className="space-y-2">
                        <h3 className="font-bold text-2xl text-black group-hover:text-blue-600 transition-colors">{lot.name}</h3>
                        <p className="text-gray-600 text-sm font-medium flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-blue-500" />
                          {lot.distance}
                        </p>
                      </div>
                      <div className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                        lot.availableSlots > 50 ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200' :
                        lot.availableSlots > 20 ? 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border border-yellow-200' :
                        'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200'
                      }`}>
                        {lot.availableSlots} available
                      </div>
                    </div>

                    <div className="space-y-4 mb-8 flex-grow">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 font-medium">Capacity</span>
                        <span className="font-bold text-lg text-black">{lot.availableSlots}/{lot.totalSlots}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                          <p className="text-sm text-blue-600 font-medium">Hourly Rate</p>
                          <p className="text-xl font-bold text-black">RM {lot.hourlyRate}</p>
                        </div>
                        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                          <p className="text-sm text-green-600 font-medium">Daily Rate</p>
                          <p className="text-xl font-bold text-black">RM {lot.dailyRate}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6 min-h-[3rem]">
                      {lot.features.map((feature, idx) => (
                        <span key={idx} className="px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-sm rounded-full border border-blue-200 font-medium shadow-sm">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <button 
                      className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-black py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:via-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl mt-auto"
                      onClick={() => {
                        setSelectedService(lot);
                        setShowBookingModal(true);
                      }}
                    >
                      Book Parking Slot
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shuttles Tab */}
        {activeTab === 'shuttles' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Shuttle Services</h2>
              <div className="flex space-x-3">
                <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Navigation className="w-4 h-4 mr-2" />
                  Live Tracking
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {shuttleRoutes.map(route => (
                <div key={route.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all hover:shadow-xl hover:scale-105">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-xl text-gray-900">{route.name}</h3>
                        <p className="text-gray-600 text-sm">{route.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">RM {route.fare}</p>
                        <p className="text-xs text-gray-500">per ride</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Frequency</span>
                        <span className="font-semibold">{route.frequency}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Operating Hours</span>
                        <span className="font-semibold">{route.operatingHours}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Capacity</span>
                        <span className="font-semibold">{route.capacity} seats</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Route Stops</h4>
                      <div className="space-y-2">
                        {route.stops.map((stop, idx) => (
                          <div key={stop.id} className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                              <span className="text-green-600 text-xs font-semibold">{idx + 1}</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{stop.name}</p>
                              <p className="text-xs text-gray-500">ETA: {stop.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button 
                      className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-black py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:via-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl mt-auto"
                      onClick={() => {
                        setSelectedService(route);
                        setShowBookingModal(true);
                      }}
                    >
                      Book Shuttle Seat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Crowd Management Tab */}
        {activeTab === 'crowd' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Crowd Management</h2>
              <div className="flex space-x-3">
                <button className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Report Incident
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {crowdData.map(area => (
                <div key={area.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all hover:shadow-xl hover:scale-105">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-xl text-gray-900">{area.name}</h3>
                        <p className="text-gray-600 text-sm">Capacity: {area.capacity}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getDensityIcon(area.trend)}
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDensityColor(area.densityLevel)}`}>
                          {area.currentDensity}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Current Count</span>
                        <span className="font-semibold">{area.currentCount}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div 
                          className={`h-4 rounded-full transition-all duration-1000 ${
                            area.densityLevel < 30 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                            area.densityLevel < 70 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 
                            'bg-gradient-to-r from-red-400 to-red-500'
                          }`}
                          style={{ width: `${area.densityLevel}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Density Level</span>
                        <span className="font-semibold">{area.densityLevel}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Trend</span>
                        <span className="font-semibold capitalize">{area.trend}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                        <Eye className="w-4 h-4 inline mr-2" />
                        View Details
                      </button>
                      <button className="flex-1 bg-orange-600 text-white py-2 rounded-lg font-bold hover:bg-orange-700 transition-colors">
                        <AlertTriangle className="w-4 h-4 inline mr-2" />
                        Alert
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ripple Effects Tab */}
        {activeTab === 'ripple' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Ripple Effect Dashboard</h1>
              <div className="flex space-x-3">
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                detail="This month"
              />
              <MetricCard
                title="Traffic Increase"
                value="15%"
                change="+3%"
                icon={Car}
                color="warning"
                detail="Peak hours"
              />
              <MetricCard
                title="Resource Utilization"
                value="87%"
                change="+12%"
                icon={BarChart3}
                color="primary"
                detail="Infrastructure"
              />
              <MetricCard
                title="Carbon Footprint"
                value="-8%"
                change="-2%"
                icon={Zap}
                color="accent"
                detail="Reduction"
              />
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-8">
              <RippleEffectChart data={rippleEffectsData} />
              <TrafficChart data={rippleEffectsData} />
            </div>

            {/* Sector Analysis */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Sector Impact Analysis</h2>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    Export Data
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Generate Report
                  </button>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rippleEffectsData.map(sector => (
                  <div key={sector.sector} className="border border-gray-200 rounded-lg p-4 transition-all hover:shadow-lg hover:scale-105">
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
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="h-3 rounded-full transition-all duration-1000" 
                            style={{ 
                              width: `${sector.impact}%`, 
                              background: `linear-gradient(to right, ${sector.color}aa, ${sector.color})`
                            }}
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
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Predictive Insights</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Expected Impacts (Next Event)</h3>
                  <div className="space-y-3">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 transition-all hover:shadow-md">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-green-900">Food Delivery Surge</span>
                        <span className="text-sm text-green-700 font-bold">+180%</span>
                      </div>
                      <p className="text-sm text-green-700 mt-1">Peak expected between 7-9 PM</p>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 transition-all hover:shadow-md">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-yellow-900">Parking Demand</span>
                        <span className="text-sm text-yellow-700 font-bold">+120%</span>
                      </div>
                      <p className="text-sm text-yellow-700 mt-1">Zone A will reach capacity by 6:30 PM</p>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 transition-all hover:shadow-md">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-blue-900">Public Transport</span>
                        <span className="text-sm text-blue-700 font-bold">+85%</span>
                      </div>
                      <p className="text-sm text-blue-700 mt-1">Additional buses recommended for Route 401</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Optimization Recommendations</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg transition-all hover:shadow-md">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <p>Deploy 3 additional food trucks near main entrance by 5 PM</p>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg transition-all hover:shadow-md">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <p>Open overflow parking at Mall B parking deck</p>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg transition-all hover:shadow-md">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <p>Coordinate with Grab/MyCar for surge pricing management</p>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg transition-all hover:shadow-md">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p>Alert waste management for 2x collection schedule</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Booking Modal */}
        {showBookingModal && selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    Book {activeTab === 'parking' ? 'Parking Slot' : 'Shuttle Seat'}
                  </h3>
                  <button 
                    onClick={() => setShowBookingModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {activeTab === 'parking' ? 'Parking Lot' : 'Route'}
                    </label>
                    <p className="text-gray-900 font-semibold bg-gray-50 p-3 rounded-lg">{selectedService.name}</p>
                  </div>

                  {activeTab === 'parking' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option value="1">1 Hour</option>
                          <option value="2">2 Hours</option>
                          <option value="4">4 Hours</option>
                          <option value="8">8 Hours</option>
                          <option value="24">Full Day</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Number</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                          placeholder="ABC 1234"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'shuttles' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Departure Time</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                          <option value="08:00">08:00 AM</option>
                          <option value="08:15">08:15 AM</option>
                          <option value="08:30">08:30 AM</option>
                          <option value="08:45">08:45 AM</option>
                          <option value="09:00">09:00 AM</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Number of Passengers</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                          <option value="1">1 Passenger</option>
                          <option value="2">2 Passengers</option>
                          <option value="3">3 Passengers</option>
                          <option value="4">4 Passengers</option>
                        </select>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                    <input 
                      type="tel" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+60 12-345 6789"
                    />
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button 
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    className={`flex-1 px-4 py-2 text-black rounded-lg font-semibold transition-all transform hover:scale-105 ${
                      activeTab === 'parking' 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' 
                        : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
                    }`}
                    onClick={() => {
                      setShowBookingModal(false);
                      setShowBookingSuccess(true);
                      setTimeout(() => setShowBookingSuccess(false), 3000);
                    }}
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartCityDashboard;