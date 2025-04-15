import { type NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const imageUrl = searchParams.get("url")
    const width = searchParams.get("w") || "800"
    const quality = searchParams.get("q") || "85"

    if (!imageUrl) {
      return NextResponse.json({ error: "Missing image URL" }, { status: 400 })
    }

    // Sicherheitsüberprüfung - nur bestimmte Domains zulassen
    const allowedDomains = [
      "images.unsplash.com",
      "cdn.example.com",
      // Füge weitere vertrauenswürdige Domains hinzu
    ]

    const urlObj = new URL(imageUrl)
    if (!allowedDomains.includes(urlObj.hostname)) {
      return NextResponse.json({ error: "Domain not allowed" }, { status: 403 })
    }

    // Bild abrufen
    const response = await fetch(imageUrl)

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch image" }, { status: response.status })
    }

    // Bild-Daten und Header weiterleiten
    const blob = await response.blob()
    const headers = new Headers()
    headers.set("Content-Type", response.headers.get("Content-Type") || "image/jpeg")
    headers.set("Cache-Control", "public, max-age=31536000, immutable")

    return new NextResponse(blob, {
      headers,
      status: 200,
    })
  } catch (error) {
    console.error("Image proxy error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
