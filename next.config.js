/** @type {import('next').NextConfig} */
const nextConfig = {
  // Linting und TypeScript-Konfiguration
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Bild-Optimierung
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      // Weitere vertrauenswürdige Domains hier hinzufügen
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 Tage Cache für Bilder
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Performance-Optimierungen
  compress: true,
  reactStrictMode: true,

  // Deployment-Konfiguration
  output: "standalone",

  // Experimentelle Funktionen für Next.js 15
  experimental: {
    // Optimierte Server-Komponenten
    serverComponentsExternalPackages: [],
    // Verbesserte Typensicherheit
    typedRoutes: true,
    // Optimierte Bildverarbeitung
    optimizeImages: true,
    // Optimierte Schriften
    optimizeFonts: true,
  },
}

module.exports = nextConfig
