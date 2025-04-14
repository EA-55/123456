import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // Minimale Implementierung
  return NextResponse.json({ id: params.id, message: "Reklamation gefunden" })
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  // Minimale Implementierung
  return NextResponse.json({ success: true, id: params.id })
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  // Minimale Implementierung
  return NextResponse.json({ success: true, id: params.id })
}
