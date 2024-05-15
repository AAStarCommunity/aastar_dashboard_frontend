/** @type {import('next').NextConfig} */
import path from "path";
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    config.resolve.alias["@src"] = path.resolve("./src");
    return config;
  },
  async rewrites() {
    return [
      // request proxy
      {
        source: "/api-text/:path*",
        destination: `https://aastar-dashboard-backend-dev.onrender.com/:path*`,
      },
    ];
  },
};

export default nextConfig;
