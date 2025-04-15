"use client"

import { useState, useEffect } from "react"
import OptimizedImage from "@/app/components/optimized-image"
import { useImageDimensions } from "@/hooks/use-image-dimensions"
import { deferNonCriticalLoad } from "@/app/lib/performance"

interface ImageGalleryProps {
  images: {
    src: string
    alt: string
    width?: number
    height?: number
  }[]
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [visibleImages, setVisibleImages] = useState<typeof images>([])

  useEffect(() => {
    // Zeige zuerst nur die ersten 3 Bilder
    setVisibleImages(images.slice(0, 3))

    // Lade den Rest der Bilder verzögert
    deferNonCriticalLoad(() => {
      setVisibleImages(images)
    }, 2000)
  }, [images])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {visibleImages.map((image, index) => (
        <GalleryImage
          key={index}
          src={image.src || "/placeholder.svg"}
          alt={image.alt}
          width={image.width}
          height={image.height}
          priority={index < 2} // Priorisiere die ersten beiden Bilder
        />
      ))}
    </div>
  )
}

function GalleryImage({ src, alt, width, height, priority = false }) {
  const {
    width: imgWidth,
    height: imgHeight,
    aspectRatio,
  } = useImageDimensions({
    src,
    fallbackWidth: width || 800,
    fallbackHeight: height || 600,
  })

  return (
    <div className="relative overflow-hidden rounded-lg">
      <OptimizedImage
        src={src}
        alt={alt}
        width={imgWidth}
        height={imgHeight}
        aspectRatio={aspectRatio}
        className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
        priority={priority}
        usePlaceholder={true}
      />
    </div>
  )
}
