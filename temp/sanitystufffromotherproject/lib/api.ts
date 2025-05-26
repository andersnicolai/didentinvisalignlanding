// Use a try-catch to handle potential missing Sanity configuration
let client: any = null;
let builder: any = null;

try {
  const { client: sanityClient } = require('./sanity/client');
  const imageUrlBuilder = require('@sanity/image-url');
  
  client = sanityClient;
  if (client) {
    builder = imageUrlBuilder(client);
  }
} catch (error) {
  console.warn('Failed to initialize Sanity:', error);
  // Create stub client with similar methods
  client = {
    fetch: async () => []
  };
  // Create stub builder
  builder = {
    image: () => ({ url: () => '' })
  };
}

export function urlFor(source: any) {
  if (!source || !builder) {
    console.warn('Invalid source or missing builder in urlFor:', { source, builderExists: !!builder });
    return '/prosjekt.png'; // Return default placeholder image
  }
  
  try {
    if (source._type === 'image' && source.asset && source.asset._ref) {
      return builder.image(source).url();
    } else if (source.asset && source.asset._ref) {
      return builder.image(source).url();
    } else if (source.asset && source.asset.url) {
      // Direct URL case
      return source.asset.url;
    } else {
      console.warn('Unknown image source format:', source);
      return '/prosjekt.png';
    }
  } catch (error) {
    console.warn('Error generating image URL:', error);
    return '/prosjekt.png';
  }
}

// Create stub functions that return empty data when Sanity isn't available
const fallbackEmptyArray = async () => [];
const fallbackEmptyObject = async () => null;

export async function getAllProjects() {
  try {
    const projects = await client.fetch(`
      *[_type == "project"] | order(completedAt desc) {
        _id,
        title,
        slug,
        description,
        mainImage,
        gallery,
        video,
        category,
        date,
        location,
        completedAt,
        featured,
        projectDetails {
          area,
          challenges,
          materials,
          result
        }
      }
    `);
    
    // Filter out projects with missing slug values
    return projects.filter((project: any) => project && project.slug && project.slug.current);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    return await client.fetch(`
      *[_type == "project" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        description,
        mainImage,
        gallery,
        video,
        category,
        date,
        location,
        completedAt,
        featured,
        projectDetails {
          area,
          challenges,
          materials,
          result
        }
      }
    `, { slug });
  } catch (error) {
    console.error(`Error fetching project with slug ${slug}:`, error);
    return null;
  }
}

export async function getFeaturedProjects() {
  try {
    return await client.fetch(`
      *[_type == "project" && featured == true] | order(completedAt desc) {
        _id,
        title,
        slug,
        description,
        mainImage,
        category,
        completedAt
      }
    `);
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
}

export async function getFeaturedTestimonial() {
  try {
    return await client.fetch(`
      *[_type == "testimonial" && featured == true][0] {
        _id,
        customerName,
        testimonialText,
        video,
        thumbnail
      }
    `);
  } catch (error) {
    console.error('Error fetching featured testimonial:', error);
    return null;
  }
}

export async function getAllTestimonials() {
  try {
    return await client.fetch(`
      *[_type == "testimonial"] | order(_createdAt desc) {
        _id,
        customerName,
        testimonialText,
        video,
        thumbnail
      }
    `);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

export async function getAllBlogPosts() {
  try {
    return await client.fetch(`
      *[_type == "blogPost"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        mainImage,
        excerpt,
        categories,
        featured
      }
    `);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    return await client.fetch(`
      *[_type == "blogPost" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        publishedAt,
        mainImage,
        excerpt,
        categories,
        body,
        seo
      }
    `, { slug });
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return null;
  }
}

export async function getFeaturedBlogPosts(limit = 3) {
  try {
    return await client.fetch(`
      *[_type == "blogPost" && featured == true] | order(publishedAt desc)[0...${limit}] {
        _id,
        title,
        slug,
        publishedAt,
        mainImage,
        excerpt,
        categories
      }
    `);
  } catch (error) {
    console.error(`Error fetching featured blog posts:`, error);
    return [];
  }
}

export async function getBlogPostsByCategory(category: string) {
  try {
    return await client.fetch(`
      *[_type == "blogPost" && $category in categories] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        mainImage,
        excerpt,
        categories
      }
    `, { category });
  } catch (error) {
    console.error(`Error fetching blog posts by category ${category}:`, error);
    return [];
  }
}

export async function getServices() {
  const query = `*[_type == "service"] {
    _id,
    title,
    slug,
    shortDescription,
    icon,
    mainImage
  }`;
  
  try {
    const services = await client.fetch(query);
    return services;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function getServiceBySlug(slug: string) {
  const query = `*[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    shortDescription,
    icon,
    features,
    mainImage,
    gallery,
    "relatedProjects": relatedProjects[]-> {
      _id,
      title,
      slug,
      description,
      date,
      location,
      "imageUrl": defined(images) && count(images) > 0 && defined(images[0].asset) ? images[0].asset->url : null
    }
  }`;
  
  try {
    const service = await client.fetch(query, { slug });
    return service;
  } catch (error) {
    console.error(`Error fetching service with slug ${slug}:`, error);
    return null;
  }
}