import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ message: "Reklamationen API" })
}

export async function POST(request: Request) {
  try {
    // Minimale Implementierung
    return NextResponse.json({ success: true, id: "new-id" })
  } catch (error) {
    console.error("Fehler:", error)
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 })
  }
}
