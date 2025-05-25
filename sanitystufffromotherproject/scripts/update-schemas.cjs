// CommonJS script for updating Sanity schemas
const sanityClient = require('@sanity/client');

// Create a Sanity client
const client = sanityClient({
  projectId: "4r3op9nw", // Get this from sanity.json or environment
  dataset: "production",
  token: process.env.SANITY_API_TOKEN, // You'll need a token with write access
  useCdn: false,
  apiVersion: "2022-06-01"
});

async function updateSchemas() {
  try {
    // Update project schema to include date and location fields
    const projectSchema = {
      name: 'project',
      title: 'Prosjekt',
      type: 'document',
      fields: [
        {
          name: 'title',
          title: 'Tittel',
          type: 'string',
        },
        {
          name: 'slug',
          title: 'URL-navn',
          type: 'slug',
          options: {
            source: 'title',
            maxLength: 96,
          },
        },
        {
          name: 'description',
          title: 'Beskrivelse',
          type: 'text',
        },
        {
          name: 'mainImage',
          title: 'Hovedbilde',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'gallery',
          title: 'Bildegalleri',
          type: 'array',
          of: [
            {
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
        },
        {
          name: 'video',
          title: 'Video',
          type: 'file',
          options: {
            accept: 'video/*',
          },
        },
        {
          name: 'category',
          title: 'Kategori',
          type: 'string',
          options: {
            list: [
              { title: 'Innendørs maling', value: 'indoor-painting' },
              { title: 'Utendørs maling', value: 'outdoor-painting' },
              { title: 'Tapetsering', value: 'wallpapering' },
              { title: 'Oppussing', value: 'renovation' },
              { title: 'Spesialbehandling', value: 'special-treatment' },
            ],
          },
        },
        {
          name: 'date',
          title: 'Prosjekt dato',
          type: 'date',
          description: 'Dato prosjektet ble påbegynt',
        },
        {
          name: 'location',
          title: 'Lokasjon',
          type: 'string',
          description: 'Hvor prosjektet ble utført',
        },
        {
          name: 'completedAt',
          title: 'Ferdigstilt dato',
          type: 'date',
        },
        {
          name: 'featured',
          title: 'Fremhevet prosjekt',
          type: 'boolean',
          initialValue: false,
        },
      ],
      preview: {
        select: {
          title: 'title',
          media: 'mainImage',
          subtitle: 'location',
        },
      },
    };
    
    // Update schema
    await client.patch('schema.project')
      .set(projectSchema)
      .commit();
    
    console.log('✅ Project schema updated successfully');
    
  } catch (error) {
    console.error('❌ Error updating schemas:', error);
    process.exit(1);
  }
}

updateSchemas(); 