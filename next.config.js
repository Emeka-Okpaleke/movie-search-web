/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // This allows to deploy with ESLint errors
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;