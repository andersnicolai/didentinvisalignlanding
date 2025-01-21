export const config = {
  apiUrl: import.meta.env.PROD 
    ? 'https://dident-landing-api.azurewebsites.net'
    : 'http://localhost:3000'
}; 