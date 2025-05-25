import { getAllProjects } from '@/lib/api';
import { urlFor } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { format } from 'date-fns';
import nb from 'date-fns/locale/nb';
import ProjectsList from './ProjectsList';

export const revalidate = 60; // Revalidate this page every 60 seconds

// Helper function to translate category names
function translateCategory(category: string): string {
  const categoryMap: Record<string, string> = {
    'indoor-painting': 'Innendørs maling',
    'outdoor-painting': 'Utendørs maling',
    'wallpapering': 'Tapetsering',
    'renovation': 'Oppussing',
    'special-treatment': 'Spesialbehandling',
    'furniture': 'Møbler',
    'custom-build': 'Spesialtilpasning',
    'outdoor': 'Utendørs',
  };
  return categoryMap[category] || category;
}

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  category: string;
  description?: any; // Changed to any to accommodate both string and block content
  date?: string;
  location?: string;
  completedAt?: string;
  projectDetails?: {
    area?: number;
    challenges?: any;
    materials?: any;
    result?: any;
  };
}

// Helper function to get image URL
function getImageUrl(image: any): string {
  if (!image) return '/placeholder-image.jpg';
  const imageUrl = urlFor(image);
  return imageUrl || '/placeholder-image.jpg';
}

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  
  // Return the ProjectsList component with the projects data
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Prosjekter</h1>
      <ProjectsList projects={projects} />
    </div>
  );
}
