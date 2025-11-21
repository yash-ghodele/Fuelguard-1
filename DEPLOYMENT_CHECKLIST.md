# Fuelguard Production Deployment Checklist

## Pre-Deployment

### Firebase Setup
- [ ] Create Firebase project (Blaze plan)
- [ ] Enable Authentication (Google provider)
- [ ] Create Firestore database (production mode)
- [ ] Get Firebase web app configuration
- [ ] Download service account key for Admin SDK

### Environment Configuration
- [ ] Copy `.env.production.template` to `.env.production`
- [ ] Fill in Firebase configuration values
- [ ] Copy `backend/functions/.env.production.template` to `backend/functions/.env.production`
- [ ] Configure Twilio credentials (SMS alerts)
- [ ] Configure SendGrid credentials (email alerts)
- [ ] Configure MQTT broker details
- [ ] Copy `backend/bridge/.env.production.template` to `backend/bridge/.env.production`

### Third-Party Services
- [ ] Set up Twilio account and get credentials
- [ ] Set up SendGrid account and get API key
- [ ] Set up MQTT broker (HiveMQ Cloud or self-hosted)
- [ ] (Optional) Set up Mapbox or Google Maps account

---

## Deployment Steps

### 1. Firebase Deployment
- [ ] Install Firebase CLI: `npm install -g firebase-tools`
- [ ] Login to Firebase: `firebase login`
- [ ] Initialize project: `firebase init`
- [ ] Deploy Firestore rules: `firebase deploy --only firestore:rules`
- [ ] Build Cloud Functions: `cd backend/functions && npm run build`
- [ ] Deploy Cloud Functions: `firebase deploy --only functions`
- [ ] Verify functions are running in Firebase Console

### 2. Frontend Deployment
- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Login to Vercel: `vercel login`
- [ ] Link project: `vercel link`
- [ ] Add environment variables in Vercel dashboard
- [ ] Deploy to production: `vercel --prod`
- [ ] Verify deployment at production URL
- [ ] (Optional) Configure custom domain

### 3. MQTT Bridge Deployment
- [ ] Choose deployment method (Docker or PM2)
- [ ] Configure environment variables
- [ ] Deploy bridge service
- [ ] Verify bridge is connected to MQTT broker
- [ ] Check logs for successful Firestore writes

### 4. Database Initialization
- [ ] Create initial organization in Firestore
- [ ] Create admin user via Firebase Authentication
- [ ] Set custom claims for admin user
- [ ] Create required Firestore indexes
- [ ] Verify security rules are working

### 5. ESP32 Device Configuration
- [ ] Update firmware configuration with production values
- [ ] Flash firmware to devices
- [ ] Test device connectivity to MQTT broker
- [ ] Verify data appears in Firestore
- [ ] Verify data appears in dashboard

---

## Post-Deployment Verification

### Functional Testing
- [ ] Test Google Sign-In flow
- [ ] Verify dashboard loads correctly
- [ ] Check real-time data updates
- [ ] Test vehicle selector
- [ ] Test fuel graph with different time ranges
- [ ] Test alert panel and resolution
- [ ] Test notifications panel
- [ ] Test device health panel
- [ ] Test vehicle tracking map

### Performance Testing
- [ ] Check API response times (< 500ms)
- [ ] Verify Firestore read/write performance
- [ ] Test with multiple concurrent users
- [ ] Monitor Cloud Functions execution time
- [ ] Check frontend bundle size and load time

### Security Testing
- [ ] Verify Firestore rules prevent unauthorized access
- [ ] Test API authentication
- [ ] Verify HTTPS is enforced
- [ ] Check CORS configuration
- [ ] Test rate limiting on Cloud Functions
- [ ] Verify environment variables are not exposed

---

## Monitoring Setup

### Firebase Monitoring
- [ ] Set up Cloud Functions error alerts
- [ ] Set up Firestore usage alerts
- [ ] Configure billing alerts
- [ ] Enable Firebase Performance Monitoring
- [ ] Set up uptime monitoring

### Logging
- [ ] Verify Cloud Functions logs are accessible
- [ ] Set up log aggregation (optional)
- [ ] Configure log retention policy
- [ ] Set up error tracking (Sentry, etc.)

### Backup Strategy
- [ ] Set up automated Firestore backups
- [ ] Test backup restoration process
- [ ] Document backup schedule
- [ ] Configure backup retention policy

---

## Documentation

- [ ] Update README with production URLs
- [ ] Document environment variable requirements
- [ ] Create runbook for common issues
- [ ] Document deployment process
- [ ] Create user guide for dashboard
- [ ] Document ESP32 device setup process

---

## Go-Live

- [ ] Announce maintenance window (if applicable)
- [ ] Run final smoke tests
- [ ] Monitor logs during initial traffic
- [ ] Verify all features working in production
- [ ] Update DNS records (if using custom domain)
- [ ] Send go-live announcement
- [ ] Monitor for 24 hours post-launch

---

## Post-Launch

- [ ] Review error logs daily for first week
- [ ] Monitor usage metrics
- [ ] Gather user feedback
- [ ] Plan first maintenance window
- [ ] Document lessons learned
- [ ] Update deployment checklist based on experience

---

## Rollback Plan

If critical issues are discovered:

1. **Frontend Rollback**
   ```bash
   # Revert to previous Vercel deployment
   vercel rollback
   ```

2. **Cloud Functions Rollback**
   ```bash
   # Redeploy previous version
   firebase deploy --only functions
   ```

3. **Database Rollback**
   ```bash
   # Restore from backup
   gcloud firestore import gs://your-backup-bucket/backup-name
   ```

---

## Support Contacts

- **Firebase Support:** https://firebase.google.com/support
- **Vercel Support:** https://vercel.com/support
- **Twilio Support:** https://www.twilio.com/help
- **SendGrid Support:** https://support.sendgrid.com/

---

## Notes

- Keep this checklist updated as deployment process evolves
- Document any deviations from standard process
- Share learnings with team
- Review and update quarterly
