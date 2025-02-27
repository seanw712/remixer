import axios from 'axios';

const API_URL = 'YOUR_CLAUDE_API_ENDPOINT';
const API_KEY = import.meta.env.VITE_CLAUDE_API_KEY;

/**
 * Service for interacting with the Claude API
 */
export const remixService = {
  /**
   * Remix content using Claude API
   * @param {string} content - The content to remix
   * @returns {Promise<string>} - The remixed content
   */
  remixContent: async (content) => {
    try {
      const response = await axios.post(
        API_URL,
        {
          prompt: `Remix the following content in a creative way: ${content}`,
          max_tokens_to_sample: 1000,
          // Add other Claude API parameters as needed
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
          },
        }
      );
      
      return response.data.completion || 'No response from API';
    } catch (error) {
      console.error('API Error:', error);
      throw new Error(error.response?.data?.error || 'Failed to remix content');
    }
  }
}; 