import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static single page (PRD §3): Cache Components / partial prefetching
  // are not needed and would turn build-time values into revalidated ones.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
