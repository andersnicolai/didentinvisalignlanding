import createImageUrlBuilder from '@sanity/image-url'

// Use placeholders for missing environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'missing-project-id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Create imageBuilder only if we have valid config
const hasValidConfig = projectId && projectId !== 'missing-project-id'

let imageBuilder = null

// Create the imageBuilder only if we have valid config
if (hasValidConfig) {
  try {
    imageBuilder = createImageUrlBuilder({
      projectId: projectId || '',
      dataset: dataset || '',
    })
  } catch (error) {
    console.warn('Failed to initialize Sanity image builder:', error.message)
    // Create stub functions
    imageBuilder = {
      image: () => ({
        url: () => '',
        width: () => ({ height: () => ({}) }),
        height: () => ({ width: () => ({}) }),
        format: () => ({ url: () => '' }),
      })
    }
  }
} else {
  // Create stub functions
  imageBuilder = {
    image: () => ({
      url: () => '',
      width: () => ({ height: () => ({}) }),
      height: () => ({ width: () => ({}) }),
      format: () => ({ url: () => '' }),
    })
  }
}

export const urlForImage = (source) => {
  // Always check if source exists or if we don't have valid config
  if (!source || !source.asset || !hasValidConfig) {
    return {
      url: () => '',
      width: () => ({ height: () => ({}) }),
      height: () => ({ width: () => ({}) }),
      format: () => ({ url: () => '' }),
    }
  }
  
  return imageBuilder.image(source)
} 