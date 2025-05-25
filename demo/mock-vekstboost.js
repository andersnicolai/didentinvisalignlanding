/**
 * Mock VekstBoost implementation for demo purposes
 */

// Sample blog post data
const sampleBlogPost = {
  title: "The Benefits of Invisalign Treatment for Adults",
  slug: "benefits-of-invisalign-for-adults",
  publishedAt: new Date().toISOString(),
  categories: ["Invisalign", "Dental Health", "Orthodontics"],
  excerpt: "Discover why Invisalign is becoming the preferred orthodontic treatment option for adults looking to improve their smile without traditional braces.",
  mainImage: {
    url: "https://picsum.photos/800/600",
    alt: "A person smiling with clear Invisalign aligners"
  },
  content: [
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Invisalign has revolutionized orthodontic treatment for adults. With its discreet appearance and removable nature, it offers advantages that traditional metal braces simply cannot match."
        }
      ]
    },
    {
      _type: "block",
      style: "h2",
      children: [
        {
          _type: "span",
          text: "Why Adults Choose Invisalign"
        }
      ]
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Adults often choose Invisalign for several key reasons. First, the aligners are nearly invisible, making them perfect for professionals who want to maintain a polished appearance during treatment."
        }
      ]
    }
  ]
};

class MockVekstBoost {
  constructor(config) {
    this.config = config;
    console.log('📋 Mock VekstBoost created with config:', config);
  }

  async initialize() {
    console.log('🔄 [MOCK] Connecting to VekstBoost API...');
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('✅ [MOCK] Connection established successfully!');
    return true;
  }

  async generateContent(contentType, options) {
    console.log(`🤖 [MOCK] Generating ${contentType} content with options:`, options);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create a copy of the sample blog post so we don't modify the original
    const content = JSON.parse(JSON.stringify(sampleBlogPost));
    
    // Customize the blog post based on content type and options
    if (contentType !== 'blog') {
      content.title = `The Benefits of ${contentType} Treatment`;
      content.slug = `benefits-of-${contentType.toLowerCase().replace(/\s+/g, '-')}`;
      content.categories = [contentType, 'Dental Health'];
    }
    
    // Customize the blog post based on options
    if (options.topics && options.topics.length > 0) {
      content.title = `The Benefits of ${options.topics[0]} for Dental Health`;
      content.slug = `benefits-of-${options.topics[0].toLowerCase().replace(/\s+/g, '-')}`;
      content.categories = [...options.topics, 'Dental Health'];
    }
    
    return content;
  }
}

function createVekstBoost(config) {
  return new MockVekstBoost(config);
}

module.exports = { createVekstBoost }; 