'use client'

import { useState } from 'react'

const mockRides = [
  {
    id: 'R001',
    rider: 'Sarah Johnson',
    driver: 'John Driver',
    pickup: '123 Main St',
    destination: 'Airport Terminal 1',
    status: 'completed',
    fare: 28.50,
    distance: '12.5 km',
    created_at: '2024-01-15 14:30',
    completed_at: '2024-01-15 15:15'
  },
  {
    id: 'R002',
    rider: 'Mike Chen',
    driver: 'Sarah Wilson',
    pickup: '456 Oak Ave',
    destination: 'Central Mall',
    status: 'in_progress',
    fare: 15.75,
    distance: '5.2 km',
    created_at: '2024-01-15 15:45',
    completed_at: null
  },
  {
    id: 'R003',
    rider: 'Emily Davis',
    driver: null,
    pickup: '789 Pine St',
    destination: 'Downtown Plaza',
    status: 'requested',
    fare: 22.00,
    distance: '8.1 km',
    created_at: '2024-01-15 16:00',
    completed_at: null
  }
]

export default function RideManagement() {
  const [rides, setRides] = useState(mockRides)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredRides = rides.filter(ride => {
    const matchesFilter = filter === 'all' || ride.status === filter
    const matchesSearch = ride.rider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ride.id.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'requested': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Ride Management</h2>
          <button className="bg-black text-white px-4 py-2 rounded-lg">
            Export Rides
          </button>
        </div>
        
        {/* Filters */}
        <div className="mt-4 flex items-center space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search rides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="all">All Status</option>
            <option value="requested">Requested</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ride ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rider
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Driver
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Route
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fare
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRides.map((ride) => (
              <tr key={ride.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {ride.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {ride.rider}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {ride.driver || 'Unassigned'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div>
                    <div className="font-medium">{ride.pickup}</div>
                    <div className="text-gray-500">→ {ride.destination}</div>
                    <div className="text-xs text-gray-400">{ride.distance}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ride.status)}`}>
                    {ride.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${ride.fare}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      View
                    </button>
                    {ride.status === 'requested' && (
                      <button className="text-red-600 hover:text-red-900">
                        Cancel
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredRides.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          <div className="text-4xl mb-2">🔍</div>
          <p>No rides found matching your criteria</p>
        </div>
      )}
    </div>
  )
}