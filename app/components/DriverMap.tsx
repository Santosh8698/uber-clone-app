'use client'

import { useEffect, useRef } from 'react'

interface DriverMapProps {
  currentLocation: {lat: number, lng: number} | null
  isOnline: boolean
  activeRide: any
}

export default function DriverMap({ currentLocation, isOnline, activeRide }: DriverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && currentLocation) {
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
          mapInstanceRef.current = L.map(mapRef.current).setView([currentLocation.lat, currentLocation.lng], 15)
          
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(mapInstanceRef.current)
          
          // Add driver location marker with car icon
          const carIcon = L.divIcon({
            html: '🚗',
            iconSize: [30, 30],
            className: 'car-marker'
          })
          
          L.marker([currentLocation.lat, currentLocation.lng], { icon: carIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup('Your Location')
        }
      }
      
      initMap()
    }
  }, [currentLocation])

  return (
    <div className="relative h-full">
      <div ref={mapRef} className="h-full w-full" />
      
      {/* Driver Status Overlay */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center space-x-3">
          <div className={`w-4 h-4 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          <div>
            <div className="font-semibold">{isOnline ? 'Online' : 'Offline'}</div>
            <div className="text-sm text-gray-600">
              {isOnline ? 'Looking for rides...' : 'Go online to receive rides'}
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Controls */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2">
        <button className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded">
          📍 Recenter
        </button>
        <button className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded">
          🧭 Navigation
        </button>
        <button className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded">
          🚦 Traffic
        </button>
      </div>
      
      {/* Active Ride Info */}
      {activeRide && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">Ride in Progress</div>
              <div className="text-sm text-gray-600">To: {activeRide.destination}</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">${activeRide.fare}</div>
              <div className="text-sm text-gray-600">{activeRide.distance} km</div>
            </div>
          </div>
          
          <div className="mt-3 flex space-x-2">
            <button className="flex-1 bg-green-500 text-white py-2 rounded-lg">
              📞 Call Rider
            </button>
            <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg">
              💬 Message
            </button>
            <button className="flex-1 bg-red-500 text-white py-2 rounded-lg">
              ✅ Complete
            </button>
          </div>
        </div>
      )}
      
      {/* Loading overlay */}
      {!currentLocation && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p>Loading driver map...</p>
          </div>
        </div>
      )}
    </div>
  )
}