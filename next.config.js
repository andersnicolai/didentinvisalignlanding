/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    domains: ['images.unsplash.com', 'cdn.sanity.io'], // Add allowed image domains
    unoptimized: true // Required for static export
  },
  // Disable API routes for static export
  experimental: {
    missingSuspenseWithCSRBailout: false,
  }
}

module.exports = nextConfig 