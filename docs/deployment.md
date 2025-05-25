# VekstBoost Deployment Guide

This guide explains how to deploy the VekstBoost Growth Engine system to make it available for all your client websites.

## System Architecture

VekstBoost consists of two main components:

1. **VekstBoost Client Package**: A npm package that clients install in their Next.js projects
2. **VekstBoost API Server**: A central server that handles content generation and lead management

## Deploying the Client Package

### 1. Publishing to npm

```bash
# From the repository root
npm run build
npm publish
```

Alternatively, use GitHub Actions to automatically publish your package:

1. Create a GitHub repository
2. Add your npm token as a secret named `NPM_TOKEN`
3. Push the code to GitHub
4. Create a release to trigger the publishing workflow

### 2. Private npm Registry (Optional)

If you want to keep VekstBoost private:

1. Set up a private npm registry (e.g., using Verdaccio or GitHub Packages)
2. Update the `publishConfig` in package.json to point to your private registry
3. Publish to your private registry

## Deploying the API Server

### Option 1: Deploy to a VPS

```bash
# SSH into your server
ssh user@your-server

# Clone the repository
git clone https://github.com/onedevconsultancy/vekstboost.git
cd vekstboost/server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit the .env file with your credentials

# Build and start the server
npm run build
npm start

# Use PM2 to keep the server running
pm2 start dist/index.js --name vekstboost-api
```

### Option 2: Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Configure environment variables in the Vercel dashboard
3. Deploy the server directory as a separate project

### Option 3: Deploy to Railway

Railway is a great option for easy deployments:

1. Connect your GitHub repository to Railway
2. Set up the server directory as your project root
3. Configure environment variables in the Railway dashboard
4. Deploy

## Environment Variables

The API server requires the following environment variables:

```
OPENAI_API_KEY=sk-...
NOTION_API_KEY=secret_...
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
PORT=3001
```

## Domain Setup

For production, set up a domain for your API server:

1. Register a domain (e.g., `api.vekstboost.com`)
2. Configure DNS to point to your server
3. Set up SSL with Let's Encrypt

Update the API endpoint in the client package:

```typescript
// lib/vekstboost/index.ts
private apiEndpoint: string = 'https://api.vekstboost.com/v1';
```

## Monitoring and Scaling

For production deployments, consider:

1. Setting up monitoring with tools like Datadog or New Relic
2. Implementing rate limiting to prevent abuse
3. Using a caching layer for frequently accessed content
4. Setting up a database backup strategy

## Updating Existing Installations

When you release updates to VekstBoost, clients can update with:

```bash
npm update vekstboost
```

For major updates that require migration, provide a migration script:

```bash
npx vekstboost-migrate
```

---

For additional support or custom deployment options, contact support@vekstboost.com. 