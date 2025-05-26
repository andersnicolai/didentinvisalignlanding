// Script to fetch all projects from Sanity
import { client } from '../lib/sanity.client.ts';

async function getProjects() {
  try {
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

getProjects(); 