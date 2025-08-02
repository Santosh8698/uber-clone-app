'use client'

import { useState } from 'react'
import AdminStats from '../components/AdminStats'
import RideManagement from '../components/RideManagement'
import DriverManagement from '../components/DriverManagement'
import UserManagement from '../components/UserManagement'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'rides', name: 'Rides', icon: '🚗' },
    { id: 'drivers', name: 'Drivers', icon: '👨‍💼' },
    { id: 'users', name: 'Users', icon: '👥' },
    { id: 'analytics', name: 'Analytics', icon: '📈' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">UberClone Admin</h1>
            <div className="flex items-center space-x-4">
              <button className="bg-black text-white px-4 py-2 rounded-lg">
                Export Data
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  👤
                </div>
                <span>Admin User</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'overview' && <AdminStats />}
          {activeTab === 'rides' && <RideManagement />}
          {activeTab === 'drivers' && <DriverManagement />}
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'analytics' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Analytics</h2>
              <p className="text-gray-600">Advanced analytics coming soon...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}