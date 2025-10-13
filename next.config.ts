import type { NextConfig } from "next";
import type { Configuration as WebpackConfiguration } from "webpack";

const nextConfig: NextConfig = {
  // Your existing configuration
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

  // The added configuration to fix the 'fs' module error
  webpack: (config: WebpackConfiguration, { isServer }) => {
    // This prevents the browser from trying to bundle server-side modules
    if (!isServer) {
      config.resolve ??= {};
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;