"use client"

import { useState, useEffect } from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"
import { getOptimizedImageUrl } from "@/app/lib/performance"

interface OptimizedImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  fallbackSrc?: string
  usePlaceholder?: boolean
  blurhash?: string
  aspectRatio?: number
  lazyBoundary?: string
}

export default function OptimizedImage({
  src,
  alt,
  fallbackSrc = "/placeholder.svg",
  width,
  height,
  usePlaceholder = true,
  blurhash,
  aspectRatio,
  className,
  lazyBoundary = "200px",
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(!priority)
  const [error, setError] = useState(false)

  // Optimiere die Bildquelle, wenn es sich um einen String handelt
  const optimizedSrc =
    typeof src === "string" ? getOptimizedImageUrl(src, typeof width === "number" ? width : 800) : src

  useEffect(() => {
    // Setze die Bildquelle erst, wenn die Komponente gemountet ist
    setImgSrc(optimizedSrc)
    setIsLoading(!priority)
    setError(false)
  }, [optimizedSrc, priority])

  // Berechne das Seitenverhältnis für das Platzhalter-Element
  const placeholderStyle = aspectRatio
    ? {
        aspectRatio: String(aspectRatio),
        width: "100%",
      }
    : {}

  if (!imgSrc) {
    return null // Render nichts während des ersten Server-Renderings
  }

  return (
    <div className={cn("relative", className)}>
      {isLoading && usePlaceholder && (
        <div
          className="absolute inset-0 bg-gray-100 animate-pulse rounded-md"
          style={placeholderStyle}
          aria-hidden="true"
        />
      )}
      <Image
        src={error ? fallbackSrc : imgSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        lazyBoundary={lazyBoundary}
        {...props}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImgSrc(fallbackSrc)
          setError(true)
          setIsLoading(false)
        }}
        style={{
          ...props.style,
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
          ...placeholderStyle,
        }}
        className={cn("transition-opacity duration-300", error ? "bg-gray-100" : "", props.className)}
      />
    </div>
  )
}
