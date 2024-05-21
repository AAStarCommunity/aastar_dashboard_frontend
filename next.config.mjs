/** @type {import('next').NextConfig} */
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const env = process.env.NODE_ENV;
// Read from the define environment variable file
const envFile = path.join(__dirname, `.env.${env}`);
// check file is exist
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
}
const nextConfig = {
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_GITHUB_CLIENT_ID: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
  },
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
        destination: `${process.env.DESTINATION_URL}:path*`,
      },
    ];
  },
};

export default nextConfig;
