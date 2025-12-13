import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Optimize for Raspberry Pi performance
  experimental: {
    // Reduce memory usage on low-end devices
    optimizePackageImports: ["styled-components"],
  },
  // Disable source maps in production to save memory
  productionBrowserSourceMaps: false,
  // Reduce webpack memory usage
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Reduce chunk size for slower devices
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            default: {
              minChunks: 1,
              priority: -20,
              reuseExistingChunk: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              priority: -10,
              chunks: "all",
            },
          },
        },
      };
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tyckvrwfblheqxuliscl.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
