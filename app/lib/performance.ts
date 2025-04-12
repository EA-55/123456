// Hilfsfunktion zur Optimierung von Bildern
export function getOptimizedImageUrl(url: string, width = 800, quality = 85): string {
  // Wenn es sich um eine Vercel Blob Storage URL handelt, Parameter hinzufügen
  if (url.includes("vercel-storage.com")) {
    const separator = url.includes("?") ? "&" : "?"
    return `${url}${separator}w=${width}&q=${quality}`
  }

  // Wenn es sich um ein Platzhalter-Bild handelt
  if (url.includes("/placeholder.svg")) {
    return url
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
export function isInViewport(element: HTMLElement): boolean {
  if (typeof window === "undefined") return false

  const rect = element.getBoundingClientRect()

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}
