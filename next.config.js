/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["hebbkx1anhila5yf.public.blob.vercel-storage.com"],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 Tage Cache für Bilder
  },
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Aktiviere Gzip-Komprimierung
  compress: true,
  // Optimiere für Produktionsumgebung
  reactStrictMode: true,
  // Optimiere für statische Seiten
  output: "standalone",
}

module.exports = nextConfig
