require("dotenv").config();

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  future: {
    webpack5: true,
  },
  webpack: (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      fallback: {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        https: false,
        http: false,
      },
    },
  }),
};

module.exports = nextConfig;
