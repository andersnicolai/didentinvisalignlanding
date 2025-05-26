import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/types/project'
import { ArrowUpRight } from 'lucide-react'
import { urlFor } from '@/lib/api'

interface ProjectsListProps {
  projects: Project[]
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  // Filter out projects without a valid slug
  const validProjects = projects.filter(project => project && project.slug && project.slug.current);
  
  return (
    <div className="w-full py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {validProjects.map((project) => (
            <Link
              href={`/prosjekter/${project.slug.current}`}
              key={project._id}
              className="group relative overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                {project.mainImage && (
                  <Image
                    src={urlFor(project.mainImage) || '/prosjekt.png'}
                    alt={project.title || 'Project image'}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {project.title || 'Unnamed Project'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {project.location || 'Location not specified'}
                    </p>
                  </div>
                  <ArrowUpRight className="text-gray-400 group-hover:text-primary transition-colors duration-300" />
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{project.category || 'Uncategorized'}</span>
                  <span>{project.completedAt ? new Date(project.completedAt).getFullYear() : 'N/A'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 