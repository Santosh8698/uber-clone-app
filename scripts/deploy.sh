#!/bin/bash

# UberClone Deployment Script
echo "🚀 Starting UberClone deployment..."

# Check if required environment variables are set
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ]; then
    echo "❌ Error: NEXT_PUBLIC_SUPABASE_URL is not set"
    exit 1
fi

if [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
    echo "❌ Error: NEXT_PUBLIC_SUPABASE_ANON_KEY is not set"
    exit 1
fi

if [ -z "$STRIPE_SECRET_KEY" ]; then
    echo "❌ Error: STRIPE_SECRET_KEY is not set"
    exit 1
fi

echo "✅ Environment variables validated"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

# Run database migrations (if any)
echo "🗄️ Setting up database..."
# Add your database setup commands here

echo "✅ Deployment completed successfully!"
echo "🌐 Your UberClone app is ready!"

# Optional: Start the application
if [ "$1" = "--start" ]; then
    echo "🚀 Starting the application..."
    npm start
fi