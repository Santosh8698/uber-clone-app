'use client'

import { useEffect, useRef } from 'react'

interface MapProps {
  userLocation: {lat: number, lng: number} | null
  destination: {lat: number, lng: number} | null
}

export default function Map({ userLocation, destination }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && userLocation) {
      // Initialize map with Leaflet
      const initMap = async () => {
        const L = (await import('leaflet')).default
        
        // Fix for default markers
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        })

        if (mapRef.current && !mapInstanceRef.current) {
          mapInstanceRef.current = L.map(mapRef.current).setView([userLocation.lat, userLocation.lng], 13)
          
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(mapInstanceRef.current)
          
          // Add user location marker
          L.marker([userLocation.lat, userLocation.lng])
            .addTo(mapInstanceRef.current)
            .bindPopup('Your Location')
        }
      }
      
      initMap()
    }
  }, [userLocation])

  useEffect(() => {
    if (mapInstanceRef.current && destination) {
      const L = require('leaflet')
      
      // Add destination marker
      L.marker([destination.lat, destination.lng])
        .addTo(mapInstanceRef.current)
        .bindPopup('Destination')
        
      // Fit map to show both points
      if (userLocation) {
        const group = L.featureGroup([
          L.marker([userLocation.lat, userLocation.lng]),
          L.marker([destination.lat, destination.lng])
        ])
        mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1))
      }
    }
  }, [destination, userLocation])

  return (
    <div className="relative h-full">
      <div ref={mapRef} className="h-full w-full" />
      
      {/* Map controls */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2">
        <button className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded">
          📍 Current Location
        </button>
        <button className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded">
          🚗 Find Drivers
        </button>
      </div>
      
      {/* Loading overlay */}
      {!userLocation && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p>Loading map...</p>
          </div>
        </div>
      )}
    </div>
  )
}