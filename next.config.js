/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'cdn.sanity.io'], // Add allowed image domains
  },
  trailingSlash: true,
  distDir: '.next'
}

module.exports = nextConfig 