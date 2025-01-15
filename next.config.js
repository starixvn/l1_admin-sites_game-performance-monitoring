/** @type {import('next').NextConfig} */
import configs from './configs.json';
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    };
    return config;
  },
  experimental: {
    outputStandalone: true,
  },
  basePath: configs.BASE_PATH,
};

module.exports = nextConfig;
