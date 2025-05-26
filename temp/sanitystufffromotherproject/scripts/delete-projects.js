import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN, // Need a token with write access
  apiVersion: '2024-03-19',
  useCdn: false,
})

async function deleteAllProjects() {
  try {
    // 1. Get all project documents
    const projects = await client.fetch('*[_type == "project"]._id')
    
    console.log(`Found ${projects.length} projects to delete`)
    
    // 2. Delete each project
    for (const projectId of projects) {
      await client.delete(projectId)
      console.log(`Deleted project with ID: ${projectId}`)
    }
    
    console.log('Successfully deleted all projects')
  } catch (error) {
    console.error('Error deleting projects:', error)
  }
}

deleteAllProjects() 