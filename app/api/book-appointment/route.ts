import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"

const APPOINTMENTS_FILE = path.join(process.cwd(), "appointments.json")

function readAppointments() {
  if (!fs.existsSync(APPOINTMENTS_FILE)) {
    console.log("Appointments file does not exist. Creating new file.")
    fs.writeFileSync(APPOINTMENTS_FILE, "[]")
    return []
  }
  const data = fs.readFileSync(APPOINTMENTS_FILE, "utf8")
  return JSON.parse(data)
}

function writeAppointments(appointments: any[]) {
  fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2))
  console.log("Appointments written to file.")
}

export async function POST(req: Request) {
  console.log("Received POST request for booking appointment")
  const { date, name, email } = await req.json()
  console.log("Received data:", { date, name, email })

  const appointmentDate = new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (appointmentDate < today || appointmentDate.getDay() === 0 || appointmentDate.getDay() === 6) {
    console.log("Invalid date:", appointmentDate)
    return NextResponse.json({ error: "Ungültiges Datum" }, { status: 400 })
  }

  const appointments = readAppointments()
  const isBooked = appointments.some((a) => a.date.split("T")[0] === date.split("T")[0])
  if (isBooked) {
    console.log("Date already booked:", date)
    return NextResponse.json({ error: "Termin bereits gebucht" }, { status: 400 })
  }

  const newAppointment = {
    id: uuidv4(),
    date,
    name,
    email,
    confirmed: false,
  }
  appointments.push(newAppointment)
  writeAppointments(appointments)

  console.log("New appointment booked:", newAppointment)
  return NextResponse.json({ success: true, message: "Termin erfolgreich angefragt" })
}

export async function GET() {
  console.log("Received GET request for appointments")
  const appointments = readAppointments()
  console.log("Returning appointments:", appointments)
  return NextResponse.json(appointments.map((a) => ({ date: a.date, confirmed: a.confirmed })))
}
