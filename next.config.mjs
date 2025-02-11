/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Suppress warnings about missing SWC binaries
    config.infrastructureLogging = {
      level: 'error',
    };
    return config;
  },
};

export default nextConfig;
