import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ message: "Reklamationen API" })
}

export async function POST(request) {
  return NextResponse.json({ success: true, message: "Reklamation erstellt" })
}
