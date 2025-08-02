'use client'

import { useState, useEffect } from 'react'

interface RideRequestsProps {
  isOnline: boolean
  onAcceptRide: (ride: any) => void
}

const mockRideRequests = [
  {
    id: '1',
    rider_name: 'Sarah Johnson',
    pickup_address: '123 Main St, Downtown',
    destination_address: 'Airport Terminal 1',
    distance: '12.5 km',
    estimated_fare: 28.50,
    ride_type: 'UberX',
    pickup_time: '2 min',
    rider_rating: 4.8
  },
  {
    id: '2',
    rider_name: 'Mike Chen',
    pickup_address: '456 Oak Ave, Midtown',
    destination_address: 'Central Mall',
    distance: '5.2 km',
    estimated_fare: 15.75,
    ride_type: 'Comfort',
    pickup_time: '5 min',
    rider_rating: 4.9
  }
]

export default function RideRequests({ isOnline, onAcceptRide }: RideRequestsProps) {
  const [requests, setRequests] = useState(mockRideRequests)
  const [acceptingRide, setAcceptingRide] = useState<string | null>(null)

  const handleAcceptRide = async (ride: any) => {
    setAcceptingRide(ride.id)
    
    // Simulate API call
    setTimeout(() => {
      onAcceptRide(ride)
      setRequests(requests.filter(r => r.id !== ride.id))
      setAcceptingRide(null)
    }, 1500)
  }

  const handleDeclineRide = (rideId: string) => {
    setRequests(requests.filter(r => r.id !== rideId))
  }

  if (!isOnline) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Ride Requests</h2>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-6xl mb-4">😴</div>
            <h3 className="text-lg font-semibold mb-2">You're Offline</h3>
            <p>Go online to start receiving ride requests</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Ride Requests</h2>
        <p className="text-sm text-gray-600">{requests.length} available rides</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {requests.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold mb-2">Looking for rides...</h3>
              <p>New requests will appear here</p>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold">{request.rider_name}</div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span>⭐ {request.rider_rating}</span>
                      <span className="mx-2">•</span>
                      <span>{request.ride_type}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-green-600">
                      ${request.estimated_fare}
                    </div>
                    <div className="text-sm text-gray-600">{request.distance}</div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-1"></div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-600">Pickup</div>
                      <div className="font-medium">{request.pickup_address}</div>
                    </div>
                    <div className="text-sm text-blue-600">{request.pickup_time}</div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full mt-1"></div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-600">Destination</div>
                      <div className="font-medium">{request.destination_address}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDeclineRide(request.id)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
                    disabled={acceptingRide === request.id}
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => handleAcceptRide(request)}
                    disabled={acceptingRide === request.id}
                    className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-800 disabled:bg-gray-400"
                  >
                    {acceptingRide === request.id ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Accepting...
                      </div>
                    ) : (
                      'Accept'
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Quick Stats */}
      <div className="border-t p-4 bg-gray-50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold">8</div>
            <div className="text-xs text-gray-600">Today's Trips</div>
          </div>
          <div>
            <div className="text-lg font-semibold">$127</div>
            <div className="text-xs text-gray-600">Earnings</div>
          </div>
          <div>
            <div className="text-lg font-semibold">4.9</div>
            <div className="text-xs text-gray-600">Rating</div>
          </div>
        </div>
      </div>
    </div>
  )
}