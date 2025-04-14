import { NextResponse } from "next/server"

// Verwenden von CommonJS-Exporten statt ES-Modulen
export function GET(request, { params }) {
  return NextResponse.json({ id: params.id, message: "Reklamation gefunden" })
}

export function PATCH(request, { params }) {
  return NextResponse.json({ success: true, id: params.id })
}

export function DELETE(request, { params }) {
  return NextResponse.json({ success: true, id: params.id })
}
