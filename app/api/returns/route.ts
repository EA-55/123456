import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validierung der Eingabedaten
    if (!data.customerNumber || !data.customerName || !data.articles || data.articles.length === 0) {
      return NextResponse.json({ error: "Alle Pflichtfelder müssen ausgefüllt sein" }, { status: 400 })
    }

    // Erstellen einer neuen Rückgabe
    const newReturn = db.createRetour({
      userId: "guest", // Für nicht angemeldete Benutzer
      orderNumber: "Keine Bestellnummer", // Standardwert
      productName: data.articles.map((article: any) => `${article.articleNumber} (${article.quantity}x)`).join(", "),
      reason: data.articles.map((article: any) => `${article.articleNumber}: ${article.returnReason}`).join("; "),
      status: "pending",
      customerNumber: data.customerNumber,
      customerName: data.customerName,
      packageCondition: data.articles[0].condition, // Vereinfachung: Wir nehmen den Zustand des ersten Artikels
      productCondition: "Siehe Details",
      contactEmail: data.email,
      contactPhone: "Nicht angegeben", // Standardwert
      additionalInfo: data.comments || "",
      processorName: "", // Wird später vom Admin ausgefüllt
      articles: JSON.stringify(data.articles), // Speichern der vollständigen Artikeldaten
    })

    return NextResponse.json({ success: true, return: newReturn, id: newReturn.id })
  } catch (error) {
    console.error("Fehler bei der Verarbeitung der Rückgabe:", error)
    return NextResponse.json({ error: "Ein Fehler ist bei der Verarbeitung aufgetreten" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const returns = db.getAllRetouren()
    return NextResponse.json({ returns })
  } catch (error) {
    console.error("Fehler beim Abrufen der Rückgaben:", error)
    return NextResponse.json({ error: "Ein Fehler ist beim Abrufen der Rückgaben aufgetreten" }, { status: 500 })
  }
}
