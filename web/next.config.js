const path = require('path');

const ADMIN_API_URL = process.env.ADMIN_API_URL || 'http://localhost:5001';

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['pg'],
  turbopack: {
    resolveAlias: {
      '@shared': path.resolve(__dirname, '..', 'shared'),
    },
  },
  webpack: (config) => {
    config.resolve.alias['@shared'] = path.resolve(__dirname, '..', 'shared');
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/admin/:path*',
        destination: `${ADMIN_API_URL}/api/admin/:path*`,
      },
      {
        source: '/api/auth/:path*',
        destination: `${ADMIN_API_URL}/api/auth/:path*`,
      },
      {
        source: '/admin/:path*',
        destination: `${ADMIN_API_URL}/admin/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
