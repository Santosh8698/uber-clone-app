'use client'

import { useState, useEffect } from 'react'
import Map from './components/Map'
import RideBooking from './components/RideBooking'
import Header from './components/Header'

export default function Home() {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  const [destination, setDestination] = useState<{lat: number, lng: number} | null>(null)

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error('Error getting location:', error)
          // Default to New York City
          setUserLocation({ lat: 40.7128, lng: -74.0060 })
        }
      )
    }
  }, [])

  return (
    <div className="h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex">
        {/* Map Section */}
        <div className="flex-1 relative">
          <Map 
            userLocation={userLocation}
            destination={destination}
          />
        </div>
        
        {/* Booking Panel */}
        <div className="w-96 bg-white shadow-lg">
          <RideBooking 
            userLocation={userLocation}
            onDestinationSelect={setDestination}
          />
        </div>
      </div>
    </div>
  )
}