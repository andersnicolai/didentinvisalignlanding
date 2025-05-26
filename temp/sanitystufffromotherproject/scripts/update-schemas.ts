const { client } = require('../lib/sanity.client');
const { project } = require('../lib/schemas/project');
const { service } = require('../lib/schemas/service');
const { blogPost } = require('../lib/schemas/blogPost');
const { testimonial } = require('../lib/schemas/testimonial');

async function updateSchemas() {
  try {
    // Update project schema
    await client.createOrReplace({
      _id: 'project',
      _type: 'schema',
      name: 'project',
      schema: project,
    });
    console.log('✅ Project schema updated');

    // Update service schema
    await client.createOrReplace({
      _id: 'service',
      _type: 'schema',
      name: 'service',
      schema: service,
    });
    console.log('✅ Service schema updated');

    // Update blog post schema
    await client.createOrReplace({
      _id: 'blogPost',
      _type: 'schema',
      name: 'blogPost',
      schema: blogPost,
    });
    console.log('✅ Blog post schema updated');

    // Update testimonial schema
    await client.createOrReplace({
      _id: 'testimonial',
      _type: 'schema',
      name: 'testimonial',
      schema: testimonial,
    });
    console.log('✅ Testimonial schema updated');

    console.log('✨ All schemas updated successfully');
  } catch (error) {
    console.error('❌ Error updating schemas:', error);
    process.exit(1);
  }
}

updateSchemas(); 