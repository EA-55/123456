"use client"

import { useState, useEffect, useCallback } from "react"

interface ImageDimensions {
  width: number
  height: number
  aspectRatio: number
}

interface UseImageDimensionsProps {
  src: string
  fallbackWidth?: number
  fallbackHeight?: number
}

export function useImageDimensions({
  src,
  fallbackWidth = 1200,
  fallbackHeight = 800,
}: UseImageDimensionsProps): ImageDimensions {
  const [dimensions, setDimensions] = useState<ImageDimensions>({
    width: fallbackWidth,
    height: fallbackHeight,
    aspectRatio: fallbackWidth / fallbackHeight,
  })

  const calculateDimensions = useCallback(() => {
    if (!src || typeof window === "undefined") return

    const img = new Image()
    img.onload = () => {
      const width = img.width || fallbackWidth
      const height = img.height || fallbackHeight
      const aspectRatio = width / height

      setDimensions({
        width,
        height,
        aspectRatio,
      })
    }

    img.src = src

    // Setze crossOrigin für externe Bilder
    if (src.startsWith("http")) {
      img.crossOrigin = "anonymous"
    }
  }, [src, fallbackWidth, fallbackHeight])

  useEffect(() => {
    calculateDimensions()
  }, [calculateDimensions])

  return dimensions
}
