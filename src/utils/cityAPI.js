// Smart City API Integration Service
// This service handles all interactions with city APIs for parking, transport, and crowd management

class CityAPIService {
  constructor() {
    // Use import.meta.env for Vite instead of process.env
    this.baseURL = import.meta.env.VITE_CITY_API_URL || 'https://api.smartcity.cyberjaya.gov.my';
    this.apiKey = import.meta.env.VITE_CITY_API_KEY || 'demo-key';
  }

  // Generic API call method
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('City API Error:', error);
      // Return mock data for development
      return this.getMockData(endpoint);
    }
  }

  // Parking Services
  async getParkingLots() {
    return this.makeRequest('/parking/lots');
  }

  async getParkingAvailability(lotId = null) {
    const endpoint = lotId ? `/parking/lots/${lotId}/availability` : '/parking/availability';
    return this.makeRequest(endpoint);
  }

  async bookParkingSlot(lotId, slotId, duration, userInfo) {
    return this.makeRequest('/parking/book', {
      method: 'POST',
      body: JSON.stringify({
        lotId,
        slotId,
        duration,
        userInfo,
        timestamp: new Date().toISOString()
      })
    });
  }

  async getParkingRates(lotId) {
    return this.makeRequest(`/parking/lots/${lotId}/rates`);
  }

  // Shuttle Services
  async getShuttleRoutes() {
    return this.makeRequest('/transport/shuttle/routes');
  }

  async getShuttleSchedule(routeId = null) {
    const endpoint = routeId ? `/transport/shuttle/routes/${routeId}/schedule` : '/transport/shuttle/schedule';
    return this.makeRequest(endpoint);
  }

  async getShuttleAvailability(routeId) {
    return this.makeRequest(`/transport/shuttle/routes/${routeId}/availability`);
  }

  async bookShuttleSeat(routeId, tripId, seatNumber, userInfo) {
    return this.makeRequest('/transport/shuttle/book', {
      method: 'POST',
      body: JSON.stringify({
        routeId,
        tripId,
        seatNumber,
        userInfo,
        timestamp: new Date().toISOString()
      })
    });
  }

  async getShuttleTracking(routeId) {
    return this.makeRequest(`/transport/shuttle/routes/${routeId}/tracking`);
  }

  // Crowd Management
  async getCrowdDensity(areaId = null) {
    const endpoint = areaId ? `/crowd/areas/${areaId}/density` : '/crowd/density';
    return this.makeRequest(endpoint);
  }

  async getCrowdPredictions(areaId, timeRange) {
    return this.makeRequest(`/crowd/areas/${areaId}/predictions`, {
      method: 'POST',
      body: JSON.stringify({ timeRange })
    });
  }

  async getCrowdAlerts() {
    return this.makeRequest('/crowd/alerts');
  }

  async reportCrowdIncident(areaId, incidentType, description, userInfo) {
    return this.makeRequest('/crowd/incidents', {
      method: 'POST',
      body: JSON.stringify({
        areaId,
        incidentType,
        description,
        userInfo,
        timestamp: new Date().toISOString()
      })
    });
  }

  // Event Integration
  async getEventImpact(eventId) {
    return this.makeRequest(`/events/${eventId}/impact`);
  }

  async getEventRecommendations(eventId) {
    return this.makeRequest(`/events/${eventId}/recommendations`);
  }

  // Mock data for development
  getMockData(endpoint) {
    const mockData = {
      '/parking/lots': {
        lots: [
          {
            id: 'P001',
            name: 'Convention Center Parking',
            location: { lat: 2.9186, lng: 101.6561 },
            totalSlots: 500,
            availableSlots: 125,
            hourlyRate: 2.50,
            dailyRate: 15.00,
            features: ['EV Charging', 'Disabled Access', 'Security'],
            distance: '0.2 km'
          },
          {
            id: 'P002',
            name: 'Shaftsbury Square Parking',
            location: { lat: 2.9200, lng: 101.6580 },
            totalSlots: 300,
            availableSlots: 45,
            hourlyRate: 2.00,
            dailyRate: 12.00,
            features: ['Covered', 'Security'],
            distance: '0.8 km'
          },
          {
            id: 'P003',
            name: 'MSC Malaysia Parking',
            location: { lat: 2.9150, lng: 101.6520 },
            totalSlots: 200,
            availableSlots: 180,
            hourlyRate: 1.50,
            dailyRate: 10.00,
            features: ['Open Air', 'Security'],
            distance: '1.2 km'
          }
        ]
      },
      '/transport/shuttle/routes': {
        routes: [
          {
            id: 'R001',
            name: 'Convention Center Loop',
            description: 'Circular route around convention center and nearby areas',
            stops: [
              { id: 'S001', name: 'Convention Center', time: '00:00' },
              { id: 'S002', name: 'Shaftsbury Square', time: '00:05' },
              { id: 'S003', name: 'MSC Malaysia', time: '00:10' },
              { id: 'S004', name: 'Cyberjaya Mall', time: '00:15' }
            ],
            frequency: 'Every 15 minutes',
            operatingHours: '06:00 - 22:00',
            capacity: 40,
            fare: 1.00
          },
          {
            id: 'R002',
            name: 'Tech District Express',
            description: 'Express service to tech companies and offices',
            stops: [
              { id: 'S005', name: 'Convention Center', time: '00:00' },
              { id: 'S006', name: 'Microsoft Office', time: '00:08' },
              { id: 'S007', name: 'IBM Office', time: '00:12' },
              { id: 'S008', name: 'Dell Office', time: '00:16' }
            ],
            frequency: 'Every 20 minutes',
            operatingHours: '07:00 - 19:00',
            capacity: 30,
            fare: 1.50
          }
        ]
      },
      '/crowd/density': {
        areas: [
          {
            id: 'A001',
            name: 'Convention Center Area',
            currentDensity: 'Medium',
            densityLevel: 65,
            capacity: 1000,
            currentCount: 650,
            trend: 'increasing',
            lastUpdated: new Date().toISOString()
          },
          {
            id: 'A002',
            name: 'Shaftsbury Square',
            currentDensity: 'High',
            densityLevel: 85,
            capacity: 500,
            currentCount: 425,
            trend: 'stable',
            lastUpdated: new Date().toISOString()
          },
          {
            id: 'A003',
            name: 'MSC Malaysia',
            currentDensity: 'Low',
            densityLevel: 25,
            capacity: 800,
            currentCount: 200,
            trend: 'decreasing',
            lastUpdated: new Date().toISOString()
          }
        ]
      }
    };

    return mockData[endpoint] || { error: 'No mock data available' };
  }
}

// Create singleton instance
const cityAPI = new CityAPIService();

export default cityAPI;
