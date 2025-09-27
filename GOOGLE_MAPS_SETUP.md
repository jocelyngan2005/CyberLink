# Google Maps Integration Setup Guide

This guide will help you set up Google Maps API for the CyberLink delivery & logistics page.

## Prerequisites

1. A Google Cloud Platform account
2. A valid credit card (for Google Cloud billing, though you may stay within free tier limits)

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on "Select a project" → "New Project"
3. Enter a project name (e.g., "CyberLink Maps")
4. Click "Create"

## Step 2: Enable Required APIs

In your Google Cloud Console:

1. Go to "APIs & Services" → "Library"
2. Search for and enable these APIs:
   - **Maps JavaScript API** (required for displaying maps)
   - **Places API** (optional, for place searches)
   - **Directions API** (required for route optimization - this is a web service API, not a library)
   - **Geocoding API** (optional, for address lookups)

**Important Note**: The Directions API is a web service API. You don't need to load it as a library - `DirectionsService` and `DirectionsRenderer` are available by default with the Maps JavaScript API.

## Step 3: Create API Key

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Copy your API key
4. Click on the key name to configure restrictions (recommended)

## Step 4: Configure API Key Restrictions (Recommended)

### Application Restrictions:
- Select "HTTP referrers (web sites)"
- Add your domains:
  - `localhost:*` (for development)
  - `127.0.0.1:*` (for development)
  - `your-production-domain.com` (for production)

### API Restrictions:
- Select "Restrict key"
- Choose the APIs you enabled in Step 2

## Step 5: Add API Key to Your Project

1. Copy your `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and add your API key:
   ```bash
   VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```

3. Restart your development server:
   ```bash
   npm run dev
   ```

## Step 6: Test the Integration

1. Navigate to the SME Dashboard
2. Click on "Delivery & Logistics"
3. You should see a real Google Maps interface with delivery routes

## Features Included

✅ **Real Google Maps Integration**
- Interactive map with zoom and pan
- Custom markers for delivery locations
- Route optimization with Google Directions API

✅ **AI-Powered Insights**
- Hot spot recommendations
- Demand forecasting overlays
- Priority-based route visualization

✅ **Enhanced Delivery Management**
- Customer information display
- Order value tracking
- Special instructions handling
- Real-time ETA calculations

## Common Library Issues

### Valid JavaScript API Libraries (Updated 2024):
- `places` - for Places API functionality
- `geometry` - for geometry calculations  
- `drawing` - for drawing tools
- `visualization` - for data visualization
- `localContext` - for local context
- `marker` - **NEW:** for AdvancedMarkerElement (replaces deprecated Marker)

### NOT Valid Libraries:
- ❌ `directions` - This causes an error! DirectionsService is available by default
- ❌ `maps` - The core map is loaded automatically
- ❌ `routes` - Not a valid library name

### Important API Updates (2024):
- 🔄 **google.maps.Marker is deprecated** (as of Feb 2024)
- ✅ **Use google.maps.marker.AdvancedMarkerElement** instead
- 📚 **Load 'marker' library** for AdvancedMarkerElement support
- 🆔 **Map ID required** for Advanced Markers (automatically handled in our code)

## Pricing Information

Google Maps API usage is billed per request:
- **Maps JavaScript API**: Free up to $200/month credit
- **Directions API**: $5 per 1,000 requests after free tier
- **Places API**: $17-$32 per 1,000 requests after free tier

For development and testing, you should stay well within the free tier limits.

## Troubleshooting

### Common Issues:

1. **"Google Maps API key not configured" error**
   - Ensure your `.env` file has the correct API key
   - Restart your development server after adding the key

2. **"The library directions is unknown" error**
   - This is fixed! We removed `directions` from the libraries array
   - DirectionsService and DirectionsRenderer work without loading as a library

3. **"google.maps.Marker is deprecated" warning**
   - **FIXED!** Updated to use `google.maps.marker.AdvancedMarkerElement`
   - Added `marker` library to the loader
   - Enhanced markers with custom pins and animations

4. **"Map is initialised without a valid Map ID" warning**
   - **FIXED!** Added `mapId: 'DELIVERY_MAP'` to map configuration
   - Map ID is required for Advanced Markers to work properly
   - For production, you may want to create custom Map IDs in Google Cloud Console

5. **"REQUEST_DENIED" for Directions API**
   - Enable Directions API in Google Cloud Console
   - Check API key restrictions aren't blocking the request
   - Fallback behavior shows markers without route lines

6. **"RefererNotAllowedMapError"**
   - Add your current domain to the API key restrictions
   - For development, add `localhost:*` and `127.0.0.1:*`

7. **Quota exceeded errors**
   - Monitor your usage in Google Cloud Console
   - Consider implementing request caching for production

### Debug Mode:

To enable detailed error logging, add this to your `.env`:
```bash
VITE_DEBUG_MAPS=true
```

## Security Best Practices

1. **Never commit your `.env` file**
   - It's already in `.gitignore`
   - Always use environment variables for API keys

2. **Use API Key Restrictions**
   - Restrict by HTTP referrer for web apps
   - Restrict to only the APIs you need

3. **Monitor Usage**
   - Set up billing alerts in Google Cloud Console
   - Monitor API usage regularly

4. **Use Different Keys for Different Environments**
   - Separate keys for development, staging, and production
   - Different restriction settings for each environment

## Support

For technical issues:
- Check the [Google Maps JavaScript API documentation](https://developers.google.com/maps/documentation/javascript)
- Review the browser console for specific error messages
- Check your Google Cloud Console for API usage and errors

For billing questions:
- Visit your [Google Cloud billing dashboard](https://console.cloud.google.com/billing)