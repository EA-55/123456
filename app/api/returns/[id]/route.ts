import { type NextRequest, NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const returnItem = db.getRetourById(id)

    if (!returnItem) {
      return NextResponse.json({ error: "Rückgabe nicht gefunden" }, { status: 404 })
    }

    return NextResponse.json({ return: returnItem }, { status: 200 })
  } catch (error) {
    console.error("Fehler beim Abrufen der Rückgabe:", error)
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const data = await request.json()

    const updatedReturn = db.updateRetour(id, data)

    if (!updatedReturn) {
      return NextResponse.json({ error: "Rückgabe nicht gefunden" }, { status: 404 })
    }

    return NextResponse.json({ return: updatedReturn }, { status: 200 })
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Rückgabe:", error)
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 })
  }
}
