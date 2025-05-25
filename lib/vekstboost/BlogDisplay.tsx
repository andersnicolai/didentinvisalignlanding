'use client';

import React, { useEffect, useState } from 'react';
import { createVekstBoost, type VekstBoostConfig } from './index';
import Image from 'next/image';
import Link from 'next/link';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  mainImage: {
    url: string;
    alt: string;
  };
  categories: string[];
};

type BlogDisplayProps = {
  config: VekstBoostConfig;
  postsPerPage?: number;
  showCategories?: boolean;
  showDates?: boolean;
  layoutType?: 'grid' | 'list';
  className?: string;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('no-NO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};

export const BlogDisplay: React.FC<BlogDisplayProps> = ({
  config,
  postsPerPage = 3,
  showCategories = true,
  showDates = true,
  layoutType = 'grid',
  className = '',
}) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      try {
        const vekstBoost = createVekstBoost(config);
        await vekstBoost.initialize();
        const blogPosts = await vekstBoost.getLatestContent('blog', postsPerPage);
        setPosts(blogPosts);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch blog posts:', err);
        setError('Could not load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, [config, postsPerPage]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p>No blog posts available yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {layoutType === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogPostCard 
              key={post.id}
              post={post}
              showCategories={showCategories}
              showDate={showDates}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <BlogPostListItem
              key={post.id}
              post={post}
              showCategories={showCategories}
              showDate={showDates}
            />
          ))}
        </div>
      )}
    </div>
  );
};

type BlogPostCardProps = {
  post: BlogPost;
  showCategories: boolean;
  showDate: boolean;
};

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, showCategories, showDate }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-48 w-full">
          <Image
            src={post.mainImage.url}
            alt={post.mainImage.alt}
            fill
            className="object-cover"
          />
        </div>
      </Link>
      <div className="p-6">
        {showCategories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
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
        <h3 className="text-xl font-bold mb-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-3">{post.excerpt}</p>
        {showDate && (
          <p className="text-sm text-gray-500">{formatDate(post.publishedAt)}</p>
        )}
      </div>
    </div>
  );
};

const BlogPostListItem: React.FC<BlogPostCardProps> = ({ post, showCategories, showDate }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 border-b pb-8">
      <Link href={`/blog/${post.slug}`} className="md:w-1/3 flex-shrink-0">
        <div className="relative h-48 w-full rounded-lg overflow-hidden">
          <Image
            src={post.mainImage.url}
            alt={post.mainImage.alt}
            fill
            className="object-cover"
          />
        </div>
      </Link>
      <div className="md:w-2/3">
        {showCategories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
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
        <h3 className="text-xl font-bold mb-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        {showDate && (
          <p className="text-sm text-gray-500">{formatDate(post.publishedAt)}</p>
        )}
      </div>
    </div>
  );
};

export default BlogDisplay; 