# Vercel Deployment Guide

## Prerequisites
- Vercel account
- Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **For production deployment**:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Vercel will auto-detect Angular and use the `vercel.json` configuration
5. Click "Deploy"

## Configuration

The `vercel.json` file is already configured with:
- **Build Command**: `npm run build`
- **Output Directory**: `dist/zendesk-redirect/browser`
- **API Rewrites**: `/api/v2/*` requests are proxied to Zendesk
- **SPA Routing**: All routes redirect to `index.html` for Angular routing

## Environment Variables

If you need to change API credentials, you can set them in Vercel:
1. Go to Project Settings → Environment Variables
2. Add variables if needed (currently they're in environment files)

## Important Notes

- The proxy configuration in `vercel.json` handles CORS by forwarding `/api/v2/*` requests to Zendesk
- The app uses relative paths (`/api/v2/*`) which work in both development and production
- Make sure your `environment.ts` and `environment.development.ts` have the correct Zendesk API credentials

## Testing After Deployment

1. Visit your Vercel deployment URL
2. Test ticket preview: `https://your-app.vercel.app/?ticket_id=2405`
3. Check browser console for any errors
4. Verify API calls are working (check Network tab)
