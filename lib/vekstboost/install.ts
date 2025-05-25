#!/usr/bin/env node

/**
 * VekstBoost Installation Script
 * 
 * This script installs the VekstBoost Growth Engine components
 * into a Next.js project with a simple one-line command.
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Configuration for the installation
interface VekstBoostInstallConfig {
  siteId: string;
  apiKey: string;
  discordWebhookUrl: string;
  industries: string[];
  language: 'en' | 'no' | 'sv' | 'da';
  installBlog: boolean;
  installLeadCapture: boolean;
}

let config: VekstBoostInstallConfig = {
  siteId: '',
  apiKey: '',
  discordWebhookUrl: '',
  industries: [],
  language: 'en',
  installBlog: true,
  installLeadCapture: true,
};

console.log('\n🦁 Welcome to VekstBoost Growth Engine Installation\n');
console.log('This script will set up VekstBoost in your Next.js project');

// Get the current working directory
const cwd = process.cwd();

// Check if package.json exists to confirm this is a Next.js project
if (!fs.existsSync(path.join(cwd, 'package.json'))) {
  console.error('❌ Error: No package.json found. Please run this script in a Next.js project directory.');
  process.exit(1);
}

// Read package.json to check if this is a Next.js project
const packageJson = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf8'));
if (!packageJson.dependencies || !packageJson.dependencies.next) {
  console.error('❌ Error: This does not appear to be a Next.js project. VekstBoost requires Next.js.');
  process.exit(1);
}

// Start the installation process
askQuestions()
  .then(installFiles)
  .then(updateEnvFile)
  .then(displayNextSteps)
  .catch(error => {
    console.error(`❌ Installation failed: ${error.message}`);
    process.exit(1);
  });

// Ask the user for configuration options
async function askQuestions(): Promise<void> {
  return new Promise((resolve) => {
    rl.question('What is your site ID? (e.g., your-business-name): ', (siteId) => {
      config.siteId = siteId.trim() || `site-${Date.now()}`;
      
      rl.question('Do you have a VekstBoost API key? (Leave blank for demo mode): ', (apiKey) => {
        config.apiKey = apiKey.trim() || 'demo-key';
        
        rl.question('Discord webhook URL for lead notifications (optional): ', (webhook) => {
          config.discordWebhookUrl = webhook.trim();
          
          rl.question('What industries is your site focused on? (comma-separated): ', (industries) => {
            config.industries = industries.split(',').map(i => i.trim()).filter(Boolean);
            
            rl.question('Language (en, no, sv, da) [default: en]: ', (language: string) => {
              config.language = (language.trim() || 'en') as 'en' | 'no' | 'sv' | 'da';
              
              rl.question('Install blog module? (Y/n): ', (installBlog) => {
                config.installBlog = installBlog.toLowerCase() !== 'n';
                
                rl.question('Install lead capture module? (Y/n): ', (installLeadCapture) => {
                  config.installLeadCapture = installLeadCapture.toLowerCase() !== 'n';
                  rl.close();
                  resolve();
                });
              });
            });
          });
        });
      });
    });
  });
}

// Install the necessary files
async function installFiles(): Promise<boolean> {
  console.log('\n📦 Installing VekstBoost files...');
  
  // Create the directory structure
  const vekstboostDir = path.join(cwd, 'lib', 'vekstboost');
  
  if (!fs.existsSync(path.join(cwd, 'lib'))) {
    fs.mkdirSync(path.join(cwd, 'lib'));
  }
  
  if (!fs.existsSync(vekstboostDir)) {
    fs.mkdirSync(vekstboostDir);
  }
  
  // Copy the core VekstBoost files from the npm package
  const packageDir = path.join(__dirname, '..');
  
  const coreFiles = [
    'index.ts',
    'BlogDisplay.tsx',
  ];
  
  for (const file of coreFiles) {
    const sourcePath = path.join(packageDir, file);
    const targetPath = path.join(vekstboostDir, file);
    
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`✅ Installed: lib/vekstboost/${file}`);
    } else {
      throw new Error(`Required file not found: ${file}`);
    }
  }
  
  // Install the blog module if requested
  if (config.installBlog) {
    const blogDir = path.join(cwd, 'app', 'blog');
    
    if (!fs.existsSync(path.join(cwd, 'app'))) {
      throw new Error('App directory not found. Make sure you are using Next.js App Router.');
    }
    
    if (!fs.existsSync(blogDir)) {
      fs.mkdirSync(blogDir);
    }
    
    const slugDir = path.join(blogDir, '[slug]');
    if (!fs.existsSync(slugDir)) {
      fs.mkdirSync(slugDir);
    }
    
    // Copy the blog page files
    const blogPagePath = path.join(blogDir, 'page.tsx');
    const blogPostPagePath = path.join(slugDir, 'page.tsx');
    
    // Create blog page with the current configuration
    const blogPageContent = `import { Metadata } from 'next';
import BlogDisplay from '@/lib/vekstboost/BlogDisplay';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read our latest articles and updates.',
};

export default function BlogPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Blog</h1>
      <p className="text-gray-600 mb-8">Read our latest articles and updates</p>
      
      {/* VekstBoost powered blog content - all articles generated automatically */}
      <BlogDisplay 
        config={{
          siteId: '${config.siteId}',
          apiKey: process.env.VEKSTBOOST_API_KEY || '${config.apiKey}',
          discordWebhookUrl: process.env.DISCORD_WEBHOOK_URL,
          industries: ${JSON.stringify(config.industries)},
          language: '${config.language}',
        }}
        postsPerPage={6}
        layoutType="grid"
        className="mt-8"
      />

      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500">
          Powered by VekstBoost AI Content Engine
        </p>
      </div>
    </main>
  );
}`;
    
    fs.writeFileSync(blogPagePath, blogPageContent);
    console.log('✅ Installed: app/blog/page.tsx');
    
    // Create the blog post template file
    const blogPostPageContent = `'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createVekstBoost } from '@/lib/vekstboost';
import { notFound } from 'next/navigation';

type BlogPostProps = {
  params: {
    slug: string;
  };
};

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

export default function BlogPostPage({ params }: BlogPostProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchBlogPost = async () => {
      setLoading(true);
      try {
        const vekstBoost = createVekstBoost({
          siteId: '${config.siteId}',
          apiKey: process.env.NEXT_PUBLIC_VEKSTBOOST_API_KEY || '${config.apiKey}',
          language: '${config.language}',
        });
        
        await vekstBoost.initialize();
        
        // For the demo, we'll simulate fetching a specific post
        // In production, this would call a specific API endpoint
        const allPosts = await vekstBoost.getLatestContent('blog', 20);
        const foundPost = allPosts.find(p => p.slug === params.slug);
        
        if (!foundPost) {
          notFound();
        }
        
        setPost(foundPost);
      } catch (err) {
        console.error('Failed to fetch blog post:', err);
        setError('Could not load the blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogPost();
  }, [params.slug]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }
  
  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-24">
          <p className="text-red-500">{error || 'Blog post not found'}</p>
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
            {new Date(post.publishedAt).toLocaleDateString('${config.language === 'no' ? 'no-NO' : 'en-US'}', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </time>
          
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {post.categories.map((category) => (
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
}`;
    
    fs.writeFileSync(blogPostPagePath, blogPostPageContent);
    console.log('✅ Installed: app/blog/[slug]/page.tsx');
  }
  
  // Install lead capture module if requested
  if (config.installLeadCapture) {
    // We could add lead capture form implementation here
    console.log('ℹ️ Lead capture module installation will be added in a future update.');
  }
  
  return true;
}

// Update .env file with VekstBoost configuration
async function updateEnvFile(): Promise<boolean> {
  console.log('\n📝 Updating environment variables...');
  
  const envPath = path.join(cwd, '.env.local');
  let envContent = '';
  
  // Read existing .env file if it exists
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }
  
  // Add VekstBoost variables if they don't exist
  if (!envContent.includes('VEKSTBOOST_API_KEY')) {
    envContent += `\n# VekstBoost Growth Engine Configuration\nVEKSTBOOST_API_KEY=${config.apiKey}\n`;
  }
  
  if (config.discordWebhookUrl && !envContent.includes('DISCORD_WEBHOOK_URL')) {
    envContent += `DISCORD_WEBHOOK_URL=${config.discordWebhookUrl}\n`;
  }
  
  // Write the updated .env file
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Updated: .env.local');
  
  return true;
}

// Display next steps to the user
function displayNextSteps(): void {
  console.log('\n🎉 VekstBoost Growth Engine installation complete!');
  console.log('\nNext steps:');
  console.log('1. Run your application: npm run dev');
  
  if (config.installBlog) {
    console.log('2. Visit http://localhost:3000/blog to see your AI-powered blog');
  }
  
  console.log('\nFor more information and documentation, visit: https://vekstboost.com/docs');
  
  process.exit(0);
} 