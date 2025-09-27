import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// You'll need to add: npm install mapbox-gl
// And get a free API key from mapbox.com

const MapboxCityMap = ({ selectedLayer, timeFilter }) => {
  const mapContainer = useRef(null)
  const map = useRef(null)

  useEffect(() => {
    if (map.current) return // Initialize map only once
    
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11', // Clean, professional style
      center: [101.6369, 2.9213], // Cyberjaya, Malaysia coordinates
      zoom: 13
    })

    // Add custom layers after map loads
    map.current.on('load', () => {
      // Add parking zones
      map.current.addSource('parking-zones', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [101.6369, 2.9213] // Cyberjaya center
              },
              properties: {
                title: 'Parking Zone A - Shaftsbury Square',
                occupancy: '85%',
                capacity: 150,
                available: 23
              }
            },
            {
              type: 'Feature', 
              geometry: {
                type: 'Point',
                coordinates: [101.6389, 2.9233] // Near Cyberjaya City Centre
              },
              properties: {
                title: 'Parking Zone B - Tamarind Square',
                occupancy: '45%',
                capacity: 200,
                available: 110
              }
            }
          ]
        }
      })

      // Add parking zone markers
      map.current.addLayer({
        id: 'parking-zones',
        type: 'circle',
        source: 'parking-zones',
        paint: {
          'circle-radius': 12,
          'circle-color': [
            'case',
            ['>', ['get', 'available'], 50], '#10B981', // Green if >50 available
            ['>', ['get', 'available'], 20], '#F59E0B', // Yellow if 20-50
            '#EF4444' // Red if <20
          ],
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
          'circle-opacity': 0.8
        }
      })

      // Add event venue marker
      map.current.addSource('event-venue', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [101.6379, 2.9223] // Cyberjaya Convention Centre area
            },
            properties: {
              title: 'Main Event Venue',
              capacity: '420/500',
              status: 'Active'
            }
          }]
        }
      })

      map.current.addLayer({
        id: 'event-venue',
        type: 'circle',
        source: 'event-venue',
        paint: {
          'circle-radius': 15,
          'circle-color': '#EF4444',
          'circle-stroke-width': 3,
          'circle-stroke-color': '#ffffff',
          'circle-opacity': 0.9
        }
      })

      // Add transport routes
      map.current.addSource('bus-routes', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [
                [101.6850, 2.9200],
                [101.6870, 2.9220],
                [101.6890, 2.9240],
                [101.6910, 2.9260]
              ]
            },
            properties: {
              route: 'Bus Route 401'
            }
          }]
        }
      })

      map.current.addLayer({
        id: 'bus-routes',
        type: 'line',
        source: 'bus-routes',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3B82F6',
          'line-width': 4,
          'line-dasharray': [2, 2],
          'line-opacity': 0.8
        }
      })

      // Add click events for popups
      map.current.on('click', 'parking-zones', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice()
        const props = e.features[0].properties

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(`
            <div class="p-3">
              <h3 class="font-bold">${props.title}</h3>
              <p>Occupancy: <span class="font-semibold">${props.occupancy}</span></p>
              <p>Available: <span class="font-semibold">${props.available}/${props.capacity}</span></p>
            </div>
          `)
          .addTo(map.current)
      })

      map.current.on('click', 'event-venue', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice()
        const props = e.features[0].properties

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(`
            <div class="p-3">
              <h3 class="font-bold">${props.title}</h3>
              <p>Capacity: <span class="font-semibold">${props.capacity}</span></p>
              <p>Status: <span class="font-semibold text-green-600">${props.status}</span></p>
            </div>
          `)
          .addTo(map.current)
      })

      // Change cursor on hover
      map.current.on('mouseenter', 'parking-zones', () => {
        map.current.getCanvas().style.cursor = 'pointer'
      })
      map.current.on('mouseleave', 'parking-zones', () => {
        map.current.getCanvas().style.cursor = ''
      })
    })

    // Cleanup
    return () => map.current?.remove()
  }, [])

  // Update layers based on selectedLayer prop
  useEffect(() => {
    if (!map.current) return

    const layers = ['parking-zones', 'bus-routes', 'event-venue']
    
    layers.forEach(layer => {
      if (selectedLayer === 'all' || layer.includes(selectedLayer)) {
        map.current.setLayoutProperty(layer, 'visibility', 'visible')
      } else {
        map.current.setLayoutProperty(layer, 'visibility', 'none')
      }
    })
  }, [selectedLayer])

  return (
    <div className="relative">
      <div 
        ref={mapContainer} 
        className="w-full h-96 rounded-lg overflow-hidden"
        style={{ minHeight: '400px' }}
      />
      
      {/* Live status overlay */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg">
        <h3 className="font-semibold text-gray-900 text-sm mb-2">Live Status</h3>
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
  )
}

export default MapboxCityMap