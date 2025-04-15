import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/db"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validierung der Eingabedaten
    if (!data.customerNumber || !data.customerName || !data.articles || data.articles.length === 0) {
      return NextResponse.json({ error: "Alle Pflichtfelder müssen ausgefüllt sein" }, { status: 400 })
    }

    const supabase = createServerClient()

    // Erstellen einer neuen Rückgabe
    const newReturn = {
      id: uuidv4(),
      user_id: "guest", // Für nicht angemeldete Benutzer
      order_number: data.orderNumber || "Keine Bestellnummer", // Standardwert
      product_name: data.articles.map((article: any) => `${article.articleNumber} (${article.quantity}x)`).join(", "),
      reason: data.articles.map((article: any) => `${article.articleNumber}: ${article.returnReason}`).join("; "),
      status: "pending",
      customer_number: data.customerNumber,
      customer_name: data.customerName,
      package_condition: data.articles[0].condition, // Vereinfachung: Wir nehmen den Zustand des ersten Artikels
      product_condition: "Siehe Details",
      contact_email: data.email,
      contact_phone: data.phone || "Nicht angegeben", // Standardwert
      additional_info: data.comments || "",
      processor_name: "", // Wird später vom Admin ausgefüllt
      articles: JSON.stringify(data.articles), // Speichern der vollständigen Artikeldaten
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const { error } = await supabase.from("returns").insert(newReturn)

    if (error) {
      console.error("Fehler beim Speichern der Rückgabe:", error)
      return NextResponse.json({ error: "Ein Fehler ist bei der Verarbeitung aufgetreten" }, { status: 500 })
    }

    return NextResponse.json({ success: true, return: newReturn, id: newReturn.id })
  } catch (error) {
    console.error("Fehler bei der Verarbeitung der Rückgabe:", error)
    return NextResponse.json({ error: "Ein Fehler ist bei der Verarbeitung aufgetreten" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase.from("returns").select("*")

    if (error) {
      console.error("Fehler beim Abrufen der Rückgaben:", error)
      return NextResponse.json({ error: "Ein Fehler ist beim Abrufen der Rückgaben aufgetreten" }, { status: 500 })
    }

    return NextResponse.json({ returns: data })
  } catch (error) {
    console.error("Fehler beim Abrufen der Rückgaben:", error)
    return NextResponse.json({ error: "Ein Fehler ist beim Abrufen der Rückgaben aufgetreten" }, { status: 500 })
  }
}
