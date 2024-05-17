/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const nextConfig = {
  // output: "export",
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    config.resolve.alias["@src"] = path.resolve("./src");
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src"), path.join(__dirname, "public")],
  },
  async rewrites() {
    return [
      // request proxy
      {
        source: "/text-api/:path*",
        destination: `https://aastar-dashboard-backend-dev.onrender.com/:path*`,
      },
    ];
  },
};

export default nextConfig;
