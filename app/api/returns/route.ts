import { type NextRequest, NextResponse } from "next/server"
import db from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validiere die erforderlichen Felder
    if (!data.customerNumber || !data.customerName || !data.orderNumber || !data.productName) {
      return NextResponse.json({ error: "Alle erforderlichen Felder müssen ausgefüllt sein" }, { status: 400 })
    }

    // Erstelle eine neue Rückgabe
    const newReturn = db.createRetour({
      userId: "guest", // Kann später durch die tatsächliche Benutzer-ID ersetzt werden
      orderNumber: data.orderNumber,
      productName: data.productName,
      reason: data.reason,
      status: "pending", // Standardstatus für neue Rückgaben
      customerNumber: data.customerNumber,
      customerName: data.customerName,
      packageCondition: data.packageCondition,
      productCondition: data.productCondition,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      additionalInfo: data.additionalInfo,
    })

    return NextResponse.json({ success: true, return: newReturn }, { status: 201 })
  } catch (error) {
    console.error("Fehler beim Erstellen der Rückgabe:", error)
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const returns = db.getAllRetouren()
    return NextResponse.json({ returns }, { status: 200 })
  } catch (error) {
    console.error("Fehler beim Abrufen der Rückgaben:", error)
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 })
  }
}
