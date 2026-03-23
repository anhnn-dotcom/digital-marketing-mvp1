import { createClient } from '@vercel/edge-config';

const edgeConfigClient = createClient(import.meta.env.VITE_EDGE_CONFIG || process.env.EDGE_CONFIG);

export default edgeConfigClient;

/**
 * Fetch any key from Edge Config
 * @param {string} key 
 * @returns {Promise<any>}
 */
export async function getEdgeConfigValue(key) {
  try {
    return await edgeConfigClient.get(key);
  } catch (error) {
    console.error(`Error fetching ${key} from Edge Config:`, error);
    return null;
  }
}

// Shortcut for the greeting
export const getGreeting = () => getEdgeConfigValue('greeting');

