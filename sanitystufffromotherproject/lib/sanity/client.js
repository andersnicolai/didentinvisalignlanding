import { createClient } from 'next-sanity'

// Use placeholders for missing environment variables to prevent build failures
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'missing-project-id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03'

// Check if we have the required configuration
const hasValidConfig = projectId && projectId !== 'missing-project-id'

// Create the client only if we have valid config
let client = null

if (hasValidConfig) {
  try {
    client = createClient({
      projectId,
      dataset,
      apiVersion,
      // Only use CDN in production and client-side rendering
      useCdn: typeof document !== 'undefined' && process.env.NODE_ENV === 'production',
      // Add token if available (for preview mode)
      token: process.env.SANITY_API_TOKEN || undefined,
    })
    
    console.log('Sanity client initialized with projectId:', projectId)
  } catch (error) {
    console.warn('Failed to initialize Sanity client:', error.message)
    // Create a stub client with similar methods that do nothing
    client = {
      fetch: async () => {
        console.warn('Using stub Sanity client fetch')
        return []
      },
      create: async () => ({}),
      patch: async () => ({}),
      delete: async () => ({}),
    }
  }
} else {
  console.warn('Missing Sanity configuration. Using fallback client.')
  // Create a stub client with similar methods that do nothing
  client = {
    fetch: async () => {
      console.warn('Using stub Sanity client fetch due to missing config')
      return []
    },
    create: async () => ({}),
    patch: async () => ({}),
    delete: async () => ({}),
  }
}

export { client }

export function getSanityImageUrl(source) {
  if (!source || !source.asset) {
    console.warn('Invalid image source:', source)
    return null
  }
  return source
} 