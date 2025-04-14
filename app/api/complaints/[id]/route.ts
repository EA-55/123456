import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const supabase = createClient()

    const { data, error } = await supabase
      .from("complaints")
      .select(`
        *,
        complaint_items(*),
        complaint_vehicle_data(*),
        complaint_attachments(*)
      `)
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error fetching complaint:", error)
      return NextResponse.json({ error: "Failed to fetch complaint" }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: "Complaint not found" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching complaint:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const updates = await request.json()
    const supabase = createClient()

    // Aktualisieren der Hauptdaten der Reklamation
    if (updates.complaint) {
      const { error: complaintError } = await supabase.from("complaints").update(updates.complaint).eq("id", id)

      if (complaintError) {
        console.error("Error updating complaint:", complaintError)
        return NextResponse.json({ error: "Failed to update complaint" }, { status: 500 })
      }
    }

    // Aktualisieren des Status
    if (updates.status) {
      const { error: statusError } = await supabase.from("complaints").update({ status: updates.status }).eq("id", id)

      if (statusError) {
        console.error("Error updating complaint status:", statusError)
        return NextResponse.json({ error: "Failed to update complaint status" }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating complaint:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const supabase = createClient()

    // Löschen der zugehörigen Daten in den Untertabellen
    await supabase.from("complaint_attachments").delete().eq("complaint_id", id)
    await supabase.from("complaint_items").delete().eq("complaint_id", id)
    await supabase.from("complaint_vehicle_data").delete().eq("complaint_id", id)

    // Löschen des Haupteintrags
    const { error } = await supabase.from("complaints").delete().eq("id", id)

    if (error) {
      console.error("Error deleting complaint:", error)
      return NextResponse.json({ error: "Failed to delete complaint" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting complaint:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
