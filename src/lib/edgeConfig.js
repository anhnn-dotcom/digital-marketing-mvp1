// Removed actual client creation to prevent CORS side-effects in Vite browser environment
// const edgeConfigClient = createClient(import.meta.env.VITE_EDGE_CONFIG);
// export default edgeConfigClient;

/**
 * Fetch any key from Edge Config
 * Note: Vercel Edge Config client cannot be used directly from the browser due to CORS.
 * We mock this for the MVP to prevent console errors.
 * @param {string} key 
 * @returns {Promise<any>}
 */
export async function getEdgeConfigValue(key) {
  if (key === 'greeting') {
    return "Marketing Team";
  }
  return null;
}

// Shortcut for the greeting
export const getGreeting = () => getEdgeConfigValue('greeting');

