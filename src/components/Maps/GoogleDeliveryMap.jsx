import React, { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPin, Navigation, Truck, Clock, AlertTriangle } from 'lucide-react';

const GoogleDeliveryMap = ({ deliveryRoutes, selectedRoute, onRouteSelect, recommendations, showHotSpots = true }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Cyberjaya coordinates (your business location)
  const cyberjayaCenter = { lat: 2.9213, lng: 101.6369 };

  // AI recommended hot spots
  const hotSpots = [
    { name: "Lunch Rush Zone", position: { lat: 2.9223, lng: 101.6379 }, type: "high_demand", boost: "+200%" },
    { name: "Office Complex", position: { lat: 2.9203, lng: 101.6359 }, type: "office", boost: "+150%" },
    { name: "Event Venue", position: { lat: 2.9243, lng: 101.6399 }, type: "event", boost: "+300%" }
  ];

  useEffect(() => {
    const initializeMap = async () => {
      try {
        const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        
        if (!googleMapsApiKey) {
          setError('Google Maps API key not configured. Please add VITE_GOOGLE_MAPS_API_KEY to your .env file');
          return;
        }

        console.log('🗺️ Initializing Google Maps...');
        
        const loader = new Loader({
          apiKey: googleMapsApiKey,
          version: 'weekly',
          libraries: ['places', 'geometry', 'marker']
        });

        console.log('📚 Loading Google Maps libraries: places, geometry');
        const google = await loader.load();
        console.log('✅ Google Maps loaded successfully');
        
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: cyberjayaCenter,
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapId: 'DELIVERY_MAP', // Required for Advanced Markers
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'transit',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        console.log('🗺️ Map instance created successfully');

        // Initialize directions renderer
        const renderer = new google.maps.DirectionsRenderer({
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: '#3B82F6',
            strokeWeight: 4,
            strokeOpacity: 0.8
          }
        });
        renderer.setMap(mapInstance);
        setDirectionsRenderer(renderer);
        
        console.log('🧭 DirectionsRenderer initialized');

        setMap(mapInstance);
        setMapLoaded(true);
        console.log('🎉 Google Maps initialization complete!');

      } catch (err) {
        console.error('❌ Error loading Google Maps:', err);
        setError(`Failed to load Google Maps: ${err.message}`);
      }
    };

    initializeMap();
  }, []);

  useEffect(() => {
    if (!map || !mapLoaded) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    const newMarkers = [];

    // Add delivery location markers from actual routes data
    deliveryRoutes.forEach((route, index) => {
      const isSelected = selectedRoute === index;
      
      // Create a custom pin element for the marker
      const pinElement = new google.maps.marker.PinElement({
        background: route.priority === 'high' ? '#EF4444' : 
                   route.priority === 'medium' ? '#F59E0B' : '#10B981',
        borderColor: '#FFFFFF',
        glyphColor: '#FFFFFF',
        scale: isSelected ? 1.5 : 1.0,
        glyph: route.orders.toString()
      });

      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: route.coordinates,
        map: map,
        title: route.destination,
        content: pinElement.element,
      });

      // Add bounce animation for selected marker
      if (isSelected) {
        pinElement.element.style.animation = 'bounce 1s infinite';
        pinElement.element.style.transformOrigin = 'center bottom';
      }

      // Enhanced info window with more details
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="p-4 min-w-64">
            <h3 class="font-bold text-gray-900 text-lg">${route.destination}</h3>
            <p class="text-sm text-gray-600 mb-2">${route.address}</p>
            <div class="grid grid-cols-2 gap-2 text-sm mb-3">
              <div>
                <span class="text-gray-500">Customer:</span>
                <p class="font-medium">${route.customerName}</p>
              </div>
              <div>
                <span class="text-gray-500">Orders:</span>
                <p class="font-medium">${route.orders} items</p>
              </div>
              <div>
                <span class="text-gray-500">Value:</span>
                <p class="font-medium text-green-600">${route.orderValue}</p>
              </div>
              <div>
                <span class="text-gray-500">ETA:</span>
                <p class="font-medium">${route.estimatedTime}</p>
              </div>
            </div>
            <div class="mb-3">
              <span class="text-gray-500 text-sm">Priority:</span>
              <span class="ml-2 px-2 py-1 text-xs rounded-full ${
                route.priority === 'high' ? 'bg-red-100 text-red-800' :
                route.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }">${route.priority.charAt(0).toUpperCase() + route.priority.slice(1)}</span>
            </div>
            <div class="text-xs text-gray-500 mb-3">
              <strong>Instructions:</strong> ${route.specialInstructions}
            </div>
            <button 
              onclick="window.selectRoute(${index})"
              class="w-full bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700"
            >
              Select Route
            </button>
          </div>
        `
      });

      marker.addListener('click', () => {
        onRouteSelect(index);
        infoWindow.open(map, marker);
      });

      newMarkers.push(marker);
    });

    // Add AI hot spot markers (only if showHotSpots is true)
    if (showHotSpots) {
      hotSpots.forEach(hotSpot => {
        // Create custom pin for hot spots
        const hotSpotPinElement = new google.maps.marker.PinElement({
          background: '#8B5CF6',
          borderColor: '#FFFFFF',
          glyphColor: '#FFFFFF',
          scale: 1.2,
          glyph: '🎯'
        });

        const hotSpotMarker = new google.maps.marker.AdvancedMarkerElement({
          position: hotSpot.position,
          map: map,
          title: hotSpot.name,
          content: hotSpotPinElement.element,
        });

        // Add pulsing animation to hot spots
        hotSpotPinElement.element.style.animation = 'pulse 2s infinite';
        hotSpotPinElement.element.style.transformOrigin = 'center';

        const hotSpotInfoWindow = new google.maps.InfoWindow({
          content: `
            <div class="p-3">
              <h3 class="font-bold text-purple-600">🎯 ${hotSpot.name}</h3>
              <p class="text-sm text-gray-600">AI Recommended Hot Spot</p>
              <p class="text-sm text-purple-600 font-medium">Demand Boost: ${hotSpot.boost}</p>
              <p class="text-xs text-gray-500 mt-2">AgentAI Analysis</p>
            </div>
          `
        });

        hotSpotMarker.addListener('click', () => {
          hotSpotInfoWindow.open(map, hotSpotMarker);
        });

        newMarkers.push(hotSpotMarker);
      });
    }

    setMarkers(newMarkers);

    // Show route for selected delivery with error handling
    if (selectedRoute >= 0 && selectedRoute < deliveryRoutes.length && directionsRenderer) {
      const directionsService = new google.maps.DirectionsService();
      
      directionsService.route({
        origin: cyberjayaCenter, // Your current location
        destination: deliveryRoutes[selectedRoute].coordinates,
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true,
        avoidHighways: false,
        avoidTolls: false
      }, (result, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(result);
          console.log('✅ Route calculated successfully');
        } else {
          console.warn('⚠️ Directions API error:', status);
          // Clear any existing directions on error
          directionsRenderer.setDirections({ routes: [] });
          
          // Show a simple line instead of detailed directions
          if (status === 'REQUEST_DENIED' || status === 'OVER_QUERY_LIMIT') {
            console.log('ℹ️ Showing simple line instead of detailed route');
            // You could add a simple polyline here as fallback
          }
        }
      });
    } else if (directionsRenderer) {
      directionsRenderer.setDirections({ routes: [] });
    }

    // Make selectRoute function available globally for the info window
    window.selectRoute = (index) => {
      onRouteSelect(index);
    };

  }, [map, mapLoaded, selectedRoute, onRouteSelect, deliveryRoutes, showHotSpots]);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-500 text-4xl mb-4">⚠️</div>
        <h3 className="text-red-800 font-bold mb-2">Google Maps Error</h3>
        <p className="text-red-600 text-sm mb-4">{error}</p>
        <div className="bg-white p-4 rounded border text-left text-xs text-gray-600">
          <p className="font-medium mb-2">To fix this:</p>
          <div className="space-y-1">
            <p>1. Get a Google Maps API key from <a href="https://console.cloud.google.com" target="_blank" className="text-blue-600 underline">Google Cloud Console</a></p>
            <p>2. Enable these APIs: Maps JavaScript API, Directions API</p>
            <p>3. Add it to your .env file as: <code className="bg-gray-100 px-1 rounded">VITE_GOOGLE_MAPS_API_KEY=your_key_here</code></p>
            <p>4. Restart your development server</p>
            <p className="text-orange-600 mt-2">⚠️ Don't use 'directions' as a library - it's not needed!</p>
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-500">
          <p>See GOOGLE_MAPS_SETUP.md for detailed setup instructions</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Add CSS animations for markers */}
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
          40%, 43% { transform: translate3d(0,-30px,0); }
          70% { transform: translate3d(0,-15px,0); }
          90% { transform: translate3d(0,-4px,0); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      
      {/* Map Container */}
      <div className="relative">
        <div 
          ref={mapRef} 
          className="w-full h-96 rounded-lg border border-gray-200"
          style={{ minHeight: '400px' }}
        />
        
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-gray-600 text-sm">Loading Google Maps...</p>
            </div>
          </div>
        )}
      </div>

      {/* Map Information Widgets - Now positioned below the map */}
      {mapLoaded && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Legend */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 text-sm mb-3 flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              Delivery Priority
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>High Priority</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Medium Priority</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Low Priority</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>AI Hot Spots</span>
              </div>
            </div>
          </div>

          {/* Live Status */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 text-sm mb-3 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
              Live Status
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Active Deliveries</span>
                </div>
                <span className="font-medium">7</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Pending Orders</span>
                </div>
                <span className="font-medium">12</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <span>In Transit</span>
                </div>
                <span className="font-medium">5</span>
              </div>
            </div>
          </div>

          {/* Selected Route Info */}
          {selectedRoute >= 0 && selectedRoute < deliveryRoutes.length ? (
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-gray-900 text-sm mb-3 flex items-center">
                <Navigation className="w-4 h-4 text-blue-600 mr-2" />
                Selected Route
              </h4>
              <div className="space-y-2">
                <h5 className="font-medium text-gray-900 text-sm truncate">
                  {deliveryRoutes[selectedRoute].destination}
                </h5>
                <p className="text-xs text-gray-600 truncate">
                  {deliveryRoutes[selectedRoute].customerName}
                </p>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-gray-500">
                    {deliveryRoutes[selectedRoute].orders} orders
                  </span>
                  <span className={`px-2 py-1 rounded-full ${
                    deliveryRoutes[selectedRoute].priority === 'high' ? 'bg-red-100 text-red-800' :
                    deliveryRoutes[selectedRoute].priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {deliveryRoutes[selectedRoute].priority}
                  </span>
                </div>
                <p className="text-xs text-green-600 font-medium">
                  {deliveryRoutes[selectedRoute].orderValue}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 text-sm mb-3 flex items-center">
                <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                Route Selection
              </h4>
              <p className="text-xs text-gray-500">
                Click on a delivery marker to view route details and navigation information.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GoogleDeliveryMap;