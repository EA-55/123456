import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST() {
  try {
    // Erstellen von 5 Testrückgaben
    const testReturns = []
    const returnItems = []

    for (let i = 1; i <= 5; i++) {
      const returnData = {
        customer_number: `TEST-${1000 + i}`,
        customer_name: `Testbenutzer ${i}`,
        email: `test${i}@example.com`,
        comments: i % 2 === 0 ? `Kommentar für Rückgabe ${i}` : null,
        status: ["pending", "approved", "processing", "completed", "rejected"][i - 1],
        processor_name: i > 2 ? `Bearbeiter ${i}` : null,
      }

      testReturns.push(returnData)
    }

    // Einfügen der Rückgaben
    const { data: insertedReturns, error: returnsError } = await supabaseAdmin
      .from("returns")
      .insert(testReturns)
      .select()

    if (returnsError) {
      console.error("Fehler beim Einfügen der Testrückgaben:", returnsError)
      return NextResponse.json({ error: "Fehler beim Einfügen der Testrückgaben" }, { status: 500 })
    }

    // Erstellen von Artikeln für jede Rückgabe
    insertedReturns.forEach((returnItem) => {
      const numItems = Math.floor(Math.random() * 3) + 1 // 1-3 Artikel pro Rückgabe

      for (let j = 1; j <= numItems; j++) {
        returnItems.push({
          return_id: returnItem.id,
          article_number: `ART-${1000 + j}`,
          quantity: Math.floor(Math.random() * 5) + 1,
          delivery_note_number: j % 2 === 0 ? `LN-${2000 + j}` : null,
          condition: ["Originalverpackung", "Geöffnet, aber intakt", "Beschädigt", "Keine Verpackung"][
            Math.floor(Math.random() * 4)
          ],
          return_reason: [
            "Kunden Rücktritt",
            "Altteilpfand",
            "Ware ist beschädigt",
            "Falsch bestellt",
            "Sonstiger Grund",
          ][Math.floor(Math.random() * 5)],
          other_reason: j % 5 === 0 ? "Individueller Grund" : null,
        })
      }
    })

    // Einfügen der Artikel
    const { error: itemsError } = await supabaseAdmin.from("return_items").insert(returnItems)

    if (itemsError) {
      console.error("Fehler beim Einfügen der Testartikel:", itemsError)
      return NextResponse.json({ error: "Fehler beim Einfügen der Testartikel" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Testdaten erfolgreich eingefügt",
      returns: insertedReturns.length,
      items: returnItems.length,
    })
  } catch (error) {
    console.error("Fehler beim Seeden der Testdaten:", error)
    return NextResponse.json({ error: "Ein Fehler ist aufgetreten" }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    // Alle Testdaten löschen (Artikel werden durch CASCADE automatisch gelöscht)
    const { error } = await supabaseAdmin.from("returns").delete().ilike("customer_number", "TEST-%")

    if (error) {
      console.error("Fehler beim Löschen der Testdaten:", error)
      return NextResponse.json({ error: "Fehler beim Löschen der Testdaten" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Testdaten erfolgreich gelöscht",
    })
  } catch (error) {
    console.error("Fehler beim Löschen der Testdaten:", error)
    return NextResponse.json({ error: "Ein Fehler ist aufgetreten" }, { status: 500 })
  }
}
