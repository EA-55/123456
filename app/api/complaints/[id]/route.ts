import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function GET(request: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  try {
    const id = params.id
    const supabase = createClient()

    // Reklamation abrufen
    const { data: complaint, error: complaintError } = await supabase
      .from("complaints")
      .select("*")
      .eq("id", id)
      .single()

    if (complaintError) {
      console.error("Fehler beim Abrufen der Reklamation:", complaintError)
      return NextResponse.json({ error: "Fehler beim Abrufen der Reklamation" }, { status: 500 })
    }

    // Artikel abrufen
    const { data: items, error: itemsError } = await supabase.from("complaint_items").select("*").eq("complaint_id", id)

    if (itemsError) {
      console.error("Fehler beim Abrufen der Artikel:", itemsError)
      return NextResponse.json({ error: "Fehler beim Abrufen der Artikel" }, { status: 500 })
    }

    // Fahrzeugdaten abrufen
    const { data: vehicleData, error: vehicleError } = await supabase
      .from("complaint_vehicle_data")
      .select("*")
      .eq("complaint_id", id)
      .maybeSingle()

    if (vehicleError) {
      console.error("Fehler beim Abrufen der Fahrzeugdaten:", vehicleError)
      return NextResponse.json({ error: "Fehler beim Abrufen der Fahrzeugdaten" }, { status: 500 })
    }

    // Anhänge abrufen
    const { data: attachments, error: attachmentsError } = await supabase
      .from("complaint_attachments")
      .select("*")
      .eq("complaint_id", id)

    if (attachmentsError) {
      console.error("Fehler beim Abrufen der Anhänge:", attachmentsError)
      return NextResponse.json({ error: "Fehler beim Abrufen der Anhänge" }, { status: 500 })
    }

    return NextResponse.json({
      complaint,
      items,
      vehicleData,
      attachments,
    })
  } catch (error) {
    console.error("Fehler bei der Verarbeitung:", error)
    return NextResponse.json({ error: "Fehler bei der Verarbeitung" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  try {
    const id = params.id
    const data = await request.json()
    const supabase = createClient()

    // Reklamation aktualisieren
    const { error: updateError } = await supabase
      .from("complaints")
      .update({
        status: data.status,
        processor_name: data.processorName,
      })
      .eq("id", id)

    if (updateError) {
      console.error("Fehler beim Aktualisieren der Reklamation:", updateError)
      return NextResponse.json({ error: "Fehler beim Aktualisieren der Reklamation" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Fehler bei der Verarbeitung:", error)
    return NextResponse.json({ error: "Fehler bei der Verarbeitung" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  try {
    const id = params.id
    const supabase = createClient()

    // Reklamation löschen (Kaskadenlöschung für verknüpfte Einträge)
    const { error } = await supabase.from("complaints").delete().eq("id", id)

    if (error) {
      console.error("Fehler beim Löschen der Reklamation:", error)
      return NextResponse.json({ error: "Fehler beim Löschen der Reklamation" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Fehler bei der Verarbeitung:", error)
    return NextResponse.json({ error: "Fehler bei der Verarbeitung" }, { status: 500 })
  }
}
