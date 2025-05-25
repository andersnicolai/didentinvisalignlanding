import { getProjectBySlug, urlFor } from '@/lib/api';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { format } from 'date-fns';
import nb from 'date-fns/locale/nb';

export const revalidate = 60;

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

// Helper function to split gallery into chunks
function splitGalleryIntoChunks(gallery: any[], chunkSize: number) {
  const chunks = [];
  for (let i = 0; i < gallery.length; i += chunkSize) {
    chunks.push(gallery.slice(i, i + chunkSize));
  }
  return chunks;
}

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

// Helper function to get image URL
function getImageUrl(image: any): string {
  if (!image) return '/placeholder-image.jpg';
  const url = urlFor(image);
  return url || '/placeholder-image.jpg';
}

// PortableText components for formatted text
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      const imageUrl = urlFor(value);
      if (!imageUrl) return null;
      
      return (
        <div className="relative h-60 w-full my-6">
          <Image 
            src={imageUrl} 
            alt={value?.alt || 'Prosjektbilde'} 
            fill 
            className="object-contain"
          />
          {value?.caption && (
            <div className="mt-2 text-sm text-gray-500 italic text-center">
              {value.caption}
            </div>
          )}
        </div>
      );
    },
  },
  marks: {
    link: ({ value, children }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a 
          href={value?.href} 
          target={target} 
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      );
    },
  },
  block: {
    h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-16 mb-2">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold mt-16 mb-2">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-lg font-bold mt-4 mb-2">{children}</h4>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-6">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => <p className="mb-4 leading-relaxed">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc mb-12 space-y-3 pl-6 my-4">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 my-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
};

export default async function ProjectPage(props: ProjectPageProps) {
  // Correctly handle params in Next.js
  const slug = props.params.slug;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Format dates on the server to avoid hydration errors
  const formattedCompletedDate = project.completedAt 
    ? format(new Date(project.completedAt), 'dd.MM.yyyy', { locale: nb })
    : null;
    
  const formattedStartDate = project.date
    ? format(new Date(project.date), 'MMMM yyyy', { locale: nb })
    : null;

  // Split gallery into chunks for layout
  const galleryChunks = project.gallery && project.gallery.length > 0 
    ? splitGalleryIntoChunks(project.gallery, Math.min(4, Math.ceil(project.gallery.length / 2)))
    : [];

  return (
    <main className="min-h-screen">
      {/* Hero Gallery Section */}
      <section className="relative h-[60vh] md:h-[80vh] overflow-hidden bg-stone-100">
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 gap-1">
          {project.gallery && project.gallery.slice(0, 4).map((image: any, index: number) => (
            <div key={index} className="relative w-full h-full overflow-hidden group cursor-pointer">
              <Image
                src={getImageUrl(image)}
                alt={`${project.title} - bilde ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Content Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <article className="max-w-3xl mx-auto prose prose-lg">
            {/* Header with project metadata */}
            <div className="flex flex-col gap-4 items-center mb-16 text-center not-prose">
              <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
              <div className="flex gap-6 items-center text-sm text-muted-foreground">
                {formattedStartDate && <span>{formattedStartDate}</span>}
                {formattedStartDate && project.location && <span>•</span>}
                {project.location && <span>{project.location}</span>}
              </div>
            </div>
            
            {/* Project description */}
            <h2 className="mb-2 font-bold">Om Prosjektet</h2>
            <div className="mb-12">
              <PortableText 
                value={project.description} 
                components={portableTextComponents}
              />
            </div>
            
            {/* Insert first gallery chunk between sections if available */}
            {galleryChunks.length > 0 && (
              <div className="mt-8 mb-16 grid grid-cols-1 md:grid-cols-3 gap-4 not-prose">
                {galleryChunks[0].slice(0, 3).map((image: any, index: number) => (
                  <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src={getImageUrl(image)}
                      alt={`${project.title} - bilde ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            
            {/* Challenges and Solutions section if available */}
            {project.projectDetails && project.projectDetails.challenges && (
              <>
                <h2 className="mt-16 mb-2 font-bold">Utfordringer og Løsninger</h2>
                <div className="mb-12">
                  <PortableText 
                    value={project.projectDetails.challenges} 
                    components={portableTextComponents}
                  />
                </div>
              </>
            )}
            
            {/* Insert second gallery chunk between sections if available */}
            {galleryChunks.length > 1 && (
              <div className="mt-8 mb-16 grid grid-cols-1 md:grid-cols-3 gap-4 not-prose">
                {galleryChunks[1].slice(0, 3).map((image: any, index: number) => (
                  <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src={getImageUrl(image)}
                      alt={`${project.title} - bilde ${index + 4}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            
            {/* Materials and Methods section if available */}
            {project.projectDetails && project.projectDetails.materials && Array.isArray(project.projectDetails.materials) && project.projectDetails.materials.length > 0 && (
              <>
                <h2 className="mt-16 mb-4 font-bold">Materialer og Metoder</h2>
                <div className="mb-12">
                  <PortableText 
                    value={project.projectDetails.materials} 
                    components={portableTextComponents}
                  />
                </div>
              </>
            )}
            
            {/* Results section if available */}
            {project.projectDetails && project.projectDetails.result && (
              <>
                <h2 className="mt-16 mb-2 font-bold">Resultat</h2>
                <div className="mb-12">
                  <PortableText 
                    value={project.projectDetails.result} 
                    components={portableTextComponents}
                  />
                </div>
              </>
            )}
            
            {/* Project details section */}
            <div className="mt-24 not-prose">
              <h4 className="text-md font-semibold mb-2">Prosjektdetaljer</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {project.date && project.completedAt && (
                  <div className="p-6 bg-stone-50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Varighet</p>
                    <p className="font-medium">
                      {Math.ceil(Math.abs(new Date(project.completedAt).getTime() - new Date(project.date).getTime()) / (1000 * 60 * 60 * 24 * 7))} uker
                    </p>
                  </div>
                )}
                <div className="p-6 bg-stone-50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Område</p>
                  <p className="font-medium">{project.projectDetails && project.projectDetails.area ? `${project.projectDetails.area} m²` : "Ikke spesifisert"}</p>
                </div>
                <div className="p-6 bg-stone-50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Type</p>
                  <p className="font-medium">{translateCategory(project.category)}</p>
                </div>
                <div className="p-6 bg-stone-50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Status</p>
                  <p className="font-medium">{project.completedAt ? 'Fullført' : 'Pågående'}</p>
                </div>
              </div>
            </div>
            
            {/* Call to action */}
            <div className="mt-24 p-8 bg-stone-100 rounded-lg text-center not-prose">
              <h3 className="text-xl font-bold mb-4">Ble du inspirert?</h3>
              <p className="mb-6">Ta kontakt med oss for å diskutere ditt prosjekt</p>
              <a 
                href="/#kontakt" 
                className="inline-block bg-stone-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-stone-700 transition-colors"
              >
                Kontakt oss
              </a>
            </div>
          </article>
        </div>
      </section>
      
      {/* Full gallery section if available */}
      {project.gallery && project.gallery.length > 6 && (
        <section className="py-16 bg-stone-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Galleri</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {project.gallery.slice(6).map((image: any, index: number) => (
                <div key={index} className="relative h-64 rounded-lg overflow-hidden group">
                  <Image
                    src={getImageUrl(image)}
                    alt={`${project.title} - bilde ${index + 7}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Video Section if available */}
      {project.video && project.video.asset && project.video.asset.url && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Video</h2>
            <div className="max-w-4xl mx-auto">
              <video 
                controls 
                className="w-full rounded-lg shadow-lg"
                src={project.video.asset.url || null}
              >
                Din nettleser støtter ikke videoavspilling.
              </video>
            </div>
          </div>
        </section>
      )}
    </main>
  );
} 