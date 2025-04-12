"use client"

import { useState, useEffect } from "react"
import Image, { type ImageProps } from "next/image"

interface OptimizedImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  fallbackSrc?: string
}

export default function OptimizedImage({ src, alt, fallbackSrc = "/placeholder.svg", ...props }: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Setze die Bildquelle erst, wenn die Komponente gemountet ist
    setImgSrc(typeof src === "string" ? src : fallbackSrc)
  }, [src, fallbackSrc])

  if (!imgSrc) {
    return null // Render nichts während des ersten Server-Renderings
  }

  return (
    <>
      {isLoading && <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-md" />}
      <Image
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        {...props}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImgSrc(fallbackSrc)
          setIsLoading(false)
        }}
        style={{
          ...props.style,
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      />
    </>
  )
}
