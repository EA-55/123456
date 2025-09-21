// next.config.mjs
import { defineConfig } from 'next';

export default defineConfig({
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // ** rest of code here **
});
