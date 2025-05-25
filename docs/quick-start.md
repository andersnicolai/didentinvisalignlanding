# VekstBoost Quick Start Guide

Welcome to VekstBoost - the AI-powered growth engine that revolutionizes how you generate content and capture leads across multiple websites.

## Installation

### Option 1: Install with npx (Recommended)

The easiest way to install VekstBoost is using the npx installation script:

```bash
npx vekstboost-install
```

This interactive installer will guide you through the setup process and configure your Next.js project automatically.

### Option 2: Manual Installation

If you prefer to install manually:

1. Install the package:

```bash
npm install vekstboost
```

2. Create a VekstBoost directory in your project:

```bash
mkdir -p lib/vekstboost
```

3. Create the necessary files (see full documentation for details)

## Basic Usage

### 1. Add VekstBoost to your .env file

```
# .env.local
VEKSTBOOST_API_KEY=your-api-key-here
DISCORD_WEBHOOK_URL=your-discord-webhook-url
```

### 2. Create a Blog Page

Create a blog page at `app/blog/page.tsx`:

```tsx
import { Metadata } from 'next';
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
      
      <BlogDisplay 
        config={{
          siteId: 'your-site-id',
          apiKey: process.env.VEKSTBOOST_API_KEY || 'demo-key',
          discordWebhookUrl: process.env.DISCORD_WEBHOOK_URL,
          industries: ['your-industry'],
          language: 'en',
        }}
        postsPerPage={6}
        layoutType="grid"
        className="mt-8"
      />
    </main>
  );
}
```

### 3. Add Lead Tracking to Your Forms

Enhance your contact forms with VekstBoost lead tracking:

```tsx
'use client';

import { useState } from 'react';
import { createVekstBoost } from '@/lib/vekstboost';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Initialize VekstBoost
    const vekstBoost = createVekstBoost({
      siteId: 'your-site-id',
      apiKey: process.env.NEXT_PUBLIC_VEKSTBOOST_API_KEY,
    });
    
    await vekstBoost.initialize();
    
    // Track the lead
    await vekstBoost.trackLead({
      ...formData,
      source: 'contact-form',
      timestamp: new Date().toISOString(),
    });
    
    // Continue with your form handling logic
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields here */}
    </form>
  );
}
```

## Configuration Options

VekstBoost can be configured with various options:

```tsx
const vekstBoost = createVekstBoost({
  siteId: 'your-site-id',              // Required: Unique identifier for your site
  apiKey: 'your-api-key',              // Required: Your VekstBoost API key
  discordWebhookUrl: 'webhook-url',    // Optional: Discord webhook for notifications
  contentTypes: ['blog', 'service'],   // Optional: Types of content to generate
  industries: ['dental', 'healthcare'], // Optional: Industries for targeted content
  language: 'en',                      // Optional: 'en', 'no', 'sv', or 'da'
  automaticPosting: true,              // Optional: Enable auto content posting
  postingFrequency: 'weekly',          // Optional: 'daily', 'weekly', 'biweekly', 'monthly'
  seoOptimization: true,               // Optional: Optimize content for SEO
});
```

## Next Steps

- Check out our [full documentation](https://vekstboost.com/docs) for advanced usage
- Join our [Discord community](https://discord.gg/vekstboost) for support
- Visit the [VekstBoost dashboard](https://dashboard.vekstboost.com) to manage your content

---

Made with ❤️ by OnedevConsultancy AS 