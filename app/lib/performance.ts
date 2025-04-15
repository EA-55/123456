// Hilfsfunktion zur Optimierung von Bildern
export function getOptimizedImageUrl(url: string, width = 800, quality = 85): string {
  // Wenn es sich um eine relative URL oder Daten-URL handelt
  if (url.startsWith("/") || url.startsWith("data:")) {
    return url
  }

  // Wenn es sich um eine Vercel Blob Storage URL handelt, Parameter hinzufügen
  if (url.includes("vercel-storage.com")) {
    const separator = url.includes("?") ? "&" : "?"
    return `${url}${separator}w=${width}&q=${quality}`
  }

  // Wenn es sich um ein Platzhalter-Bild handelt
  if (url.includes("/placeholder.svg")) {
    return url
  }

  // Wenn es sich um eine externe URL handelt, prüfen, ob wir einen Proxy verwenden können
  if (url.startsWith("http") && process.env.NEXT_PUBLIC_IMAGE_PROXY_ENABLED === "true") {
    // Verwende einen Bildproxy, falls konfiguriert
    return `/api/image-proxy?url=${encodeURIComponent(url)}&w=${width}&q=${quality}`
  }

  // Für andere Bilder die URL unverändert zurückgeben
  return url
}

// Hilfsfunktion zur Verzögerung des Ladens von nicht-kritischen Ressourcen
export function deferNonCriticalLoad(callback: () => void, delay = 1000): void {
  if (typeof window !== "undefined") {
    // Prüfen, ob requestIdleCallback verfügbar ist
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(() => setTimeout(callback, delay))
    } else {
      // Fallback für Browser ohne requestIdleCallback
      setTimeout(callback, delay)
    }
  }
}

// Hilfsfunktion zur Prüfung, ob ein Element im Viewport ist
export function isInViewport(element: HTMLElement, margin = "0px"): boolean {
  if (typeof window === "undefined" || !element) return false

  // Verwende IntersectionObserver API, wenn verfügbar
  if ("IntersectionObserver" in window) {
    return new Promise<boolean>((resolve) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          resolve(entry.isIntersecting)
          observer.disconnect()
        },
        { rootMargin: margin },
      )
      observer.observe(element)
    })
  }

  // Fallback für ältere Browser
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

// Hilfsfunktion zur Berechnung der Bildgröße basierend auf dem Container
export function calculateImageDimensions(
  containerWidth: number,
  originalWidth: number,
  originalHeight: number,
): { width: number; height: number } {
  const aspectRatio = originalWidth / originalHeight
  const width = Math.min(containerWidth, originalWidth)
  const height = Math.round(width / aspectRatio)

  return { width, height }
}

// Hilfsfunktion zur Generierung von Blurhash-Platzhaltern
export function getBlurDataURL(width = 8, height = 8): string {
  return `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3C/svg%3E`
}
