import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validierung der Eingabedaten
    if (!data.customerNumber || !data.customerName || !data.articles || data.articles.length === 0) {
      return NextResponse.json({ error: "Alle Pflichtfelder müssen ausgefüllt sein" }, { status: 400 })
    }

    // Transaktion starten
    const { data: returnData, error: returnError } = await supabaseAdmin
      .from("returns")
      .insert({
        customer_number: data.customerNumber,
        customer_name: data.customerName,
        email: data.email,
        comments: data.comments || null,
        status: "pending",
      })
      .select()
      .single()

    if (returnError || !returnData) {
      console.error("Fehler beim Erstellen der Rückgabe:", returnError)
      return NextResponse.json({ error: "Fehler beim Erstellen der Rückgabe" }, { status: 500 })
    }

    // Artikel hinzufügen
    const returnItems = data.articles.map((article: any) => ({
      return_id: returnData.id,
      article_number: article.articleNumber,
      quantity: Number.parseInt(article.quantity, 10) || 1,
      delivery_note_number: article.deliveryNoteNumber || null,
      condition: article.condition,
      return_reason: article.returnReason === "Sonstiger Grund" ? "Sonstiger Grund" : article.returnReason,
      other_reason: article.returnReason === "Sonstiger Grund" ? article.otherReason : null,
    }))

    const { error: itemsError } = await supabaseAdmin.from("return_items").insert(returnItems)

    if (itemsError) {
      console.error("Fehler beim Hinzufügen der Artikel:", itemsError)
      // Rückgabe löschen, wenn Artikel nicht hinzugefügt werden konnten
      await supabaseAdmin.from("returns").delete().eq("id", returnData.id)

      return NextResponse.json({ error: "Fehler beim Hinzufügen der Artikel" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      return: returnData,
      id: returnData.id,
    })
  } catch (error) {
    console.error("Fehler bei der Verarbeitung der Rückgabe:", error)
    return NextResponse.json({ error: "Ein Fehler ist bei der Verarbeitung aufgetreten" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { data: returns, error } = await supabaseAdmin
      .from("returns")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Fehler beim Abrufen der Rückgaben:", error)
      return NextResponse.json({ error: "Fehler beim Abrufen der Rückgaben" }, { status: 500 })
    }

    return NextResponse.json({ returns })
  } catch (error) {
    console.error("Fehler beim Abrufen der Rückgaben:", error)
    return NextResponse.json({ error: "Ein Fehler ist beim Abrufen der Rückgaben aufgetreten" }, { status: 500 })
  }
}
