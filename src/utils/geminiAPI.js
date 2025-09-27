import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
// Note: In production, store API key in environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'your-api-key-here';
const genAI = new GoogleGenerativeAI(API_KEY);

/*
 * GEMINI IMAGE GENERATION:
 * This implementation uses Gemini 2.5 Flash 8B model for direct image generation.
 * Make sure you have:
 * 1. A valid Gemini API key with image generation access
 * 2. The VITE_GEMINI_API_KEY environment variable set
 * 3. Access to Gemini's image generation features in your Google AI Studio account
 * 
 * Alternative image generation APIs you can also integrate:
 * - OpenAI DALL-E API
 * - Stability AI (Stable Diffusion)
 * - Midjourney API
 * - Replicate API
 * - Hugging Face Diffusion Models
 */

/**
 * Generate marketing campaign text using Gemini AI
 * @param {Object} params - Campaign parameters
 * @param {string} params.campaignType - Type of campaign (promotion, event, offer, brand)
 * @param {string} params.targetAudience - Target audience (tech, students, attendees, community)
 * @param {string} params.businessName - Name of the business
 * @param {string} params.productService - Product or service to promote
 * @param {string} params.specialOffer - Any special offers or discounts
 * @param {string} params.tone - Tone of the campaign (professional, casual, exciting, formal)
 * @returns {Promise<string>} Generated campaign text
 */
export async function generateCampaignText({
  campaignType = 'promotion',
  targetAudience = 'tech professionals',
  businessName = 'Your Business',
  productService = 'premium coffee',
  specialOffer = '',
  tone = 'professional'
}) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
Create a compelling marketing campaign text for a ${campaignType} campaign with the following details:

Business: ${businessName}
Product/Service: ${productService}
Target Audience: ${targetAudience}
Special Offer: ${specialOffer || 'None specified'}
Tone: ${tone}
Location: Cyberjaya (tech hub in Malaysia)

Requirements:
- Keep it under 280 characters (suitable for social media)
- Include relevant emojis
- Make it engaging and action-oriented
- Include appropriate hashtags
- Mention location context (Cyberjaya) if relevant
- If there's a special offer, highlight it prominently
- Use Malaysian context and language style

Generate only the campaign text, no additional explanations.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text.trim();
  } catch (error) {
    console.error('Error generating campaign text:', error);
    // Fallback text if API fails
    return `Error generating campaign text. Please try again later.`;
  }
}

/**
 * Generate poster image directly using Gemini 2.5 Flash Image Preview
 * @param {Object} params - Poster parameters
 * @param {string} params.campaignText - The campaign text content
 * @param {string} params.style - Design style preference
 * @param {string} params.businessType - Type of business
 * @param {string} params.colorScheme - Preferred color scheme
 * @returns {Promise<Object>} Generated image data with base64 string and metadata
 */
export async function generatePosterImage({
  campaignText,
  style = 'modern',
  businessType = 'food and beverage',
  colorScheme = 'vibrant'
}) {
  try {
    // Use Gemini 2.5 Flash for image generation
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-image-preview' });

    const prompt = `Create a professional marketing poster image with the following specifications:

Campaign Text: "${campaignText}"
Style: ${style} design aesthetic
Business Type: ${businessType}
Color Scheme: ${colorScheme} colors
Context: Cyberjaya tech hub, Malaysia

Design Requirements:
- High-quality marketing poster suitable for social media and print
- Include the campaign text prominently with clear, readable typography
- ${colorScheme} color palette that's eye-catching and professional
- ${style} design style with clean layout and good visual hierarchy
- Malaysian tech scene context with modern, professional aesthetic
- Include subtle tech or Cyberjaya skyline elements if appropriate
- Ensure text is legible and well-positioned
- Professional branding suitable for ${businessType} business
- Poster dimensions suitable for social media sharing

Create a visually appealing, professional marketing poster that effectively communicates the campaign message.`;

    const result = await model.generateContent([prompt]);
    const response = await result.response;

    // Check if the response contains image data
    if (response.candidates && response.candidates[0]) {
      const candidate = response.candidates[0];
      
      if (candidate.content && candidate.content.parts) {
        // Look for image parts in the response
        const imageParts = candidate.content.parts.filter(part => 
          part.inlineData && 
          part.inlineData.mimeType && 
          part.inlineData.mimeType.startsWith('image/')
        );
        
        if (imageParts.length > 0) {
          const imageData = imageParts[0].inlineData;
          return {
            success: true,
            image: `data:${imageData.mimeType};base64,${imageData.data}`,
            mimeType: imageData.mimeType
          };
        }
      }
    }

    // If no image was generated, return error
    return {
      success: false,
      error: 'No image was generated by Gemini. The model may not support image generation or the request failed.'
    };

  } catch (error) {
    console.error('Error generating poster image:', error);
    
    // Provide more specific error messages
    if (error.message.includes('API key')) {
      return {
        success: false,
        error: 'Invalid or missing Gemini API key. Please check your VITE_GEMINI_API_KEY environment variable.'
      };
    } else if (error.message.includes('model')) {
      return {
        success: false,
        error: 'Image generation model not available. Please ensure you have access to Gemini image generation features.'
      };
    } else {
      return {
        success: false,
        error: error.message || 'Failed to generate image with Gemini AI'
      };
    }
  }
}

/**
 * Analyze campaign performance and provide insights
 * @param {Object} campaignData - Campaign performance data
 * @returns {Promise<string>} AI-generated insights and recommendations
 */
export async function analyzeCampaignPerformance(campaignData) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
Analyze this campaign performance data and provide actionable insights:

Campaign Data:
${JSON.stringify(campaignData, null, 2)}

Provide:
1. Key performance insights
2. Areas for improvement
3. Specific recommendations for future campaigns
4. Audience engagement patterns
5. Optimal timing suggestions

Keep the analysis concise and actionable (under 300 words).
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text.trim();
  } catch (error) {
    console.error('Error analyzing campaign performance:', error);
    return 'Unable to generate performance analysis at this time. Please check your campaign metrics manually.';
  }
}

/**
 * Generate campaign variations for A/B testing
 * @param {string} originalText - Original campaign text
 * @param {number} variations - Number of variations to generate
 * @returns {Promise<string[]>} Array of campaign variations
 */
export async function generateCampaignVariations(originalText, variations = 3) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
Create ${variations} different variations of this marketing campaign text for A/B testing:

Original: "${originalText}"

Requirements for each variation:
- Maintain the same core message and offer
- Use different wording, tone, or emphasis
- Keep under 280 characters each
- Include emojis and hashtags
- Make each distinctly different while staying relevant

Return only the ${variations} variations, numbered 1-${variations}, no additional text.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the response to extract individual variations
    const variations_array = text
      .split('\n')
      .filter(line => line.trim() && /^\d+\./.test(line.trim()))
      .map(line => line.replace(/^\d+\.\s*/, '').trim());

    return variations_array.length > 0 ? variations_array : [originalText];
  } catch (error) {
    console.error('Error generating campaign variations:', error);
    return [originalText];
  }
}