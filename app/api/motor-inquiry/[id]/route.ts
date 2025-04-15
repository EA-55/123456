import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/db"

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  console.log("Received PUT request to update motor inquiry:", context.params.id)
  try {
    const id = context.params.id
    const { status } = await request.json()
    const supabase = createServerClient()

    const { data, error } = await supabase.from("motor_inquiries").update({ status }).eq("id", id).select().single()

    if (error) {
      console.log("Error updating inquiry:", error)
      return NextResponse.json({ error: "Anfrage nicht gefunden" }, { status: 404 })
    }

    console.log("Inquiry updated:", id)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  console.log("Received DELETE request for motor inquiry:", context.params.id)
  try {
    const id = context.params.id
    const supabase = createServerClient()

    const { error } = await supabase.from("motor_inquiries").delete().eq("id", id)

    if (error) {
      console.log("Error deleting inquiry:", error)
      return NextResponse.json({ error: "Anfrage nicht gefunden" }, { status: 404 })
    }

    console.log("Inquiry deleted:", id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
