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
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 Tage Cache für Bilder
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
  },
}

module.exports = nextConfig
