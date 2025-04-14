import { NextResponse } from "next/server"

export async function GET() {
  // Minimale Implementierung ohne Supabase
  return NextResponse.json([
    { id: "1", status: "pending" },
    { id: "2", status: "completed" },
  ])
}

export async function POST(request: Request) {
  // Minimale Implementierung ohne Supabase
  return NextResponse.json({ id: "new-id", success: true })
}
