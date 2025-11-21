#!/bin/bash

# Fuelguard Production Deployment Script
# This script automates the deployment process

set -e

echo "🚀 Fuelguard Production Deployment"
echo "===================================="
echo ""

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Install with: npm install -g firebase-tools"
    exit 1
fi

if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Install with: npm install -g vercel"
    exit 1
fi

echo "✅ Prerequisites satisfied"
echo ""

# Check environment files
echo "📋 Checking environment configuration..."

if [ ! -f ".env.production" ]; then
    echo "❌ .env.production not found. Please create it from .env.example"
    exit 1
fi

if [ ! -f "backend/functions/.env.production" ]; then
    echo "⚠️  backend/functions/.env.production not found (optional)"
fi

echo "✅ Environment files found"
echo ""

# Deploy Cloud Functions
echo "☁️  Deploying Cloud Functions..."
cd backend/functions
npm install
npm run build
firebase deploy --only functions --project production
cd ../..
echo "✅ Cloud Functions deployed"
echo ""

# Deploy Firestore rules
echo "🔒 Deploying Firestore rules..."
firebase deploy --only firestore:rules --project production
echo "✅ Firestore rules deployed"
echo ""

# Deploy Frontend
echo "🌐 Deploying Frontend to Vercel..."
vercel --prod
echo "✅ Frontend deployed"
echo ""

# Success
echo "🎉 Deployment Complete!"
echo ""
echo "Next steps:"
echo "1. Verify at your production URL"
echo "2. Test authentication flow"
echo "3. Check Cloud Functions logs: firebase functions:log"
echo "4. Monitor Firestore usage in Firebase Console"
echo ""
