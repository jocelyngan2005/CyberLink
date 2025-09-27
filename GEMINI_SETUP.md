# Gemini API Setup Guide

## Getting Your API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

## Environment Setup

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and replace `your_gemini_api_key_here` with your actual API key:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

## Features

### Campaign Text Generator
- **AI-Powered Content**: Uses Gemini AI to generate marketing campaign text based on your inputs
- **Customizable Parameters**: 
  - Campaign type (promotion, event, offer, brand awareness)
  - Target audience (tech professionals, students, event attendees, local community)
  - Business name and product/service
  - Special offers and tone
- **Character Count**: Shows real-time character count for social media optimization
- **A/B Testing**: Generate multiple variations of your campaign for testing

### Poster Description Generator
- **Smart Prompts**: Creates detailed descriptions for AI image generators
- **Style Options**: Choose from modern, bold, minimalist, or tech-inspired designs
- **Color Schemes**: Vibrant, monochrome, pastel, or corporate color palettes
- **Integration Ready**: Generated descriptions work with DALL-E, Midjourney, Stable Diffusion

## Usage Tips

1. **Campaign Text**:
   - Be specific about your product/service for better results
   - Include clear special offers to highlight promotions
   - Choose the appropriate tone for your target audience

2. **Poster Generation**:
   - Generate campaign text first for context
   - Copy the generated prompt to use with image AI tools
   - Experiment with different styles and color schemes

3. **A/B Testing**:
   - Generate multiple variations of successful campaigns
   - Test different approaches with your audience
   - Track performance to improve future campaigns

## Error Handling

The application includes fallback mechanisms:
- If the API is unavailable, mock content is generated
- Invalid API keys will show appropriate error messages
- Network issues are handled gracefully with user feedback

## API Limits

Google Gemini API has usage limits:
- Free tier: 60 requests per minute
- Check current pricing at [Google AI Pricing](https://ai.google.dev/pricing)
- Monitor your usage in the Google Cloud Console