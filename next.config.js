/** @type {import('next').NextConfig} */

const configs = require('./configs.json');

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
  basePath: configs.BASE_PATH,
  assetPrefix: configs.BASE_PATH,
};

module.exports = nextConfig;
