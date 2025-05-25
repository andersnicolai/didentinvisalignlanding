import { Metadata } from 'next';
import BlogDisplay from '@/lib/vekstboost/BlogDisplay';

export const metadata: Metadata = {
  title: 'Blog | Dident Tannklinikk',
  description: 'Les om tannhelse, Invisalign, og andre tannbehandlinger fra Dident Tannklinikk.',
};

export default function BlogPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Blogg</h1>
      <p className="text-gray-600 mb-8">Les våre siste artikler om tannhelse og behandlinger</p>
      
      {/* VekstBoost powered blog content - all articles generated automatically */}
      <BlogDisplay 
        config={{
          siteId: 'dident-tannklinikk',
          apiKey: process.env.VEKSTBOOST_API_KEY || 'demo-key',
          discordWebhookUrl: process.env.DISCORD_WEBHOOK_URL,
          industries: ['dental', 'healthcare'],
          language: 'no',
        }}
        postsPerPage={6}
        layoutType="grid"
        className="mt-8"
      />

      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500">
          Denne bloggen er drevet av VekstBoost AI Content Engine
        </p>
      </div>
    </main>
  );
} 