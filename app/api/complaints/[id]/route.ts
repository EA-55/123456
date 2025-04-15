import { NextResponse } from "next/server"
import { createClient } from "@/lib/db"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const supabase = createClient()

    // Fetch the complaint
    const { data: complaint, error: complaintError } = await supabase
      .from("complaints")
      .select("*")
      .eq("id", id)
      .single()

    if (complaintError) {
      console.error("Error fetching complaint:", complaintError)
      return NextResponse.json({ error: "Failed to fetch complaint" }, { status: 500 })
    }

    if (!complaint) {
      return NextResponse.json({ error: "Complaint not found" }, { status: 404 })
    }

    // Fetch related complaint items
    const { data: items, error: itemsError } = await supabase.from("complaint_items").select("*").eq("complaint_id", id)

    if (itemsError) {
      console.error("Error fetching complaint items:", itemsError)
      return NextResponse.json({ error: "Failed to fetch complaint items" }, { status: 500 })
    }

    // Fetch vehicle data
    const { data: vehicleData, error: vehicleError } = await supabase
      .from("complaint_vehicle_data")
      .select("*")
      .eq("complaint_id", id)
      .maybeSingle()

    if (vehicleError) {
      console.error("Error fetching vehicle data:", vehicleError)
      return NextResponse.json({ error: "Failed to fetch vehicle data" }, { status: 500 })
    }

    // Fetch attachments
    const { data: attachments, error: attachmentsError } = await supabase
      .from("complaint_attachments")
      .select("*")
      .eq("complaint_id", id)

    if (attachmentsError) {
      console.error("Error fetching attachments:", attachmentsError)
      return NextResponse.json({ error: "Failed to fetch attachments" }, { status: 500 })
    }

    // Combine all data
    const completeData = {
      ...complaint,
      items: items || [],
      vehicleData: vehicleData || null,
      attachments: attachments || [],
    }

    return NextResponse.json(completeData)
  } catch (error) {
    console.error("Error fetching complaint:", error)
    return NextResponse.json({ error: "Failed to fetch complaint data" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const supabase = createClient()
    const body = await request.json()

    const { status, admin_notes } = body

    // Update the complaint
    const { data, error } = await supabase
      .from("complaints")
      .update({
        status,
        admin_notes,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating complaint:", error)
      return NextResponse.json({ error: "Failed to update complaint" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error updating complaint:", error)
    return NextResponse.json({ error: "Failed to update complaint" }, { status: 500 })
  }
}
