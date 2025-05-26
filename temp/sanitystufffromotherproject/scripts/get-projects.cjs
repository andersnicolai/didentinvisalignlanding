// Script to fetch all projects from Sanity
const { createClient } = require('@sanity/client');

// Read .env.local file manually
const fs = require('fs');
let projectId, dataset;

try {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  const envLines = envContent.split('\n');
  
  envLines.forEach(line => {
    if (line.startsWith('NEXT_PUBLIC_SANITY_PROJECT_ID=')) {
      projectId = line.split('=')[1].trim();
    }
    if (line.startsWith('NEXT_PUBLIC_SANITY_DATASET=')) {
      dataset = line.split('=')[1].trim();
    }
  });
} catch (error) {
  console.log('Could not read .env.local file, using default values');
  // Fallback values
  projectId = '4r3op9nw';  // Changed to the correct ID
  dataset = 'production';
}

// Create the client
const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2023-06-21',
});

async function getProjects() {
  try {
    console.log(`Using Sanity project ID: ${projectId}, dataset: ${dataset}`);
    
    const projects = await client.fetch(`
      *[_type == "project"] {
        _id,
        title,
        slug,
        description,
        completedAt,
        images,
        location,
        date
      }
    `);
    
    console.log('All projects:');
    console.log(JSON.stringify(projects, null, 2));
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
}

// Run the function
getProjects(); 