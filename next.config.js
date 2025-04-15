/** @type {import('next').NextConfig} */
const nextConfig = {
  // Entfernung veralteter Optionen (appDir, swcMinify)
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["hebbkx1anhila5yf.public.blob.vercel-storage.com"],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 Tage Cache für Bilder
    unoptimized: true,
  },
  // Aktiviere Gzip-Komprimierung
  compress: true,
  // Optimiere für Produktionsumgebung
  reactStrictMode: true,
  // Optimiere für statische Seiten
  output: "standalone",
}

module.exports = nextConfig
