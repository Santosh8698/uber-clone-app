import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20'
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { ride_id, amount, payment_method_id } = body

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      payment_method: payment_method_id,
      confirmation_method: 'manual',
      confirm: true,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/ride/${ride_id}`
    })

    // Save payment record to database
    const { data, error } = await supabase
      .from('payments')
      .insert({
        ride_id,
        amount,
        payment_method: 'stripe',
        stripe_payment_intent_id: paymentIntent.id,
        status: paymentIntent.status === 'succeeded' ? 'completed' : 'pending'
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Update ride status if payment successful
    if (paymentIntent.status === 'succeeded') {
      await supabase
        .from('rides')
        .update({ status: 'completed', completed_at: new Date().toISOString() })
        .eq('id', ride_id)
    }

    return NextResponse.json({
      payment: data,
      client_secret: paymentIntent.client_secret,
      status: paymentIntent.status
    })
  } catch (error) {
    console.error('Payment error:', error)
    return NextResponse.json({ error: 'Payment processing failed' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const rideId = searchParams.get('ride_id')

    if (!rideId) {
      return NextResponse.json({ error: 'Ride ID is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('ride_id', rideId)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ payment: data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}