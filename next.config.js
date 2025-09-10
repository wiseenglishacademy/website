/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  distDir: 'dist',
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Optimized for Netlify static hosting
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
  // Ensure proper hydration
  reactStrictMode: true,
};

module.exports = nextConfig;
