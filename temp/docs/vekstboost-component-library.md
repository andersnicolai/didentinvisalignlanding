# VekstBoost Component Library & Growth Platform

## Vision: One-Click Website Components with Built-in Growth Engine

This document outlines our strategy for creating a comprehensive component library that allows for one-click installation of pre-built, growth-optimized website components across multiple client websites.

## Core Concept

VekstBoost will evolve from a content generation engine into a complete component library and growth platform, allowing us to:

1. Deploy standardized components across all client websites
2. Connect all components to a central management system
3. Capture leads and generate content automatically
4. Provide a unified dashboard for all client analytics
5. Generate entire website sections with a single command

## Implementation Strategy

### Phase 1: Component Library Foundation

#### Step 1: Set up the GitHub Repository

```bash
# Create a new GitHub repository
git init vekstboost-components
cd vekstboost-components

# Set up basic structure
mkdir -p components/{forms,booking,blog,testimonials,headers,footers}
mkdir -p lib/{api,utils,config}
mkdir -p scripts/install
```

#### Step 2: Create Base Component Structure

Example component structure:

```
components/
  ├── forms/
  │   ├── ContactForm.tsx       # Basic contact form
  │   ├── BookingForm.tsx       # Appointment booking
  │   ├── LeadCaptureForm.tsx   # Lead magnet signup
  │   └── QuoteRequestForm.tsx  # Service quote
  ├── blog/
  │   ├── BlogList.tsx          # Blog listing component
  │   ├── BlogPost.tsx          # Single post display
  │   └── BlogCategories.tsx    # Category navigation
  ├── booking/
  │   ├── Calendar.tsx          # Calendar view
  │   ├── TimeSlotPicker.tsx    # Time selection
  │   └── ServiceSelector.tsx   # Service selection
  └── ...
```

#### Step 3: Create NPX Installation Scripts

Create a CLI tool that installs components:

```javascript
// scripts/install/index.js
#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const prompts = require('prompts');

program
  .name('vekstboost-install')
  .description('Install VekstBoost components in your Next.js project')
  .version('0.1.0');

program
  .command('form <type>')
  .description('Install a form component')
  .action(async (type) => {
    // Ask for configuration
    const response = await prompts([
      {
        type: 'text',
        name: 'siteId',
        message: 'Enter your site ID:'
      },
      {
        type: 'text',
        name: 'discordWebhook',
        message: 'Discord webhook URL for notifications (optional):'
      }
    ]);
    
    // Create component files
    installFormComponent(type, response);
  });

program.parse();

function installFormComponent(type, config) {
  console.log(`Installing ${type} form component...`);
  
  // Copy form component
  // Set up API integration
  // Update environment variables
  
  console.log('✅ Form component installed successfully!');
}
```

### Phase 2: Central API & Management System

#### Step 1: Design API Schema

```typescript
// API endpoints for form submissions
interface FormSubmission {
  siteId: string;
  formType: 'contact' | 'booking' | 'quote';
  data: Record<string, any>;
  timestamp: string;
  source: {
    url: string;
    referrer?: string;
  };
}

// API endpoints for analytics
interface Analytics {
  siteId: string;
  pageViews: number;
  conversionRate: number;
  topReferrers: string[];
  // ...
}
```

#### Step 2: Create Central Dashboard

- Build admin dashboard for managing multiple sites
- Implement analytics visualization
- Add lead management interface

#### Step 3: AI Generation Layer

Add commands for generating complete pages:

```bash
npx vekstboost-generate page about-us --company="XK Malerfirma" --industry="painting"
```

This would:
1. Generate an About Us page with appropriate content
2. Install required components
3. Set up the necessary routes and configuration

### Phase 3: Theme System & White-Labeling

Create a JSON-based configuration system that allows each client to have their own styling:

```json
{
  "siteId": "xkmalerfirma",
  "brandColors": {
    "primary": "#1a73e8",
    "secondary": "#f4b400",
    "accent": "#34a853"
  },
  "typography": {
    "headingFont": "Montserrat",
    "bodyFont": "Open Sans"
  },
  "logo": {
    "light": "/images/logo-light.svg",
    "dark": "/images/logo-dark.svg"
  },
  "industry": "painting",
  "contact": {
    "email": "kontakt@xkmalerfirma.no",
    "phone": "+47 98765432",
    "address": "Oslo, Norway"
  }
}
```

## Component Examples

### Contact Form with Built-in Lead Tracking

```tsx
import { useState } from 'react';
import { trackLead } from '@vekstboost/api';

export const ContactForm = ({ 
  siteId, 
  discordWebhook, 
  redirectUrl, 
  formFields = ['name', 'email', 'phone', 'message'] 
}) => {
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      // Submit to VekstBoost API
      await trackLead({
        siteId,
        formType: 'contact',
        data: formData,
        timestamp: new Date().toISOString(),
        source: {
          url: window.location.href,
          referrer: document.referrer
        }
      });
      
      setStatus('success');
      
      // Redirect if specified
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    } catch (error) {
      setStatus('error');
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="vekstboost-form">
      {formFields.includes('name') && (
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
      )}
      
      {/* Other form fields */}
      
      <button 
        type="submit" 
        disabled={status === 'submitting'}
        className="submit-button"
      >
        {status === 'submitting' ? 'Sending...' : 'Send'}
      </button>
      
      {status === 'success' && (
        <div className="success-message">Thank you for your message!</div>
      )}
      
      {status === 'error' && (
        <div className="error-message">Something went wrong. Please try again.</div>
      )}
    </form>
  );
};
```

### Automated Ad Creation & Publishing

VekstBoost includes a powerful ad generation system that creates platform-specific ads and publishes them directly to social media platforms:

```bash
# Generate and publish a Facebook/Instagram ad
npx vekstboost-generate ad social --product="Invisalign" --platform="facebook,instagram" --publish

# Generate an ad set with multiple variations
npx vekstboost-generate ad set --service="House Painting" --variations=5 --style="modern"
```

The system handles everything automatically:

1. **Image Selection & Customization**: Selects relevant images from Unsplash/Pexels or client's library
2. **Text Generation**: Creates compelling ad copy based on the client's industry and offering
3. **Image Editing**: Adds branded text overlays, logos, and CTAs 
4. **Size Adaptation**: Generates variations in different aspect ratios for each platform
5. **Direct Publishing**: Publishes directly to Meta Ads, Google Ads, LinkedIn, etc.
6. **Performance Tracking**: Monitors ad performance and suggests improvements

This eliminates the need for separate tools like Predis or AdCreative, as the entire workflow is integrated into the VekstBoost ecosystem.

```tsx
import { useState } from 'react';
import { generateAd, publishToMeta } from '@vekstboost/ads';

export const AdGenerator = ({ 
  siteId,
  apiKey,
  industry = 'general',
  style = 'modern',
  onGenerate
}) => {
  const [adParams, setAdParams] = useState({
    headline: '',
    description: '',
    product: '',
    cta: 'Learn More',
    platforms: ['facebook', 'instagram']
  });
  const [generatedAds, setGeneratedAds] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      // Generate ads using AI
      const ads = await generateAd({
        siteId,
        apiKey,
        params: adParams,
        industry,
        style,
        variationCount: 3
      });
      
      setGeneratedAds(ads);
      if (onGenerate) onGenerate(ads);
    } catch (error) {
      console.error('Ad generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (adId) => {
    try {
      // Publish directly to Meta
      const ad = generatedAds.find(a => a.id === adId);
      const result = await publishToMeta({
        siteId,
        apiKey,
        adData: ad,
        platforms: adParams.platforms
      });
      
      console.log('Ad published successfully:', result);
    } catch (error) {
      console.error('Publishing failed:', error);
    }
  };

  return (
    <div className="vekstboost-ad-generator">
      {/* UI for ad generator */}
    </div>
  );
};
```

## Technical Requirements

1. **NPM Package Structure:**
   - Main package with core functionality
   - Separate packages for specialized components

2. **Infrastructure:**
   - API server hosted on Vercel/Railway
   - MongoDB/Postgres for data storage
   - Discord integration for notifications
   - OpenAI API for content generation

3. **Client Requirements:**
   - Next.js 13+ with App Router
   - React 18+
   - Environment variables for API keys

## Monetization Strategy

1. **Tiered Pricing Model:**
   - Free tier: Basic components, limited sites
   - Pro tier: Advanced components, multiple sites, analytics
   - Agency tier: White-label, unlimited sites, API access

2. **Value-First Approach:**
   - Deploy components on client sites before they are paying clients
   - Capture real leads and demonstrate value
   - Convert to paid plans once value is proven

## Competitive Advantage

Unlike traditional page builders or component libraries:

1. **Growth-First:** Every component is designed to capture leads and drive growth
2. **Centralized Management:** All client sites connect to one dashboard
3. **AI-Powered:** Content and layouts automatically generated
4. **Agency-Focused:** Built for managing multiple client websites efficiently

## Roadmap

**Q1: Foundation**
- Build core component library (Forms, Blog, Booking)
- Set up central API for lead tracking
- Create basic installation scripts

**Q2: Expansion**
- Add AI-powered generation capabilities
- Implement dashboard for analytics
- Create theme system for white-labeling

**Q3: Advanced Features**
- Add industry-specific templates
- Implement A/B testing framework
- Create advanced analytics

**Q4: Ecosystem**
- Build marketplace for custom components
- Create integration ecosystem with third-party tools
- Implement advanced AI features

## Getting Started

To start building the VekstBoost component library:

1. Create the GitHub repository structure
2. Build the core components (forms, blog)
3. Implement the NPX installation script
4. Set up the central API for data processing
5. Create documentation and examples

This system will revolutionize how we build and manage client websites, turning standard website components into powerful growth engines that automatically generate leads and content.

---

*© Onedev Consultancy AS* 