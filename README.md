# UberClone - Ride Sharing App

A full-stack Uber-like ride-sharing application built with Next.js, Supabase, and Stripe.

## Features

- 🗺️ **Real-time Map Integration** - Interactive maps with pickup/destination selection
- 🚗 **Multiple Ride Types** - UberX, Comfort, and UberXL options
- 💳 **Secure Payments** - Stripe integration for payment processing
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🔐 **User Authentication** - Secure login for riders and drivers
- 📍 **Location Tracking** - Real-time driver location updates
- ⭐ **Rating System** - Rate drivers and rides
- 📊 **Admin Dashboard** - Manage rides, drivers, and analytics

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL with PostGIS (via Supabase)
- **Payments**: Stripe
- **Maps**: Leaflet with OpenStreetMap
- **Real-time**: Supabase Realtime
- **Deployment**: Vercel

## Quick Start

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/Santosh8698/uber-clone-app.git
cd uber-clone-app
\`\`\`

### 2. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Set up environment variables
\`\`\`bash
cp .env.example .env.local
\`\`\`

Fill in your environment variables:
- Supabase project URL and keys
- Stripe publishable and secret keys
- Google Maps API key (optional)

### 4. Set up the database
1. Create a new Supabase project
2. Run the SQL schema from \`database/schema.sql\`
3. Enable PostGIS extension in your Supabase project

### 5. Run the development server
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Database Setup

### Required Supabase Extensions
\`\`\`sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
\`\`\`

### PostGIS Function for Nearby Drivers
\`\`\`sql
CREATE OR REPLACE FUNCTION find_nearby_drivers(
  user_lat DECIMAL,
  user_lng DECIMAL,
  radius_km DECIMAL DEFAULT 5
)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  current_lat DECIMAL,
  current_lng DECIMAL,
  vehicle_make VARCHAR,
  vehicle_model VARCHAR,
  rating DECIMAL,
  distance_km DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    d.id,
    d.user_id,
    d.current_lat,
    d.current_lng,
    d.vehicle_make,
    d.vehicle_model,
    d.rating,
    ST_Distance(
      ST_Point(user_lng, user_lat)::geography,
      ST_Point(d.current_lng, d.current_lat)::geography
    ) / 1000 AS distance_km
  FROM drivers d
  WHERE d.is_active = true
    AND d.current_lat IS NOT NULL
    AND d.current_lng IS NOT NULL
    AND ST_DWithin(
      ST_Point(user_lng, user_lat)::geography,
      ST_Point(d.current_lng, d.current_lat)::geography,
      radius_km * 1000
    )
  ORDER BY distance_km;
END;
$$ LANGUAGE plpgsql;
\`\`\`

## API Endpoints

### Rides
- \`POST /api/rides\` - Create a new ride
- \`GET /api/rides\` - Get rides for a user
- \`PUT /api/rides/[id]\` - Update ride status

### Drivers
- \`GET /api/drivers/nearby\` - Find nearby drivers
- \`POST /api/drivers/nearby\` - Update driver location

### Payments
- \`POST /api/payments\` - Process payment
- \`GET /api/payments\` - Get payment details

## Deployment

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production
- Set all environment variables from \`.env.example\`
- Update \`NEXT_PUBLIC_BASE_URL\` to your production URL
- Configure Stripe webhooks for your production domain

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support, email support@uberclone.com or create an issue on GitHub.