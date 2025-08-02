import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  full_name: string
  phone: string
  user_type: 'rider' | 'driver'
  created_at: string
}

export interface Driver {
  id: string
  user_id: string
  license_number: string
  vehicle_make: string
  vehicle_model: string
  vehicle_year: number
  vehicle_color: string
  license_plate: string
  is_active: boolean
  current_lat?: number
  current_lng?: number
  rating: number
  total_rides: number
}

export interface Ride {
  id: string
  rider_id: string
  driver_id?: string
  pickup_lat: number
  pickup_lng: number
  pickup_address: string
  destination_lat: number
  destination_lng: number
  destination_address: string
  ride_type: 'uberx' | 'comfort' | 'xl'
  status: 'requested' | 'accepted' | 'in_progress' | 'completed' | 'cancelled'
  fare: number
  distance: number
  duration: number
  created_at: string
  started_at?: string
  completed_at?: string
}

export interface Payment {
  id: string
  ride_id: string
  amount: number
  payment_method: string
  stripe_payment_intent_id: string
  status: 'pending' | 'completed' | 'failed'
  created_at: string
}