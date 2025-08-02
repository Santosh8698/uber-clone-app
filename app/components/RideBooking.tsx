'use client'

import { useState } from 'react'

interface RideBookingProps {
  userLocation: {lat: number, lng: number} | null
  onDestinationSelect: (destination: {lat: number, lng: number}) => void
}

const rideTypes = [
  {
    id: 'uberx',
    name: 'UberX',
    description: 'Affordable, everyday rides',
    price: '$12.50',
    time: '3 min',
    icon: '🚗'
  },
  {
    id: 'comfort',
    name: 'Comfort',
    description: 'Newer cars with extra legroom',
    price: '$18.20',
    time: '5 min',
    icon: '🚙'
  },
  {
    id: 'xl',
    name: 'UberXL',
    description: 'Larger rides for up to 6',
    price: '$22.80',
    time: '4 min',
    icon: '🚐'
  }
]

export default function RideBooking({ userLocation, onDestinationSelect }: RideBookingProps) {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [selectedRide, setSelectedRide] = useState('')
  const [step, setStep] = useState<'booking' | 'selecting' | 'confirming'>('booking')

  const handleDestinationSubmit = () => {
    if (destination) {
      // For demo, use a fixed destination
      onDestinationSelect({ lat: 40.7589, lng: -73.9851 }) // Times Square
      setStep('selecting')
    }
  }

  const handleRideSelect = (rideId: string) => {
    setSelectedRide(rideId)
    setStep('confirming')
  }

  const handleBookRide = () => {
    alert('Ride booked! Driver will arrive in 3 minutes.')
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Book a ride</h2>
      </div>

      {step === 'booking' && (
        <div className="flex-1 p-4">
          {/* Location inputs */}
          <div className="space-y-4 mb-6">
            <div className="relative">
              <div className="absolute left-3 top-3 w-3 h-3 bg-green-500 rounded-full"></div>
              <input
                type="text"
                placeholder="Pickup location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            
            <div className="relative">
              <div className="absolute left-3 top-3 w-3 h-3 bg-red-500 rounded-full"></div>
              <input
                type="text"
                placeholder="Where to?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* Quick actions */}
          <div className="space-y-2 mb-6">
            <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg">
              🏠 Home
            </button>
            <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg">
              💼 Work
            </button>
            <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg">
              📍 Set location on map
            </button>
          </div>

          <button
            onClick={handleDestinationSubmit}
            disabled={!destination}
            className="w-full bg-black text-white py-3 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Confirm pickup
          </button>
        </div>
      )}

      {step === 'selecting' && (
        <div className="flex-1 p-4">
          <div className="mb-4">
            <button 
              onClick={() => setStep('booking')}
              className="text-blue-600 hover:underline"
            >
              ← Back
            </button>
          </div>
          
          <h3 className="text-lg font-semibold mb-4">Choose a ride</h3>
          
          <div className="space-y-3">
            {rideTypes.map((ride) => (
              <button
                key={ride.id}
                onClick={() => handleRideSelect(ride.id)}
                className="w-full p-4 border rounded-lg hover:bg-gray-50 text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{ride.icon}</span>
                    <div>
                      <div className="font-semibold">{ride.name}</div>
                      <div className="text-sm text-gray-600">{ride.description}</div>
                      <div className="text-sm text-gray-600">{ride.time} away</div>
                    </div>
                  </div>
                  <div className="text-lg font-semibold">{ride.price}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'confirming' && (
        <div className="flex-1 p-4">
          <div className="mb-4">
            <button 
              onClick={() => setStep('selecting')}
              className="text-blue-600 hover:underline"
            >
              ← Back
            </button>
          </div>
          
          <h3 className="text-lg font-semibold mb-4">Confirm your ride</h3>
          
          {selectedRide && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              {(() => {
                const ride = rideTypes.find(r => r.id === selectedRide)
                return ride ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{ride.icon}</span>
                      <div>
                        <div className="font-semibold">{ride.name}</div>
                        <div className="text-sm text-gray-600">{ride.time} away</div>
                      </div>
                    </div>
                    <div className="text-lg font-semibold">{ride.price}</div>
                  </div>
                ) : null
              })()}
            </div>
          )}
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span>Payment method</span>
              <span className="text-blue-600">💳 •••• 1234</span>
            </div>
            <div className="flex justify-between">
              <span>Promo code</span>
              <span className="text-blue-600">Add promo</span>
            </div>
          </div>
          
          <button
            onClick={handleBookRide}
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            Confirm UberX
          </button>
        </div>
      )}
    </div>
  )
}