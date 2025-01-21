interface Config {
  apiUrl: string;
  baseUrl: string;
}

// Determine API URL based on environment
const getApiUrl = () => {
  if (import.meta.env.DEV) {
    return 'http://localhost:3000';
  }
  return 'https://dident-landing-api.azurewebsites.net';
};

export const config: Config = {
  apiUrl: getApiUrl(),
  baseUrl: 'https://kampanje.dident.no/tilbud/bleking'
}; 