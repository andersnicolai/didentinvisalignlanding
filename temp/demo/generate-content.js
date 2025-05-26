#!/usr/bin/env node

/**
 * VekstBoost Content Generation Demo
 * 
 * This script demonstrates how to use the VekstBoost Growth Engine
 * to generate AI-powered content for your website.
 */

const { createVekstBoost } = require('./mock-vekstboost');
require('dotenv').config();

// Demo site configuration
const siteConfig = {
  siteId: process.argv[2] || 'demo-site',
  apiKey: process.env.VEKSTBOOST_API_KEY || 'demo-key',
  industries: ['technology', 'marketing'],
  language: 'en',
  automaticPosting: true,
  postingFrequency: 'weekly',
  seoOptimization: true,
};

// Content type to generate
const contentType = process.argv[3] || 'blog';

// Content generation options
const options = {
  topics: process.argv.slice(4),
  keywordsToInclude: ['growth', 'automation', 'AI'],
  tone: 'professional',
  wordCount: 800,
};

// Run the demo
async function runDemo() {
  console.log('🦁 VekstBoost Content Generation Demo');
  console.log('--------------------------------------');
  console.log(`Site ID: ${siteConfig.siteId}`);
  console.log(`Content Type: ${contentType}`);
  console.log(`Topics: ${options.topics.length > 0 ? options.topics.join(', ') : '(auto-generated)'}`);
  console.log('--------------------------------------\n');
  
  try {
    // Initialize VekstBoost
    console.log('Initializing VekstBoost Growth Engine...');
    const vekstBoost = createVekstBoost(siteConfig);
    await vekstBoost.initialize();
    
    // Generate content
    console.log(`Generating ${contentType} content...`);
    const content = await vekstBoost.generateContent(contentType, options);
    
    if (!content) {
      throw new Error('Failed to generate content');
    }
    
    // Display the generated content
    console.log('\n✅ Content Generated Successfully!\n');
    console.log(`Title: ${content.title}`);
    console.log(`Slug: ${content.slug}`);
    console.log(`Published: ${new Date(content.publishedAt).toLocaleString()}`);
    console.log(`Categories: ${content.categories.join(', ')}`);
    console.log('\nExcerpt:');
    console.log(content.excerpt);
    
    console.log('\nContent Preview:');
    content.content.slice(0, 3).forEach(block => {
      if (block._type === 'block' && block.children && block.children[0]) {
        console.log(`- ${block.children[0].text.substring(0, 100)}...`);
      }
    });
    
    console.log('\n--------------------------------------');
    console.log('Full content would be displayed on the blog at:');
    console.log(`https://your-site.com/blog/${content.slug}`);
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

runDemo(); 