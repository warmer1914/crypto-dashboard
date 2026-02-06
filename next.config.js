/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'assets.coingecko.com',
      'coin-images.coingecko.com',
      'images.coingecko.com'
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig
