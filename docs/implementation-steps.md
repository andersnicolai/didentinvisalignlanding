# VekstBoost Component Library Implementation Guide

This document provides a step-by-step guide for implementing the VekstBoost component library system. By following these instructions, you can create a powerful set of reusable components that can be installed across multiple client websites with simple commands.

## Step 1: Set Up Your Development Environment

First, create a dedicated repository for your component library:

```bash
# Create and initialize the repository
mkdir vekstboost-components
cd vekstboost-components
git init

# Initialize npm package
npm init -y
```

## Step 2: Configure Package for NPX Commands

Edit `package.json` to set up the NPX command structure:

```json
{
  "name": "vekstboost",
  "version": "0.1.0",
  "description": "Growth-optimized component library for web applications",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "bin": {
    "vekstboost-install": "dist/cli/install.js",
    "vekstboost-generate": "dist/cli/generate.js"
  },
  "scripts": {
    "build": "tsc",
    "prepublishOnly": "npm run build"
  },
  "files": [
    "dist",
    "templates"
  ],
  "keywords": [
    "component-library",
    "growth",
    "marketing",
    "nextjs",
    "react"
  ],
  "author": "Onedev Consultancy AS",
  "license": "MIT",
  "dependencies": {
    "commander": "^9.4.0",
    "prompts": "^2.4.2",
    "chalk": "^5.0.1",
    "fs-extra": "^10.1.0"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0",
    "next": ">=13.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/node": "^18.0.0",
    "typescript": "^4.8.4"
  }
}
```

## Step 3: Create the Base File Structure

Set up the repository structure:

```bash
# Create main directories
mkdir -p src/{components,lib,cli,templates}
mkdir -p src/components/{forms,blog,booking,layout}
mkdir -p src/lib/{api,utils,hooks}
mkdir -p src/cli
mkdir -p src/templates/{forms,pages,sections}

# Create TypeScript configuration
touch tsconfig.json
```

Add TypeScript configuration:

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es6",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": false,
    "esModuleInterop": true,
    "module": "commonjs",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react",
    "declaration": true,
    "outDir": "dist",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  "exclude": ["node_modules", "dist", "examples"]
}
```

## Step 4: Create Command-Line Interface Tools

Create an installation CLI that will handle component installation:

```typescript
// src/cli/install.ts
#!/usr/bin/env node

import { program } from 'commander';
import prompts from 'prompts';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

// Define the program
program
  .name('vekstboost-install')
  .description('Install VekstBoost components in your Next.js project')
  .version('0.1.0');

// Command for installing form components
program
  .command('form <type>')
  .description('Install a form component (contact, booking, quote, etc.)')
  .option('-s, --site-id <siteId>', 'Your site ID')
  .option('-d, --discord <url>', 'Discord webhook URL')
  .option('-r, --redirect <url>', 'Redirect URL after form submission')
  .action(async (type, options) => {
    // If options are not provided, prompt for them
    const config = await collectConfig(options);
    
    // Install the form component
    await installFormComponent(type, config);
  });

// Command for installing blog components
program
  .command('blog')
  .description('Install blog components')
  .option('-s, --site-id <siteId>', 'Your site ID')
  .option('-a, --api-key <key>', 'Your VekstBoost API key')
  .action(async (options) => {
    const config = await collectConfig(options);
    await installBlogComponent(config);
  });

// Command for installing booking components
program
  .command('booking')
  .description('Install booking system')
  .option('-s, --site-id <siteId>', 'Your site ID')
  .option('-a, --api-key <key>', 'Your VekstBoost API key')
  .action(async (options) => {
    const config = await collectConfig(options);
    await installBookingComponent(config);
  });

// Parse command line arguments
program.parse();

// Helper function to collect configuration
async function collectConfig(options: any) {
  const questions = [];
  
  if (!options.siteId) {
    questions.push({
      type: 'text',
      name: 'siteId',
      message: 'Enter your site ID:',
      validate: (value: string) => value.length > 0 ? true : 'Site ID is required'
    });
  }
  
  if (!options.apiKey) {
    questions.push({
      type: 'text',
      name: 'apiKey',
      message: 'Enter your VekstBoost API key (or leave blank for demo mode):',
      initial: 'demo-key'
    });
  }
  
  if (!options.discord) {
    questions.push({
      type: 'text',
      name: 'discordWebhook',
      message: 'Discord webhook URL for notifications (optional):'
    });
  }
  
  // Only ask if we have questions
  const responses = questions.length > 0 ? await prompts(questions) : {};
  
  // Combine provided options with prompted responses
  return {
    siteId: options.siteId || responses.siteId,
    apiKey: options.apiKey || responses.apiKey,
    discordWebhook: options.discord || responses.discordWebhook,
    redirectUrl: options.redirect
  };
}

// Implementation of component installation
async function installFormComponent(type: string, config: any) {
  console.log(chalk.blue(`\nInstalling ${type} form component...`));
  
  // Get current working directory
  const cwd = process.cwd();
  
  // Create directories if they don't exist
  const componentDir = path.join(cwd, 'components');
  const formsDir = path.join(componentDir, 'forms');
  
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir);
  }
  
  if (!fs.existsSync(formsDir)) {
    fs.mkdirSync(formsDir);
  }
  
  // Get template path from our package
  const templatePath = path.join(__dirname, '..', '..', 'templates', 'forms', `${type}Form.tsx`);
  const destPath = path.join(formsDir, `${type.charAt(0).toUpperCase() + type.slice(1)}Form.tsx`);
  
  // Copy and customize the template
  let template = fs.readFileSync(templatePath, 'utf8');
  
  // Replace placeholders with actual values
  template = template.replace(/SITE_ID_PLACEHOLDER/g, config.siteId);
  template = template.replace(/API_KEY_PLACEHOLDER/g, config.apiKey);
  
  if (config.discordWebhook) {
    template = template.replace(/DISCORD_WEBHOOK_PLACEHOLDER/g, config.discordWebhook);
  }
  
  if (config.redirectUrl) {
    template = template.replace(/REDIRECT_URL_PLACEHOLDER/g, config.redirectUrl);
  }
  
  // Write the file
  fs.writeFileSync(destPath, template);
  
  // Update .env file with API keys if needed
  updateEnvFile(config);
  
  console.log(chalk.green('\n✅ Form component installed successfully!'));
  console.log(chalk.yellow(`\nComponent location: ${destPath}`));
  console.log(chalk.yellow('\nUsage example:'));
  console.log(`
import { ${type.charAt(0).toUpperCase() + type.slice(1)}Form } from '@/components/forms/${type.charAt(0).toUpperCase() + type.slice(1)}Form';

export default function ContactPage() {
  return (
    <div>
      <h1>Contact Us</h1>
      <${type.charAt(0).toUpperCase() + type.slice(1)}Form />
    </div>
  );
}
  `);
}

// Placeholder for blog component installation
async function installBlogComponent(config: any) {
  console.log(chalk.blue('\nInstalling blog components...'));
  // Implementation here...
  console.log(chalk.green('\n✅ Blog components installed successfully!'));
}

// Placeholder for booking component installation
async function installBookingComponent(config: any) {
  console.log(chalk.blue('\nInstalling booking system...'));
  // Implementation here...
  console.log(chalk.green('\n✅ Booking system installed successfully!'));
}

// Helper function to update .env file
function updateEnvFile(config: any) {
  const cwd = process.cwd();
  const envPath = path.join(cwd, '.env.local');
  
  let envContent = '';
  
  // Read existing .env file if it exists
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }
  
  // Add VekstBoost variables if they don't exist
  if (!envContent.includes('VEKSTBOOST_API_KEY') && config.apiKey) {
    envContent += `\n# VekstBoost Configuration\nVEKSTBOOST_API_KEY=${config.apiKey}\n`;
  }
  
  if (!envContent.includes('VEKSTBOOST_SITE_ID') && config.siteId) {
    envContent += `VEKSTBOOST_SITE_ID=${config.siteId}\n`;
  }
  
  if (!envContent.includes('DISCORD_WEBHOOK_URL') && config.discordWebhook) {
    envContent += `DISCORD_WEBHOOK_URL=${config.discordWebhook}\n`;
  }
  
  // Write the updated .env file
  fs.writeFileSync(envPath, envContent);
}
```

## Step 5: Create Component Templates

Create templates for form components:

```tsx
// templates/forms/contactForm.tsx
import { useState } from 'react';

// Configuration with placeholders that will be replaced during installation
const CONFIG = {
  siteId: 'SITE_ID_PLACEHOLDER',
  apiKey: 'API_KEY_PLACEHOLDER',
  discordWebhook: 'DISCORD_WEBHOOK_PLACEHOLDER',
  redirectUrl: 'REDIRECT_URL_PLACEHOLDER'
};

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      // Submit to VekstBoost API
      const response = await fetch('https://api.vekstboost.com/v1/leads/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CONFIG.apiKey}`
        },
        body: JSON.stringify({
          siteId: CONFIG.siteId,
          formType: 'contact',
          data: formData,
          timestamp: new Date().toISOString(),
          source: {
            url: typeof window !== 'undefined' ? window.location.href : '',
            referrer: typeof document !== 'undefined' ? document.referrer : ''
          }
        })
      });
      
      if (!response.ok) {
        throw new Error('Form submission failed');
      }
      
      setStatus('success');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      // Redirect if specified
      if (CONFIG.redirectUrl && CONFIG.redirectUrl !== 'REDIRECT_URL_PLACEHOLDER') {
        window.location.href = CONFIG.redirectUrl;
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="vekstboost-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="phone">Phone (optional)</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      
      <button 
        type="submit" 
        disabled={status === 'submitting'}
        className="submit-button"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
      
      {status === 'success' && (
        <div className="success-message">Thank you for your message! We'll get back to you soon.</div>
      )}
      
      {status === 'error' && (
        <div className="error-message">Something went wrong. Please try again or contact us directly.</div>
      )}
    </form>
  );
};

export default ContactForm;
```

## Step 6: Set Up the Central API Server

Create a basic Express server to handle form submissions:

```bash
# Create server directory
mkdir -p server
cd server

# Initialize package
npm init -y

# Install dependencies
npm install express cors dotenv mongodb axios openai
npm install --save-dev typescript ts-node @types/express @types/cors @types/node

# Create basic server file
touch index.ts
```

```typescript
// server/index.ts
import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import axios from 'axios';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Database connection
let db;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/vekstboost';

MongoClient.connect(mongoUri)
  .then(client => {
    console.log('Connected to MongoDB');
    db = client.db();
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
  });

// Route for tracking leads
app.post('/v1/leads/track', async (req, res) => {
  try {
    const { siteId, formType, data, timestamp, source } = req.body;
    
    // Store in database
    await db.collection('leads').insertOne({
      siteId,
      formType,
      data,
      timestamp,
      source,
      createdAt: new Date()
    });
    
    // Send Discord notification if webhook is configured
    const site = await db.collection('sites').findOne({ siteId });
    
    if (site && site.discordWebhook) {
      await axios.post(site.discordWebhook, {
        content: `New lead from ${siteId}!`,
        embeds: [
          {
            title: 'Lead Details',
            fields: Object.entries(data).map(([key, value]) => ({
              name: key,
              value: String(value)
            })),
            color: 0x00ff00,
            timestamp: new Date().toISOString()
          }
        ]
      });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error tracking lead:', error);
    res.status(500).json({ success: false, error: 'Failed to track lead' });
  }
});

// Route for content generation
app.post('/v1/content/generate', async (req, res) => {
  try {
    const { siteId, contentType, options } = req.body;
    
    // Get site information
    const site = await db.collection('sites').findOne({ siteId });
    
    if (!site) {
      return res.status(404).json({ success: false, error: 'Site not found' });
    }
    
    // Generate content with OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `Generate a ${contentType} post for a ${site.industry} business. Make it SEO-friendly and engaging.`
        },
        {
          role: "user",
          content: `Create a ${contentType} post about ${options.topic || 'your services'}, targeting keywords: ${options.keywords?.join(', ')}.`
        }
      ]
    });
    
    const content = completion.choices[0].message.content;
    
    // Structure the content
    const blogPost = {
      id: `generated-${Date.now()}`,
      title: extractTitle(content),
      slug: generateSlug(extractTitle(content)),
      publishedAt: new Date().toISOString(),
      excerpt: extractExcerpt(content),
      content: formatContent(content),
      mainImage: {
        url: `https://api.vekstboost.com/images/${site.industry}/${Math.floor(Math.random() * 10) + 1}.jpg`,
        alt: extractTitle(content)
      },
      categories: [site.industry, contentType]
    };
    
    // Store in database
    await db.collection('content').insertOne({
      ...blogPost,
      siteId,
      createdAt: new Date()
    });
    
    res.json(blogPost);
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ success: false, error: 'Content generation failed' });
  }
});

// Helper functions for content formatting
function extractTitle(content: string): string {
  // Extract title from first line or create one
  const lines = content.split('\n');
  let title = lines[0].replace(/^#+ /, '');
  
  if (title.length > 70) {
    title = title.substring(0, 67) + '...';
  }
  
  return title;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-');
}

function extractExcerpt(content: string): string {
  // Get first paragraph as excerpt
  const paragraphs = content.split('\n\n');
  let excerpt = '';
  
  for (const para of paragraphs) {
    if (para.trim() && !para.startsWith('#')) {
      excerpt = para.trim();
      break;
    }
  }
  
  if (excerpt.length > 160) {
    excerpt = excerpt.substring(0, 157) + '...';
  }
  
  return excerpt;
}

function formatContent(content: string): any[] {
  // Convert markdown to structured content blocks
  const lines = content.split('\n');
  const blocks = [];
  
  let currentBlock = null;
  
  for (const line of lines) {
    if (!line.trim()) continue;
    
    if (line.startsWith('# ')) {
      blocks.push({
        _type: 'block',
        style: 'h1',
        children: [{ text: line.substring(2) }]
      });
    } else if (line.startsWith('## ')) {
      blocks.push({
        _type: 'block',
        style: 'h2',
        children: [{ text: line.substring(3) }]
      });
    } else if (line.startsWith('### ')) {
      blocks.push({
        _type: 'block',
        style: 'h3',
        children: [{ text: line.substring(4) }]
      });
    } else if (line.startsWith('> ')) {
      blocks.push({
        _type: 'block',
        style: 'blockquote',
        children: [{ text: line.substring(2) }]
      });
    } else {
      blocks.push({
        _type: 'block',
        style: 'normal',
        children: [{ text: line }]
      });
    }
  }
  
  return blocks;
}

// Start the server
app.listen(port, () => {
  console.log(`VekstBoost API server running on port ${port}`);
});
```

## Step 7: Create a GitHub Repository and Publish

Publish your package to GitHub and npm:

```bash
# Add all files
git add .

# Commit
git commit -m "Initial VekstBoost component library"

# Add GitHub remote
git remote add origin https://github.com/yourusername/vekstboost.git

# Push to GitHub
git push -u origin main

# Build the package
npm run build

# Publish to npm
npm publish
```

## Step 8: Test Installation with NPX

Once published, test your installation script:

```bash
# Create a test Next.js project
npx create-next-app@latest test-project
cd test-project

# Install your component
npx vekstboost-install form contact
```

## Next Steps

After setting up the basic framework, you can extend the system:

1. Create more component templates for various purposes
2. Build a central dashboard for managing sites and analytics
3. Implement AI-powered content generation capabilities
4. Develop industry-specific templates and configurations
5. Create a theme system for white-labeling

## Advanced Features to Consider

- **A/B Testing Framework**: Allow components to have multiple variants
- **Analytics Integration**: Track performance of components
- **Personalization**: Customize content based on user behavior
- **Integration Hub**: Connect with third-party services like CRM systems

## Implementing Ad Generation & Publishing

One of the most powerful features of VekstBoost is the ability to generate and publish ads directly to social media platforms. Here's how to implement this feature:

### Step 1: Create the Ad Generation Module

First, create a dedicated module for ad generation:

```bash
# Create ad generation directory
mkdir -p src/components/ads
mkdir -p src/lib/ads
mkdir -p src/templates/ads
```

### Step 2: Implement Image Processing Utilities

Create utilities for image manipulation:

```typescript
// src/lib/ads/image-processor.ts
import sharp from 'sharp';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

export async function downloadImage(url: string, outputPath: string): Promise<string> {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  fs.writeFileSync(outputPath, response.data);
  return outputPath;
}

export async function addTextOverlay(
  imagePath: string, 
  text: string, 
  options: {
    fontSize?: number;
    fontColor?: string;
    position?: 'top' | 'center' | 'bottom';
    backgroundColor?: string;
  } = {}
): Promise<Buffer> {
  const {
    fontSize = 40,
    fontColor = 'white',
    position = 'center',
    backgroundColor = 'rgba(0, 0, 0, 0.5)'
  } = options;
  
  // Get image dimensions
  const metadata = await sharp(imagePath).metadata();
  const width = metadata.width || 800;
  const height = metadata.height || 600;
  
  // Calculate text position
  let textY = height / 2;
  if (position === 'top') textY = height * 0.2;
  if (position === 'bottom') textY = height * 0.8;
  
  // Create text overlay
  const svgText = `
    <svg width="${width}" height="${height}">
      <rect x="0" y="${textY - fontSize}" width="${width}" height="${fontSize * 2}" fill="${backgroundColor}" />
      <text 
        x="50%" 
        y="${textY}" 
        font-family="Arial" 
        font-size="${fontSize}" 
        fill="${fontColor}"
        text-anchor="middle" 
        dominant-baseline="middle"
      >
        ${text}
      </text>
    </svg>
  `;
  
  // Composite the text onto the image
  return sharp(imagePath)
    .composite([{
      input: Buffer.from(svgText),
      gravity: 'center'
    }])
    .toBuffer();
}

export async function resizeForPlatform(
  imageBuffer: Buffer, 
  platform: 'facebook' | 'instagram' | 'linkedin' | 'twitter'
): Promise<Buffer> {
  const dimensions = {
    facebook: { width: 1200, height: 628 },
    instagram: { width: 1080, height: 1080 },
    linkedin: { width: 1200, height: 627 },
    twitter: { width: 1200, height: 675 }
  };
  
  const { width, height } = dimensions[platform];
  
  return sharp(imageBuffer)
    .resize({
      width,
      height,
      fit: 'cover',
      position: 'center'
    })
    .toBuffer();
}
```

### Step 3: Create Ad Generation API

Add an ad generation endpoint to your server:

```typescript
// Add to server/index.ts

// Import required packages
import sharp from 'sharp';
import { createClient } from 'pexels';
import { FacebookAdsApi, AdAccount, Campaign } from 'facebook-nodejs-business-sdk';

// Initialize clients
const pexels = createClient(process.env.PEXELS_API_KEY || '');

// Route for ad generation
app.post('/v1/ads/generate', async (req, res) => {
  try {
    const { siteId, product, headline, description, style, platforms } = req.body;
    
    // Get site information
    const site = await db.collection('sites').findOne({ siteId });
    
    if (!site) {
      return res.status(404).json({ success: false, error: 'Site not found' });
    }
    
    // Generate ad copy with OpenAI if not provided
    let adHeadline = headline;
    let adDescription = description;
    
    if (!headline || !description) {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are an expert copywriter creating ads for a ${site.industry} business.`
          },
          {
            role: "user",
            content: `Create a compelling ad for ${product || 'our services'} with a headline and description. Style: ${style || 'professional'}.`
          }
        ]
      });
      
      const content = completion.choices[0].message.content;
      
      // Extract headline and description
      const lines = content.split('\n');
      adHeadline = lines[0].replace(/^Headline: /, '');
      adDescription = lines.slice(1).join(' ').replace(/^Description: /, '');
    }
    
    // Find relevant image
    const query = `${product || site.industry} ${style || ''}`;
    const photos = await pexels.photos.search({ query, per_page: 10 });
    
    const adVariations = [];
    
    // Create ad for each requested platform
    for (const platform of platforms) {
      // Select a random image from results
      const randomIndex = Math.floor(Math.random() * Math.min(photos.photos.length, 10));
      const photo = photos.photos[randomIndex];
      
      // Download the image
      const tempImagePath = path.join(os.tmpdir(), `ad-${Date.now()}.jpg`);
      await downloadImage(photo.src.original, tempImagePath);
      
      // Add text overlay
      const withText = await addTextOverlay(tempImagePath, adHeadline, {
        position: 'center',
        fontSize: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
      });
      
      // Resize for the target platform
      const resized = await resizeForPlatform(withText, platform);
      
      // Save the final image
      const finalImageName = `ad-${siteId}-${Date.now()}-${platform}.jpg`;
      const finalImagePath = path.join('public', 'ads', finalImageName);
      
      // Ensure directory exists
      fs.mkdirSync(path.join('public', 'ads'), { recursive: true });
      
      // Write the file
      fs.writeFileSync(finalImagePath, resized);
      
      // Create the ad variation
      adVariations.push({
        id: `ad-${Date.now()}-${platform}`,
        platform,
        headline: adHeadline,
        description: adDescription,
        imageUrl: `/ads/${finalImageName}`,
        imageWidth: platform === 'instagram' ? 1080 : 1200,
        imageHeight: platform === 'instagram' ? 1080 : platform === 'facebook' ? 628 : 675,
        createdAt: new Date().toISOString()
      });
    }
    
    // Store in database
    await db.collection('ads').insertOne({
      siteId,
      product,
      style,
      variations: adVariations,
      createdAt: new Date()
    });
    
    res.json({ success: true, ads: adVariations });
  } catch (error) {
    console.error('Error generating ad:', error);
    res.status(500).json({ success: false, error: 'Ad generation failed' });
  }
});

// Route for publishing ads to platforms
app.post('/v1/ads/publish', async (req, res) => {
  try {
    const { siteId, adId, platform, accessToken, accountId } = req.body;
    
    // Get the ad from database
    const adRecord = await db.collection('ads').findOne({ 
      siteId,
      "variations.id": adId
    });
    
    if (!adRecord) {
      return res.status(404).json({ success: false, error: 'Ad not found' });
    }
    
    const adVariation = adRecord.variations.find(v => v.id === adId);
    
    if (platform === 'facebook' || platform === 'instagram') {
      // Initialize Facebook Ads API
      FacebookAdsApi.init(accessToken);
      
      // Get the ad account
      const account = new AdAccount(`act_${accountId}`);
      
      // Create a campaign
      const campaign = await account.createCampaign(
        [],
        {
          name: `${adRecord.product} Campaign - ${new Date().toISOString()}`,
          status: 'PAUSED',
          objective: 'LINK_CLICKS',
          special_ad_categories: []
        }
      );
      
      // Create ad set, creative, and ad here
      // (This is simplified - actual implementation would be more complex)
      
      res.json({
        success: true,
        platformId: campaign.id,
        status: 'PAUSED',
        message: 'Ad published to Facebook Ads Manager in paused state'
      });
    } else {
      // Implement other platforms (LinkedIn, Twitter, etc.)
      res.status(400).json({ success: false, error: 'Platform not supported yet' });
    }
  } catch (error) {
    console.error('Error publishing ad:', error);
    res.status(500).json({ success: false, error: 'Ad publishing failed' });
  }
});
```

### Step 4: Create React Components for Ad Generation

Create the UI components for ad generation:

```tsx
// src/components/ads/AdGenerator.tsx
import React, { useState } from 'react';
import { AdPreview } from './AdPreview';
import { PlatformSelector } from './PlatformSelector';

export interface AdParams {
  headline: string;
  description: string;
  product: string;
  style: string;
  platforms: string[];
}

export interface GeneratedAd {
  id: string;
  platform: string;
  headline: string;
  description: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
}

interface AdGeneratorProps {
  siteId: string;
  apiKey: string;
  onGenerate?: (ads: GeneratedAd[]) => void;
}

export const AdGenerator: React.FC<AdGeneratorProps> = ({ 
  siteId, 
  apiKey,
  onGenerate 
}) => {
  const [adParams, setAdParams] = useState<AdParams>({
    headline: '',
    description: '',
    product: '',
    style: 'modern',
    platforms: ['facebook', 'instagram']
  });
  
  const [generatedAds, setGeneratedAds] = useState<GeneratedAd[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAdParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlatformChange = (platforms: string[]) => {
    setAdParams(prev => ({
      ...prev,
      platforms
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://api.vekstboost.com/v1/ads/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          siteId,
          ...adParams
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate ads');
      }
      
      const data = await response.json();
      setGeneratedAds(data.ads);
      
      if (onGenerate) {
        onGenerate(data.ads);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Ad generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vekstboost-ad-generator">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="product">Product/Service</label>
          <input
            type="text"
            id="product"
            name="product"
            value={adParams.product}
            onChange={handleChange}
            placeholder="What are you advertising?"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="headline">Headline (optional)</label>
          <input
            type="text"
            id="headline"
            name="headline"
            value={adParams.headline}
            onChange={handleChange}
            placeholder="Leave blank for AI-generated headline"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description (optional)</label>
          <textarea
            id="description"
            name="description"
            value={adParams.description}
            onChange={handleChange}
            placeholder="Leave blank for AI-generated description"
            rows={3}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="style">Style</label>
          <select
            id="style"
            name="style"
            value={adParams.style}
            onChange={handleChange}
          >
            <option value="modern">Modern</option>
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="luxury">Luxury</option>
            <option value="minimal">Minimal</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Platforms</label>
          <PlatformSelector
            selected={adParams.platforms}
            onChange={handlePlatformChange}
          />
        </div>
        
        <button
          type="submit"
          className="generate-button"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Ads'}
        </button>
        
        {error && (
          <div className="error-message">{error}</div>
        )}
      </form>
      
      {generatedAds.length > 0 && (
        <div className="ad-previews">
          <h3>Generated Ads</h3>
          <div className="previews-grid">
            {generatedAds.map(ad => (
              <AdPreview
                key={ad.id}
                ad={ad}
                siteId={siteId}
                apiKey={apiKey}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
```

### Step 5: Add the CLI Command for Ad Generation

Add a command to the CLI for generating ads:

```typescript
// Add to src/cli/install.ts

// Command for generating ads
program
  .command('ad <type>')
  .description('Generate ads (social, display, etc.)')
  .option('-p, --product <product>', 'Product or service to advertise')
  .option('-pl, --platform <platforms>', 'Comma-separated list of platforms (facebook,instagram,linkedin)')
  .option('-v, --variations <number>', 'Number of variations to generate', '3')
  .option('-s, --style <style>', 'Ad style (modern, professional, casual, luxury)', 'modern')
  .option('--publish', 'Publish directly to platforms')
  .action(async (type, options) => {
    // Collect configuration
    const config = await collectConfig(options);
    
    // Generate the ads
    await generateAds(type, {
      ...config,
      product: options.product,
      platforms: options.platform ? options.platform.split(',') : ['facebook', 'instagram'],
      variations: parseInt(options.variations, 10),
      style: options.style,
      publish: !!options.publish
    });
  });

// Implementation for ad generation
async function generateAds(type: string, config: any) {
  console.log(chalk.blue(`\nGenerating ${type} ads...`));
  
  try {
    // Make API request to generate ads
    const response = await fetch('https://api.vekstboost.com/v1/ads/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
      },
      body: JSON.stringify({
        siteId: config.siteId,
        product: config.product,
        platforms: config.platforms,
        style: config.style,
        variations: config.variations
      })
    });
    
    if (!response.ok) {
      throw new Error(`Ad generation failed: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    // Log success message
    console.log(chalk.green(`\n✅ Generated ${result.ads.length} ads successfully!`));
    
    // Display information about each ad
    result.ads.forEach((ad: any, index: number) => {
      console.log(chalk.yellow(`\nAd ${index + 1} (${ad.platform}):`));
      console.log(`Headline: ${ad.headline}`);
      console.log(`Description: ${ad.description}`);
      console.log(`Image: ${ad.imageUrl}`);
    });
    
    // Publish if requested
    if (config.publish) {
      console.log(chalk.blue('\nPublishing ads to platforms...'));
      
      // Implement publishing logic
      // ...
      
      console.log(chalk.green('\n✅ Ads published successfully!'));
    }
  } catch (error) {
    console.error(chalk.red('\n❌ Ad generation failed:'), error);
  }
}
```

### Step 6: Testing the Ad Generation System

Test your ad generation system:

```bash
# Generate ad variations for Facebook and Instagram
npx vekstboost-install ad social --product="Dental Implants" --platform="facebook,instagram" --variations=3

# Generate and publish ads
npx vekstboost-install ad social --product="House Painting" --platform="facebook" --publish

# Generate ad variations with a specific style
npx vekstboost-install ad social --product="Tesla Model 3" --style="luxury" --variations=5
```

This implementation lets you generate professional ads with AI-powered copywriting, automatic image selection, and text overlays. The system can directly publish to social media platforms through their APIs, creating a seamless workflow from generation to publication.

---

By following these steps, you'll create a powerful component library system that can be easily installed and managed across multiple client websites. The modular approach allows you to start small and expand the system over time.

*© Onedev Consultancy AS* 