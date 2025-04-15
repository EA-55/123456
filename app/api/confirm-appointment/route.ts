import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const { date, name, email } = await req.json()
    const supabase = createServerClient()

    // Find the appointment
    const { data, error: fetchError } = await supabase
      .from("appointments")
      .select("*")
      .eq("date", date.split("T")[0])
      .eq("name", name)
      .eq("email", email)
      .single()

    if (fetchError || !data) {
      return NextResponse.json({ error: "Termin nicht gefunden" }, { status: 400 })
    }

    // Update the appointment
    const { error: updateError } = await supabase.from("appointments").update({ confirmed: true }).eq("id", data.id)

    if (updateError) {
      console.error("Error confirming appointment:", updateError)
      return NextResponse.json({ error: "Fehler bei der Terminbestätigung" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Termin erfolgreich bestätigt" })
  } catch (error) {
    console.error("Error processing confirm appointment request:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
