'use client'

import { useState, useEffect } from 'react'
import DriverMap from '../components/DriverMap'
import RideRequests from '../components/RideRequests'
import DriverHeader from '../components/DriverHeader'

export default function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null)
  const [activeRide, setActiveRide] = useState(null)

  useEffect(() => {
    // Get driver's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error('Error getting location:', error)
          setCurrentLocation({ lat: 40.7128, lng: -74.0060 })
        }
      )
    }
  }, [])

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline)
    // Update driver status in database
    if (currentLocation) {
      updateDriverLocation(currentLocation, !isOnline)
    }
  }

  const updateDriverLocation = async (location: {lat: number, lng: number}, online: boolean) => {
    try {
      await fetch('/api/drivers/nearby', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          driver_id: 'demo-driver-id',
          lat: location.lat,
          lng: location.lng,
          is_active: online
        })
      })
    } catch (error) {
      console.error('Error updating location:', error)
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <DriverHeader 
        isOnline={isOnline}
        onToggleOnline={toggleOnlineStatus}
      />
      
      <div className="flex-1 flex">
        {/* Map Section */}
        <div className="flex-1 relative">
          <DriverMap 
            currentLocation={currentLocation}
            isOnline={isOnline}
            activeRide={activeRide}
          />
        </div>
        
        {/* Ride Requests Panel */}
        <div className="w-96 bg-white shadow-lg">
          <RideRequests 
            isOnline={isOnline}
            onAcceptRide={setActiveRide}
          />
        </div>
      </div>
    </div>
  )
}