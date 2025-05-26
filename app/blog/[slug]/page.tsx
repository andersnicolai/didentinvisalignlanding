import Image from 'next/image';
import Link from 'next/link';
import { createVekstBoost } from '@/lib/vekstboost';
import { notFound } from 'next/navigation';

type BlogPostProps = {
  params: {
    slug: string;
  };
};

// Generate static params for all blog posts
export async function generateStaticParams() {
  try {
    const vekstBoost = createVekstBoost({
      siteId: 'dident-tannklinikk',
      apiKey: process.env.NEXT_PUBLIC_VEKSTBOOST_API_KEY || 'demo-key',
      language: 'no',
    });
    
    await vekstBoost.initialize();
    const posts = await vekstBoost.getLatestContent('blog', 50);
    
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Failed to generate static params for blog posts:', error);
    // Return empty array if there's an error, so the build doesn't fail
    return [];
  }
}

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  mainImage: {
    url: string;
    alt: string;
  };
  categories: string[];
  content: {
    _type: string;
    children?: any[];
    style?: string;
    markDefs?: any[];
    text?: string;
    [key: string]: any;
  }[];
};

export default async function BlogPostPage({ params }: BlogPostProps) {
  let post: BlogPost | null = null;
  
  try {
    const vekstBoost = createVekstBoost({
      siteId: 'dident-tannklinikk',
      apiKey: process.env.NEXT_PUBLIC_VEKSTBOOST_API_KEY || 'demo-key',
      language: 'no',
    });
    
    await vekstBoost.initialize();
    
    // For the demo, we'll simulate fetching a specific post
    // In production, this would call a specific API endpoint
    const allPosts = await vekstBoost.getLatestContent('blog', 20);
    const foundPost = allPosts.find(p => p.slug === params.slug);
    
    if (!foundPost) {
      notFound();
    }
    
    post = foundPost;
  } catch (err) {
    console.error('Failed to fetch blog post:', err);
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-24">
          <p className="text-red-500">Could not load the blog post. Please try again later.</p>
          <Link href="/blog" className="text-blue-600 hover:underline mt-4 inline-block">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-24">
          <p className="text-red-500">Blog post not found</p>
          <Link href="/blog" className="text-blue-600 hover:underline mt-4 inline-block">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <main className="container mx-auto px-4 py-12">
      <article className="max-w-3xl mx-auto">
        <Link href="/blog" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Back to Blog
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="mb-6">
          <time dateTime={post.publishedAt} className="text-gray-500">
            {new Date(post.publishedAt).toLocaleDateString('no-NO', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </time>
          
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {post.categories.map((category: string) => (
                <span 
                  key={category}
                  className="text-xs font-medium px-2.5 py-0.5 rounded bg-blue-100 text-blue-800"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.mainImage.url}
            alt={post.mainImage.alt}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="prose prose-lg max-w-none">
          {renderContent(post.content)}
        </div>
      </article>
    </main>
  );
}

// Helper function to render Portable Text content
function renderContent(content: any[] = []) {
  if (!content || !Array.isArray(content)) {
    return <p>No content available</p>;
  }
  
  return content.map((block, index) => {
    // Handle different block types
    if (block._type === 'block') {
      // For regular text blocks
      if (block.style === 'h2') {
        return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{block.children[0].text}</h2>;
      }
      if (block.style === 'h3') {
        return <h3 key={index} className="text-xl font-bold mt-6 mb-3">{block.children[0].text}</h3>;
      }
      if (block.style === 'h4') {
        return <h4 key={index} className="text-lg font-bold mt-5 mb-2">{block.children[0].text}</h4>;
      }
      if (block.style === 'blockquote') {
        return (
          <blockquote key={index} className="border-l-4 border-gray-200 pl-4 italic my-6">
            {block.children[0].text}
          </blockquote>
        );
      }
      
      // Default paragraph
      return <p key={index} className="mb-4">{block.children[0].text}</p>;
    }
    
    // Handle image blocks
    if (block._type === 'image') {
      return (
        <div key={index} className="my-8 relative">
          <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
            <Image
              src={block.url}
              alt={block.alt || 'Blog image'}
              fill
              className="object-cover"
            />
          </div>
          {block.caption && (
            <p className="text-sm text-gray-500 mt-2 text-center">{block.caption}</p>
          )}
        </div>
      );
    }
    
    // Fallback for unknown block types
    return <div key={index}>Unsupported content block</div>;
  });
} 