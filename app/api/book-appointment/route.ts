import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/db"
import { v4 as uuidv4 } from "uuid"

export async function POST(req: NextRequest) {
  console.log("Received POST request for booking appointment")
  try {
    const { date, name, email } = await req.json()
    console.log("Received data:", { date, name, email })

    const appointmentDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (appointmentDate < today || appointmentDate.getDay() === 0 || appointmentDate.getDay() === 6) {
      console.log("Invalid date:", appointmentDate)
      return NextResponse.json({ error: "Ungültiges Datum" }, { status: 400 })
    }

    const supabase = createServerClient()

    // Check if date is already booked
    const { data: existingAppointments, error: fetchError } = await supabase
      .from("appointments")
      .select("*")
      .eq("date", date.split("T")[0])

    if (fetchError) {
      console.error("Error checking existing appointments:", fetchError)
      return NextResponse.json({ error: "Fehler bei der Terminprüfung" }, { status: 500 })
    }

    if (existingAppointments && existingAppointments.length > 0) {
      console.log("Date already booked:", date)
      return NextResponse.json({ error: "Termin bereits gebucht" }, { status: 400 })
    }

    // Create new appointment
    const newAppointment = {
      id: uuidv4(),
      date,
      name,
      email,
      confirmed: false,
      created_at: new Date().toISOString(),
    }

    const { error: insertError } = await supabase.from("appointments").insert(newAppointment)

    if (insertError) {
      console.error("Error creating appointment:", insertError)
      return NextResponse.json({ error: "Fehler bei der Terminbuchung" }, { status: 500 })
    }

    console.log("New appointment booked:", newAppointment)
    return NextResponse.json({ success: true, message: "Termin erfolgreich angefragt" })
  } catch (error) {
    console.error("Error processing appointment request:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  console.log("Received GET request for appointments")
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase.from("appointments").select("date, confirmed")

    if (error) {
      console.error("Error fetching appointments:", error)
      return NextResponse.json({ error: "Fehler beim Abrufen der Termine" }, { status: 500 })
    }

    console.log("Returning appointments:", data)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error processing get appointments request:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
