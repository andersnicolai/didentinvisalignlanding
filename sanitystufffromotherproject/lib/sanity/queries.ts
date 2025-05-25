import { client } from './client';
import { urlForImage } from './image';

// Define a minimal project interface for type safety
interface SanityProject {
  _id: string;
  title: string;
  slug?: {
    current: string;
  };
  description?: any;
  mainImage?: any;
  gallery?: any[];
  video?: any;
  category?: string;
  date?: string;
  location?: string;
  completedAt?: string;
  featured?: boolean;
  projectDetails?: {
    area?: number;
    challenges?: any;
    materials?: any;
    result?: any;
  };
  images?: Array<{ url: string; alt: string }>;
}

// For TypeScript compatibility
interface SanityClient {
  fetch: <T>(query: string, params?: any) => Promise<T>;
}

export async function getProject(slug: string): Promise<SanityProject | null> {
  const project = await (client as SanityClient).fetch<SanityProject | null>(
    `*[_type == "project" && slug.current == $slug][0]{
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
    }`,
    { slug }
  );

  if (!project) return null;
  
  // Process images
  if (project.gallery) {
    const images = project.gallery.map((image: any) => ({
      url: urlForImage(image).url(),
      alt: image.alt || project.title,
    }));
    project.images = images;
  } else {
    project.images = [];
  }
  
  return project;
} 