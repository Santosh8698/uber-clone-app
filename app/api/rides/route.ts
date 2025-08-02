import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      rider_id,
      pickup_lat,
      pickup_lng,
      pickup_address,
      destination_lat,
      destination_lng,
      destination_address,
      ride_type
    } = body

    // Calculate estimated fare based on distance
    const distance = calculateDistance(pickup_lat, pickup_lng, destination_lat, destination_lng)
    const fare = calculateFare(ride_type, distance)

    const { data, error } = await supabase
      .from('rides')
      .insert({
        rider_id,
        pickup_lat,
        pickup_lng,
        pickup_address,
        destination_lat,
        destination_lng,
        destination_address,
        ride_type,
        fare,
        distance
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ ride: data }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('user_id')
    const status = searchParams.get('status')

    let query = supabase.from('rides').select('*')

    if (userId) {
      query = query.eq('rider_id', userId)
    }

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ rides: data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Helper functions
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

function calculateFare(rideType: string, distance: number): number {
  const baseFares = {
    uberx: 2.50,
    comfort: 3.50,
    xl: 4.00
  }
  
  const perKmRates = {
    uberx: 1.20,
    comfort: 1.80,
    xl: 2.20
  }
  
  const baseFare = baseFares[rideType as keyof typeof baseFares] || baseFares.uberx
  const perKmRate = perKmRates[rideType as keyof typeof perKmRates] || perKmRates.uberx
  
  return Math.round((baseFare + (distance * perKmRate)) * 100) / 100
}