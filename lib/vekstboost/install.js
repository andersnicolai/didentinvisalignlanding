#!/usr/bin/env node

/**
 * VekstBoost Installation Script
 * 
 * This script installs the VekstBoost Growth Engine components
 * into a Next.js project with a simple one-line command.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Configuration for the installation
let config = {
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
async function askQuestions() {
  return new Promise((resolve) => {
    rl.question('What is your site ID? (e.g., your-business-name): ', (siteId) => {
      config.siteId = siteId.trim() || `site-${Date.now()}`;
      
      rl.question('Do you have a VekstBoost API key? (Leave blank for demo mode): ', (apiKey) => {
        config.apiKey = apiKey.trim() || 'demo-key';
        
        rl.question('Discord webhook URL for lead notifications (optional): ', (webhook) => {
          config.discordWebhookUrl = webhook.trim();
          
          rl.question('What industries is your site focused on? (comma-separated): ', (industries) => {
            config.industries = industries.split(',').map(i => i.trim()).filter(Boolean);
            
            rl.question('Language (en, no, sv, da) [default: en]: ', (language) => {
              config.language = language.trim() || 'en';
              
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
async function installFiles() {
  console.log('\n📦 Installing VekstBoost files...');
  
  // Create the directory structure
  const vekstboostDir = path.join(cwd, 'lib', 'vekstboost');
  
  if (!fs.existsSync(path.join(cwd, 'lib'))) {
    fs.mkdirSync(path.join(cwd, 'lib'));
  }
  
  if (!fs.existsSync(vekstboostDir)) {
    fs.mkdirSync(vekstboostDir);
  }
  
  // Copy the core VekstBoost files
  const coreFiles = [
    'index.ts',
    'BlogDisplay.tsx',
  ];
  
  for (const file of coreFiles) {
    const sourcePath = path.join(__dirname, file);
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
    
    // Copy the blog post template file
    fs.copyFileSync(
      path.join(__dirname, '..', '..', 'app', 'blog', '[slug]', 'page.tsx'),
      blogPostPagePath
    );
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
async function updateEnvFile() {
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
function displayNextSteps() {
  console.log('\n🎉 VekstBoost Growth Engine installation complete!');
  console.log('\nNext steps:');
  console.log('1. Run your application: npm run dev');
  
  if (config.installBlog) {
    console.log('2. Visit http://localhost:3000/blog to see your AI-powered blog');
  }
  
  console.log('\nFor more information and documentation, visit: https://vekstboost.com/docs');
  
  process.exit(0);
} 