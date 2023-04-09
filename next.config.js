/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },      
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },      {
        protocol: 'https',
        hostname: 'hips.hearstapps.com',
      },
    ],
  },
}

module.exports = nextConfig
