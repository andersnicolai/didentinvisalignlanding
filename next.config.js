/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static export
  images: {
    unoptimized: true // Needed for static export
  }
}

module.exports = nextConfig 