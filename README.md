# 🦁 VekstBoost Growth Engine

## Automate Content Generation Across Multiple Websites

VekstBoost is a revolutionary AI-powered growth system that automates content generation, lead capture, and marketing optimization. Unlike traditional tools that require constant human oversight, VekstBoost works autonomously to deliver real results with a single click.

![VekstBoost Banner](https://vekstboost.com/banner.png)

## 🚀 Quick Start

### Install in your Next.js project:

```bash
# NPX installation
npx vekstboost-install

# Or with npm
npm install vekstboost
npx vekstboost-install
```

The installation wizard will guide you through setting up VekstBoost in your project.

## ✨ Key Features

### 🤖 AI-Powered Content Generation
- **One-Click Articles**: Generate high-quality blog posts with a single click
- **Industry-Specific**: Content tailored to your business category
- **SEO Optimized**: Built for maximum search visibility

### 📈 Lead Capture & Notification
- **Discord Integration**: Get instant notifications for new leads
- **Lead Tracking**: Complete attribution and analytics
- **Automated Follow-up**: Keep leads engaged automatically

### 🔄 Multi-Site Management
- **Central Dashboard**: Manage content across multiple websites
- **Consistent Branding**: Maintain voice consistency across properties
- **Scheduled Publishing**: Automatic content calendar management

## 🛠️ Usage

### Display Blog Content

```tsx
import BlogDisplay from '@/lib/vekstboost/BlogDisplay';

export default function BlogPage() {
  return (
    <div className="container">
      <h1>Blog</h1>
      
      <BlogDisplay 
        config={{
          siteId: 'your-site-id',
          apiKey: process.env.VEKSTBOOST_API_KEY,
          industries: ['your-industry'],
          language: 'en',
        }}
        postsPerPage={6}
        layoutType="grid"
      />
    </div>
  );
}
```

### Track Lead Submissions

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

## 🌟 The Value-First Approach

What makes VekstBoost unique is our value-first approach:

1. **Deploy on Client Subdomains**: Install VekstBoost on client sites before they become paying clients
2. **Generate Real Leads**: Start capturing and delivering leads immediately
3. **Demonstrate Value**: Show tangible results before asking for payment
4. **Scale Effortlessly**: Add new sites with minimal configuration

## 📋 Configuration Options

| Option | Description | Default |
|--------|-------------|---------|
| `siteId` | Unique identifier for your site | Required |
| `apiKey` | Your VekstBoost API key | Required |
| `discordWebhookUrl` | Discord webhook for notifications | Optional |
| `contentTypes` | Types of content to generate | `['blog']` |
| `industries` | Industries relevant to your business | `[]` |
| `language` | Primary language for content | `'en'` |
| `automaticPosting` | Enable automatic content posting | `true` |
| `postingFrequency` | How often to post new content | `'weekly'` |
| `seoOptimization` | Optimize content for search engines | `true` |

## 🛡️ Requirements

- Next.js 13+ with App Router
- React 18+
- Node.js 16+

## 🤝 Support

For questions, additional documentation, or custom integrations, visit [vekstboost.com](https://vekstboost.com) or contact support@vekstboost.com.

## 📝 License

MIT

---

*Developed by OnedevConsultancy AS*
