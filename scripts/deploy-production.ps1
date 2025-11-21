# Fuelguard Production Deployment Script (PowerShell)
# This script automates the deployment process for Windows

Write-Host "🚀 Fuelguard Production Deployment" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
Write-Host "📋 Checking prerequisites..." -ForegroundColor Yellow

$firebaseInstalled = Get-Command firebase -ErrorAction SilentlyContinue
if (-not $firebaseInstalled) {
    Write-Host "❌ Firebase CLI not found. Install with: npm install -g firebase-tools" -ForegroundColor Red
    exit 1
}

$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelInstalled) {
    Write-Host "❌ Vercel CLI not found. Install with: npm install -g vercel" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Prerequisites satisfied" -ForegroundColor Green
Write-Host ""

# Check environment files
Write-Host "📋 Checking environment configuration..." -ForegroundColor Yellow

if (-not (Test-Path ".env.production")) {
    Write-Host "❌ .env.production not found. Please create it from .env.example" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path "backend\functions\.env.production")) {
    Write-Host "⚠️  backend\functions\.env.production not found (optional)" -ForegroundColor Yellow
}

Write-Host "✅ Environment files found" -ForegroundColor Green
Write-Host ""

# Deploy Cloud Functions
Write-Host "☁️  Deploying Cloud Functions..." -ForegroundColor Yellow
Set-Location backend\functions
npm install
npm run build
firebase deploy --only functions --project production
Set-Location ..\..
Write-Host "✅ Cloud Functions deployed" -ForegroundColor Green
Write-Host ""

# Deploy Firestore rules
Write-Host "🔒 Deploying Firestore rules..." -ForegroundColor Yellow
firebase deploy --only firestore:rules --project production
Write-Host "✅ Firestore rules deployed" -ForegroundColor Green
Write-Host ""

# Deploy Frontend
Write-Host "🌐 Deploying Frontend to Vercel..." -ForegroundColor Yellow
vercel --prod
Write-Host "✅ Frontend deployed" -ForegroundColor Green
Write-Host ""

# Success
Write-Host "🎉 Deployment Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Verify at your production URL"
Write-Host "2. Test authentication flow"
Write-Host "3. Check Cloud Functions logs: firebase functions:log"
Write-Host "4. Monitor Firestore usage in Firebase Console"
Write-Host ""
