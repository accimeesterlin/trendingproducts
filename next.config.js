require("dotenv").config();

const nextConfig = {
  env: {
    ALI_IMPORT_URL: process.env.ALI_IMPORT_URL,
  },
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
