'use client'

export default function AdminStats() {
  const stats = [
    {
      title: 'Total Rides',
      value: '12,847',
      change: '+12%',
      changeType: 'positive',
      icon: '🚗'
    },
    {
      title: 'Active Drivers',
      value: '1,234',
      change: '+5%',
      changeType: 'positive',
      icon: '👨‍💼'
    },
    {
      title: 'Total Users',
      value: '45,678',
      change: '+18%',
      changeType: 'positive',
      icon: '👥'
    },
    {
      title: 'Revenue',
      value: '$234,567',
      change: '+23%',
      changeType: 'positive',
      icon: '💰'
    }
  ]

  const recentActivity = [
    { id: 1, type: 'ride', message: 'New ride completed by John Driver', time: '2 min ago' },
    { id: 2, type: 'driver', message: 'Sarah Wilson went online', time: '5 min ago' },
    { id: 3, type: 'user', message: 'New user registered: Mike Chen', time: '8 min ago' },
    { id: 4, type: 'ride', message: 'Ride cancelled by user', time: '12 min ago' },
    { id: 5, type: 'payment', message: 'Payment processed: $24.50', time: '15 min ago' }
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
            <div className="mt-4">
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-600"> from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'ride' ? 'bg-blue-500' :
                    activity.type === 'driver' ? 'bg-green-500' :
                    activity.type === 'user' ? 'bg-purple-500' :
                    'bg-yellow-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                <div className="text-2xl mb-2">📊</div>
                <div className="font-medium">View Reports</div>
                <div className="text-sm text-gray-600">Generate analytics</div>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                <div className="text-2xl mb-2">👨‍💼</div>
                <div className="font-medium">Add Driver</div>
                <div className="text-sm text-gray-600">Onboard new driver</div>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                <div className="text-2xl mb-2">🚗</div>
                <div className="font-medium">Monitor Rides</div>
                <div className="text-sm text-gray-600">Real-time tracking</div>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                <div className="text-2xl mb-2">⚙️</div>
                <div className="font-medium">Settings</div>
                <div className="text-sm text-gray-600">Platform config</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Ride Trends</h3>
        </div>
        <div className="p-6">
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">📈</div>
              <p>Chart visualization would go here</p>
              <p className="text-sm">Integration with charting library needed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}