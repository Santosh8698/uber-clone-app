'use client'

interface DriverHeaderProps {
  isOnline: boolean
  onToggleOnline: () => void
}

export default function DriverHeader({ isOnline, onToggleOnline }: DriverHeaderProps) {
  return (
    <header className="bg-black text-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">UberClone Driver</h1>
          <div className={`px-3 py-1 rounded-full text-sm ${
            isOnline ? 'bg-green-500' : 'bg-gray-500'
          }`}>
            {isOnline ? 'Online' : 'Offline'}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm text-gray-300">Today's Earnings</div>
            <div className="text-lg font-semibold">$127.50</div>
          </div>
          
          <button
            onClick={onToggleOnline}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              isOnline 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isOnline ? 'Go Offline' : 'Go Online'}
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              👤
            </div>
            <span>John Driver</span>
          </div>
        </div>
      </div>
      
      {isOnline && (
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex space-x-6">
            <div>
              <span className="text-gray-300">Trips: </span>
              <span className="font-semibold">8</span>
            </div>
            <div>
              <span className="text-gray-300">Rating: </span>
              <span className="font-semibold">4.9 ⭐</span>
            </div>
            <div>
              <span className="text-gray-300">Online: </span>
              <span className="font-semibold">3h 24m</span>
            </div>
          </div>
          
          <div className="text-green-400 font-semibold">
            🟢 Ready for rides
          </div>
        </div>
      )}
    </header>
  )
}