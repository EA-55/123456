import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Rückgabe abrufen
    const { data: returnData, error: returnError } = await supabaseAdmin
      .from("returns")
      .select("*")
      .eq("id", id)
      .single()

    if (returnError) {
      return NextResponse.json({ error: "Rückgabe nicht gefunden" }, { status: 404 })
    }

    // Artikel abrufen
    const { data: items, error: itemsError } = await supabaseAdmin.from("return_items").select("*").eq("return_id", id)

    if (itemsError) {
      console.error("Fehler beim Abrufen der Artikel:", itemsError)
    }

    return NextResponse.json({
      return: returnData,
      items: items || [],
    })
  } catch (error) {
    console.error("Fehler beim Abrufen der Rückgabe:", error)
    return NextResponse.json({ error: "Ein Fehler ist aufgetreten" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const data = await request.json()

    // Validierung
    if (!id) {
      return NextResponse.json({ error: "ID ist erforderlich" }, { status: 400 })
    }

    // Aktualisieren der Rückgabe
    const { data: updatedReturn, error } = await supabaseAdmin
      .from("returns")
      .update({
        status: data.status,
        processor_name: data.processorName,
        comments: data.additionalInfo,
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Fehler beim Aktualisieren der Rückgabe:", error)
      return NextResponse.json({ error: "Fehler beim Aktualisieren der Rückgabe" }, { status: 500 })
    }

    return NextResponse.json({ return: updatedReturn })
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Rückgabe:", error)
    return NextResponse.json({ error: "Ein Fehler ist aufgetreten" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Löschen der Rückgabe (Artikel werden durch ON DELETE CASCADE automatisch gelöscht)
    const { error } = await supabaseAdmin.from("returns").delete().eq("id", id)

    if (error) {
      console.error("Fehler beim Löschen der Rückgabe:", error)
      return NextResponse.json({ error: "Fehler beim Löschen der Rückgabe" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Fehler beim Löschen der Rückgabe:", error)
    return NextResponse.json({ error: "Ein Fehler ist aufgetreten" }, { status: 500 })
  }
}
